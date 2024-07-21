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
const AppECommProducts = Loadable(
  lazy(() => import("../views/application/e-commerce/Products"))
);
// const AppECommProductDetails = Loadable(
//   lazy(() => import("views/application/e-commerce/ProductDetails"))
// );

// sample page routing
const SamplePage = Loadable(lazy(() => import("../views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/apps/e-commerce/products",
      element: <AppECommProducts />,
      loader: productsLoader,
      errorElement: <ErrorBoundary />,
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
