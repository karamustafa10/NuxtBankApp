import { defineNuxtRouteMiddleware, useCookie } from 'nuxt/app';

export default defineNuxtRouteMiddleware(() => {
    const sessionCookie = useCookie('session');
    if (sessionCookie.value) {
        return navigateTo('/');  // Anasayfaya yönlendirme
    }
});
