// src/assets/icons/index.js

// Asegúrate que SVGR está configurado en next.config.js para que r(key).default sea el componente.
const r = require.context('../../public/svg/', true, /\.svg$/);

function kebabToPascalCase(kebabString) {
  if (!kebabString || typeof kebabString !== 'string') return '';
  return kebabString
    .toLowerCase()
    .split('-')
    .map(word => word.length === 0 ? '' : word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

const icons = Object.fromEntries(
  r.keys().map(key => {
    // Extrae el nombre del archivo: './user-icon.svg' -> 'user-icon'
    const rawName = key.replace('./', '').replace('.svg', '');

    // Opcional: convertir kebab-case a camelCase para acceso con punto (ej. icons.userIcon)
    // Si no haces esto, accederás con icons['user-icon']
    const componentName = kebabToPascalCase(rawName);

    return [componentName, r(key).default]; // .default debería ser el componente gracias a SVGR
  })
);

export default { ...icons };