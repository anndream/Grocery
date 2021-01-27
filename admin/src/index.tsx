import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { theme } from "./theme";
import { AdminRoutes } from "./routes";
import * as serviceWorker from "./serviceWorker";
import "react-spring-modal/dist/index.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
import "components/Admin/Scrollbar/scrollbar.css";
import "./theme/global.css";
import ExtendedApp from "containers/Client/app";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
  cache: new InMemoryCache(),
});

function App() {
  const engine = new Styletron();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/admin">
          <ApolloProvider client={client as any}>
            <StyletronProvider value={engine}>
              <BaseProvider theme={theme}>
                <AdminRoutes />
              </BaseProvider>
            </StyletronProvider>
          </ApolloProvider>
        </Route>

        <Route path="/">
          <ExtendedApp />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
