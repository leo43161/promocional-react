import React, { useState, useEffect } from 'react';
import Button from '../common/Button';

export default function Entumesa() {
    const [entumesa, setEntumesa] = useState([
        {
            id: 1,
            img: "https://www.tucumanturismo.gob.ar/public/img/Banners/milanesa.jpg",
            description: "No te pierdás la famosa Milanesa Tucumana"
        },
        {
            id: 2,
            img: "https://www.tucumanturismo.gob.ar/public/img/Banners/empanadas.jpg",
            description: "Disfrutá de la Empanada más rica del país"
        },
        {
            id: 3,
            img: "https://www.tucumanturismo.gob.ar/public/img/Banners/locro.jpg",
            description: "Deleitate con gastronomía única"
        }
    ]);
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    
    useEffect(() => {
        const interval = setInterval(() => {
            // Fade out
            setIsVisible(false);
            
            // Wait for transition to complete before changing content
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % entumesa.length);
                // Fade in
                setIsVisible(true);
            }, 300);
        }, 5000);
        
        return () => clearInterval(interval);
    }, [entumesa.length]);
    
    const currentItem = entumesa[currentIndex];
    
    return (
        <div 
            className='md:h-[58vh] bg-cover bg-fixed transition-all duration-300 ease-in bg-center' 
            style={{ backgroundImage: `url(${currentItem.img})` }}
        >
            <div className='w-full flex h-full flex-col md:flex-row py-5 gap-5 md:gap-0'>
                <div className='flex-1 flex items-center justify-center md:justify-end h-full order-2 md:order-1'>
                    <div 
                        className='md:w-9/12 w-11/12 md:ms-auto md:pe-10 flex justify-end md:items-end items-center flex-col'
                    >
                        <h1 className='md:text-[2.5rem] text-3xl font-semibold italic md:text-right text-center text-white text-shadow-lg/30 md:mb-4 mb-7 md:text-sm/12' style={{ transition: 'opacity 0.3s ease-in' }}>
                            {currentItem.description}
                        </h1>
                        <Button size='sm' className='shadow-lg md:w-4/10 rounded-md'>
                            Conoce mas aquí
                        </Button>
                    </div>
                </div>
                <div className='flex-1 h-full flex items-center justify-center order-1 md:order-2'>
                    <div 
                        className='w-9/12'
                    >
                        <img src="svg/main/entumesa.svg" className='h-auto w-full drop-shadow-xl' alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}