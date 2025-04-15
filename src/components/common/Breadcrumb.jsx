import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items = [], homeLink = "/" }) => {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center space-x-1">
        {/* Home item */}
        <li className="flex items-center">
          <a 
            href={homeLink}
            className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span>Inicio</span>
          </a>
        </li>

        {/* Separator after home */}
        {items.length > 0 && (
          <li className="flex items-center">
            <ChevronRight size={14} className="text-gray-400" />
          </li>
        )}

        {/* Rest of the items */}
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex items-center">
              <a
                href={item.href}
                className={`${
                  index === items.length - 1
                    ? "font-medium text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                } transition-colors`}
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
            
            {/* Add separator if not the last item */}
            {index < items.length - 1 && (
              <li className="flex items-center">
                <ChevronRight size={14} className="text-gray-400" />
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;