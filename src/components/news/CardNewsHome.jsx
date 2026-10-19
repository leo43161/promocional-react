import React from 'react';
import Button from '@/components/common/Button';

export default function CardNewsHome({ id, titulo, extracto, imagen, fecha, enlace }) {
    
    // CORRECCIÓN DE LA URL DE LA IMAGEN:
    // Si la imagen viene como ruta relativa, le anteponemos el dominio local de XAMPP (o el servidor de producción)
    const obtenerUrlImagen = (pathImg) => {
        if (!pathImg) return 'https://www.institucionalturismotuc.gob.ar/public/img/noticias/default.jpg';
        if (pathImg.startsWith('http://') || pathImg.startsWith('https://')) {
            return pathImg; // Si ya viene completa, la dejamos tal cual
        }
        // Si es relativa, la unimos a tu servidor local de XAMPP
        // (Ajusta '/institucional/' si la carpeta en tu htdocs se llama diferente)
        return `http://127.0.0.1/institucional/public/img/${pathImg.startsWith('/') ? pathImg.slice(1) : pathImg}`;
    };

    const formatearFecha = (fechaStr) => {
        if (!fechaStr) return '';
        try {
            const dateObj = new Date(fechaStr);
            if (isNaN(dateObj.getTime())) return fechaStr;
            return dateObj.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short'
            }).toUpperCase();
        } catch (e) {
            return fechaStr;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between h-full hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            {/* Imagen con altura fija y control de ruta */}
            <div className="relative w-full h-48 overflow-hidden bg-gray-200">
                <img 
                    src={obtenerUrlImagen(imagen)} 
                    alt={titulo || 'Noticia'} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://www.institucionalturismotuc.gob.ar/images/noticias/default.jpg';
                    }}
                />
                
                {fecha && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded shadow-md uppercase">
                        {formatearFecha(fecha)}
                    </div>
                )}
            </div>

            {/* Contenido */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-bold text-gray-800 text-lg leading-snug mb-2 line-clamp-2">
                        {titulo}
                    </h3>
                    
                    {extracto && (
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                            {extracto}
                        </p>
                    )}
                </div>

                {/* Botón reutilizable del sistema que apunta a la URL de la noticia */}
<div className="pt-2">
    <a 
        href={enlace || `#`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full block"
    >
        <Button variant="primary" size="sm" fullWidth={true} className="shadow-sm">
            Conocé más aquí
        </Button>
    </a>
</div>
            </div>
        </div>
    );
}