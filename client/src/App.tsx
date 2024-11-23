import { createBrowserRouter } from "react-router-dom";
import Homepage from "./Pages/Home-page";
import Dashboard from "./Pages/Dashboard-page";
import { RouterProvider } from "react-router";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage></Homepage>,
    },
    {
      path: "/dashboard",
      element: <Dashboard></Dashboard>,
    },
  ]);
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
