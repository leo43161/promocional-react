import CryptoJS from 'crypto-js';

// ¡IMPORTANTE! Reemplaza esto con una clave segura y guárdala en tus variables de entorno
const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_COOKIE_SECRET || 'EATT8521EATT8521EATT8521EATT8521');
// Función para encriptar
export function encriptar(string) {
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(string, key, { iv: iv });
    return `${iv.toString(CryptoJS.enc.Hex)}:${encrypted.ciphertext.toString(CryptoJS.enc.Base64)}`;
}

// Función para desencriptar (si la necesitas en el cliente)
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

// Función para establecer una cookie
export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Función para obtener una cookie
export function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function deleteCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}