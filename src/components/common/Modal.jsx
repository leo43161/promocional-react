// Archivo: Modal.js (versión final y correcta)
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Download } from 'lucide-react';

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
    const [mounted, setMounted] = useState(false);
    const scrollContentRef = useRef(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const element = scrollContentRef.current;
        if (!isOpen || !element) return;

        const handleWheel = (event) => {
            const { scrollTop, scrollHeight, clientHeight } = element;
            const isAtTop = event.deltaY < 0 && scrollTop === 0;
            const isAtBottom = event.deltaY > 0 && Math.ceil(scrollTop + clientHeight) >= scrollHeight;

            if (isAtTop || isAtBottom) {
                event.preventDefault();
            }
        };

        element.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            element.removeEventListener('wheel', handleWheel);
        };
    }, [isOpen]);

    const handleEscapeKeyPress = useCallback((event) => { if (event.key === 'Escape') { onClose(); } }, [onClose]);
    useEffect(() => { if (isOpen) { document.addEventListener('keydown', handleEscapeKeyPress); } else { document.removeEventListener('keydown', handleEscapeKeyPress); } return () => { document.removeEventListener('keydown', handleEscapeKeyPress); }; }, [isOpen, handleEscapeKeyPress]);
    const handleDownload = () => { if (imageUrl) { const link = document.createElement('a'); link.href = imageUrl; link.setAttribute('download', imageUrl.split('/').pop() || 'download'); document.body.appendChild(link); link.click(); document.body.removeChild(link); } };

    if (!isOpen || !mounted) {
        return null;
    }

    const desktopSizeClasses = fullScreen ? 'md:w-screen md:h-screen md:max-w-none md:max-h-none md:rounded-none' : size === 'sm' ? 'md:max-w-sm' : size === 'md' ? 'md:max-w-md' : size === 'lg' ? 'md:max-w-lg' : size === 'xl' ? 'md:max-w-4/5' : size === '2xl' ? 'md:max-w-6/7' : size === 'full' ? 'md:w-screen md:h-full md:max-h-full' : 'md:max-w-md';
    const sizeClasses = `w-11/12 max-w-lg ${desktopSizeClasses}`;

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-[env(safe-area-inset-top)_env(safe-area-inset-right)_env(safe-area-inset-bottom)_env(safe-area-inset-left)] md:p-5`}
            style={{ backgroundColor: overlayColor }}
            onClick={onClose}
        >
            <div
                className={`relative bg-white rounded-lg shadow-xl flex flex-col h-full overflow-hidden ${sizeClasses}`}
                onClick={(e) => e.stopPropagation()}
            >
                {header && (
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold text-gray-900 pr-8">{title}</h3>
                        {showCloseButton && (<button type="button" className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md" onClick={onClose} aria-label="Cerrar modal"><X className="w-6 h-6" /></button>)}
                    </div>
                )}
                <div
                    className={`flex-grow overflow-auto ${imageUrl ? 'flex justify-center items-center' : 'p-4'}`}
                    ref={scrollContentRef}
                >
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;