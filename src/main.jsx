import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { persister } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "./contexts/ConfigContext.jsx";

// style + assets
import "./assets/scss/style.scss";

// map
// import "mapbox-gl/dist/mapbox-gl.css";

// google-fonts
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/700.css";

import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConfigProvider>
          <App />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
