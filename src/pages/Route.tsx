import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import IndexPage from ".";

const router = createBrowserRouter([
    {
        path: "/",
        element: <IndexPage />,
    },
    {
        path: "*",
        element: <Navigate to="/" replace={true} />,
    },
]);

export default function Routes () {
    return <RouterProvider router={router} />;
};
