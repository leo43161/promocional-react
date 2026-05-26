import { parseMarkdown } from '@/utils/wayki';
import React from 'react';
import {
    Calendar, Clock, MapPin, Tag, Sparkles, Loader2,
    Utensils, Map, Package, BookOpen, Search,
    User, Phone, Mail, Globe, Mountain, Bus, ArrowRight, ArrowLeft,
    Hotel, Star, Wifi, Car, Coffee, Waves, Tv, Wind, ChefHat, Trees, Baby
} from 'lucide-react';
import { generateSlug } from '@/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
/* src/components/wayki/ToolsChat.jsx */
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
const IMG_BASE = process.env.URL_IMG || '';
const imgUrl = (filename) => (filename ? `${IMG_BASE}${filename}` : null);

// ============================================================
// SUB-COMPONENTES DE TARJETAS
// ============================================================

/** Burbuja de texto principal (welcome / text-delta) */
function BubbleText({ content }) {
    return (
        <div className="flex gap-3 items-end flex-row" style={{ animation: 'fadeInUp 0.25s ease' }}>
            <div className="relative max-w-[99%] md:max-w-[88%] px-4 py-3 shadow-sm bg-white text-gray-800 rounded-3xl rounded-bl-lg border border-gray-100">
                <div className="text-[13px] md:text-[12px] text-gray-700 leading-relaxed
                        [&>p:not(:last-child)]:mb-3
                        [&_strong]:font-bold [&_strong]:text-secondary
                        [&_a]:font-medium [&_a]:text-primary hover:[&_a]:underline [&_a]:transition-colors
                        [&>ul]:mb-3 [&>ol]:mb-3 
                        [&_ul]:list-disc [&_ul]:ml-5 [&_ul_li]:mb-1.5 [&_li_p_strong]:text-[18px] [&_li_p]:text-[18px] [&_ul_li]:text-[18px] md:[&_li_ul]:text-[17px] [&_ul_li]:pl-0.5 marker:[&_ul]:text-gray-400
                        [&_ol]:list-none [&_ol]:ml-0 [&_ol_li]:mb-1.5 [&_ol_li]:pl-0.5 [&_ol_li]:text-[18px] marker:[&_ol]:text-gray-500 marker:font-semibold
                        [&_h3]:text-lg [&_h3]:font-bold [&_h3]:underline [&_h3]:text-gray-800 [&_h3]:mb-2 [&_h3]:mt-4"
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Interceptamos la etiqueta <img> generada por Markdown
                            img: ({ node, ...props }) => {
                                return (
                                    <img
                                        {...props}
                                        src={imgUrl(props.src)}
                                        alt={props.alt || 'Imagen de Tucumán'}
                                        className="rounded-xl mt-2 mb-3 max-w-full h-auto shadow-sm object-cover"
                                        loading="lazy"
                                    />
                                );
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

/** Indicador de estado (status) */
function StatusBadge({ data, isLast }) {
    if (!isLast) return null;
    return (
        <div className="flex items-center gap-2 px-3 py-0 my-1 w-fit" style={{ animation: 'fadeInUp 0.2s ease' }}>
            {/* {isLoading &&  <Loader2 className="w-3.5 h-3.5 text-secondary animate-spin shrink-0" />} */}
            <span className="text-sm text-gray-400 italic">{data}</span>
        </div>
    );
}

/** Tarjeta de evento individual */
function EventCard({ event }) {
    const fecha = fmtDate(event.fechaInicio);
    const hora = fmtTime(event.horaInicio);
    const img = imgUrl(event.imagen);
    const url = "https://www.tucumanturismo.gob.ar/eventos/evento?id=" + event.id;
    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col min-w-50 max-w-55 shrink-0 snap-start h-full">
                {img ? (
                    <div className="h-28 bg-stone-100 overflow-hidden">
                        <img src={img} alt={event.nombre} className="w-full h-full object-cover" onError={(e) => { e.target.parentElement.style.display = 'none'; }} />
                    </div>
                ) : (
                    <div className="h-16 bg-linear-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-secondary/40" />
                    </div>
                )}
                <div className="p-3 flex flex-col gap-1 flex-1">
                    <p className="text-[15px] font-bold text-gray-800 leading-snug line-clamp-2">{event.nombre}</p>
                    {event.descripcion && (
                        <p className="text-[10px] text-gray-600 leading-relaxed line-clamp-2">{event.descripcion}</p>
                    )}
                    <div className="mt-auto pt-1.5 flex flex-col gap-1">
                        {fecha && (
                            <div className="flex items-center gap-1 text-[11px] text-secondary font-semibold">
                                <Calendar className="w-3 h-3 shrink-0" />
                                <span>{fecha}{hora ? ` · ${hora}` : ''}</span>
                            </div>
                        )}
                        {(event.nombreLocalidad || event.direccion) && (
                            <div className="flex items-center gap-1 text-[11px] text-gray-700 font-semibold">
                                <MapPin className="w-3 h-3 shrink-0" />
                                <span className="truncate">{event.direccion || event.nombreLocalidad}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </a>
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
    const url = "https://www.tucumanturismo.gob.ar/articulos/articulo/" + item.idArticulo + "/" + generateSlug(item.nombre) || "";
    return (
        <a href={url} target="_blank" rel="noopener noreferrer">
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col min-w-45 max-w-50 shrink-0 snap-start h-full">
                {img ? (
                    <div className="h-24 bg-stone-100 overflow-hidden">
                        <img src={img} alt={item.nombre} className="w-full h-full object-cover" onError={(e) => { e.target.parentElement.style.display = 'none'; }} />
                    </div>
                ) : (
                    <div className="h-14 bg-linear-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
                        <Map className="w-5 h-5 text-secondary/30" />
                    </div>
                )}
                <div className="py-2 px-2.5 flex flex-col gap-1 flex-1">
                    <p className="md:text-[16px]/5 font-bold text-xl text-gray-800 line-clamp-2">{item.nombre}</p>
                    {item.copete && (
                        <p className="text-[12px] text-gray-600 line-clamp-3">{item.copete}</p>
                    )}
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-auto pt-1">
                            {tags.map((tag, i) => (
                                <span key={i} className="md:text-[9px] text-sm bg-secondary/8 text-secondary px-1.5 py-0.5 rounded-full border border-secondary/15 font-medium line-clamp-1">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </a>
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
    console.log(guide);
    const color = guideColor(guide.tipo_registro);
    const lang = langBadge(guide.tipo_registro);
    const zonas = guide.zona_operacion
        ? guide.zona_operacion.split(',').map(z => z.trim()).filter(Boolean).slice(0, 4)
        : [];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-3.5 flex flex-col gap-2 min-w-55 max-w-60 shrink-0 snap-start">
            {/* Avatar + nombre */}
            <div className="flex items-start gap-2.5">
                <div className="w-9 h-9 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-semibold text-gray-800 leading-snug line-clamp-2 lowercase" style={{ textTransform: 'capitalize' }}>
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
                <div className="flex items-center gap-1 text-[12px] text-gray-700 font-semibold">
                    <MapPin className="size-4 shrink-0 text-secondary" />
                    <span>{guide.localidad_nombre}</span>
                </div>
            )}

            {/* Zonas */}
            {zonas.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {zonas.map((z, i) => (
                        <span key={i} className="text-[11px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-full">
                            {z}
                        </span>
                    ))}
                    {guide.zona_operacion?.split(',').length > 4 && (
                        <span className="text-[11px] text-gray-400 px-1">+{guide.zona_operacion.split(',').length - 4} más</span>
                    )}
                </div>
            )}

            {/* Contacto */}
            {guide.telefonos && (
                <a
                    href={`tel:${guide.telefonos.split(',')[0].trim()}`}
                    className="mt-auto flex items-center gap-1 text-[12px] text-primary font-semibold hover:underline"
                >
                    <Phone className="size-4 shrink-0" />
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
    'Safari Fotográfico': '📸',
};

/** Tarjeta de aventura individual */
function AdventureCard({ item }) {
    // Priorizamos nombres_actividades si existe, fallback al original
    const actividadesRaw = item.nombres_actividades || item.actividades_texto_original || '';
    const actividades = actividadesRaw.split(',').map(a => a.trim()).filter(Boolean);

    // OJO: Esta lógica sigue siendo frágil si el nombre contiene guiones medios.
    const titleParts = item.titulo?.split(' - ') || [];
    const titulo = titleParts[0] || item.titulo;
    const codigo = titleParts.length > 1 ? titleParts[titleParts.length - 1] : null;

    // Limpiamos teléfono por si vienen varios separados por coma o barra
    const telefono = item.telefono_final?.split(/[,/]/)[0].trim();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-3.5 flex flex-col gap-2 min-w-55 max-w-60 shrink-0 snap-start h-auto">

            {/* Header: Ícono, Título y Código */}
            <div className="flex gap-2.5 items-start">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mountain className="w-4.5 h-4.5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2">{titulo}</p>
                    {codigo && <p className="text-[9px] text-gray-400 mt-0.5">{codigo}</p>}
                </div>
            </div>

            {/* Metadatos: Responsable y Localidad */}
            <div className="flex flex-col gap-1 mt-1">
                {item.responsable && (
                    <p className="text-[11px] text-gray-500 line-clamp-1 border-b border-gray-50 pb-1">
                        Resp: <span className="font-medium text-gray-700">{item.responsable}</span>
                    </p>
                )}
                {item.localidad_nombre && (
                    <div className="flex items-center gap-1 text-[12px] text-gray-600 font-medium mt-0.5">
                        <MapPin className="w-3 h-3 shrink-0 text-primary" />
                        <span className="truncate">{item.localidad_nombre}</span>
                    </div>
                )}
            </div>

            {/* Actividades */}
            {actividades.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                    {actividades.map((act, i) => (
                        <span key={i} className="text-[11px] bg-primary/8 text-primary px-1.5 py-0.5 rounded-full border border-primary/15 font-semibold whitespace-nowrap">
                            {ACT_ICONS[act] || '🏔️'} {act}
                        </span>
                    ))}
                </div>
            )}

            {/* Footer de Acciones (CTA) */}
            {(telefono || item.instagram || item.web) && (
                <div className="mt-auto pt-3 border-t border-gray-100 flex flex-wrap gap-x-3 gap-y-1.5 items-center">
                    {telefono && (
                        <a href={`tel:${telefono.replace(/\s/g, '')}`} className="flex items-center gap-1 text-[10px] text-primary font-bold hover:underline">
                            <Phone className="w-3 h-3 shrink-0" />
                            <span>Llamar</span>
                        </a>
                    )}
                    {item.instagram && item.instagram !== 'null' && (
                        <a href={item.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-pink-500 font-bold hover:underline">
                            <span>Instagram</span>
                        </a>
                    )}
                    {item.web && item.web !== 'null' && (
                        <a href={item.web} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-secondary font-bold hover:underline">
                            <Globe className="w-3 h-3 shrink-0" />
                            <span>Web</span>
                        </a>
                    )}
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
                    <p className="text-base font-bold text-white truncate">{item.Empresa}</p>
                </div>
                <span className="text-[11px] bg-white/20 text-white px-2 py-0.5 rounded-full shrink-0">{item.dia}</span>
            </div>

            <div className="p-3.5 flex flex-col gap-3">
                {/* Destino + precio */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[15px] font-semibold text-gray-700">
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
                            <span key={i} className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded-md font-mono font-semibold">
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
                            <span key={i} className="text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded-md font-mono font-semibold">
                                {h}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Plataforma + tel */}
                <div className="flex flex-col gap-1 pt-1 border-t border-gray-100">
                    {item.Plataforma && (
                        <div className="flex flex-col items-start gap-0.5">
                            <p className="text-[11px] text-gray-600 items-center font-normal">
                                Donde tomarlo:
                            </p>
                            <div className="flex items-center gap-0.5">
                                <MapPin className="h-full w-auto shrink-0" />
                                <p className="text-[11px] text-gray-700 flex flex-col items-center font-semibold gap-1">
                                    {item.Plataforma}
                                </p>
                            </div>
                        </div>
                    )}
                    {/* {item.telefono && (
                        <a href={`tel:${item.telefono}`} className="text-[9px] text-primary font-medium flex items-center gap-1 hover:underline">
                            <Phone className="w-2.5 h-2.5 shrink-0" />{item.telefono}
                        </a>
                    )} */}
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

// ============================================================
// HOTELES
// ============================================================

/** Mapa de íconos para servicios del hotel */
const SERVICE_ICONS = {
    'Wi-Fi': { icon: Wifi, label: 'Wi-Fi' },
    'Estacionamiento al aire libre': { icon: Car, label: 'Estacionamiento' },
    'Cochera': { icon: Car, label: 'Cochera' },
    'Desayuno': { icon: Coffee, label: 'Desayuno' },
    'Piscina': { icon: Waves, label: 'Piscina' },
    'TV en habitaciones': { icon: Tv, label: 'TV' },
    'Aire acondicionado en habitaciones': { icon: Wind, label: 'Aire acond.' },
    'Calefacción en habitaciones': { icon: Wind, label: 'Calefacción' },
    'Quincho con parrilla': { icon: ChefHat, label: 'Parrilla' },
    'Juegos para niños': { icon: Baby, label: 'Área niños' },
    'Equipamiento de cocina': { icon: ChefHat, label: 'Cocina' },
};

/** Renderiza estrellas según cantidad */
function StarRating({ count }) {
    const n = parseInt(count) || 0;
    if (!n) return null;
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: n }).map((_, i) => (
                <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            ))}
        </div>
    );
}

/** Parsea servicios del hotel y devuelve los primeros N */
function parseServicios(str, max = 4) {
    if (!str) return [];
    return str.split(',').map(s => s.trim()).filter(Boolean).slice(0, max);
}

/** Formatea hora de check-in/out: "14:00:00" → "14:00" */
function fmtCheckTime(str) {
    if (!str || str === '00:00:00') return null;
    return str.slice(0, 5);
}

/**
 * Tarjeta individual de hotel.
 * Datos clave: imagen, nombre, categoría, estrellas, localidad,
 * check-in/out, servicios, contacto (tel, email, web, redes).
 */
function HotelCard({ hotel }) {
    console.log(hotel);
    console.log("imgUrl(hotel.portada):", imgUrl(hotel.portada));
    const img = "https://www.tucumanturismo.gob.ar/public/img/alojamientos/" + hotel.logo;
    const checkin = fmtCheckTime(hotel.checkin);
    const checkout = fmtCheckTime(hotel.checkout);
    const servicios = parseServicios(hotel.servicios, 4);
    const totalServicios = hotel.servicios ? hotel.servicios.split(',').length : 0;
    const extra = totalServicios - 4;

    // Primer teléfono disponible
    const telefono = hotel.telefono_final
        ? hotel.telefono_final.split(/[,/]/)[0].trim()
        : null;

    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col min-w-58 max-w-64 shrink-0 snap-start">

            {/* ── Imagen de portada ── */}
            {img ? (
                <div className="h-32 bg-stone-100 overflow-hidden relative">
                    <img
                        src={img}
                        alt={hotel.nombre}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.parentElement.style.display = 'none'; }}
                    />
                    {/* Badge categoría sobre la imagen */}
                    <span className="absolute top-2 left-2 text-[10px] bg-secondary text-white px-2 py-0.5 rounded-full font-semibold shadow-sm">
                        {hotel.categoria}
                    </span>
                </div>
            ) : (
                <div className="h-20 bg-linear-to-br from-secondary/10 to-primary/10 flex items-center justify-center relative">
                    <Hotel className="w-7 h-7 text-secondary/30" />
                    <span className="absolute top-2 left-2 text-[10px] bg-secondary text-white px-2 py-0.5 rounded-full font-semibold">
                        {hotel.categoria}
                    </span>
                </div>
            )}

            <div className="p-3 flex flex-col gap-1.5 flex-1">

                {/* ── Nombre + estrellas ── */}
                <div className="flex gap-1.5">
                    <p className="text-base font-bold text-gray-800 leading-snug line-clamp-2">{hotel.nombre}</p>
                    <StarRating count={hotel.estrellas} />
                </div>

                {/* ── Localidad + domicilio ── */}
                <div className="flex items-start gap-1 text-[11px] font-semibold text-gray-700">
                    <MapPin className="w-3 h-3 shrink-0 text-secondary mt-0.5" />
                    <span className="line-clamp-1">
                        {hotel.domicilio
                            ? `${hotel.domicilio}${hotel.localidad ? `, ${hotel.localidad}` : ''}`
                            : hotel.localidad}
                    </span>
                </div>

                {/* ── Check-in / Check-out ── */}
                {(checkin || checkout) && (
                    <div className="flex items-center gap-3 bg-stone-50 rounded-xl px-2.5 py-1.5 border border-gray-100">
                        {checkin && (
                            <div className="flex items-center gap-1 text-[11px] text-gray-600">
                                <ArrowRight className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                                <span className="font-medium text-emerald-700">{checkin}</span>
                                <span className="text-gray-400">in</span>
                            </div>
                        )}
                        {checkin && checkout && <span className="text-gray-200">|</span>}
                        {checkout && (
                            <div className="flex items-center gap-1 text-[11px] text-gray-600">
                                <ArrowLeft className="w-2.5 h-2.5 text-red-400 shrink-0" />
                                <span className="font-medium text-red-500">{checkout}</span>
                                <span className="text-gray-400">out</span>
                            </div>
                        )}
                    </div>
                )}

                {/* ── Servicios destacados ── */}
                {servicios.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {servicios.map((srv, i) => {
                            const meta = SERVICE_ICONS[srv];
                            const Icon = meta?.icon;
                            return (
                                <span
                                    key={i}
                                    className="flex items-center gap-1 text-[11px] bg-secondary/8 text-secondary px-1.5 py-0.5 rounded-full border border-secondary/15 font-semibold"
                                    title={srv}
                                >
                                    {Icon && <Icon className="w-2.5 h-2.5 shrink-0" />}
                                    {meta?.label || srv}
                                </span>
                            );
                        })}
                        {extra > 0 && (
                            <span className="text-[11px] text-gray-400 px-1 self-center">+{extra} más</span>
                        )}
                    </div>
                )}

                {/* ── Descripción ── */}
                {hotel.descripcion && (
                    <p className="text-[12px] text-gray-700 leading-relaxed line-clamp-2">{hotel.descripcion}</p>
                )}

                {/* ── Contacto ── */}
                <div className="mt-auto pt-2 border-t border-gray-100 flex flex-col gap-1.5">
                    {telefono && (
                        <a
                            href={`tel:${telefono.replace(/\s/g, '')}`}
                            className="flex items-center gap-1.5 text-[11px]  text-primary font-semibold hover:underline"
                        >
                            <Phone className="w-3 h-3 shrink-0" />
                            <span className="truncate">{telefono}</span>
                        </a>
                    )}
                    {hotel.email && (
                        <a
                            href={`mailto:${hotel.email.trim()}`}
                            className="flex items-center gap-1.5 text-[10px] text-gray-500 hover:text-secondary hover:underline transition-colors font-semibold"
                        >
                            <Mail className="w-3 h-3 shrink-0" />
                            <span className="truncate">{hotel.email.trim()}</span>
                        </a>
                    )}
                    {hotel.web && (
                        <a
                            href={hotel.web}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-[10px] text-secondary font-semibold hover:underline"
                        >
                            <Globe className="w-3 h-3 shrink-0" />
                            <span className="truncate">{hotel.web.replace(/^https?:\/\//, '')}</span>
                        </a>
                    )}

                    {/* Redes sociales */}
                    {(hotel.instagram || hotel.facebook) && (
                        <div className="flex items-center gap-1.5 pt-0.5">
                            {hotel.instagram && hotel.instagram !== 'null' && (
                                <a
                                    href={hotel.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] bg-pink-500 hover:underline font-semibold text-zinc-50 px-2 rounded-full"
                                >
                                    Instagram
                                </a>
                            )}
                            {hotel.facebook && hotel.facebook !== 'null' && (
                                <a
                                    href={hotel.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] bg-blue-500 hover:underline font-semibold text-zinc-50 px-2 rounded-full"
                                >
                                    Facebook
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/** Lista de hoteles (hotels-data) */
function HotelsList({ data }) {
    const items = data?.results || data?.resultados || [];
    if (!items.length) return null;
    return (
        <AssistantShell icon={<Hotel className="w-3.5 h-3.5" />} label="Alojamientos">
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-200">
                {items.map((h) => <HotelCard key={h.id} hotel={h} />)}
            </div>
        </AssistantShell>
    );
}

/** Wrapper: burbuja asistente con ícono + label opcional */
function AssistantShell({ children, icon, label }) {
    return (
        <div className="flex gap-2 items-start flex-row w-full max-w-[98%] md:max-w-[88%]" style={{ animation: 'fadeInUp 0.25s ease' }}>
            <div className="shrink-0 mt-1 md:block hidden">
                <div className="w-7 h-7 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    {icon}
                </div>
            </div>
            <div className="flex-1 min-w-0 bg-white rounded-3xl rounded-tl-sm px-4 py-2 shadow-sm border border-gray-100">
                {label && (
                    <p className="text-[12px] font-semibold text-secondary/70 uppercase tracking-wider mb-2">{label}</p>
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
function ToolsChat({ response, isLast }) {
    if (!response) return null;
    const { type, content, data } = response;
    switch (type) {
        // ── Texto ──────────────────────────────────────────
        case 'welcome':
        case 'text-delta':
            console.log('Content:', content);
            return <BubbleText content={content} />;

        // ── Estado ────────────────────────────────────────
        case 'status':
            return <StatusBadge data={data || content} isLast={isLast} />;

        // ── Tools / datos ─────────────────────────────────
        case 'hotels-data':
            return <HotelsList data={data || content} />;

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

export default React.memo(ToolsChat);