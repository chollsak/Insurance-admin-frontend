import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import {
    AppLayout,
    ErrorBoundary,
    FullScreenLoading as Loading,
    NotFound,
} from "./components";

const HomeScreen = lazy(() => import("./screens/Home/HomeScreen"));
const ContentCreateScreen = lazy(() => import("./screens/Home/ContentCreateScreen"));
const ContentEditScreen = lazy(() => import("./screens/Home/ContentEditScreen"));

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<AppLayout />} errorElement={<ErrorBoundary />}>
                <Route
                    index
                    element={
                        <Suspense fallback={<Loading />}>
                            <HomeScreen />
                        </Suspense>
                    }
                />
                <Route
                    path="content/new"
                    element={
                        <Suspense fallback={<Loading />}>
                            <ContentCreateScreen />
                        </Suspense>
                    }
                />
                <Route
                    path="content/edit/:id"
                    element={
                        <Suspense fallback={<Loading />}>
                            <ContentEditScreen />
                        </Suspense>
                    }
                />
            </Route>

            <Route path="*" element={<NotFound />} />
        </>
    )
);
