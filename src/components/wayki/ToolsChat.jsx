import { parseMarkdown } from '@/utils/wayki';
import React from 'react';
import {
    Calendar, Clock, MapPin, Tag, Sparkles, Loader2,
    Utensils, Map, Package, BookOpen, Search,
    User, Phone, Mail, Globe, Mountain, Bus, ArrowRight, ArrowLeft
} from 'lucide-react';

// ============================================================
// HELPERS
// ============================================================

/** Formatea "2026-03-12" → "12 mar 2026" */
const fmtDate = (str) => {
    if (!str) return null;
    const d = new Date(str + 'T00:00:00');
    return d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
};

/** Formatea "00:00:00" → null si es medianoche, si no "10:00" */
const fmtTime = (str) => {
    if (!str || str === '00:00:00') return null;
    return str.slice(0, 5);
};

/** Slug de imagen para el CDN — ajustá IMG_BASE a tu servidor */
const IMG_BASE = process.env.NEXT_PUBLIC_IMG_BASE || '';
const imgUrl = (filename) => (filename ? `${IMG_BASE}${filename}` : null);

// ============================================================
// SUB-COMPONENTES DE TARJETAS
// ============================================================

/** Burbuja de texto principal (welcome / text-delta) */
function BubbleText({ content }) {
    return (
        <div className="flex gap-3 items-end flex-row" style={{ animation: 'fadeInUp 0.25s ease' }}>
            <div className="relative max-w-[92%] md:max-w-[82%] px-3 py-2 shadow-sm leading-relaxed bg-white text-gray-800 rounded-3xl rounded-bl-lg border border-gray-100">
                <div
                    className="[&_strong]:text-secondary [&_a]:text-primary [&_a:hover]:underline [&_p]:mb-2 text-sm md:text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: `<span class="mb-2">${parseMarkdown(content)}</span>` }}
                />
            </div>
        </div>
    );
}

/** Indicador de estado (status) */
function StatusBadge({ data }) {
    return (
        <div className="flex items-center gap-2 px-3 py-0 my-1 w-fit" style={{ animation: 'fadeInUp 0.2s ease' }}>
            <Loader2 className="w-3.5 h-3.5 text-secondary animate-spin shrink-0" />
            <span className="text-xs text-gray-400 italic">{data}</span>
        </div>
    );
}

/** Tarjeta de evento individual */
function EventCard({ event }) {
    const fecha = fmtDate(event.fechaInicio);
    const hora = fmtTime(event.horaInicio);
    const img = imgUrl(event.imagen);

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col min-w-50 max-w-55 shrink-0 snap-start">
            {img ? (
                <div className="h-28 bg-stone-100 overflow-hidden">
                    <img src={img} alt={event.nombre} className="w-full h-full object-cover" onError={(e) => { e.target.parentElement.style.display = 'none'; }} />
                </div>
            ) : (
                <div className="h-16 bg-linear-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-secondary/40" />
                </div>
            )}
            <div className="p-3 flex flex-col gap-1.5 flex-1">
                <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">{event.nombre}</p>
                {event.descripcion && (
                    <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-2">{event.descripcion}</p>
                )}
                <div className="mt-auto pt-1.5 flex flex-col gap-1">
                    {fecha && (
                        <div className="flex items-center gap-1 text-[10px] text-secondary font-medium">
                            <Calendar className="w-3 h-3 shrink-0" />
                            <span>{fecha}{hora ? ` · ${hora}` : ''}</span>
                        </div>
                    )}
                    {(event.nombreLocalidad || event.direccion) && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-400">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span className="truncate">{event.direccion || event.nombreLocalidad}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/** Sección de eventos (events-data) */
function EventsList({ data }) {
    const items = data?.resultados || [];
    if (!items.length) return null;
    return (
        <AssistantShell icon={<Calendar className="w-3.5 h-3.5" />} label="Eventos">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-200">
                {items.map((ev) => <EventCard key={ev.id} event={ev} />)}
            </div>
        </AssistantShell>
    );
}

/** Tarjeta de destino / artículo / producto */
function ContentCard({ item, accentColor = 'secondary' }) {
    const img = imgUrl(item.imagen || item.imagenMovil);
    const tags = item.tags ? item.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 3) : [];

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col min-w-45 max-w-50 shrink-0 snap-start">
            {img ? (
                <div className="h-24 bg-stone-100 overflow-hidden">
                    <img src={img} alt={item.nombre} className="w-full h-full object-cover" onError={(e) => { e.target.parentElement.style.display = 'none'; }} />
                </div>
            ) : (
                <div className="h-14 bg-linear-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
                    <Map className="w-5 h-5 text-secondary/30" />
                </div>
            )}
            <div className="p-3 flex flex-col gap-1.5 flex-1">
                <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">{item.nombre}</p>
                {item.copete && (
                    <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-3">{item.copete}</p>
                )}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto pt-1">
                        {tags.map((tag, i) => (
                            <span key={i} className="text-[9px] bg-secondary/8 text-secondary px-1.5 py-0.5 rounded-full border border-secondary/15 font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

/** Artículo de localidad (articles-data) */
function ArticlesList({ data }) {
    const items = data?.resultados || [];
    if (!items.length) return null;
    return (
        <AssistantShell icon={<BookOpen className="w-3.5 h-3.5" />} label="Sobre el destino">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {items.map((it) => <ContentCard key={it.idArticulo} item={it} />)}
            </div>
        </AssistantShell>
    );
}

/** Destinos turísticos (destinations-data) */
function DestinationsList({ data }) {
    const items = data?.resultados || [];
    if (!items.length) return null;
    return (
        <AssistantShell icon={<Map className="w-3.5 h-3.5" />} label="Qué visitar">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {items.map((it) => <ContentCard key={it.idArticulo} item={it} />)}
            </div>
        </AssistantShell>
    );
}

/** Productos turísticos (products-data) */
function ProductsList({ data }) {
    const items = data?.resultados || [];
    if (!items.length) return null;
    return (
        <AssistantShell icon={<Package className="w-3.5 h-3.5" />} label="Experiencias">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {items.map((it) => <ContentCard key={it.idArticulo} item={it} />)}
            </div>
        </AssistantShell>
    );
}

/** Resultados de búsqueda (search-data) */
function SearchList({ data }) {
    const items = data?.resultados || [];
    if (!items.length) return null;
    return (
        <AssistantShell icon={<Search className="w-3.5 h-3.5" />} label="Resultados relacionados">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {items.map((it) => <ContentCard key={it.idArticulo || it.id} item={it} />)}
            </div>
        </AssistantShell>
    );
}


// ── Badge de tipo de guía ───────────────────────────────────────
const GUIDE_COLORS = {
    'PROFESIONAL': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'IDONEO': 'bg-blue-50 text-blue-700 border-blue-200',
    'BILINGÜE': 'bg-violet-50 text-violet-700 border-violet-200',
    'BILINGUE': 'bg-violet-50 text-violet-700 border-violet-200',
};
function guideColor(tipo = '') {
    const up = tipo.toUpperCase();
    if (up.includes('BILINGÜE') || up.includes('BILINGUE')) return GUIDE_COLORS['BILINGÜE'];
    if (up.includes('PROFESIONAL')) return GUIDE_COLORS['PROFESIONAL'];
    return GUIDE_COLORS['IDONEO'];
}
function langBadge(tipo = '') {
    const m = tipo.match(/\(([^)]+)\)/);
    return m ? m[1] : null;
}

/** Tarjeta de guía individual */
function GuideCard({ guide }) {
    const color = guideColor(guide.tipo_registro);
    const lang = langBadge(guide.tipo_registro);
    const zonas = guide.zona_operacion
        ? guide.zona_operacion.split(',').map(z => z.trim()).filter(Boolean).slice(0, 4)
        : [];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-3.5 flex flex-col gap-2 min-w-55 max-w-60 shrink-0 snap-start">
            {/* Avatar + nombre */}
            <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 lowercase" style={{ textTransform: 'capitalize' }}>
                        {guide.nombre.toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}
                    </p>
                    <p className="text-[9px] text-gray-400 mt-0.5">{guide.numero_registro?.trim()}</p>
                </div>
            </div>

            {/* Tipo + idioma */}
            <div className="flex flex-wrap gap-1">
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium ${color}`}>
                    {guide.tipo_registro?.replace(/GUIA PROVINCIAL/i, '').trim().split('(')[0].trim()}
                </span>
                {lang && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full border bg-amber-50 text-amber-700 border-amber-200 font-medium">
                        🌐 {lang}
                    </span>
                )}
            </div>

            {/* Localidad */}
            {guide.localidad_nombre && (
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <MapPin className="w-3 h-3 shrink-0 text-secondary" />
                    <span>{guide.localidad_nombre}</span>
                </div>
            )}

            {/* Zonas */}
            {zonas.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {zonas.map((z, i) => (
                        <span key={i} className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-full">
                            {z}
                        </span>
                    ))}
                    {guide.zona_operacion?.split(',').length > 4 && (
                        <span className="text-[9px] text-gray-400 px-1">+{guide.zona_operacion.split(',').length - 4} más</span>
                    )}
                </div>
            )}

            {/* Contacto */}
            {guide.telefonos && (
                <a
                    href={`tel:${guide.telefonos.split(',')[0].trim()}`}
                    className="mt-auto flex items-center gap-1.5 text-[10px] text-primary font-medium hover:underline"
                >
                    <Phone className="w-3 h-3 shrink-0" />
                    <span className="truncate">{guide.telefonos.split(',')[0].trim()}</span>
                </a>
            )}
        </div>
    );
}

/** Guías (guides-data) */
function GuidesList({ data }) {
    const items = data?.resultados || [];
    if (!items.length) return null;
    return (
        <AssistantShell icon={<User className="w-3.5 h-3.5" />} label="Guías disponibles">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {items.map((g) => <GuideCard key={g.id} guide={g} />)}
            </div>
        </AssistantShell>
    );
}

// ── Actividad badge ────────────────────────────────────────────
const ACT_ICONS = {
    'Trekking': '🥾',
    'Kayak': '🛶',
    'Escalada en roca': '🧗',
    'Alta Montaña': '⛰️',
    'Mountain Bike': '🚵',
    'Avistaje de Aves': '🦅',
};

/** Tarjeta de aventura individual */
function AdventureCard({ item }) {
    const actividades = item.actividades_texto_original
        ? item.actividades_texto_original.split(',').map(a => a.trim()).filter(Boolean)
        : [];
    // Limpiar título: quitar código al final
    const titulo = item.titulo?.split(' - ')[0] || item.titulo;
    const codigo = item.titulo?.split(' - ')[1] || null;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-3.5 flex flex-col gap-2 min-w-50 max-w-55 shrink-0 snap-start">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mountain className="w-4.5 h-4.5 text-primary" />
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2">{titulo}</p>
                {codigo && <p className="text-[9px] text-gray-400 mt-0.5">{codigo}</p>}
            </div>
            {item.localidad_nombre && (
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <MapPin className="w-3 h-3 shrink-0 text-primary" />
                    <span>{item.localidad_nombre}</span>
                </div>
            )}
            {actividades.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-auto">
                    {actividades.map((act, i) => (
                        <span key={i} className="text-[9px] bg-primary/8 text-primary px-1.5 py-0.5 rounded-full border border-primary/15 font-medium">
                            {ACT_ICONS[act] || '🏔️'} {act}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

/** Aventura (adventure-data) */
function AdventureList({ data }) {
    const items = data?.resultados || [];
    if (!items.length) return null;
    return (
        <AssistantShell icon={<Mountain className="w-3.5 h-3.5" />} label="Turismo de aventura">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {items.map((it) => <AdventureCard key={it.id} item={it} />)}
            </div>
        </AssistantShell>
    );
}

/** Parsea "06:00,10:00,12:00" → ["06:00", "10:00", "12:00"] */
const parseHorarios = (str) => str ? str.split(',').map(h => h.trim()).filter(Boolean) : [];

/** Tarjeta de transporte */
function TransportCard({ item }) {
    const ida = parseHorarios(item.ida);
    const vuelta = parseHorarios(item.vuelta);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden min-w-65 max-w-75 shrink-0 snap-start">
            {/* Header empresa */}
            <div className="bg-secondary px-4 py-2.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Bus className="w-4 h-4 text-white shrink-0" />
                    <p className="text-xs font-bold text-white truncate">{item.Empresa}</p>
                </div>
                <span className="text-[9px] bg-white/20 text-white px-2 py-0.5 rounded-full shrink-0">{item.dia}</span>
            </div>

            <div className="p-3.5 flex flex-col gap-3">
                {/* Destino + precio */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-700">
                        <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                        <span>{item.nombre_localidad}</span>
                    </div>
                    {item.Precio && (
                        <span className="text-[10px] font-bold text-primary bg-primary/8 px-2 py-0.5 rounded-full border border-primary/15">
                            {item.Precio}
                        </span>
                    )}
                </div>

                {/* Horarios ida */}
                <div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <ArrowRight className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="text-[9px] font-semibold text-emerald-700 uppercase tracking-wide">Ida</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {ida.map((h, i) => (
                            <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-md font-mono font-medium">
                                {h}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Horarios vuelta */}
                <div>
                    <div className="flex items-center gap-1 mb-1.5">
                        <ArrowLeft className="w-3 h-3 text-blue-600 shrink-0" />
                        <span className="text-[9px] font-semibold text-blue-700 uppercase tracking-wide">Vuelta</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {vuelta.map((h, i) => (
                            <span key={i} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-md font-mono font-medium">
                                {h}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Plataforma + tel */}
                <div className="flex flex-col gap-1 pt-1 border-t border-gray-100">
                    {item.Plataforma && (
                        <p className="text-[9px] text-gray-500 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 shrink-0" />{item.Plataforma}
                        </p>
                    )}
                    {item.telefono && (
                        <a href={`tel:${item.telefono}`} className="text-[9px] text-primary font-medium flex items-center gap-1 hover:underline">
                            <Phone className="w-2.5 h-2.5 shrink-0" />{item.telefono}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/** Transporte (transport-data) */
function TransportList({ data }) {
    const items = data?.resultados || [];
    if (!items.length) return null;
    return (
        <AssistantShell icon={<Bus className="w-3.5 h-3.5" />} label="Cómo llegar">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                {items.map((it) => <TransportCard key={it.Idtiene} item={it} />)}
            </div>
        </AssistantShell>
    );
}

/** Wrapper: burbuja asistente con ícono + label opcional */
function AssistantShell({ children, icon, label }) {
    return (
        <div className="flex gap-2 items-start flex-row w-full max-w-[92%]" style={{ animation: 'fadeInUp 0.25s ease' }}>
            <div className="shrink-0 mt-1">
                <div className="w-7 h-7 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    {icon}
                </div>
            </div>
            <div className="flex-1 min-w-0 bg-white rounded-3xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                {label && (
                    <p className="text-[10px] font-semibold text-secondary/70 uppercase tracking-wider mb-2">{label}</p>
                )}
                {children}
            </div>
        </div>
    );
}

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================

/**
 * Renderiza cualquier tipo de mensaje del stream de Wayki.
 *
 * Tipos manejados:
 *   welcome, text-delta         → BubbleText
 *   status                      → StatusBadge
 *   events-data                 → EventsList (cards horizontales)
 *   articles-data               → ArticlesList
 *   destinations-data           → DestinationsList
 *   products-data               → ProductsList
 *   search-data                 → SearchList
 *
 * Props:
 *   response: { role, type, content?, data? }
 */
export default function ToolsChat({ response }) {
    if (!response) return null;

    const { type, content, data } = response;

    switch (type) {
        // ── Texto ──────────────────────────────────────────
        case 'welcome':
        case 'text-delta':
            return <BubbleText content={content} />;

        // ── Estado ────────────────────────────────────────
        case 'status':
            return <StatusBadge data={data || content} />;

        // ── Tools / datos ─────────────────────────────────
        case 'events-data':
            return <EventsList data={data || content} />;

        case 'articles-data':
            return <ArticlesList data={data || content} />;

        case 'destinations-data':
            return <DestinationsList data={data || content} />;

        case 'products-data':
            return <ProductsList data={data || content} />;

        case 'guides-data':
            return <GuidesList data={data || content} />;

        case 'adventure-data':
            return <AdventureList data={data || content} />;

        case 'transport-data':
            return <TransportList data={data || content} />;

        case 'search-data':
            return <SearchList data={data || content} />;

        // ── Delimitadores (ignorar silenciosamente) ────────
        case 'start':
        case 'finish':
        case 'start-step':
        case 'finish-step':
        case 'text-start':
        case 'text-end':
            return null;

        // ── Fallback ──────────────────────────────────────
        default:
            if (content && typeof content === 'string') {
                return <BubbleText content={content} />;
            }
            return null;
    }
}