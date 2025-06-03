import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
    Typography,
    type SxProps,
    type Theme,
    Stack
} from "@mui/material";
import type { ContentModel, ContentResponse } from "../../../models";
import { contentCategoryTranslations } from "../../../common";

interface DisplayContentListProps {
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

export function DisplayContentList({
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
}: DisplayContentListProps) {
    const columnWidths = {
        no: "5%",
        title: "40%",
        category: "10%",
        status: "10%",
        actions: "10%",
        move: "5%"
    };

    return (
        <Box sx={{
            ...sx,
            border: "none",
            borderRadius: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "100%"
        }}>
            <Box sx={{ overflow: "hidden", flexShrink: 0 }}>
                <Table sx={{ minWidth: 650, tableLayout: "fixed" }}>
                    <TableHead>
                        <TableRow sx={{ height: "40px" }}>
                            <TableCell
                                align="center"
                                sx={{
                                    height: "40px",
                                    padding: "0px 16px",
                                    width: columnWidths.no,
                                    bgcolor: "#CEDFFF",
                                    borderBottom: "none",
                                    color: "#05058C",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}>
                                No.
                            </TableCell>
                            <TableCell
                                sx={{
                                    height: "40px",
                                    padding: "0px 16px",
                                    width: columnWidths.title,
                                    bgcolor: "#CEDFFF",
                                    borderBottom: "none",
                                    color: "#05058C",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}>
                                Title
                            </TableCell>
                            <TableCell
                                sx={{
                                    height: "40px",
                                    padding: "0px 16px",
                                    width: columnWidths.category,
                                    bgcolor: "#CEDFFF",
                                    borderBottom: "none",
                                    color: "#05058C",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}>
                                Category
                            </TableCell>
                            <TableCell
                                sx={{
                                    height: "40px",
                                    padding: "0px 16px",
                                    width: columnWidths.status,
                                    bgcolor: "#CEDFFF",
                                    borderBottom: "none",
                                    color: "#05058C",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}>
                                Status
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    height: "40px",
                                    padding: "0px 16px",
                                    width: columnWidths.actions,
                                    bgcolor: "#CEDFFF",
                                    borderBottom: "none",
                                    color: "#05058C",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}>
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{
                                    height: "40px",
                                    padding: "0px 16px",
                                    width: columnWidths.move,
                                    bgcolor: "#CEDFFF",
                                    borderBottom: "none",
                                    color: "#05058C",
                                    fontWeight: "bold",
                                    fontSize: "16px"
                                }}>
                                Move
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </Box>

            <Box sx={{ overflowY: "auto", flexGrow: 1 }}>
                <Table sx={{ minWidth: 650, tableLayout: "fixed" }}>
                    <TableBody>
                        {newsItems.map((item, index) => (
                            <TableRow
                                key={item.id.toString()}
                                draggable
                                onDragStart={(e) => onDragStart(e, item)}
                                onDragOver={(e) => onDragOver(e, index)}
                                onDrop={(e) => onDrop(e, index)}
                                onDragEnd={onDragEnd}
                                sx={{
                                    height: "40px",
                                    "&:nth-of-type(odd)": { bgcolor: "#fafafa" },
                                    "&:nth-of-type(even)": { bgcolor: "white" },
                                    bgcolor: draggedOverIndex === index ? "rgba(25, 118, 210, 0.08)" : undefined,
                                    opacity: draggedItem?.id === item.id ? 0.5 : 1,
                                    transition: "background-color 0.2s, opacity 0.2s",
                                    cursor: "default"
                                }}>
                                <TableCell
                                    align="center"
                                    sx={{
                                        height: "40px",
                                        padding: "0px 16px",
                                        width: columnWidths.no,
                                        color: "#525252",
                                        fontSize: "22px",
                                        fontWeight: "400",
                                        borderBottom: "1px solid #f0f0f0"
                                    }}>
                                    {contentData ? contentData.paging.pageNo * contentData.paging.pageSize + index + 1 : index + 1}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        height: "40px",
                                        padding: "0px 16px",
                                        width: columnWidths.title,
                                        color: "#525252",
                                        fontSize: "22px",
                                        fontWeight: "400",
                                        borderBottom: "1px solid #f0f0f0"
                                    }}>
                                    {item.title}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        height: "40px",
                                        padding: "0px 16px",
                                        width: columnWidths.category,
                                        fontWeight: "400",
                                        color: "#525252",
                                        fontSize: "20px",
                                        borderBottom: "1px solid #f0f0f0"
                                    }}>
                                    {contentCategoryTranslations[item.category]["th"]}
                                </TableCell>
                                <TableCell
                                    sx={{
                                        height: "40px",
                                        padding: "0px 16px",
                                        width: columnWidths.status,
                                        borderBottom: "1px solid #f0f0f0"
                                    }}>
                                    <Typography
                                        sx={{
                                            color: item.status === "ACTIVE" ? "#0DAB26" : "#CA3B3B",
                                            fontWeight: "400",
                                            fontSize: "22px"
                                        }}>
                                        {item.status}
                                    </Typography>
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        height: "40px",
                                        padding: "0px 16px",
                                        width: columnWidths.actions,
                                        borderBottom: "1px solid #f0f0f0",
                                    }}>
                                    <Stack direction="row" justifyContent="center">
                                        <IconButton
                                            onClick={() => onEdit(item)}>
                                            <Box component={"img"} src="src/assets/img/icons/pen.png" sx={{ width: "16px", height: "16px", }} />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => onDelete(item)}>
                                            <Box component={"img"} src="src/assets/img/icons/bin.png" sx={{ width: "16px", height: "16px", }} />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        height: "40px",
                                        padding: "0px 16px",
                                        width: columnWidths.move,
                                        borderBottom: "1px solid #f0f0f0"
                                    }}>
                                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                                        <IconButton
                                            size="small"
                                            sx={{
                                                color: "#555",
                                                padding: "4px",
                                                cursor: "grab",
                                                "&:active": {
                                                    cursor: "grabbing"
                                                }
                                            }}
                                            className="drag-handle">
                                            <Box component={"img"} src="src/assets/img/icons/drag.png" sx={{ width: "24px" }} />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRowsCount > 0 &&
                            Array.from({ length: emptyRowsCount }).map((_, index) => (
                                <TableRow
                                    key={`empty-${index}`}
                                    sx={{
                                        height: "40px",
                                        "&:nth-of-type(odd)": { bgcolor: "#fafafa" },
                                        "&:nth-of-type(even)": { bgcolor: "white" }
                                    }}>
                                    <TableCell sx={{
                                        height: "40px",
                                        borderBottom: "1px solid #f0f0f0",
                                        width: columnWidths.no
                                    }} />
                                    <TableCell sx={{
                                        height: "40px",
                                        borderBottom: "1px solid #f0f0f0",
                                        width: columnWidths.title
                                    }} />
                                    <TableCell sx={{
                                        height: "40px",
                                        borderBottom: "1px solid #f0f0f0",
                                        width: columnWidths.category
                                    }} />
                                    <TableCell sx={{
                                        height: "40px",
                                        borderBottom: "1px solid #f0f0f0",
                                        width: columnWidths.status
                                    }} />
                                    <TableCell sx={{
                                        height: "40px",
                                        borderBottom: "1px solid #f0f0f0",
                                        width: columnWidths.actions
                                    }} />
                                    <TableCell sx={{
                                        height: "40px",
                                        borderBottom: "1px solid #f0f0f0",
                                        width: columnWidths.move
                                    }} />
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </Box >
    );
}