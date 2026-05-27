// src/components/wayki/FeedbackBar.jsx
import React, { useState, useCallback } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Check, X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Barra de feedback que se muestra debajo del último mensaje del asistente.
 *
 * Props:
 *  - userId:    id de sesión (obligatorio para enviar)
 *  - prompt:    texto que mandó el usuario (snapshot)
 *  - respuesta: texto de la respuesta del bot (snapshot)
 *  - idMensaje: (opcional) id del mensaje en la tabla ia_mensaje
 */
export default function FeedbackBar({ userId, prompt, respuesta, idMensaje = null }) {
    const [selected, setSelected] = useState(null);   // 'like' | 'dislike' | null
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);

    const [openComment, setOpenComment] = useState(false);
    const [comentario, setComentario] = useState('');

    const submit = useCallback(async (tipo, comentarioFinal = null) => {
        if (!userId) {
            setError('No hay sesión activa');
            return;
        }
        setSending(true);
        setError(null);
        try {
            const body = {
                modo: 'upsert',
                id_ia_mensaje: idMensaje,
                user_id: userId,
                prompt,
                respuesta,
                tipo_feedback: tipo,
                comentario: comentarioFinal,
            };
            const res = await fetch(`${process.env.URL_SERVER}ia_mensaje_feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            setSent(true);
            setSelected(tipo);
            setOpenComment(false);
        } catch (e) {
            console.error('[Wayki] Error enviando feedback:', e);
            setError('No se pudo enviar el feedback');
        } finally {
            setSending(false);
        }
    }, [userId, prompt, respuesta, idMensaje]);

    const handleLike = () => submit('like', null);
    const handleDislike = () => {
        // Dislike abre el panel de comentario para pedir más detalle
        setSelected('dislike');
        setOpenComment(true);
    };

    const handleSendComment = () => {
        const tipo = selected || 'like';
        submit(tipo, comentario.trim() || null);
    };

    return (
        <div className="mt-1 ml-0 flex flex-col gap-2 max-w-[88%]">
            {/* Botones principales */}
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={handleLike}
                    disabled={sending || (sent && selected === 'like')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[12px] font-semibold transition-all
                        ${selected === 'like'
                            ? 'bg-emerald-500 text-white border-emerald-500'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-400 hover:text-emerald-600'}
                        disabled:opacity-60 disabled:cursor-not-allowed`}
                    aria-label="Me gustó la respuesta"
                >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Útil</span>
                </button>

                <button
                    type="button"
                    onClick={handleDislike}
                    disabled={sending || (sent && selected === 'dislike')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-[12px] font-semibold transition-all
                        ${selected === 'dislike'
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-red-400 hover:text-red-600'}
                        disabled:opacity-60 disabled:cursor-not-allowed`}
                    aria-label="No me sirvió la respuesta"
                >
                    <ThumbsDown className="w-3.5 h-3.5" />
                    <span>No útil</span>
                </button>

                <button
                    type="button"
                    onClick={() => setOpenComment((v) => !v)}
                    disabled={sending}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full border text-[12px] font-semibold transition-all
                        bg-white text-gray-600 border-gray-200 hover:border-secondary hover:text-secondary
                        disabled:opacity-60"
                    aria-label="Dejar un comentario"
                >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Comentar</span>
                </button>

                {sent && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                        <Check className="w-3.5 h-3.5" />
                        Gracias por tu feedback
                    </span>
                )}
                {sending && <Loader2 className="w-3.5 h-3.5 text-secondary animate-spin" />}
                {error && <span className="text-[11px] text-red-500">{error}</span>}
            </div>

            {/* Panel de comentario */}
            <AnimatePresence>
                {openComment && (
                    <motion.div
                        key="feedback-comment"
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        transition={{ duration: 0.18 }}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 flex flex-col gap-2 overflow-hidden"
                    >
                        <p className="text-[12px] text-gray-500">
                            ¿Querés contarnos por qué? <span className="text-gray-400">(opcional)</span>
                        </p>
                        <textarea
                            rows={3}
                            value={comentario}
                            onChange={(e) => setComentario(e.target.value)}
                            placeholder="Tu comentario nos ayuda a mejorar..."
                            className="w-full text-[13px] text-gray-700 placeholder-gray-400 bg-stone-50 rounded-xl px-3 py-2 border border-gray-200 focus:border-secondary focus:outline-none resize-none"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => { setOpenComment(false); setComentario(''); }}
                                className="flex items-center gap-1 px-3 py-1.5 text-[12px] font-semibold text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleSendComment}
                                disabled={sending}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-secondary text-white hover:bg-secondary/90 transition-colors disabled:opacity-60"
                            >
                                {sending
                                    ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    : <Send className="w-3.5 h-3.5" />}
                                Enviar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
