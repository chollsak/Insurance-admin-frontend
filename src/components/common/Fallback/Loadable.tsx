// components/Loadable.tsx
import { Suspense, type JSX } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorDisplay from "./ErrorDisplay";

const Loading = () => <div>Loading...</div>;

export function Loadable(Component: React.LazyExoticComponent<() => JSX.Element>) {
    return (
        <Suspense fallback={<Loading />}>
            <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
                <ErrorDisplay error={error} resetErrorBoundary={resetErrorBoundary} />
            )}>
                <Component />
            </ErrorBoundary>
        </Suspense>
    );
}
