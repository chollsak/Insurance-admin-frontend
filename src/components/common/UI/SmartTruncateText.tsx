import { Box, Tooltip, Typography, type SxProps, type Theme } from '@mui/material';

interface ISmartTruncateTextProps {
    value: string;
    isFileName?: boolean;
    maxWidth?: number | string;
    sx?: SxProps<Theme>
}

export function SmartTruncateText({
    sx,
    value,
    isFileName = false,
    maxWidth = 200,
}: ISmartTruncateTextProps) {
    let namePart = value;
    let extension = '';

    if (isFileName) {
        const lastDotIndex = value.lastIndexOf('.');
        if (lastDotIndex !== -1) {
            namePart = value.slice(0, lastDotIndex);
            extension = value.slice(lastDotIndex);
        }
    }

    return (
        <Tooltip title={value}>
            <Box
                display="flex"
                alignItems="center"
                maxWidth={maxWidth}
                overflow="hidden">
                <Typography
                    noWrap
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        minWidth: 0,
                        flexShrink: 1,
                        ...sx,
                    }}>
                    {namePart}
                </Typography>

                {isFileName && (
                    <Typography
                        sx={{ flexShrink: 0, marginLeft: 0.25, ...sx }}>
                        {extension}
                    </Typography>
                )}
            </Box>
        </Tooltip>
    );
};
