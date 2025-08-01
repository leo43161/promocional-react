import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { desencriptar, getCookie } from '@/utils/cookie';
import { getCurrentLanguage } from '@/utils';
import { useRegistrarVisitaMutation } from '@/redux/services/visitasService';

const PageTracker = () => {
    const router = useRouter();
    const [registrarVisita] = useRegistrarVisitaMutation();

    useEffect(() => {
        const lenguaje = !!router ? getCurrentLanguage(router.query) : { id: 1 };
        const getSearchQuery = () => {
            const query = router.query.query || router.query.nombre || router.query.localidad || '';
            return Array.isArray(query) ? query.join(' ') : query;
        }

        const handleRouteChange = (url) => {
            const consentCookieRaw = getCookie('__cookieSesion');
            console.log(consentCookieRaw);
            if (consentCookieRaw) {
                const cookieDecrypted = JSON.parse(desencriptar(consentCookieRaw));
                console.log(cookieDecrypted);
                try {
                    const { permiso, id } = cookieDecrypted;
                    if (permiso === true && id) {
                        registrarVisita({
                            url,
                            busqueda: getSearchQuery(),
                            idioma: lenguaje.id || 1,
                            id,
                        });
                    }
                } catch (error) {
                    console.error("Error al procesar la cookie de consentimiento:", error);
                }
            }
        };

        // Registra la visita en la carga inicial
        handleRouteChange(process.env.URL_LOCAL_SERVER + router.asPath);

        // Registra en cada cambio de ruta completado
        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.asPath, router.events, router.locale, router.query, registrarVisita]);

    return null; // Este componente no renderiza nada
};

export default PageTracker;