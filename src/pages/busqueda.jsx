import React, { useState, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import Breadcrumb from '@/components/common/Breadcrumb';
import { useGetPrestadoresQuery } from '@/redux/services/prestadoresService';
import CardPrestadores from '@/components/prestadores/CardPrestadores';
import CardArticuloSearch from '@/components/CardArticuloSearch';
import { useGetarticulosQuery } from '@/redux/services/articulosService';



export default function busqueda() {
  return (
    <div>
      {        /* Resultado de la Busqueda */}
      <div className="bg-white w-full lg:w-11/12 xl:w-11/12 2xl:w-9/12 mx-auto">


         
      <div>
        <h1>Resultado de la Búqueda</h1>
      <div>
        <h3>Articulos Relacionados</h3>  
    <CardArticuloSearch></CardArticuloSearch>
    </div> 
    <div>
      <h3>Prestadores de Turismo</h3>
    <CardPrestadores></CardPrestadores>
    </div>
    </div>
     </div>
    </div>
  )
}
