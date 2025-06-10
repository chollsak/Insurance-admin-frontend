import {
    createContext,
    useState,
    useEffect,
    type ReactNode,
    type Dispatch,
    type SetStateAction,
} from "react";
import type { ContentCategory } from "../models";

export interface ICommonContextProps {
    isSidebarOpen: boolean;
    handleToggleSidebar: () => void;
    handleCloseSidebar: () => void;
    handleOpenSidebar: () => void;

    selectContentCategory: "ALL" | ContentCategory;
    setContentCategory: Dispatch<SetStateAction<"ALL" | ContentCategory>>;
}

export const CommonContext = createContext<ICommonContextProps | undefined>(undefined);

export function CommonProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
        const stored = localStorage.getItem("isSidebarOpen");
        return stored !== null ? JSON.parse(stored) : true;
    });

    const [selectContentCategory, setContentCategory] = useState<"ALL" | ContentCategory>(() => {
        const stored = localStorage.getItem("selectedContentCategory");
        return stored !== null ? JSON.parse(stored) : "ALL";
    });

    function handleToggleSidebar() {
        setIsSidebarOpen(prev => !prev);
    }

    function handleCloseSidebar() {
        setIsSidebarOpen(_prev => false);
    }

    function handleOpenSidebar() {
        setIsSidebarOpen(_prev => true);
    }

    useEffect(() => {
        localStorage.setItem("isSidebarOpen", JSON.stringify(isSidebarOpen));
    }, [isSidebarOpen]);

    useEffect(() => {
        localStorage.setItem("selectedContentCategory", JSON.stringify(selectContentCategory));
    }, [selectContentCategory]);

    return (
        <CommonContext.Provider value={{ isSidebarOpen, handleToggleSidebar, handleCloseSidebar, handleOpenSidebar, selectContentCategory, setContentCategory }}>
            {children}
        </CommonContext.Provider>
    );
}
