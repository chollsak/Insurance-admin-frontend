import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton,
  MenuItem,
  Select,
  FormControl,
  Button,
  Breadcrumbs,
  Link,
  type SelectChangeEvent,
  Divider,
  CircularProgress,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { contentService } from '../../api/services/contentService';
import type { Content, ContentCategory, ContentListData } from '../../api/types/content';
import { bannerService } from '../../api/services/bannerService';
import { insuranceService } from '../../api/services/insuranceService';
import { promotionService } from '../../api/services/promotionService';
import { suitInsuranceService } from '../../api/services/suitInsuranceService';

type UICategory = 'เเบนเนอร์' | 'โปรโมชั่น' | 'ประกันภัย' | 'ประกันที่เหมาะสม';

const mapUICategoryToAPI = (uiCategory: UICategory): ContentCategory => {
  switch (uiCategory) {
    case 'เเบนเนอร์':
      return 'BANNER';
    case 'โปรโมชั่น':
      return 'PROMOTION';
    case 'ประกันภัย':
      return 'INSURANCE';
    case 'ประกันที่เหมาะสม':
      return 'SUIT_INSURANCE';
    default:
      return 'BANNER';
  }
};

const mapAPICategoryToUI = (apiCategory: ContentCategory): UICategory => {
  switch (apiCategory) {
    case 'BANNER':
      return 'เเบนเนอร์';
    case 'PROMOTION':
      return 'โปรโมชั่น';
    case 'INSURANCE':
      return 'ประกันภัย';
    case 'SUIT_INSURANCE':
      return 'ประกันที่เหมาะสม';
    default:
      return 'เเบนเนอร์'; 
  }
};

interface NewsItem {
  id: string;
  title: string;
  category: UICategory;
  status: 'ACTIVE' | 'INACTIVE';
  categoryContentId: string;
}

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const navigate = useNavigate();
  
  const [contentData, setContentData] = useState<ContentListData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<NewsItem | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);


useEffect(() => {
  const fetchNewsContent = async () => {
    try {
      setLoading(true);
      
      let data: ContentListData;
      
      if (selectedCategory === 'เเบนเนอร์') {
        data = await contentService.getContentsByCategory(
          'BANNER', 
          currentPage, 
          rowsPerPage
        );
      } else if (selectedCategory === 'โปรโมชั่น') {
        data = await contentService.getContentsByCategory(
          'PROMOTION', 
          currentPage, 
          rowsPerPage
        );
      } else if (selectedCategory === 'ประกันภัย') {
        data = await contentService.getContentsByCategory(
          'INSURANCE', 
          currentPage, 
          rowsPerPage
        );
      } else if (selectedCategory === 'ประกันที่เหมาะสม') {
        data = await contentService.getContentsByCategory(
          'SUIT_INSURANCE', 
          currentPage, 
          rowsPerPage
        );
      } else {
        
        data = await contentService.getAllContents(currentPage, rowsPerPage);
      }
      
      console.log('Fetched content data:', data);
      setContentData(data);
      
      const mappedItems: NewsItem[] = data.content
        .map((item) => {
          const uiCategory = mapAPICategoryToUI(item.category as ContentCategory);
          
          return {
            id: item.id,
            title: item.title,
            category: uiCategory,
            status: item.status as 'ACTIVE' | 'INACTIVE',
            categoryContentId: item.categoryContentId
          };
        });
      
      setNewsItems(mappedItems);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch news content:', err);
      setError('Failed to load news content');
      
      setNewsItems([
        { id: '1', title: 'กรุงเทพประกันภัยได้รับการจัดอันดับความน่าเชื่อถือ A- (Stable)', category: 'เเบนเนอร์', status: 'ACTIVE', categoryContentId: '' },
        { id: '2', title: 'กรุงเทพประกันภัยยึดมั่นองค์กรโปร่งใส รับประกาศนียบัตรรับรองจาก CAC', category: 'โปรโมชั่น', status: 'INACTIVE', categoryContentId: '' },
        { id: '3', title: 'กรุงเทพประกันภัยยึดมั่นองค์กรโปร่งใส รับประกาศนียบัตรรับรองจาก CAC', category: 'ประกันภัย', status: 'INACTIVE', categoryContentId: '' },
        { id: '4', title: 'บีเคไอ โฮลดิ้งส์ ได้รับการประเมินการกำกับดูแลกิจการในระดับ 5 ดาว', category: 'ประกันที่เหมาะสม', status: 'INACTIVE', categoryContentId: '' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  fetchNewsContent();
}, [selectedCategory, currentPage, rowsPerPage]);

  const handleNewClick = () => {
    navigate('/Create/Banner');
  };

  const handleCategoryChange = (event: SelectChangeEvent): void => {
    setSelectedCategory(event.target.value);
    setCurrentPage(0);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent): void => {
    const newRowsPerPage = parseInt(event.target.value as string, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0);
  };

  const emptyRowsCount = Math.max(0, rowsPerPage - newsItems.length);
  
  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, item: NewsItem): void => {
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

  // Handle edit and delete
  const handleEdit = (item: NewsItem) => {
    // Map back to the appropriate API category
    const apiCategory = mapUICategoryToAPI(item.category);
    navigate(`/Edit/${apiCategory}/${item.id}`);
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
  
  // Usage with dialog in your component:
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    item: NewsItem | null;
  }>({ open: false, item: null });
  
  const handleDeleteClick = (item: NewsItem) => {
    setDeleteDialog({ open: true, item });
  };
  
  const handleConfirmDelete = async () => {
    if (deleteDialog.item) {
      await handleDelete(deleteDialog.item);
      setDeleteDialog({ open: false, item: null });
    }
  };
  
  const handleCloseDialog = () => {
    setDeleteDialog({ open: false, item: null });
  };

  const handleDelete = async (item: NewsItem) => {
    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ "${item.title}"?`)) {
      try {
        setLoading(true);
        
        const apiCategory = mapUICategoryToAPI(item.category);
        
        switch (apiCategory) {
          case 'BANNER':
            await bannerService.deleteBanner(item.categoryContentId);
            break;
          case 'PROMOTION':
            await promotionService.deletePromotion(item.categoryContentId);
            break;
          case 'INSURANCE':
            await insuranceService.deleteInsurance(item.categoryContentId);
            break;
          case 'SUIT_INSURANCE':
            await suitInsuranceService.deleteSuitInsurance(item.categoryContentId);
            break;
          default:
            throw new Error(`Unsupported category: ${apiCategory}`);
        }
        
        // Remove from local state after successful deletion
        setNewsItems(prev => prev.filter(i => i.id !== item.id));
        
        // Update the content data to reflect the new total count
        if (contentData) {
          setContentData(prev => prev ? {
            ...prev,
            paging: {
              ...prev.paging,
              totalRow: prev.paging.totalRow - 1,
              totalPage: Math.ceil((prev.paging.totalRow - 1) / prev.paging.pageSize)
            }
          } : null);
        }
        
        // Show success message
        alert('ลบข้อมูลสำเร็จ');
        
      } catch (err: any) {
        console.error('Failed to delete content:', err);
        
        // Show specific error message based on error type
        let errorMessage = 'เกิดข้อผิดพลาดในการลบข้อมูล กรุณาลองใหม่อีกครั้ง';
        
        if (err.response?.status === 404) {
          errorMessage = 'ไม่พบข้อมูลที่ต้องการลบ';
        } else if (err.response?.status === 403) {
          errorMessage = 'คุณไม่มีสิทธิ์ในการลบข้อมูลนี้';
        } else if (err.response?.status === 409) {
          errorMessage = 'ไม่สามารถลบข้อมูลนี้ได้เนื่องจากมีการใช้งานอยู่';
        }
        
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box sx={{ p: 3, mt: 2 }}>
      {/* Header with exact breadcrumb styling */}
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
            }}
          >
            ข่าวสารและกิจกรรม
          </Typography>
          <Typography fontWeight={'bold'} sx={{ mx: 1, color: '#666', fontSize:'24px'}}>|</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href="/"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                textDecoration: 'none',
                color: '#4285F4',
                mr: 0.5,
                ml: 2,
                fontSize: '24px',
                fontWeight: 'light'
              }}
            >
              <Box component={'img'} src='src/assets/img/news/homeicon.png' sx={{ mr: 0.5, width: '12px' }} />
              Home
            </Link>
            <Typography sx={{ mx: 0.5, color: '#515252', fontSize: '24px', mr: 1 }}>/</Typography>
            <Typography sx={{ color: '#515252', fontSize: '20px' }}>
              ข่าวสารและกิจกรรม
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mt: -1.5 }} />
      </Box>

      {/* Result and controls section */}
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
                IconComponent={() => (
                  <Box
                    component="img"
                    src="/src/assets/img/icons/v.png"
                    alt="Arrow Down"
                    sx={{ width: '24px', height: '24px', mr: 1 }}
                  />
                )}
                sx={{ 
                  height: 40,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#d0d0d0'
                  }
                }}
              >
                <MenuItem value="">
                  <em>ทั้งหมด</em>
                </MenuItem>
                <MenuItem value="เเบนเนอร์">เเบนเนอร์</MenuItem>
                <MenuItem value="โปรโมชั่น">โปรโมชั่น</MenuItem>
                <MenuItem value="ประกันภัย">ประกันภัย</MenuItem>
                <MenuItem value="ประกันที่เหมาะสม">ประกันที่เหมาะสม</MenuItem>
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
                sx={{ width: '16px', height: '16px' }}
              />
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
            }}
          >
            New
          </Button>
        </Box>
      </Box>

      {/* Loading indicator */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress sx={{ color: '#3978E9' }} />
        </Box>
      ) : (
        /* Table with draggable rows */
        <TableContainer 
          sx={{ 
            mb: 3,
            border: 'none',
            borderRadius: 0,
            overflow: 'hidden'
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="news table">
            <TableHead>
              <TableRow sx={{ height: '40px' }}>
                <TableCell 
                  align="center" 
                  sx={{ 
                    height: '40px',
                    padding: '0px 16px',
                    width: '5%',
                    bgcolor: '#CEDFFF',
                    borderBottom: 'none',
                    color: '#05058C',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  No.
                </TableCell>
                <TableCell 
                  sx={{ 
                    height: '40px',
                    padding: '0px 16px',
                    width: '40%', 
                    bgcolor: '#CEDFFF',
                    borderBottom: 'none',
                    color: '#05058C',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Title
                </TableCell>
                <TableCell 
                  sx={{ 
                    height: '40px',
                    padding: '0px 16px',
                    width: '10%', 
                    bgcolor: '#CEDFFF',
                    borderBottom: 'none',
                    color: '#05058C',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Category
                </TableCell>
                <TableCell 
                  sx={{ 
                    height: '40px',
                    padding: '0px 16px',
                    width: '10%', 
                    bgcolor: '#CEDFFF',
                    borderBottom: 'none',
                    color: '#05058C',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Status
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    height: '40px',
                    padding: '0px 16px',
                    width: '10%', 
                    bgcolor: '#CEDFFF',
                    borderBottom: 'none',
                    color: '#05058C',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    height: '40px',
                    padding: '0px 16px',
                    width: '5%', 
                    bgcolor: '#CEDFFF',
                    borderBottom: 'none',
                    color: '#05058C',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  Move
                </TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {newsItems.map((item, index) => (
                <TableRow
                  key={item.id.toString()}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  sx={{ 
                    height: '40px',
                    '&:nth-of-type(odd)': { bgcolor: '#fafafa' },
                    '&:nth-of-type(even)': { bgcolor: 'white' },
                    bgcolor: draggedOverIndex === index ? 'rgba(25, 118, 210, 0.08)' : undefined,
                    opacity: draggedItem?.id === item.id ? 0.5 : 1,
                    transition: 'background-color 0.2s, opacity 0.2s',
                    cursor: 'default'
                  }}
                >
                  <TableCell 
                    align="center" 
                    sx={{ 
                      height: '40px',
                      padding: '0px 16px',
                      color: '#525252',
                      fontSize:'22px',
                      fontWeight: '400',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    {contentData ? contentData.paging.pageNo * contentData.paging.pageSize + index + 1 : index + 1}
                  </TableCell>
                  <TableCell
                    sx={{ 
                      height: '40px',
                      padding: '0px 16px',
                      color: '#525252',
                      fontSize:'22px',
                      fontWeight: '400',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell
                    sx={{ 
                      height: '40px',
                      padding: '0px 16px',
                      fontWeight: '400',
                      color: '#525252',
                      fontSize:'20px',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    {item.category}
                  </TableCell>
                  <TableCell
                    sx={{ 
                      height: '40px',
                      padding: '0px 16px',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    <Typography 
                      sx={{ 
                        color: item.status === 'ACTIVE' ? '#0DAB26' : '#CA3B3B',
                        fontWeight: '400',
                        fontSize:'22px'
                      }}
                    >
                      {item.status}
                    </Typography>
                  </TableCell>
                  <TableCell 
                    align="center"
                    sx={{ 
                      height: '40px',
                      padding: '0px 16px',
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          color: '#555', 
                          paddingRight: '20px',
                          '&:hover': { 
                            color: '#1976d2' 
                          }
                        }}
                        onClick={() => handleEdit(item)}
                      >
                        <Box component={'img'} src='src/assets/img/icons/pen.png' sx={{ width:'16px' }} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          color: '#555', 
                          padding: '4px',
                          '&:hover': { 
                            color: '#d32f2f' 
                          }
                        }}
                        onClick={() => handleDelete(item)}
                      >
                        <Box component={'img'} src='src/assets/img/icons/bin.png' sx={{ width:'16px' }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell 
                    align="center"
                    sx={{ 
                      height: '40px',
                      padding: '0px 16px',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <IconButton 
                        size="small" 
                        sx={{ 
                          color: '#555', 
                          padding: '4px', 
                          cursor: 'grab',
                          '&:active': {
                            cursor: 'grabbing'
                          }
                        }}
                        className="drag-handle"
                      >
                        <Box component={'img'} src='src/assets/img/icons/drag.png' sx={{ width:'24px' }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              
              {/* Empty rows to fill up to rowsPerPage */}
              {emptyRowsCount > 0 && 
                Array.from({ length: emptyRowsCount }).map((_, index) => (
                  <TableRow 
                    key={`empty-${index}`}
                    sx={{ 
                      height: '40px',
                      '&:nth-of-type(odd)': { bgcolor: '#fafafa' },
                      '&:nth-of-type(even)': { bgcolor: 'white' }
                    }}
                  >
                  <TableCell sx={{ height: '40px', borderBottom: '1px solid #f0f0f0' }} />
                  <TableCell sx={{ height: '40px', borderBottom: '1px solid #f0f0f0' }} />
                  <TableCell sx={{ height: '40px', borderBottom: '1px solid #f0f0f0' }} />
                  <TableCell sx={{ height: '40px', borderBottom: '1px solid #f0f0f0' }} />
                  <TableCell sx={{ height: '40px', borderBottom: '1px solid #f0f0f0' }} />
                  <TableCell sx={{ height: '40px', borderBottom: '1px solid #f0f0f0' }} />
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      )}

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
            IconComponent={() => (
              <Box
                component="img"
                src="/src/assets/img/icons/v.png"
                alt="Arrow Down"
                sx={{ width: '20px', height: '20px', mr: 1 }}
              />
            )}
            sx={{ 
              mr: 2, 
              minWidth: 60,
              height: 32
            }}
          >
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

        <Typography variant="body2" sx={{mb:0.5}}>
          {getPaginationText()}
        </Typography>

        <Box>
          <IconButton 
            size="small" 
            disabled={!contentData || currentPage === 0}
            onClick={handleFirstPage}
            sx={{ color: '#ccc' }}
          >
            <Box
              component="img"
              src="/src/assets/img/icons/double-arrow-left.png"
              alt="First Page"
              sx={{ 
                width: '20px', 
                height: '20px', 
                opacity: !contentData || currentPage === 0 ? 0.5 : 1 
              }}
            />
          </IconButton>
          <IconButton 
            size="small" 
            disabled={!contentData || currentPage === 0}
            onClick={handlePreviousPage}
            sx={{ color: '#ccc' }}
          >
            <Box
              component="img"
              src="/src/assets/img/icons/arrow-left.png"
              alt="Previous Page"
              sx={{ 
                width: '20px', 
                height: '20px', 
                opacity: !contentData || currentPage === 0 ? 0.5 : 1 
              }}
            />
          </IconButton>
          <IconButton 
            size="small" 
            disabled={!contentData || currentPage >= contentData.paging.totalPage - 1}
            onClick={handleNextPage}
          >
            <Box
              component="img"
              src="/src/assets/img/icons/arrow-right.png"
              alt="Next Page"
              sx={{ 
                width: '20px', 
                height: '20px',
                opacity: !contentData || currentPage >= contentData.paging.totalPage - 1 ? 0.5 : 1
              }}
            />
          </IconButton>
          <IconButton 
            size="small" 
            disabled={!contentData || currentPage >= contentData.paging.totalPage - 1}
            onClick={handleLastPage}
          >
            <Box
              component="img"
              src="/src/assets/img/icons/double-arrow-right.png"
              alt="Last Page"
              sx={{ 
                width: '20px', 
                height: '20px',
                opacity: !contentData || currentPage >= contentData.paging.totalPage - 1 ? 0.5 : 1
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default News;