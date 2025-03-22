import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../../pages/HomePage";
import NotFoundPage from "../../pages/NotFoundPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
