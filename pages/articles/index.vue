<script setup>
    const { data: page } = useI18nResource('articles');
    const { data: articles } = await useLocalizedCollection('articles', {
        key: 'articles',
        limit: -1,
    });
</script>

<template>
    <div>
        <section class="py-16 lg:py-32">
            <div class="container">
                <div class="text-center max-w-2xl mx-auto">
                    <h2 v-if="page?.title" class="text-5xl text-secondary font-normal mb-5">
                    {{ page?.title }}
                    </h2>
                    <p
                    v-if="page?.intro"
                    class="text-lg leading-relaxed text-secondary font-normal"
                    >
                    {{ page?.intro }}
                    </p>
                </div>

                <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <BlogArticle  v-for="(article, index) in articles" :key="index" :article="article" />
                </div>
            </div>
        </section>
    </div>
</template>