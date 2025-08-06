import CryptoJS from 'crypto-js';
// ¡IMPORTANTE! Reemplaza esto con una clave segura y guárdala en tus variables de entorno
const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_COOKIE_SECRET || 'EATT8521EATT8521EATT8521EATT8521');

// Función para encriptar
export function encriptar(string) {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(string, key, { iv: iv });
    return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(CryptoJS.enc.Base64)}`;
}

// Función para desencriptar
export function desencriptar(encryptedString) {
    try {
        const [ivHex, encryptedBase64] = encryptedString.split(':');
        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const ciphertext = CryptoJS.enc.Base64.parse(encryptedBase64);
        const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, { iv: iv });
        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Error al desencriptar:", error);
        return null;
    }
}

/**
 * Establece una cookie en el navegador.
 * @param {string} name - El nombre de la cookie.
 * @param {string} value - El valor de la cookie.
 * @param {number} [days] - La cantidad de días hasta que la cookie expire. Si no se especifica, será una cookie de sesión.
 */
export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    // Aseguramos que la cookie esté disponible en todo el sitio
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/**
 * Obtiene el valor de una cookie por su nombre.
 * @param {string} name - El nombre de la cookie a obtener.
 * @returns {string|null} El valor de la cookie o null si no se encuentra.
 */
export function getCookie(name) {
    if (typeof document === 'undefined') {
        return null;
    }
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

/**
 * Elimina una cookie por su nombre.
 * @param {string} name - El nombre de la cookie a eliminar.
 */
export function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}