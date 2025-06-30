import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

const Paginado = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  className
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // No mostrar paginación si solo hay una página
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generación de array de páginas a mostrar
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Mostrar todas las páginas si son menos que el máximo
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas con elipsis
      if (currentPage <= 3) {
        // Caso: estamos cerca del inicio
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Caso: estamos cerca del final
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Caso: estamos en el medio
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={cn(
      "flex items-center justify-center space-x-1",
      className
    )}>
      {/* Botón anterior */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-1 rounded-md ${currentPage === 1
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100'
          }`}
        aria-label="Página anterior"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Números de página */}
      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-2 py-1 text-sm text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm rounded-md ${currentPage === page
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Botón siguiente */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-1 rounded-md ${currentPage === totalPages
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-gray-700 hover:bg-gray-100'
          }`}
        aria-label="Página siguiente"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Paginado;