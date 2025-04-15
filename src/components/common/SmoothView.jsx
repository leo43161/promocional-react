import React from 'react'
import { ReactLenis, useLenis } from 'lenis/react'

export default function SmoothView({ children }) {
    /* const lenis = useLenis(({ scroll }) => {
        console.log(scroll);
    })
    console.log(lenis); */
    return (
        <ReactLenis root options={{ lerp: 0.08, duration: 2 }}>
            {children}
        </ReactLenis>
    )
}
