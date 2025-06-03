import { useContext } from "react";
import { CommonContext } from "../contexts";

export const useCommon = () => {
    const context = useContext(CommonContext);
    if (!context) {
        throw new Error("useCommon must be used within a CommonProvider");
    }
    return context;
}
