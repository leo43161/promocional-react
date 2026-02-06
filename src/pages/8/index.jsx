'use client' // Importante: los hooks solo funcionan en componentes de cliente

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CaminoDeLaFe() {
  const router = useRouter()

  useEffect(() => {
    // Redireccionamos a la URL externa
    window.location.href = 'https://www.tucumanturismo.gob.ar/subsecciones/lista/174/ruta-de-la-fe'
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
{/*       <h1 >Redireccionando a la Ruta de la Fe...</h1> */}
    </div>
  )
}