import { RouterProvider } from "react-router-dom";

// routing
import router from "./routes";

// project imports

import AppWrapper from "./AppWrapper";
import Snackbar from "../src/ui-component/extended/Snackbar";

// auth provider
import { JWTProvider as AuthProvider } from "./contexts/JWTContext";
// import { FirebaseProvider as AuthProvider } from 'contexts/FirebaseContext';
// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
  return (
    <AppWrapper>
      <RouterProvider router={router} />
      <Snackbar />
    </AppWrapper>
  );
};

export default App;
