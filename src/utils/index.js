import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const languages = [
    { id: 1, code: 'ES', label: 'Español', flag: (process.env.URL_IMG_LOCAL || '') + '/svg/arg.svg', alt: 'Bandera Argentina' },
    { id: 2, code: 'EN', label: 'English', flag: (process.env.URL_IMG_LOCAL || '') + '/svg/eng.svg', alt: 'Bandera Reino Unido' } // Asumiendo ID 2 para inglés
];



export function generateSlug(text) {
    if (!text) return '';
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Separa acentos de letras
        .replace(/[\u0300-\u036f]/g, '') // Quita acentos
        .replace(/\s+/g, '-') // Reemplaza espacios con -
        .replace(/[^\w\-]+/g, '') // Quita caracteres no alfanuméricos (excepto guiones)
        .replace(/\-\-+/g, '-') // Reemplaza múltiples guiones con uno solo
        .replace(/^-+/, '') // Quita guiones al inicio
        .replace(/-+$/, ''); // Quita guiones al final
}

// Esto sirve para combinar clases de Tailwind y clsx
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

/**
 * Obtiene el objeto de idioma actual basado en el query param 'lang' de la URL.
 * Si no se encuentra 'lang' o no coincide con ningún idioma, devuelve el idioma por defecto (Español).
 * @param {object} query - El objeto `router.query` de Next.js.
 * @returns {object} El objeto de idioma encontrado o el idioma por defecto.
 */
export function getCurrentLanguage(query) {
    const defaultLanguage = languages[0]; // Español como default
    if (query && query.lang) {
        const langCode = typeof query.lang === 'string' ? query.lang.toUpperCase() : '';
        const found = languages.find(l => l.code === langCode);
        return found || defaultLanguage;
    }
    return defaultLanguage;
}

/**
 * Verifica si el idioma actual (basado en el query param 'lang') es diferente al idioma por defecto (Español).
 * @param {object} query - El objeto `router.query` de Next.js.
 * @returns {boolean} True si el idioma es diferente al por defecto, false en caso contrario.
 */
export function isAlternateLanguage(query) {
    const currentLang = getCurrentLanguage(query);
    // Asumimos que el primer idioma en el array 'languages' (ID 1, código 'ES') es el principal/por defecto.
    return currentLang.id !== languages[0].id;
}

/**
 * Obtiene el código del idioma actual (ej. 'ES', 'EN').
 * @param {object} query - El objeto `router.query` de Next.js.
 * @returns {string} El código del idioma actual.
 */
export function getCurrentLanguageCode(query) {
    return getCurrentLanguage(query).code;
}

export const encode = (str) => encodeURIComponent(str);