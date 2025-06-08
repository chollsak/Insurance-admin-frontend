// router.tsx
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { AppLayout, Loadable } from "./components";
import { lazy } from "react";

const HomeScreen = Loadable(lazy(() => import("./screens/Home/HomeScreen")));
const ContentCreateScreen = Loadable(lazy(() => import("./screens/Home/ContentCreateScreen")));
const ContentEditScreen = Loadable(lazy(() => import("./screens/Home/ContentEditScreen")));

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AppLayout />}>
            <Route index element={HomeScreen} />
            <Route path="content/new" element={ContentCreateScreen} />
            <Route path="content/edit/:id" element={ContentEditScreen} />
            <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
    )
);
