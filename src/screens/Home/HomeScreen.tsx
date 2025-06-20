import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useOutletContext, } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Button,
  type SelectChangeEvent,
  Divider,
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  type SxProps,
  type Theme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import type { ContentCategory, ContentModel } from '../../models';
import { useContentsQuery, useDeleteContent } from '../../hooks';
import { DisplayContentList } from '../../components';

export default function HomeScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  const { sx } = useOutletContext<{ sx?: SxProps<Theme> }>();

  const isRootPath = location.pathname === '/';
  const [selectedCategory, setSelectedCategory] = useState<"ALL" | ContentCategory>("ALL");
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { mutate: deleteContent } = useDeleteContent();
  const { data: response, isLoading } = useContentsQuery(selectedCategory, currentPage, rowsPerPage);
  const contentData = response?.data;
  const [newsItems, setNewsItems] = useState<ContentModel[]>([]);

  useEffect(() => {
    if (response?.data?.content) {
      setNewsItems(response.data.content);
    }
  }, [response?.data?.content]);

  const [draggedItem, setDraggedItem] = useState<ContentModel | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const handleNewClick = () => {
    navigate('/content/new');
  };

  const handleCategoryChange = (event: SelectChangeEvent): void => {
    setSelectedCategory(event.target.value as "ALL" | ContentCategory);
    setCurrentPage(0);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent): void => {
    const newRowsPerPage = parseInt(event.target.value as string, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0);
  };

  const emptyRowsCount = Math.max(0, rowsPerPage - newsItems.length);
  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, item: ContentModel): void => {
    setDraggedItem(item);
    const dragImg = document.createElement('img');
    dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImg, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, index: number): void => {
    e.preventDefault();
    setDraggedOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetIndex: number): void => {
    e.preventDefault();

    if (!draggedItem) return;

    const sourceIndex = newsItems.findIndex(item => item.id === draggedItem.id);
    if (sourceIndex === targetIndex) return;

    const newItems = [...newsItems];
    newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, draggedItem);

    setNewsItems(newItems);

    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  const handleDragEnd = (): void => {
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  const handleFirstPage = () => {
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    if (contentData) {
      setCurrentPage(prev => Math.min(contentData.paging.totalPage - 1, prev + 1));
    }
  };

  const handleLastPage = () => {
    if (contentData) {
      setCurrentPage(contentData.paging.totalPage - 1);
    }
  };

  const getPaginationText = (): string => {
    if (!contentData) return '0-0 of 0';

    const { pageNo, pageSize, totalRow } = contentData.paging;
    const start = pageNo * pageSize + 1;
    const end = Math.min((pageNo + 1) * pageSize, totalRow);

    return `${start}-${end} of ${totalRow}`;
  };

  const handleEdit = (item: ContentModel) => {
    // going to new page
  };

  const ConfirmDeleteDialog = ({
    open,
    onClose,
    onConfirm,
    title
  }: {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
  }) => {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>ยืนยันการลบ</DialogTitle>
        <DialogContent>
          <DialogContentText>
            คุณแน่ใจหรือไม่ว่าต้องการลบ "{title}"?
            การดำเนินการนี้ไม่สามารถยกเลิกได้
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={onConfirm} color="error" variant="contained">
            ลบ
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    item: ContentModel | null;
  }>({ open: false, item: null });

  const handleDeleteClick = (item: ContentModel) => {
    setDeleteDialog({ open: true, item });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.item) {
      deleteContent(deleteDialog.item);
      setDeleteDialog({ open: false, item: null });
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialog({ open: false, item: null });
  };

  return (
    <>
      <ConfirmDeleteDialog
        title={deleteDialog.item?.title!}
        open={deleteDialog.open}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
      <Box
        sx={{
          ...sx,
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2
          }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                color: '#05058C',
                fontWeight: 'bold',
                fontSize: '24px',
                mr: 1
              }}>
              ข่าวสารและกิจกรรม
            </Typography>
            <Typography fontWeight={'bold'} sx={{ mx: 1, color: '#666', fontSize: '24px' }}>|</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="a"
                onClick={() => {
                  if (!isRootPath) {
                    navigate("/")
                  }
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#4285F4',
                  mr: 0.5,
                  ml: 2,
                  fontSize: '24px',
                  fontWeight: 'light',
                  cursor: "pointer",
                }}>
                <Box component={'img'} src='src/assets/img/news/homeicon.png' sx={{ mr: 0.5, width: "16px", height: "16px", }} />
                <Typography sx={{ textDecoration: "underline", fontSize: "20px", lineHeight: "100%", }}>Home</Typography>
              </Box>
              <Typography sx={{ mx: 0.5, color: '#515252', fontSize: '24px', mr: 1 }}>/</Typography>
              <Typography sx={{ color: '#515252', fontSize: '20px' }}>
                ข่าวสารและกิจกรรม
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ mt: -1.5 }} />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1, mt: -2 }}>
          <Typography fontSize={24} sx={{ fontWeight: 'bold', color: '#05058C' }}>
            Result
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ mr: 2, color: '#555', fontWeight: 'regular', fontSize: '22px' }}>
                Select Category
              </Typography>
              <FormControl sx={{ minWidth: 210 }}>
                <Select
                  value={selectedCategory}
                  displayEmpty
                  onChange={handleCategoryChange}
                  IconComponent={ExpandMoreIcon}
                  sx={{
                    height: 40,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#d0d0d0'
                    }
                  }}>
                  <MenuItem value="ALL">
                    <em>ทั้งหมด</em>
                  </MenuItem>
                  <MenuItem value="BANNER">เเบนเนอร์</MenuItem>
                  <MenuItem value="PROMOTION">โปรโมชั่น</MenuItem>
                  <MenuItem value="INSURANCE">ประกันภัย</MenuItem>
                  <MenuItem value="SUIT_INSURANCE">ประกันที่เหมาะสม</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              variant="contained"
              startIcon={
                <Box
                  component="img"
                  src="/src/assets/img/icons/add.png"
                  alt="Add"
                  sx={{ width: '16px', height: '16px' }} />
              }
              onClick={handleNewClick}
              sx={{
                bgcolor: '#3978E9',
                height: 36,
                width: '145px',
                px: 3,
                '&:hover': { bgcolor: '#3367d6' },
                borderRadius: 1,
                fontSize: '22px'
              }}>
              New
            </Button>
          </Box>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress sx={{ color: '#3978E9' }} />
          </Box>
        ) : <DisplayContentList
          newsItems={newsItems}
          contentData={contentData}
          draggedOverIndex={draggedOverIndex}
          draggedItem={draggedItem}
          emptyRowsCount={emptyRowsCount}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />}

        {/* Pagination */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'end',
          mt: 2,
          color: '#555'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              Rows per page
            </Typography>
            <Select
              value={rowsPerPage.toString()}
              onChange={handleRowsPerPageChange}
              size="small"
              IconComponent={ExpandMoreIcon}
              sx={{
                mr: 2,
                minWidth: 60,
                height: 32,
              }}>
              {contentData?.paging.rowsPerPageOption.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              )) || [
                  <MenuItem key={10} value={10}>10</MenuItem>,
                  <MenuItem key={25} value={25}>25</MenuItem>,
                  <MenuItem key={50} value={50}>50</MenuItem>
                ]}
            </Select>
          </Box>

          <Typography variant="body2" sx={{ mb: 0.5 }}>
            {getPaginationText()}
          </Typography>

          <Box>
            <IconButton
              size="small"
              disabled={!contentData || currentPage === 0}
              onClick={handleFirstPage}
              sx={{ color: '#ccc' }}>
              <FirstPageIcon
                sx={{
                  width: '20px',
                  height: '20px',
                  opacity: !contentData || currentPage === 0 ? 0.5 : 1
                }} />
            </IconButton>
            <IconButton
              size="small"
              disabled={!contentData || currentPage === 0}
              onClick={handlePreviousPage}
              sx={{ color: '#ccc' }}>
              <ChevronLeftIcon sx={{
                width: '20px',
                height: '20px',
                opacity: !contentData || currentPage === 0 ? 0.5 : 1
              }} />

            </IconButton>
            <IconButton
              size="small"
              disabled={!contentData || currentPage >= contentData.paging.totalPage - 1}
              onClick={handleNextPage}>
              <ChevronRightIcon sx={{
                width: '20px',
                height: '20px',
                opacity: !contentData || currentPage >= contentData.paging.totalPage - 1 ? 0.5 : 1
              }} />
            </IconButton>
            <IconButton
              size="small"
              disabled={!contentData || currentPage >= contentData.paging.totalPage - 1}
              onClick={handleLastPage}>
              <LastPageIcon sx={{
                width: '20px',
                height: '20px',
                opacity: !contentData || currentPage >= contentData.paging.totalPage - 1 ? 0.5 : 1
              }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};