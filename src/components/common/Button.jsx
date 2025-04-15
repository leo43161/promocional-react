import React from 'react';

// Componente Button personalizable con Tailwind CSS
export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  disabled = false,
  rounded = false,
  className = '',
  leftIcon = null,
  rightIcon = null,
  type = 'button',
  onClick,
  ...props 
}) {
  // Estilos base para todos los botones
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-primary hover:bg-secondary";

  // Variantes de color
  const variantStyles = {
    primary: "bg-primary hover:bg-secondary text-white",
    secondary: "bg-secondary hover:bg-primary text-secondary-800",
    success: "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white",
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400 text-white",
    info: "bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-400 text-white",
    light: "bg-gray-100 hover:bg-gray-200 focus:ring-gray-300 text-gray-800",
    dark: "bg-gray-800 hover:bg-gray-900 focus:ring-gray-700 text-white",
    outline: "bg-transparent border border-blue-600 hover:bg-blue-50 text-blue-600 focus:ring-blue-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-400"
  };

  // Tamaños
  const sizeStyles = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-2.5 text-lg",
    xl: "px-6 py-3 text-xl",
  };

  // Configuración de ancho completo
  const widthStyles = fullWidth ? "w-full" : "";
  
  // Configuración de bordes redondeados
  const roundedStyles = rounded ? "rounded-full" : "rounded";
  
  // Configuración para botones deshabilitados
  const disabledStyles = disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "";

  // Composición final de clases
  const buttonClasses = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${widthStyles} 
    ${roundedStyles} 
    ${disabledStyles} 
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}