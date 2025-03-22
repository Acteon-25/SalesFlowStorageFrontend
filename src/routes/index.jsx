import { createBrowserRouter } from "react-router";

import { LayoutClient } from "@/layout/LayoutClient";
import { ErrorContainer } from "@/client/error/ErrorContainer";
import { HomeContainer } from "@/client/home/HomeContainer";
import { LoginContainer } from "@/client/login/LoginContainer";
import { RegisterContainer } from "@/client/register/RegisterContainer";
import { DashboardContainer } from "@/client/dashboard/DashboardContainer";
import { UserContextProvider } from "@/context/userContext";
import { CreateSaleContainer } from "@/client/createSale/CreateSaleContainer";

import { ProtectedRoute } from "@/routes/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserContextProvider>
        <LayoutClient />
      </UserContextProvider>
    ),
    errorElement: <ErrorContainer />,
    children: [
      {
        index: true,
        element: <HomeContainer />,
      },
      {
        path: "/login",
        element: <LoginContainer />,
      },
      {
        path: "/register",
        element: <RegisterContainer />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <DashboardContainer />,
          },
          {
            path: "/dashboard/create-sale",
            element: <CreateSaleContainer />,
          }
        ],
      },
    ]
  },
]);