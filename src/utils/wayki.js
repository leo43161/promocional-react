/**
 * Procesa un chunk del stream SSE acumulando fragmentos incompletos.
 * @param {string} chunk  - Texto crudo recibido del reader
 * @param {string} buffer - Remanente del chunk anterior (pasar "" la primera vez)
 * @returns {{ events: object[], buffer: string }}
 *   events  → objetos JSON ya completos y parseados (puede ser [])
 *   buffer  → lo que quedó incompleto para el próximo chunk
 */
export const decodeDataWayki = (chunk = "", buffer = "") => {
    // 1. Concatenar el remanente anterior con el chunk nuevo
    const raw = buffer + chunk;

    // 2. Separar por el delimitador SSE "data: "
    //    Usamos split con lookahead para no perder el delimitador
    const parts = raw.split(/(?=data: )/);

    const events = [];
    let newBuffer = "";

    for (const part of parts) {
        // Ignorar líneas vacías / whitespace
        const trimmed = part.trim();
        if (!trimmed) continue;

        // Quitar el prefijo "data: "
        const jsonStr = trimmed.startsWith("data: ")
            ? trimmed.slice(6).trim()
            : trimmed;

        if (!jsonStr) continue;

        if (isJson(jsonStr)) {
            events.push(JSON.parse(jsonStr));
        } else {
            // JSON incompleto → guardar en buffer para el próximo chunk
            // Solo guardamos el último fragmento incompleto
            newBuffer = part; // conservamos el "data: " prefix para reensamblar
        }
    }

    return { events, buffer: newBuffer };
};

export const parseMarkdown = (text) => {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\n\n/g, '</span><span class="mb-2">')
        .replace(/\n/g, '<br/>')
        .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-secondary">$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="underline text-primary hover:text-primary/80">$1</a>')
        .replace(/---/g, '<hr class="border-gray-200 my-3"/>');
};

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}