import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Download } from 'lucide-react';
import { ReactLenis, useLenis } from 'lenis/react';

const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    fullScreen = false,
    size = 'md',
    showCloseButton = true,
    overlayColor = 'rgba(0, 0, 0, 0.75)',
    imageUrl,
    imageAlt = 'Imagen',
    enableMouseZoom = true,
    header = true
}) => {
    // ... (Todos tus hooks: useState, useEffect, etc. se mantienen igual)
    const [mounted, setMounted] = useState(false);
    const [imageScale, setImageScale] = useState(100);
    const imageContainerRef = useRef(null);
    const scrollContentRef = useRef();

    useEffect(() => {
        if (isOpen) {
            scrollContentRef.current?.start();
        } else {
            scrollContentRef.current?.stop();
        }
        return () => {
            scrollContentRef.current?.stop();
        };
    }, [isOpen, scrollContentRef]);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && imageUrl) {
            setImageScale(100);
        }
    }, [isOpen, imageUrl]);

    const handleEscapeKeyPress = useCallback((event) => {
        if (event.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKeyPress);
        } else {
            document.removeEventListener('keydown', handleEscapeKeyPress);
        }
        return () => {
            document.removeEventListener('keydown', handleEscapeKeyPress);
        };
    }, [isOpen, handleEscapeKeyPress]);

    const handleDownload = () => {
        if (imageUrl) {
            const link = document.createElement('a');
            link.href = imageUrl;
            link.setAttribute('download', imageUrl.split('/').pop() || 'download');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };


    if (!isOpen || !mounted) {
        return null;
    }

    // --- AQUÍ ESTÁ EL ÚNICO CAMBIO ---
    const desktopSizeClasses = fullScreen
        ? 'md:w-screen md:h-screen md:max-w-none md:max-h-none md:rounded-none'
        : size === 'sm' ? 'md:max-w-sm'
            : size === 'md' ? 'md:max-w-md'
                : size === 'lg' ? 'md:max-w-lg'
                    : size === 'xl' ? 'md:max-w-4/5'
                        : size === '2xl' ? 'md:max-w-6/7'
                            : size === 'full' ? 'md:w-screen md:h-full md:max-h-full'
                                : 'md:max-w-md';

    // Se definen clases base para móvil (w-11/12) y se añaden las de desktop.
    const sizeClasses = `
        w-12/14 max-w-lg
        ${desktopSizeClasses}
    `;

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-[env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)] md:p-5 pt-6`}
            style={{ backgroundColor: overlayColor }}
            onClick={onClose}
        >
            <div
                className={` bg-white rounded-lg shadow-xl flex flex-col h-full overflow-hidden ${sizeClasses}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* El resto de tu JSX se mantiene exactamente igual */}
                {header && (
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold text-gray-900 pr-8">{title}</h3>
                        {showCloseButton && (
                            <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                onClick={onClose}
                                aria-label="Cerrar modal"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                )}
                <ReactLenis ref={scrollContentRef} options={{ lerp: 0.08, duration: 2 }} className="overflow-auto">
                    <div
                        className={`flex-grow overflow-auto ${imageUrl ? 'flex justify-center items-center' : 'md:p-4 p-2'}`}
                        style={{ cursor: imageUrl && imageScale > 100 ? 'grab' : 'default' }}
                    >
                        {imageUrl ? (
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                <div className="absolute top-0 right-0 p-2 bg-black bg-opacity-50 rounded-bl-lg z-10 flex space-x-2">
                                    <button
                                        onClick={handleDownload}
                                        className="p-1 rounded-full bg-gray-700 text-white hover:bg-gray-600"
                                        aria-label="Descargar imagen"
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                </div>
                                <img
                                    src={imageUrl}
                                    alt={imageAlt}
                                    style={{ width: `auto`, height: '100%', objectFit: 'contain' }}
                                    className="max-w-none max-h-none select-none"
                                />
                            </div>
                        ) : (
                            children
                        )}
                    </div>
                </ReactLenis>
            </div>
        </div>,
        document.body
    );
};

export default Modal;