import React, { useState, useRef } from 'react';
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
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NewsItem {
  id: number;
  title: string;
  category: string;
  status: 'Active' | 'Inactive';
}

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const navigate = useNavigate();

  const handleNewClick = () => {
    navigate('/Create/Banner');
  };
  
  // Initial news items data
  const initialNewsItems: NewsItem[] = [
    { id: 1, title: 'กรุงเทพประกันภัยได้รับการจัดอันดับความน่าเชื่อถือ A- (Stable)', category: 'ข่าวสาร', status: 'Active' },
    { id: 2, title: 'กรุงเทพประกันภัยยึดมั่นองค์กรโปร่งใส รับประกาศนียบัตรรับรองจาก CAC', category: 'กิจกรรม', status: 'Inactive' },
    { id: 3, title: 'กรุงเทพประกันภัยยึดมั่นองค์กรโปร่งใส รับประกาศนียบัตรรับรองจาก CAC', category: 'กิจกรรม', status: 'Inactive' },
    { id: 4, title: 'บีเคไอ โฮลดิ้งส์ ได้รับการประเมินการกำกับดูแลกิจการในระดับ 5 ดาว', category: 'กิจกรรม', status: 'Inactive' }
  ];
  
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNewsItems);
  const [draggedItem, setDraggedItem] = useState<NewsItem | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  const handleCategoryChange = (event: SelectChangeEvent): void => {
    setSelectedCategory(event.target.value);
  };

  const handleRowsPerPageChange = (event: SelectChangeEvent): void => {
    setRowsPerPage(parseInt(event.target.value as string, 10));
  };

  // Calculate how many empty rows to add
  const emptyRowsCount = Math.max(0, rowsPerPage - newsItems.length);
  
  // Drag and drop functionality
  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, item: NewsItem): void => {
    setDraggedItem(item);
    // Make the drag image transparent
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
                <MenuItem value="ข่าวสาร">ข่าวสาร</MenuItem>
                <MenuItem value="กิจกรรม">กิจกรรม</MenuItem>
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

      {/* Table with draggable rows */}
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
                  {item.id}
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
                    fontSize:'22px',
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
                      color: item.status === 'Active' ? '#0DAB26' : '#CA3B3B',
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
            
            {/* Empty rows to fill up to 10 */}
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
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </Box>

        <Typography variant="body2" sx={{mb:0.5}}>
          1-3 of 3
        </Typography>

        <Box >
          <IconButton size="small" disabled sx={{ color: '#ccc' }}>
            <Box
              component="img"
              src="/src/assets/img/icons/double-arrow-left.png"
              alt="First Page"
              sx={{ width: '20px', height: '20px', opacity: 0.5 }}
            />
          </IconButton>
          <IconButton size="small" disabled sx={{ color: '#ccc' }}>
            <Box
              component="img"
              src="/src/assets/img/icons/arrow-left.png"
              alt="Previous Page"
              sx={{ width: '20px', height: '20px', opacity: 0.5 }}
            />
          </IconButton>
          <IconButton size="small" disabled>
            <Box
              component="img"
              src="/src/assets/img/icons/arrow-right.png"
              alt="Next Page"
              sx={{ width: '20px', height: '20px' }}
            />
          </IconButton>
          <IconButton size="small" disabled >
            <Box
              component="img"
              src="/src/assets/img/icons/double-arrow-right.png"
              alt="Last Page"
              sx={{ width: '20px', height: '20px' }}
            />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default News;