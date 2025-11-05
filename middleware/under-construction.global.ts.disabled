export default defineNuxtRouteMiddleware((to) => {
  // Allow access to the under-construction page itself
  if (to.path === '/under-construction' || to.path === '/es/under-construction') {
    return;
  }

  // Redirect all other routes to under-construction
  return navigateTo('/under-construction');
});
