// (Puedes mover esto a un archivo utils/slugify.js e importarlo)
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