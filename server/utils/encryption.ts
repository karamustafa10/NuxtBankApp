import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-ctr'; // Encryption algorithm
const secretKey: Buffer = randomBytes(32); // 32-byte key
const iv: Buffer = randomBytes(16); // Initialization vector (IV)

/**
 * Encrypts a text using AES-256-CTR.
 * @param text - The plaintext to encrypt.
 * @returns The encrypted text in the format `iv:encryptedData`.
 */
export const encrypt = (text: string): string => {
    const cipher = createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

/**
 * Decrypts an encrypted text back to plaintext.
 * @param hash - The encrypted text in the format `iv:encryptedData`.
 * @returns The decrypted plaintext.
 */
export const decrypt = (hash: string): string => {
    const [ivHex, encryptedTextHex] = hash.split(':');
    const decipher = createDecipheriv(algorithm, secretKey, Buffer.from(ivHex, 'hex'));
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encryptedTextHex, 'hex')),
        decipher.final(),
    ]);
    return decrypted.toString();
};
