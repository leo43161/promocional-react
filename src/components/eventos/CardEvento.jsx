import { Clock, MapPin } from 'lucide-react'
import React from 'react'
import Button from '../common/Button'

export default function CardEvento({ evento, isLoading = false }) {
    function formatearFecha(fechaStr) {
        const [año, mes, día] = fechaStr.split('-').map(Number);
        const fecha = new Date(año, mes - 1, día); // ¡Mes va de 0 a 11!
        const dia = fecha.getDate(); // día sin cero a la izquierda
        const mesAbrev = fecha.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
        return `${dia} ${mesAbrev}`;
    }
    if (isLoading) {
        return (
            <div className="border rounded-lg shadow-md p-4 w-full animate-pulse">
                <div className="flex justify-center mb-4">
                    <div className="w-full h-48 bg-gray-200"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-2/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-4/5"></div>
            </div>
        );
    }
    return (
        <div className='w-full h-full'>
            <div className='flex flex-col h-full justify-between'>
                <div className='flex flex-col flex-1'>
                    <div className='relative h-78'>
                        <img
                            src={process.env.URL_IMG + evento.imagen}
                            className='object-cover h-full w-full object-center'
                            alt=""
                        />
                        <div className='rounded-b-md absolute top-0 left-8 shadow-lg bg-white py-1 px-1 flex justify-center'>
                            <h4 className='font-bold text-[1.1em]'>{formatearFecha(evento.fechaInicio)} - {formatearFecha(evento.fechaFin)}</h4>
                        </div>
                    </div>
                    <div className='flex-col flex gap-5 mb-6 pt-1 justify-between flex-1'>
                        <h3 className='font-bold text-left text-2xl'>{evento.nombre}</h3>
                        <div className='flex items-center gap-2'>
                            <div>
                                <Clock className='font-bold text-lg' size={17} />
                            </div>
                            <span>{evento.horaInicio.slice(0, 5)}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <div>
                                <MapPin className='font-bold text-lg' size={17} />
                            </div>
                            <span className='text-[1.1em]'>{evento.direccion}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <Button className='shadow-lg' size='sm'>
                        Conocé más aqui
                    </Button>
                </div>
            </div>
        </div>
    )
}
