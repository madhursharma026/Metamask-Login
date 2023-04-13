import "../styles/globals.css";
import React from "react";
import { DAppProvider } from "@usedapp/core";
import 'bootstrap/dist/css/bootstrap.min.css';


function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <DAppProvider config={{}}>
        <Component {...pageProps} />
      </DAppProvider>
    </React.StrictMode>
  );
}

export default MyApp;
