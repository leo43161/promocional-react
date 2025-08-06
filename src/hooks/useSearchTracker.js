import { useRouter } from 'next/router';
import { useRegistrarVisitaMutation } from '@/redux/services/visitasService';
import { getCookie, desencriptar } from '@/utils/cookie';
import { getCurrentLanguage } from '@/utils';

export const useSearchTracker = () => {
  const router = useRouter();
  const [registrarVisita] = useRegistrarVisitaMutation();

  const trackSearch = (busqueda) => {
    if (!busqueda) return;
    const consentCookieRaw = getCookie('__cookieSesion');

    if (consentCookieRaw) {
      try {
        // La cookie que creaste está encriptada, así que la desencriptamos.
        const cookieDecrypted = JSON.parse(desencriptar(consentCookieRaw));
        const { permiso, id } = cookieDecrypted;
        
        // Verificamos si el usuario dio permiso y si existe un ID de sesión.
        if (permiso === true && id) {
          const lenguaje = getCurrentLanguage(router);
          
          registrarVisita({
            url: window.location.href, // URL actual
            busqueda,                  // Término de búsqueda
            idioma: lenguaje.id || 1,  // ID del idioma actual
            id,                        // ID de la sesión guardado en la cookie
          });
        }
      } catch (error) {
        console.error("Error al procesar la cookie para el seguimiento de búsqueda:", error);
      }
    }
  };

  // El hook devuelve la función que los componentes pueden usar.
  return { trackSearch };
};