import { useOutletContext } from "react-router-dom";
import { Container, type SxProps, type Theme } from "@mui/material";
import { ContentForm } from "../../components";
import { defaultBanner } from "../../models";

export default function CreateScreen() {
    const { sx } = useOutletContext<{ sx?: SxProps<Theme> }>();
    return (
        <Container
            disableGutters={true}
            sx={{
                ...sx,
                display: "flex",
                bgcolor: "#F7FAFC",
                overflowY: "hidden",
            }}>
            <ContentForm mode="create" defaultValues={defaultBanner} />
        </Container>
    )
}