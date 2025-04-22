import { Clock, MapPin } from 'lucide-react'
import React from 'react'
import Button from '../common/Button'

export default function CardEventoHome() {
    return (
        <div className='w-full'>
            <div className='flex flex-col'>
                <div className='relative border h-62'>
                    <img
                        src={process.env.URL_IMG + "BALLET-SAN-PETERSBURGO-webtms-1536x1218_zfm15lt6_07-04-2025.jpg"}
                        className='object-cover object-bottom h-full w-full'
                        alt=""
                    />
                    <div className='rounded-b-md absolute top-0 left-8 shadow-lg bg-white w-32 py-1 px-1 flex justify-center'>
                        <h4 className='font-bold text-sm'>22 ABR - 22 ABR</h4>
                    </div>
                </div>
                <div className='flex-col flex gap-5 mb-6 pt-1'>
                    <h3 className='font-bold text-left text-lg'>Carmen por el Ballet clásico de San Petersburgo</h3>
                    <div className='flex items-center gap-2'>
                        <div>
                            <Clock className='font-bold text-lg' size={17} />
                        </div>
                        <span>21:00 hs.</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div>
                            <MapPin className='font-bold text-lg' size={17} />
                        </div>
                        <span className='text-sm'>Hilton Garden Inn - Miguel Lillo 365 - San Miguel de Tucumán</span>
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
