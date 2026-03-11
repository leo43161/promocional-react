import React, { useCallback, useEffect, useState } from 'react'
import { parseMarkdown } from '@/utils/wayki';
import ToolsChat from './ToolsChat';

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
}

export default function ChatResponse({ messages, response }) {
    const [chat, setChat] = useState([]);
    const [chatDebug, setChatDebug] = useState([]);
    const [typeTools, setTypeTools] = useState({
        "hotels-data": [],
        "adventure-data": [],
        "guides-data": [],
        "transport-data": [],
        "events-data": [],
        "articles-data": [],
        "destinations-data": [],
        "products-data": [],
        "search-data": [],
    })
    const handleChat = useCallback((data) => {
        if (data.role === 'user') {
            setChat((prev) => [...prev, data]);
            return;
        }

        if (data.role === 'assistant') {
            // Mensaje inicial de bienvenida (no es type:'response')
            if (data.type !== 'response') {
                setChat((prev) => [...prev, data]);
                return;
            }

            data.content.forEach((msj) => {
                switch (msj?.type || '') {

                    case 'text-delta':
                        setChat((prev) => {
                            const last = prev[prev.length - 1];
                            if (last?.type === 'text-delta') {
                                // ✅ Crea nuevo array + nuevo objeto (sin mutar)
                                return [
                                    ...prev.slice(0, -1),
                                    { ...last, content: last.content + msj.delta },
                                ];
                            }
                            return [...prev, { role: 'assistant', content: msj.delta, type: 'text-delta' }];
                        });
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

    /* console.log("chatDebug");
    console.log(chatDebug); */
    return (
        <div className='flex flex-col gap-3'>
            {chat.map((msg, i) => (
                msg.role === 'user' ? (
                    <div
                        key={i}
                        className={`flex gap-3 items-end flex-row-reverse`}
                        style={{ animation: 'fadeInUp 0.25s ease' }}
                    >
                        <div
                            className={`relative max-w-[82%] px-5 py-3.5 shadow-sm text-lg leading-relaxed bg-primary text-white rounded-3xl rounded-br-lg`}
                        >
                            <p className="text-lg">{msg.content}</p>
                        </div>
                    </div>
                )
                    :
                    (
                        <ToolsChat key={i} response={msg} />
                    )
            ))
            }
        </div>

    )
}
