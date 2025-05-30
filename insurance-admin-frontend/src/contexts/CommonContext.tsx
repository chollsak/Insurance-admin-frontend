import {
    createContext,
    useState,
    useEffect,
    type Dispatch,
    type ReactNode,
    type SetStateAction
} from "react";

export interface ICommonContextProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const CommonContext = createContext<ICommonContextProps | undefined>(undefined);

export function CommonProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
        const stored = localStorage.getItem("isSidebarOpen");
        return stored !== null ? JSON.parse(stored) : true;
    });

    useEffect(() => {
        localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

    return (
        <CommonContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </CommonContext.Provider>
    );
}
