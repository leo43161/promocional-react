import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import { useRouter } from 'next/router';

export default function Entumesa() {
    const router = useRouter();
    const { lang } = router.query;

    const content = {
        es: {
            slides: [
                {
                    id: 1,
                    img: "https://www.tucumanturismo.gob.ar/public/img/Banners/milanesa.jpg",
                    description: "No te pierdás la famosa Milanesa Tucumana",
                },
                {
                    id: 2,
                    img: "https://www.tucumanturismo.gob.ar/public/img/Banners/empanadas.jpg",
                    description: "Disfrutá de la Empanada más rica del país",
                },
                {
                    id: 3,
                    img: "https://www.tucumanturismo.gob.ar/public/img/Banners/locro.jpg",
                    description: "Deleitate con gastronomía única",
                }
            ],
            buttonText: "Conoce más aquí",
            buttonLink: "/subsecciones/lista/37/tradicion-regional"
        },
        en: {
            slides: [
                {
                    id: 1,
                    img: "https://www.tucumanturismo.gob.ar/public/img/Banners/milanesa.jpg",
                    description: "Don't miss the famous Tucuman Milanesa",
                },
                {
                    id: 2,
                    img: "https://www.tucumanturismo.gob.ar/public/img/Banners/empanadas.jpg",
                    description: "Enjoy the tastiest Empanada in the country",
                },
                {
                    id: 3,
                    img: "https://www.tucumanturismo.gob.ar/public/img/Banners/locro.jpg",
                    description: "Delight yourself with unique gastronomy",
                }
            ],
            buttonText: "Learn more here",
            buttonLink: "/subsecciones/lista/79/regional-tradition?lang=EN"
        }
    };
    
    const isEnglish = lang === 'EN';
    const currentContent = isEnglish ? content.en : content.es;
    const slides = currentContent.slides;
    const buttonUrl = process.env.URL_LOCAL + currentContent.buttonLink;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible(false); // Fade out

            // Wait for transition to complete before changing content
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
                setIsVisible(true); // Fade in
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const currentItem = slides[currentIndex];

    return (
        <div
            className='md:h-[58vh] xl:h-[48vh] bg-cover bg-fixed transition-all duration-300 ease-in bg-center'
            style={{ backgroundImage: `url(${currentItem.img})` }}
        >
            <div className='w-full flex h-full flex-col md:flex-row py-5 gap-5 md:gap-0'>
                <div className='flex-1 flex items-center justify-center md:justify-end h-full order-2 md:order-1'>
                    <div className='md:w-9/12 w-11/12 md:ms-auto md:pe-10 flex justify-end md:items-end items-center flex-col'>
                        <h1 className='md:text-[2.9rem] text-4xl font-bold italic md:text-right text-center text-white text-shadow-lg/30 md:mb-4 mb-7 md:text-[1.1em]/12'>
                            {currentItem.description}
                        </h1>
                        <a className='md:w-4/10 cursor-pointer' href={buttonUrl}>
                            <Button size='sm' className='shadow-lg md:w-full rounded-md cursor-pointer'>
                                {currentContent.buttonText}
                            </Button>
                        </a>
                    </div>
                </div>
                <div className='flex-1 h-full flex items-center justify-center order-1 md:order-2'>
                    <div className='w-9/12'>
                        <img src={process.env.URL_IMG_LOCAL + "/svg/main/entumesa.svg"} className='h-auto w-full drop-shadow-xl' alt="En tu mesa" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// import React, { useState, useEffect } from 'react';
// import Button from '../common/Button';

// export default function Entumesa() {
//     const [entumesa, setEntumesa] = useState([
//         {
//             id: 1,
//             img: "https://www.tucumanturismo.gob.ar/public/img/Banners/milanesa.jpg",
//             description: "No te pierdás la famosa Milanesa Tucumana",
//             url:"https://www.tucumanturismo.gob.ar/public/img/Banners/milanesa.jpg"
//         },
//         {
//             id: 2,
//             img: "https://www.tucumanturismo.gob.ar/public/img/Banners/empanadas.jpg",
//             description: "Disfrutá de la Empanada más rica del país",
//             url:"https://www.tucumanturismo.gob.ar/public/img/Banners/empanadas.jpg"
//         },
//         {
//             id: 3,
//             img: "https://www.tucumanturismo.gob.ar/public/img/Banners/locro.jpg",
//             description: "Deleitate con gastronomía única",
//             url:"https://www.tucumanturismo.gob.ar/public/img/Banners/locro.jpg"
//         }
//     ]);

//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [isVisible, setIsVisible] = useState(true);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             // Fade out
//             setIsVisible(false);

//             // Wait for transition to complete before changing content
//             setTimeout(() => {
//                 setCurrentIndex((prevIndex) => (prevIndex + 1) % entumesa.length);
//                 // Fade in
//                 setIsVisible(true);
//             }, 300);
//         }, 5000);

//         return () => clearInterval(interval);
//     }, [entumesa.length]);

//     const currentItem = entumesa[currentIndex];

//     return (
//         <div
//             className='md:h-[58vh] xl:h-[48vh] bg-cover bg-fixed transition-all duration-300 ease-in bg-center'
//             style={{ backgroundImage: `url(${currentItem.img})` }}
//         >
//             <div className='w-full flex h-full flex-col md:flex-row py-5 gap-5 md:gap-0'>
//                 <div className='flex-1 flex items-center justify-center md:justify-end h-full order-2 md:order-1'>
//                     <div
//                         className='md:w-9/12 w-11/12 md:ms-auto md:pe-10 flex justify-end md:items-end items-center flex-col'
//                     >
//                         <h1 className='md:text-[2.9rem] text-4xl font-bold italic md:text-right text-center text-white text-shadow-lg/30 md:mb-4 mb-7 md:text-[1.1em]/12' style={{ transition: 'opacity 0.3s ease-in' }}>
//                             {currentItem.description}
//                         </h1>
//                         <a className='md:w-4/10 cursor-pointer' href={process.env.URL_LOCAL_SERVER + process.env.URL_LOCAL + "/subsecciones/lista/37/tradicion-regional"}>
//                             <Button size='sm' className='shadow-lg md:w-full rounded-md cursor-pointer'>
//                                 Conoce mas aquí
//                             </Button>
//                         </a>
//                     </div>
//                 </div>
//                 <div className='flex-1 h-full flex items-center justify-center order-1 md:order-2'>
//                     <div
//                         className='w-9/12'
//                     >
//                         <img src={process.env.URL_IMG_LOCAL + "/svg/main/entumesa.svg"} className='h-auto w-full drop-shadow-xl' alt="" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }