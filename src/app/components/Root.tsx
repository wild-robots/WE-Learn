import { Outlet } from "react-router";
import { AppProvider } from "../../context/AppContext";

/** Global layout — pages render here via nested routes */
export function Root() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}