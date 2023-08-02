import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home, { homeLoader } from "./pages/Home";
import Admin, { adminLoader } from "./pages/Admin";
import AdminLayout from "./pages/AdminLayout";
import Applications from "./pages/Applications";
import Brand from "./pages/Brand";
import Theme from "./pages/Theme";
import { HomeAction as homeAction } from "./pages/Home";
import Finish from "./pages/Finish";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        action: homeAction,
        loader: homeLoader,
      },
      {
        path: "admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Admin />, loader: adminLoader },
          { path: "applications", element: <Applications /> },
          { path: "brand", element: <Brand /> },
          { path: "theme", element: <Theme /> },
        ],
      },
      { path: "finish", element: <Finish /> },
      { path: "login", element: <Login></Login> },
      { path: "register", element: <Register/> },
      
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
