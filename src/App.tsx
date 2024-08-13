import { createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FindKir } from "./view/page/kir/FindKir";

type Dependencies = {};

export const Context = createContext<Dependencies | undefined>(undefined);

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <>ERROR</>,
    children: [
      {
        index: true,
      },
      {
        path: "/certificate/:certificateNumber",
        element: <FindKir />,
      },
    ],
  },
]);

export function App() {
  const dependencies: Dependencies = {};

  return (
    <Context.Provider value={dependencies}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
}
