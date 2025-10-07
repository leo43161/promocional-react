import { useState, useEffect } from 'react';
// Importamos las funciones directamente desde nuestro archivo de utilidades
import { encriptar, getCookie, setCookie } from '../utils/cookie'; 
import { useGetIdSessionMutation } from '@/redux/services/itinerarioService';
import { useRouter } from 'next/router';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [getIdSession] = useGetIdSessionMutation();
  const router = useRouter();

  // Función para generar un ID de sesión aleatorio y simple
  const generateSessionId = async () => {
    const urlFull = window.location.href;
    console.log('Generando ID de sesión...');
    console.log(window.location.href);
    console.log(router.asPath);
    const response = await getIdSession(urlFull).unwrap();
    return response.result[0].id;
  };

  useEffect(() => {
    // Reutilizamos getCookie
    const cookie = getCookie('__cookieSesion');
    if (!cookie) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = async (permiso) => {
    const sessionId = permiso ? await generateSessionId() : null;
    const cookieData = { permiso, id: sessionId };
    const encryptedValue = encriptar(JSON.stringify(cookieData));
    // Reutilizamos setCookie, pasándole el número de días para la expiración
    setCookie('__cookieSesion', encryptedValue, 60);
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className='animate-fadeIn fixed bottom-0 left-0 right-0 md:bg-foreground/90 bg-foreground/70 p-5 flex flex-col md:flex-row justify-between items-center border-t-2 border-primary z-100 w-screen text-white shadow-lg'
    >
      <p className='text-base mb-4'>
        Para ofrecerte una mejor experiencia, este sitio utiliza cookies. Al continuar navegando, aceptas nuestra <a href="privacidad" class="text-primary underline font-semibold">política de privacidad</a>.
      </p>
      <div className='flex justify-center gap-4'>
        <button
          onClick={() => handleConsent(true)}
          className='bg-primary text-white px-4 py-2 rounded text-[1.1em] cursor-pointer'
        >
          Aceptar
        </button>
        <button
          onClick={() => handleConsent(false)}
          className='bg-red-600 text-white px-4 py-2 rounded text-[1.1em] cursor-pointer'
        >
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;