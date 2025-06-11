import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    Tooltip,
    Stack,
    type SxProps,
    type Theme
} from "@mui/material";
import type { ContentModel, ContentResponse } from "../../../models";
import { contentCategoryTranslations } from "../../../common";

interface ContentListTableProps {
    newsItems: ContentModel[];
    contentData?: ContentResponse;
    draggedOverIndex: number | null;
    draggedItem: ContentModel | null;
    emptyRowsCount: number;
    sx?: SxProps<Theme>;
    onDragStart: (e: React.DragEvent<HTMLTableRowElement>, item: ContentModel) => void;
    onDragOver: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void;
    onDrop: (e: React.DragEvent<HTMLTableRowElement>, index: number) => void;
    onDragEnd: () => void;
    onEdit: (item: ContentModel) => void;
    onDelete: (item: ContentModel) => void;
}

export function ContentListTable({
    newsItems,
    contentData,
    draggedOverIndex,
    draggedItem,
    emptyRowsCount,
    sx,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    onEdit,
    onDelete
}: ContentListTableProps) {
    const fixedWidths = {
        no: "5%",
        title: "50%",
        category: "15%",
        status: "10%",
        actions: "10%",
        move: "5%"
    };

    return (
        <Box sx={{
            ...sx,
            border: "none",
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden"
        }}>
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
                <Table stickyHeader sx={{ tableLayout: "fixed", width: "100%" }}>
                    <TableHead>
                        <TableRow sx={{ height: 40 }}>
                            <TableCell align="center" sx={headerCellStyle(fixedWidths.no)}>No.</TableCell>
                            <TableCell sx={headerCellStyle(undefined)}>Title</TableCell>
                            <TableCell sx={headerCellStyle(fixedWidths.category)}>Category</TableCell>
                            <TableCell sx={headerCellStyle(fixedWidths.status)}>Status</TableCell>
                            <TableCell align="center" sx={headerCellStyle(fixedWidths.actions)}></TableCell>
                            <TableCell align="center" sx={headerCellStyle(fixedWidths.move)}>Move</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {newsItems.map((item, index) => (
                            <TableRow
                                key={item.id}
                                draggable
                                onDragStart={(e) => onDragStart(e, item)}
                                onDragOver={(e) => onDragOver(e, index)}
                                onDrop={(e) => onDrop(e, index)}
                                onDragEnd={onDragEnd}
                                sx={{
                                    height: 40,
                                    bgcolor: draggedOverIndex === index
                                        ? "rgba(25, 118, 210, 0.08)"
                                        : index % 2 === 0 ? "white" : "#fafafa",
                                    opacity: draggedItem?.id === item.id ? 0.5 : 1,
                                    transition: "background-color 0.2s, opacity 0.2s"
                                }}>
                                <TableCell align="center" sx={bodyCellStyle(fixedWidths.no)}>
                                    {contentData ? contentData.paging.pageNo * contentData.paging.pageSize + index + 1 : index + 1}
                                </TableCell>
                                <TableCell sx={bodyCellStyle(undefined)}>
                                    <Tooltip title={item.title}>
                                        <Typography noWrap sx={{ fontSize: "22px", fontWeight: 400, color: "#525252" }}>
                                            {item.title}
                                        </Typography>
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={bodyCellStyle(fixedWidths.category)}>
                                    {contentCategoryTranslations[item.category]["th"]}
                                </TableCell>
                                <TableCell sx={bodyCellStyle(fixedWidths.status)}>
                                    <Typography sx={{
                                        color: item.status === "ACTIVE" ? "#0DAB26" : "#CA3B3B",
                                        fontWeight: 400,
                                        fontSize: "22px"
                                    }}>
                                        {item.status}
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={bodyCellStyle(fixedWidths.actions)}>
                                    <Stack direction="row" justifyContent="center">
                                        <IconButton onClick={() => onEdit(item)}>
                                            <Box component="img" src="src/assets/img/icons/pen.png" sx={{ width: 16, height: 16 }} />
                                        </IconButton>
                                        <IconButton onClick={() => onDelete(item)}>
                                            <Box component="img" src="src/assets/img/icons/bin.png" sx={{ width: 16, height: 16 }} />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell align="center" sx={bodyCellStyle(fixedWidths.move)}>
                                    <IconButton
                                        size="small"
                                        sx={{
                                            color: "#555",
                                            padding: "4px",
                                            cursor: "grab",
                                            "&:active": { cursor: "grabbing" }
                                        }}
                                        className="drag-handle">
                                        <Box component="img" src="src/assets/img/icons/drag.png" sx={{ width: 24 }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRowsCount > 0 &&
                            Array.from({ length: emptyRowsCount }).map((_, i) => (
                                <TableRow key={`empty-${i}`} sx={{
                                    height: 40,
                                    bgcolor: i % 2 === 0 ? "white" : "#fafafa"
                                }}>
                                    {["no", "title", "category", "status", "actions", "move"].map((key) => (
                                        <TableCell key={key} sx={bodyCellStyle(fixedWidths[key as keyof typeof fixedWidths])} />
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
}

const headerCellStyle = (width?: string): SxProps<Theme> => ({
    width,
    minWidth: width,
    height: "40px",
    padding: "0px 16px",
    bgcolor: "#CEDFFF",
    borderBottom: "none",
    color: "#05058C",
    fontWeight: "bold",
    fontSize: "16px"
});

const bodyCellStyle = (width?: string): SxProps<Theme> => ({
    width,
    minWidth: width,
    height: "40px",
    padding: "0px 16px",
    borderBottom: "1px solid #f0f0f0",
    color: "#525252",
    fontSize: "20px",
    fontWeight: 400
});
