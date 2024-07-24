import ThemeCustomization from "./themes";
import RTLLayout from "./ui-component/RTLLayout";
import Locales from "./ui-component/Locales";
import NavigationScroll from "./layout/NavigationScroll";
import { JWTProvider as AuthProvider } from "./contexts/JWTContext";
import Notistack from "./ui-component/third-party/Notistack";
import PropTypes from "prop-types";
import { store } from "./store";
import { persister } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "./contexts/ConfigContext.jsx";
import { Provider } from "react-redux";

const AppWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <ConfigProvider>
          <ThemeCustomization>
            <RTLLayout>
              <Locales>
                <NavigationScroll>
                  <AuthProvider>
                    <>
                      <Notistack>{children}</Notistack>
                    </>
                  </AuthProvider>
                </NavigationScroll>
              </Locales>
            </RTLLayout>
          </ThemeCustomization>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.node,
};

export default AppWrapper;
