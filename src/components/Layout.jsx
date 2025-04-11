import React from 'react';
import Head from 'next/head';
import Header from './Header';

export default function Layout({ children }) {
    return (
        <div className="bg-neutral-50 min-h-screen">
            <Head>
                <title>Tucuman Turismo</title>
            </Head>
            <div>
                <div>
                    <Header></Header>
                    <main>
                        {children}
                    </main>
                </div>
            </div>

        </div>
    )
}
