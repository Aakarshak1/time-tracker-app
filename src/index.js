import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import "./index.css";
import App from "./App";
import ApolloClient from "./graphQL/ApolloClient";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={ApolloClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);
