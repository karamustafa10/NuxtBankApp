// server/api/logout.ts
import { defineEventHandler, setCookie } from 'h3';

export default defineEventHandler(async (event) => {
    // Çerezleri temizleyerek oturumu sonlandırma
    setCookie(event, 'session', '', {
        maxAge: 0, // Çerezi hemen siler
    });

    return { message: 'Logged out successfully' };
});
