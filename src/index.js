//Importa react
import React from "react";
//Importa reactDOM
import ReactDOM from "react-dom/client";
//Importa script de cores (dark / day mode)
import { ColorModeScript } from "@chakra-ui/react";
//Importa estilização
import "./index.css";
//importa arquivo app
import App from "./App";
//Importa o tema escolhido pelo usuário no arquivo abaixo
import theme from "./theme";
//importa webvitals
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
