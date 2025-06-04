// src/components/DropdownSearch.jsx (o la ruta que prefieras)
import React, { useState, useEffect, useRef } from 'react';

const DropdownSearch = ({
    options, // Array de strings con las opciones
    selectedValue, // Valor actualmente seleccionado en el padre (para mostrar en el input)
    onSelection, // Callback: (seleccion: string) => void
    placeholder
}) => {
    const [inputValue, setInputValue] = useState(selectedValue || '');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const wrapperRef = useRef(null); // Ref para el div contenedor principal del componente

    // Sincronizar inputValue con selectedValue si cambia desde el padre
    useEffect(() => {
        setInputValue(selectedValue || '');
    }, [selectedValue]);

    // Manejar clics fuera del componente para cerrar el dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (!isDropdownVisible) {
            setIsDropdownVisible(true);
        }
    };

    const handleInputFocus = () => {
        setIsDropdownVisible(true);
    };

    const handleOptionClick = (option) => {
        setInputValue(option); // Actualiza el input para mostrar la selección
        onSelection(option); // Llama al callback del padre
        setIsDropdownVisible(false); // Cierra el dropdown
    };

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder={placeholder || "Buscar..."}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onClick={handleInputFocus} // Para reabrir si se hace clic en el input ya enfocado
            />
            {isDropdownVisible && filteredOptions.length > 0 && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredOptions.map((option, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
            {isDropdownVisible && inputValue && filteredOptions.length === 0 && (
                 <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500">
                    No se encontraron opciones.
                </div>
            )}
        </div>
    );
};

export default DropdownSearch;