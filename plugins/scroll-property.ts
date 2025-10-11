type ScrollEffectOptions = {
  from?: number;
  to?: number;
  unit?: string;
  property?: string;
  template?: string | null;
  transition?: string | null;
};

type ScrollEffectResolvedOptions = {
  from: number;
  to: number;
  unit: string;
  property: string;
  template: string | null;
  transition: string;
};

type ScrollEffectState = {
  options: ScrollEffectResolvedOptions;
  handler: () => void;
  rafId: number | null;
};

const directiveName = "scroll-property";
const stateKey = "__scrollPropertyState" as const;
const isClient = typeof window !== "undefined";

const defaultOptions: ScrollEffectResolvedOptions = {
  from: 1,
  to: 1.05,
  unit: "",
  property: "transform",
  template: "scale({value})",
  transition: "transform 0.25s ease-out",
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const resolveOptions = (value: unknown): ScrollEffectResolvedOptions => {
  if (typeof value === "number") {
    return { ...defaultOptions, to: value };
  }

  if (typeof value === "object" && value) {
    const input = value as ScrollEffectOptions;
    const base: ScrollEffectResolvedOptions = { ...defaultOptions };

    if (typeof input.property === "string" && input.property.trim().length > 0) {
      base.property = input.property.trim();

      if (!("template" in input)) {
        base.template = base.property === "transform" ? defaultOptions.template : null;
      }
    }

    if ("template" in input) {
      const template = input.template;
      if (typeof template === "string") {
        base.template = template;
      } else if (template === null) {
        base.template = null;
      }
    } else if (base.property !== "transform") {
      base.template = null;
    }

    if (typeof input.from === "number") {
      base.from = input.from;
    }

    if (typeof input.to === "number") {
      base.to = input.to;
    }

    if (typeof input.unit === "string") {
      base.unit = input.unit;
    }

    if ("transition" in input) {
      const transition = input.transition;
      if (typeof transition === "string") {
        base.transition = transition;
      } else if (transition === null) {
        base.transition = "";
      }
    }

    if (base.transition === defaultOptions.transition && base.property !== "transform") {
      base.transition = `${base.property} 0.25s ease-out`;
    }

    if (base.template && !base.template.includes("{value}")) {
      console.warn(
        `[v-${directiveName}] template is missing {value} placeholder. Received: ${base.template}`,
      );
    }

    return base;
  }

  return { ...defaultOptions };
};

const computeProgress = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  if (viewportHeight === 0) {
    return 0;
  }

  const viewportCenter = viewportHeight / 2;
  const elementCenter = rect.top + rect.height / 2;
  const maxDistance = viewportHeight / 2 + rect.height / 2;

  if (maxDistance === 0) {
    return 0;
  }

  const distance = Math.abs(viewportCenter - elementCenter);
  const normalized = 1 - distance / maxDistance;

  return clamp(normalized, 0, 1);
};

const formatInterpolatedValue = (
  value: number,
  options: ScrollEffectResolvedOptions,
): string => {
  const numeric = Number(value.toFixed(4));
  const valueWithUnit = `${numeric}${options.unit}`;

  if (options.template) {
    return options.template.split("{value}").join(valueWithUnit);
  }

  return valueWithUnit;
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive(directiveName, {
    getSSRProps(binding) {
      const options = resolveOptions(binding.value);
      const initialValue = formatInterpolatedValue(options.from, options);
      return {
        style: {
          [options.property]: initialValue,
        },
      };
    },
    mounted(el, binding) {
      if (!isClient) return;

      const target = el as HTMLElement & Record<typeof stateKey, ScrollEffectState | undefined>;
      const state: ScrollEffectState = {
        options: resolveOptions(binding.value),
        handler: () => {
          if (state.rafId !== null) {
            return;
          }

          state.rafId = requestAnimationFrame(() => {
            state.rafId = null;

            const progress = computeProgress(target);
            const { from, to } = state.options;
            const nextValue = from + (to - from) * progress;
            const formatted = formatInterpolatedValue(nextValue, state.options);

            target.style.setProperty(state.options.property, formatted);
          });
        },
        rafId: null,
      };

      target[stateKey] = state;

      target.style.transition = state.options.transition;

      target.style.willChange = state.options.property.startsWith("--")
        ? ""
        : state.options.property;

      window.addEventListener("scroll", state.handler, { passive: true });
      window.addEventListener("resize", state.handler);

      state.handler();
    },
    updated(el, binding) {
      if (!isClient) return;

      const target = el as HTMLElement & Record<typeof stateKey, ScrollEffectState | undefined>;
      const state = target[stateKey];
      if (!state) return;

      const previousOptions = state.options;
      const nextOptions = resolveOptions(binding.value);

      if (previousOptions.property !== nextOptions.property) {
        target.style.removeProperty(previousOptions.property);
      }

      state.options = nextOptions;

      target.style.transition = state.options.transition;

      target.style.willChange = state.options.property.startsWith("--")
        ? ""
        : state.options.property;

      state.handler();
    },
    unmounted(el) {
      if (!isClient) return;

      const target = el as HTMLElement & Record<typeof stateKey, ScrollEffectState | undefined>;
      const state = target[stateKey];

      if (!state) return;

      window.removeEventListener("scroll", state.handler);
      window.removeEventListener("resize", state.handler);

      if (state.rafId !== null) {
        cancelAnimationFrame(state.rafId);
      }

      target.style.willChange = "";
      target.style.transition = "";
      target.style.removeProperty(state.options.property);

      target[stateKey] = undefined;
    },
  });
});
