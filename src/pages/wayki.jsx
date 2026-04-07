// src/pages/wayki.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Send, ArrowLeft, Sparkles } from 'lucide-react';
import { ReactTextStream } from 'react-text-stream';
import { decodeDataWayki, parseMarkdown } from '@/utils/wayki';
import ChatResponse from '@/components/wayki/ChatResponse';
/* src/pages/wayki.jsx */
// ============================================
// CONFIGURACIÓN DE LA API
// ============================================
const API_BASE = process.env.NEXT_PUBLIC_WAYKI_API || 'http://10.0.15.36:3000/api';
const IMG_BASE = process.env.URL_IMG_LOCAL + "/images/wayki/" || 'https://www.tucumanturismo.gob.ar/images/wayki/';
// Sugerencias rápidas
const SUGERENCIAS = [
    "¿Que eventos hay en el cadillal?",
    "Contame sobre que atractivos turísticos puedo encontrar en el Mollar",
    "Qué visitar en Tafí del Valle",
    "Eventos este fin de semana",
    "Historia de la Casa Histórica",
];
const SUGERENCIASNEW = [
    {
        esLabel: "¿Que eventos hay en el cadillal?",
        enLabel: "What events are there in Cadillal?",
        enValue: "Events en cadillal",
        esValue: "Eventos en el Cadillal"
    },
    {
        esLabel: "Contame sobre que atractivos turísticos puedo encontrar en el Mollar",
        enLabel: "Tell me about the tourist attractions I can find in Mollar",
        enValue: "Mollar",
        esValue: "El Mollar"
    },
    {
        esLabel: "Qué visitar en Tafí del Valle",
        enLabel: "What to visit in Tafí del Valle",
        enValue: "What to visit in Tafí del Valle",
        esValue: "Qué visitar en Tafí del Valle"
    },
    {
        esLabel: "Que hoteles pet friendly hay en san miguel de tucuman",
        enLabel: "Pet-friendly hotels in San Miguel de Tucumán",
        enValue: "Hotels pet friendly",
        esValue: "Hoteles PetFriendly"
    },
    {
        esLabel: "Historia de la Casa Histórica",
        enLabel: "History of the Historical House",
        enValue: "History of the Historical House",
        esValue: "Historia de la Casa Histórica"
    }
];

// Convierte markdown básico a HTML seguro


// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function WaykiChat() {
    const router = useRouter();
    const { q } = router.query;

    const [messages, setMessages] = useState(
        {
            role: 'assistant',
            content: '¡Hola! Soy **Wayki**, el tapir que guía tu viaje por Tucumán 🌿\n\nPuedo ayudarte con información sobre **destinos turísticos**, gastronomía, eventos, alojamientos y todo lo que necesitás saber para descubrir el **Jardín de la República**.\n\n¿Qué querés explorar hoy?',
            type: "welcome"
        },
    );
    const [input, setInput] = useState('');
    const [response, setResponse] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [tokenLoading, setTokenLoading] = useState(true);
    const [chatCacheResp, setChatCacheResp] = useState([]);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const initialQuerySentRef = useRef(false);

    // ============================================
    // SCROLL AUTOMÁTICO
    // ============================================
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // ============================================
    // OBTENER TOKEN JWT
    // ============================================
    useEffect(() => {
        const getToken = async () => {
            setTokenLoading(true);
            try {
                const res = await fetch(`${API_BASE}/auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: 'dev_tester' }),
                });
                if (!res.ok) throw new Error(`Auth error: ${res.status}`);
                const data = await res.json();
                const tok =
                    data.token ||
                    data.access_token ||
                    data.jwt ||
                    data?.data?.token ||
                    data?.data?.access_token;
                setAuthToken(tok || null);
            } catch (e) {
                console.error('[Wayki] Error de autenticación:', e);
                setAuthToken(null);
            } finally {
                setTokenLoading(false);
            }
        };
        getToken();
    }, []);

    // ============================================
    // ENVIAR MENSAJE
    // ============================================
    const sendMessage = useCallback(
        async (text) => {
            const trimmed = text?.trim();
            if (!trimmed || isLoading) return;

            setMessages({ role: 'user', content: trimmed });
            const sendContext = [...chatCacheResp, { role: 'user', content: trimmed }];
            setResponse({});
            setInput('');
            setIsLoading(true);

            let currentToken = authToken;

            try {
                // Re-autenticar si no hay token
                if (!currentToken) {
                    const authRes = await fetch(`${API_BASE}/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username: 'dev_tester' }),
                    });
                    const authData = await authRes.json();
                    currentToken =
                        authData.token ||
                        authData.access_token ||
                        authData.jwt ||
                        authData?.data?.token;
                    setAuthToken(currentToken);
                }
                console.log('PASO 1: Enviar al modelo Wayki');
                /* console.log(JSON.stringify(chatCacheResp)); */
                console.log(JSON.stringify(sendContext));
                // PASO 1: Enviar al modelo Wayki
                const waykiRes = await fetch(`${API_BASE}/wayki`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${currentToken}`,
                    },
                    body: JSON.stringify({
                        messages: sendContext,
                    }),

                });

                if (!waykiRes.ok) {
                    if (waykiRes.status === 401 || waykiRes.status === 403) setAuthToken(null);
                    throw new Error(`Error Wayki ${waykiRes.status}`);
                }
                /* const waykiJson = await waykiRes.json();
                console.log(waykiJson); */
                const waykiRawText = waykiRes.body.getReader();
                const textDecoder = new TextDecoder('utf-8');
                let streamBuffer = "";
                while (true) {
                    const { done, value } = await waykiRawText.read();
                    if (done) break;

                    const chunk = textDecoder.decode(value, { stream: true }); // stream:true para multibyte
                    const { events, buffer } = decodeDataWayki(chunk, streamBuffer);
                    streamBuffer = buffer; // ← guardar remanente para el próximo ciclo

                    if (events.length > 0) {
                        setResponse({ role: 'assistant', content: events, type: 'response' });
                    }
                }
            } catch (err) {
                console.error('[Wayki] Error enviando mensaje:', err);
                setMessages({
                    role: 'assistant',
                    content: 'Ups, tuve un inconveniente 🌿 Probá de nuevo en un momento.',
                });
            } finally {
                setIsLoading(false);
                inputRef.current?.focus();
            }
        },
        [authToken, isLoading]
    );

    // Enviar la consulta inicial desde la URL
    useEffect(() => {
        if (q && !tokenLoading && !initialQuerySentRef.current) {
            initialQuerySentRef.current = true;
            sendMessage(q);
        }
    }, [q, tokenLoading, sendMessage]);

    const handleSubmit = () => {
        if (input.trim() && !isLoading) sendMessage(input);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };
    const isFirstMessage = chatCacheResp.length === 1 && !isLoading;

    return (
        <>
            <Head>
                <title>Wayki - Tu Guía Turístico de Tucumán</title>
                <meta
                    name="description"
                    content="Chateá con Wayki, el tapir guía turístico virtual de Tucumán. Preguntá sobre destinos, gastronomía, eventos y más."
                />
            </Head>

            <div
                className="relative flex flex-col bg-back/60 overflow-hidden"
                style={{ minHeight: 'calc(100vh - 80px)' }}
            >
                <div className='absolute w-full h-full object-cover z-10 opacity-40 object-center top-0 left-0'
                    style={{
                        backgroundImage: `url(${process.env.URL_LOCAL_SERVER + "/images/header/textura-tucuman.png"})`,
                        backgroundAttachment: 'fixed',
                    }}
                 /* src={process.env.URL_LOCAL_SERVER + "/images/header/textura-tucuman.png"} alt="" */ />
                {/* <img className='absolute w-full md:h-auto z-10 object-center md:top-35 max-[360px]:-bottom-30 -bottom-43 md:bottom-auto left-0 h-full drop-shadow-2xl' src={process.env.URL_LOCAL_SERVER + "/images/header/montana.png"} alt="" /> */}
                <div className="sticky top-0 z-20 bg-secondary text-white shadow-lg">
                    <div className="max-w-3xl mx-auto px-4 py-3 flex items-center md:gap-4 gap-1">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-xl hover:bg-white/10 transition-colors shrink-0"
                            aria-label="Volver"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        {/* Avatar + Info */}
                        <div className="flex items-center md:gap-3 gap-2 flex-1">
                            {/* <div className="relative shrink-0">
                                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={`${process.env.URL_LOCAL_SERVER || ''}${process.env.URL_LOCAL || ''}/images/main/wayki.png`}
                                        alt="Wayki el tapir"
                                        className={`w-10 h-10 object-contain drop-shadow-md ${isLoading ? 'animate-bounce' : ''}`}
                                    />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-secondary animate-pulse" />
                            </div> */}
                            <div className="min-w-0">
                                <h1 className="text-lg font-bold leading-tight">Wayki</h1>
                                <p className="text-xs text-white/70 truncate">
                                    {isLoading ? 'Escribiendo...' : tokenLoading ? 'Conectando...' : 'Guía turístico virtual · Tucumán'}
                                </p>
                            </div>
                        </div>

                        {/* <div className="shrink-0">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div> */}
                    </div>
                </div>

                {/* ==============================
            ÁREA DE MENSAJES
        ============================== */}
                <div className="flex-1 relative z-10 overflow-y-auto pb-36">
                    <div className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-5">
                        <ChatResponse messages={messages} response={response} setChatCacheResp={setChatCacheResp} />
                        {/* Indicador de escritura */}
                        {isLoading && (
                            <div className="flex gap-3 items-end" style={{ animation: 'fadeInUp 0.2s ease' }}>
                                {/* <div className="shrink-0 mb-1">
                                    <div className="w-9 h-9 rounded-full bg-secondary/10 flex items-center justify-center shadow-sm border border-secondary/20">
                                        <img
                                            src={`${process.env.URL_LOCAL_SERVER || ''}${process.env.URL_LOCAL || ''}/images/main/wayki.png`}
                                            alt="Wayki"
                                            className="w-7 h-7 object-contain animate-bounce"
                                        />
                                    </div>
                                </div> */}
                                <div className="bg-white rounded-3xl rounded-bl-lg px-5 py-4 shadow-sm border border-gray-100 flex gap-2 items-center">
                                    <span className="w-2.5 h-2.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2.5 h-2.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '180ms' }} />
                                    <span className="w-2.5 h-2.5 bg-secondary/60 rounded-full animate-bounce" style={{ animationDelay: '360ms' }} />
                                </div>
                            </div>
                        )}

                        {/* Sugerencias al inicio */}
                        {isFirstMessage && (
                            <div className="mt-4">
                                <p className="text-xl text-secondary mb-2 font-bold px-1">Podés preguntarme sobre...</p>
                                <div className="flex flex-wrap gap-2">
                                    {SUGERENCIAS.map((s, i) => {
                                        /* const { esLabel, esValue } = SUGERENCIASNEW[i]; */
                                        return (
                                            <button
                                                key={i}
                                                onClick={() => sendMessage(s)}
                                                className="text-sm bg-white border border-secondary/30 text-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                                            >
                                                {s}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* ==============================
            INPUT FIJO EN EL FONDO
        ============================== */}
                <div className="fixed bottom-0 left-0 right-0 z-20">
                    <div className='size-50 absolute -top-35 left-40' >
                        <div>
                            <img
                                src={"images/wayki/explorando.png"}
                                className='object-cover h-full w-full object-center'
                                alt=""
                            />
                        </div>
                    </div>
                    <div className='bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]'>
                        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-3 items-center">
                            <div className="flex-1 relative bg-stone-50 rounded-2xl border border-gray-200 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(242,101,34,0.12)] transition-all duration-200">
                                <textarea
                                    ref={inputRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Preguntale algo a Wayki..."
                                    rows={1}
                                    disabled={isLoading || tokenLoading}
                                    className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-base px-2.5 py-2 focus:outline-none resize-none leading-relaxed"
                                    style={{ maxHeight: '120px', minHeight: '52px' }}
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                /* disabled={!input.trim() || isLoading || tokenLoading} */
                                className="bg-primary hover:bg-primary/85 disabled:bg-gray-200 disabled:cursor-not-allowed text-white p-3.5 rounded-2xl transition-all duration-200 shrink-0 shadow-md hover:shadow-lg active:scale-95"
                                aria-label="Enviar mensaje"
                            >
                                <Send className="size-5" />
                            </button>
                        </div>
                        <p className="text-center md:text-xs text-gray-400 pb-2 text-[10px]">
                            Potenciado por Inteligencia Artificial · Los resultados pueden variar
                        </p>
                    </div>
                </div>

            </div>

            {/* Animación CSS */}
            <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </>
    );
}

WaykiChat.getLayout = function getLayout(page) {
    return page;
};