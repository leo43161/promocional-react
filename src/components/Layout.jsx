import React from "react";
import Head from "next/head";
import Header from "./Header";
import SearchHome from "./SearchHome";
import SmoothView from "./common/SmoothView";
import Footer from "./Footer";


export default function Layout({ children }) {
  return (
    <div className="bg-neutral-50 min-h-screen">
      <Head>
        <title>Tucuman Turismo</title>
      </Head>
      <SmoothView>
        <div className="relative">
          <Header></Header>
          <SearchHome></SearchHome>
          <main>{children}</main>
        </div>
      </SmoothView>
      <Footer></Footer>
    </div>
  );
}
