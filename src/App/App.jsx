import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "../pages/Home/HomePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <RootLayout />
        <Footer />
      </>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
