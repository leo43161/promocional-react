import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const CookiesAccepted = localStorage.getItem('CookiesAccepted');
    if (!CookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('CookiesAccepted', 'true');
    setIsVisible(false);
  };

  const handleReject = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-400 z-50 w-screen">
      <div className="text-center text-black mb-2 md:mb-0">
        <p className="m-0">
          Para ofrecerte una mejor experiencia, este sitio utiliza cookies. Al continuar navegando, aceptas nuestra{' '}
          <a href="/privacidad" className="text-blue-600 underline">política de privacidad</a>.
        </p>
      </div>
      <div className="flex gap-3">
        <button onClick={handleAccept}
          className="bg-primary text-white px-4 py-2 rounded-lg text-[1.1em]"
        >Aceptar</button>
        <button onClick={handleReject} className="bg-primary text-white px-4 py-2 rounded-lg text-[1.1em]"
        >Rechazar</button>
      </div>
    </div>
  );
}
