import React from 'react';
import Head from 'next/head';
import Header from './Header';
import SmoothView from './common/SmoothView';

export default function Layout({ children }) {
    return (
        <div className="bg-neutral-50 min-h-screen">
            <Head>
                <title>Tucuman Turismo</title>
            </Head>
            <SmoothView>
                <div className='relative'>
                    <Header></Header>
                    <main>
                        {children}
                    </main>
                </div>
            </SmoothView>

        </div>
    )
}
