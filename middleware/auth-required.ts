import { defineNuxtRouteMiddleware, useCookie } from 'nuxt/app';

export default defineNuxtRouteMiddleware(() => {
    const sessionCookie = useCookie('session');
    if (!sessionCookie) {
        return navigateTo('/sign-in');  // Oturum yoksa /sign-in sayfasına yönlendirme
    }
});
