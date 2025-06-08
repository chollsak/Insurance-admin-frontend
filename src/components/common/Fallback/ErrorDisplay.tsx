import type { FallbackProps } from "react-error-boundary";
import { Box, Typography, Button } from "@mui/material";

export default function StyledErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Box
      role="alert"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 3,
        textAlign: "center",
      }}>
      <Box maxWidth={600}>
        <Typography
          variant="h2"
          color="error.main"
          gutterBottom
          sx={{ fontWeight: "bold" }}>
          Oops! Something went wrong.
        </Typography>
        <Typography
          variant="h5"
          sx={{ mb: 4 }}>
          {error?.message || "An unexpected error occurred."}
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={resetErrorBoundary}>
          Try Again
        </Button>
      </Box>
    </Box>
  );
}
