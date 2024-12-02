import { parseCookies } from 'h3';
import { decrypt } from '~/server/utils/encryption';

export default defineEventHandler(async (event) => {
    const cookies = parseCookies(event);

    if (!cookies.session) {
        return { success: false, message: 'Session cookie is missing.' };
    }

    try {
        const decryptedUserId = decrypt(cookies.session);
        // 'decryptedUserId' mevcut olduğunda döndürülür
        if (decryptedUserId) {
            return { success: true, userId: decryptedUserId };
        } else {
            // 'decryptedUserId' eksikse hata mesajı döndürülür
            return { success: false, message: 'Decrypted userId is missing.' };
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: 'Failed to decrypt session.',
                error: error.message
            };
        } else {
            return {
                success: false,
                message: 'An unknown error occurred.',
                error: String(error)
            };
        }
    }
});
