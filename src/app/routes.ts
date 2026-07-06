import { createBrowserRouter } from "react-router";
import { Root }            from "./components/Root";
import { LandingPage }     from "./components/LandingPage";
import { GroupPage }       from "./components/GroupPage";
import { CreateBabelFlow } from "./components/CreateBabelFlow";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true,        Component: LandingPage    },
      { path: "group/:id",  Component: GroupPage      },
      { path: "group",      Component: GroupPage      }, // fallback
      { path: "create",     Component: CreateBabelFlow },
    ],
  },
]);
