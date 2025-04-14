import React from 'react';
import { useGetPrestadoresQuery } from '@/redux/services/prestadoresService';
import ParallaxContainer from '@/components/common/ParallaxContainer';

export default function Prestadores() {
    const { data: prestadores, error, isLoading } = useGetPrestadoresQuery();

    if (isLoading) return <p>Cargando prestadores...</p>;
    if (error) return <p>Hubo un error al cargar los prestadores</p>;

    return (
        <div>
            <section>
                <ParallaxContainer
                    speed={0.5}
                    minHeight="h-96 md:h-[58vh]"
                    className=""
                >
                    <div className="container mx-auto px-4 py-20 text-white">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Segunda Sección
                        </h2>
                        <p className="text-lg md:text-xl max-w-2xl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vivamus lacinia odio vitae vestibulum vestibulum.
                        </p>
                    </div>
                </ParallaxContainer>
            </section>
            <h2 className="text-xl font-bold mb-4">Lista de Prestadores</h2>
            {prestadores.result?.map((prestador) => (
                <div key={prestador.id} className="mb-2 p-2 border rounded shadow">
                    <p><strong>{prestador.name}</strong></p>
                </div>
            ))}
        </div>
    );
}
