import Breadcrumb from '@/components/common/Breadcrumb';
import Button from '@/components/common/Button';
import ParallaxContainer from '@/components/common/ParallaxContainer';
// Asegúrate de importar todas las funciones de cookies necesarias
import { getCookie, setCookie, deleteCookie, encriptar, desencriptar } from '@/utils/cookie';
import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react'; // Iconos para feedback visual
import { useGetIdSessionMutation } from '@/redux/services/itinerarioService';

export default function Privacidad() {
    // Estado para saber si la cookie de sesión existe
    const [cookieExists, setCookieExists] = useState(false);
    // Estado para mostrar un mensaje de confirmación al usuario
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [getIdSession] = useGetIdSessionMutation();

    const generateSessionId = async () => {
        const urlFull = window.location.href;
        console.log('Generando ID de sesión...');
        const response = await getIdSession(urlFull).unwrap();
        return response.result[0].id;
    };

    // Función para comprobar el estado de la cookie
    const checkCookieStatus = () => {
        const cookie = getCookie('__cookieSesion');
        if (cookie) {
            const cookieDecrypted = JSON.parse(desencriptar(cookie));
            const { permiso } = cookieDecrypted;
            setCookieExists(permiso);
        } else {
            setCookieExists(!!cookie); // !!convierte el valor en un booleano (true si existe, false si no)
        }
    };

    // useEffect se ejecuta solo en el cliente.
    useEffect(() => {
        checkCookieStatus();
    }, []);

    const handleAcceptCookies = async () => {
        const id_session = await generateSessionId();
        const cookieData = { permiso: true, id: id_session };
        const encryptedValue = encriptar(JSON.stringify(cookieData));
        setCookie('__cookieSesion', encryptedValue, 60); // Guardar por 60 días
        checkCookieStatus(); // Actualizar estado
        setFeedbackMessage('¡Gracias! Has aceptado el uso de cookies.');
    };

    const handleDeclineCookies = () => {
        deleteCookie('__cookieSesion'); // Borrar la cookie
        checkCookieStatus(); // Actualizar estado
        setFeedbackMessage('Has desactivado el seguimiento por cookies.');
    };

    return (
        <div>
            <section>
                <ParallaxContainer
                    speed={0.2}
                    minHeight="h-96 md:h-[58vh] xl:h-[45vh]"
                    className=""
                    imageUrl='https://www.tucumanturismo.gob.ar/public/img/1920x650-Tucuman-Oficinas-Desktop_t4eelyer_02-07-2024.jpg'
                >
                    <div className="container mx-auto h-full text-white flex flex-col justify-end">
                        <div className='w-11/12 mx-auto pt-5'>
                            <h2 className="text-5xl md:text-6xl font-bold mb-6">
                                Política de Privacidad y Cookies
                            </h2>
                        </div>
                    </div>
                </ParallaxContainer>
            </section>
            <div className='w-11/12 mx-auto pt-5'>
                <div className='mb-5'>
                    <Breadcrumb items={
                        [{ label: "Política de Privacidad y Cookies", href: '/privacidad' }]
                    }></Breadcrumb>
                </div>
            </div>
            <div className='w-11/12 mx-auto pt-5'>
                <main tabIndex="2" className="fs-6 text-justify mb-3">
                    {/* El resto de tu texto de política de privacidad va aquí... (lo he omitido por brevedad) */}
                    <h2 className='text-4xl font-bold mb-3'>1. Bienvenido a Nuestra Política de Privacidad</h2>
                    <p className='mb-3'>Para nosotros tu privacidad es importante para nosotros. Queremos que disfrutes al máximo de tu visita a nuestro sitio web de turismo <a href="https://www.tucumanturismo.gob.ar">TucumanTurismo.gob.ar</a>, y para lograrlo, usamos ciertas herramientas que nos ayudan a mejorar tu experiencia. Esta política te explica de manera sencilla cómo manejamos la información relacionada con tu navegación en nuestro sitio.</p>

                    <h2 className='text-4xl font-bold mb-3'>2. Información que Recopilamos</h2>
                    <h3 className='font-semibold text-3xl mb-2'>2.1. Información de Navegación</h3>
                    <p className='mb-3'>En nuestra página, no recopilamos ningún dato personal tuyo, como tu nombre, correo electrónico, o número de teléfono. Lo único que almacenamos es información sobre cómo navegas en nuestro sitio. Esto incluye:</p>
                    <ul className='list-disc list-inside mb-3 text-xl'>
                        <li>Secciones que visitas: para entender qué secciones de nuestra página son más populares.</li>
                        <li>Tiempo de visita: cuánto tiempo pasas en cada sección de nuestro sitio.</li>
                        <li>Enlaces en los que haces clic: para saber qué te interesa más.</li>
                    </ul>

                    <h3 className='font-semibold text-3xl mb-2'>2.2. Uso de Cookies</h3>
                    <p className='mb-3'>Para recopilar esta información de navegación, utilizamos cookies, que son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas nuestro sitio. Las cookies nos permiten:</p>
                    <ul className='list-disc list-inside mb-3 text-xl'>
                        <li>Recordar tus preferencias: como el idioma en el que prefieres ver la información.</li>
                        <li>Mejorar la funcionalidad del sitio: asegurando que todo funcione de manera fluida.</li>
                        <li>Ofrecer contenido relevante: basado en cómo has navegado en el sitio anteriormente.</li>
                    </ul>
                    <p className='mb-3'>Las cookies que usamos son totalmente seguras y no contienen información personal. Solo las utilizamos para mejorar tu experiencia de usuario.</p>

                    <h2 className='text-4xl font-bold mb-3'>3. ¿Cómo Usamos esta Información?</h2>
                    <p className='mb-3'>La información de navegación que recopilamos nos ayuda a:</p>
                    <ul className='list-disc list-inside mb-3 text-xl'>
                        <li>Optimizar el sitio: entendiendo cómo interactúas con las diferentes partes del sitio, podemos hacer ajustes que mejoren tu experiencia.</li>
                        <li>Personalizar tu visita: recordando tus preferencias, como el idioma o la región de interés, para que no tengas que configurarlas cada vez que vuelves.</li>
                    </ul>
                    <p className='mb-3'>Todo esto lo hacemos para ofrecerte la mejor experiencia posible cuando exploras nuestro contenido turístico.</p>

                    <h2 className='text-4xl font-bold mb-3'>4. Control de las Cookies</h2>
                    <p className='mb-3'>Entendemos que quizás no quieras que se almacenen cookies en tu dispositivo. Si prefieres, puedes desactivar las cookies desde las opciones de configuración de tu navegador o puedes optar por desactivarlas al final de esta página. Sin embargo, ten en cuenta que al hacerlo, algunas funciones de nuestro sitio podrían no funcionar de manera óptima.</p>

                    <h2 className='text-4xl font-bold mb-3'>5. Cambios en Esta Política</h2>
                    <p className='mb-3'>Es posible que actualicemos esta política de vez en cuando para reflejar mejoras en nuestro sitio o cambios en la legislación. Te recomendamos que revises esta política de vez en cuando para estar al tanto de cualquier modificación.</p>

                    <h2 className='text-4xl font-bold mb-3'>6. Contacto</h2>
                    <p className='mb-3'>Si tienes preguntas sobre esta política o sobre el manejo de tus datos personales, por favor contáctanos a <a className='underline text-blue-600' href="mailto:privacidad@tucumanturismo.gob.ar">privacidad@tucumanturismo.gob.ar</a> o a nuestro domicilio legal: Av. 24 de Septiembre 484, San Miguel de Tucumán, Argentina, Departamento de Informática.</p>

                    {/* --- SECCIÓN DE CONTROL DE COOKIES MEJORADA --- */}
                    <div className="mt-10 p-6 border-t-2">
                        <h2 className='text-2xl font-bold mb-4'>Gestiona tu preferencia de cookies</h2>

                        {cookieExists ? (
                            <div className='flex items-center text-green-600'>
                                <CheckCircle className='mr-2' />
                                <span>Actualmente tienes las cookies activadas.</span>
                            </div>
                        ) : (
                            <div className='flex items-center text-red-600'>
                                <XCircle className='mr-2' />
                                <span>Actualmente tienes las cookies desactivadas.</span>
                            </div>
                        )}

                        <div className="flex space-x-4 mt-4">
                            <Button type="button" onClick={handleAcceptCookies} disabled={cookieExists}>Activar</Button>
                            <Button type="button" onClick={handleDeclineCookies} disabled={!cookieExists} className="bg-red-600 hover:bg-red-700">Desactivar</Button>
                        </div>

                        {feedbackMessage && (
                            <p className="mt-4 text-sm text-gray-700 font-semibold">{feedbackMessage}</p>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}