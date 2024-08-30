import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import ErrorBoundary from "./ErrorBoundary";
import Loadable from "../ui-component/Loadable";
import AuthGuard from "../utils/route-guard/AuthGuard";

import { loader as productsLoader, productLoader } from "../api/products";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard/Default"))
);

// application - e-commerce routing
const AppClients = Loadable(
  lazy(() => import("../views/application/clients/ClientsList"))
);
// const AppECommProductDetails = Loadable(
//   lazy(() => import("views/application/e-commerce/ProductDetails"))
// );

// map routing
const AppMap = Loadable(lazy(() => import("../views/application/map")));

// sample page routing
const SamplePage = Loadable(lazy(() => import("../views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/apps/clients",
      element: <AppClients />,
      loader: productsLoader,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/map",
      element: <AppMap />,
    },

    // {
    //   path: "/apps/e-commerce/product-details/:id",
    //   element: <AppECommProductDetails />,
    //   loader: productLoader,
    //   errorElement: <ErrorBoundary />,
    // },

    {
      path: "/sample-page",
      element: <SamplePage />,
    },
    {
      path: "/dashboard/default",
      element: <DashboardDefault />,
    },
  ],
};

export default MainRoutes;
