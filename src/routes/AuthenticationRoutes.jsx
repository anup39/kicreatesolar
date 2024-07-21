import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";

// landing & contact-us routing
const PagesLanding = Loadable(lazy(() => import("../views/pages/landing")));
// const PagesContactUS = Loadable(lazy(() => import("views/pages/contact-us")));
// const PagesFaqs = Loadable(lazy(() => import("views/pages/saas-pages/Faqs")));
// const PagesPrivacyPolicy = Loadable(
//   lazy(() => import("views/pages/saas-pages/PrivacyPolicy"))
// );

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/pages/landing",
      element: <PagesLanding />,
    },
    // {
    //   path: "/pages/contact-us",
    //   element: <PagesContactUS />,
    // },
    // {
    //   path: "/pages/faqs",
    //   element: <PagesFaqs />,
    // },
    // {
    //   path: "/pages/privacy-policy",
    //   element: <PagesPrivacyPolicy />,
    // },
  ],
};

export default AuthenticationRoutes;
