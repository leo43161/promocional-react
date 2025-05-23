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
