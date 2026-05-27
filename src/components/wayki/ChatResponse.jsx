import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { parseMarkdown } from '@/utils/wayki';
import ToolsChat from './ToolsChat';
import FeedbackBar from './FeedbackBar';
/* src/components/wayki/ChatResponse.jsx */
const typesTools = {
    "hotels-data": "",
    "adventure-data": "",
    "guides-data": "",
    "transport-data": "",
    "events-data": "",
}
const typesText = {
    "status": "Estado del bot ej: Consultando agenda de Eventos...",
    "start": "Da inicio al chat de Wayki",
    "text-start": "Da inicio al texto de respuesta",
    "text-delta": "Texto de respuesta por delta, caracteres por caracteres",
    "text-end": "Termina el texto de respuesta",
}
const typesArt = {
    "search-data": "Buscar articulos relacionado",
    "articles-data": "Busca articulo de localidad especifica",
    "destinations-data": "Articulos de destinos en itinerario por localidad",
    "products-data": "Productos turisticos en localidad especifica",
    "list-search-data": "Listado de items con datos simplificados para mostrar en cards",
}

export default function ChatResponse({ messages, response, setChatCacheResp, isLoading, userId }) {
    const [chat, setChat] = useState([]);
    
    const handleChat = useCallback((data) => {
        if (data.role === 'user') {
            setChat((prev) => [...prev, data]);
            return;
        }

        if (data.role === 'assistant') {
            // Mensaje inicial de bienvenida (no es type:'response')
            if (data.type !== 'response') {
                setChat((prev) => [...prev, data]);
                setChatCacheResp((prev) => [...prev, data]);
                return;
            }

            data.content.forEach((msj) => {
                switch (msj?.type || '') {
                    case 'text-delta':
                        const handleChatDelta = (prev) => {
                            const last = prev[prev.length - 1];
                            if (last?.type === 'text-delta') {
                                // ✅ Crea nuevo array + nuevo objeto (sin mutar)
                                return [
                                    ...prev.slice(0, -1),
                                    { ...last, content: last.content + msj.delta },
                                ];
                            }
                            return [...prev, { role: 'assistant', content: msj.delta, type: 'text-delta' }];
                        }
                        setChatCacheResp((prev) => handleChatDelta(prev));
                        setChat((prev) => handleChatDelta(prev));
                        break;
                    case 'status':
                        setChat((prev) => [...prev, { role: 'assistant', type: 'status', data: msj.data }]);
                        break;

                    case 'events-data':
                    case 'articles-data':
                    case 'destinations-data':
                    case 'products-data':
                    case 'search-data':
                    case 'hotels-data':
                    case 'adventure-data':
                    case 'guides-data':
                    case 'transport-data':
                    case 'list-search-data':
                        setChat((prev) => [...prev, { role: 'assistant', type: msj.type, data: msj.data }]);
                        break;

                    // Delimitadores: ignorar
                    case 'start':
                    case 'finish':
                    case 'start-step':
                    case 'finish-step':
                    case 'text-start':
                    case 'text-end':
                        break;

                    default:
                        console.debug('[Wayki] tipo no manejado:', msj?.type, msj);
                }
            });
        }
    }, []);
    useEffect(() => {
        if (response) {
            /* console.log("response -------------");
            console.log(response); */
            handleChat(response);
        }
    }, [response])
    useEffect(() => {
        if (messages) {
            /* console.log("messages"); */
            handleChat(messages);
        }
    }, [messages])

    // Calcula el último prompt del usuario y el último texto del asistente
    // para asociarlos al feedback que se mande.
    const { lastPrompt, lastRespuesta, hasAssistantTurn } = useMemo(() => {
        let lastPrompt = null;
        let lastRespuesta = null;
        let hasAssistantTurn = false;

        // Recorrer hacia atrás buscando el último texto del asistente (text-delta o welcome)
        for (let i = chat.length - 1; i >= 0; i--) {
            const m = chat[i];
            if (m.role === 'assistant') {
                if (!lastRespuesta && (m.type === 'text-delta' || m.type === 'welcome')) {
                    lastRespuesta = typeof m.content === 'string' ? m.content : '';
                    hasAssistantTurn = true;
                }
            } else if (m.role === 'user') {
                if (!lastPrompt) lastPrompt = m.content;
                if (lastRespuesta) break;
            }
        }
        return { lastPrompt, lastRespuesta, hasAssistantTurn };
    }, [chat]);

    // El feedback se muestra solo cuando el stream terminó, hay un turno del
    // asistente con texto, y el último mensaje del chat es del asistente.
    const showFeedback =
        !isLoading &&
        hasAssistantTurn &&
        chat.length > 0 &&
        chat[chat.length - 1]?.role === 'assistant' &&
        // Evita mostrar feedback sobre el welcome inicial sin que haya habido pregunta
        !!lastPrompt;

    return (
        <div className='flex flex-col gap-3'>
            {chat.map((msg, i) => {
                const isLast = i === chat.length - 1;
                return (
                    msg.role === 'user' ? (
                        <div
                            key={i}
                            className={`flex gap-3 items-end flex-row-reverse`}
                            style={{ animation: 'fadeInUp 0.25s ease' }}
                        >
                            <div
                                className={`relative max-w-[82%] px-4 py-2 shadow-sm text-lg leading-relaxed bg-primary text-white rounded-3xl rounded-br-lg`}
                            >
                                <p className="text-lg">{msg.content}</p>
                            </div>
                        </div>
                    )
                        :
                        (
                            <ToolsChat key={i} response={msg} isLast={isLast} />
                        )
                )
            })
            }

            {showFeedback && (
                <FeedbackBar
                    key={`fb-${chat.length}`}
                    userId={userId}
                    prompt={lastPrompt}
                    respuesta={lastRespuesta}
                />
            )}
        </div>

    )
}
