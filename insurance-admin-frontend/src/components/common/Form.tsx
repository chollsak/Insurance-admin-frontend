import { Box, Divider, Grid, Link, Typography, Button, TextField, IconButton } from "@mui/material";
import React, { useState } from "react";
import FormComponent from "./FormComponent";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

export default function Form() {
  const [contents, setContents] = useState([
    { id: 1, file: 'cover01.jpg', link: '' },
    { id: 2, file: 'cover01.jpg', link: '' }
  ]);

  const fileInfo = "สกุลไฟล์.jpg ขนาดไฟล์ 374 x 100 px , ขนาดไม่เกิน 100 kb";

  const handleAddContent = () => {
    const newId = contents.length > 0 ? Math.max(...contents.map(c => c.id)) + 1 : 1;
    setContents([...contents, { id: newId, file: '', link: '' }]);
  };

  return (
    <Box>
      <Grid container spacing={2} >
        <Grid size={8.2}>
          <Box sx={{ pt:3, pl:3}}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  color: "#05058C",
                  fontWeight: "bold",
                  fontSize: "24px",
                  mr: 1,
                }}
              >
                ข่าวสารและกิจกรรม
              </Typography>
              <Typography
                fontWeight={"bold"}
                sx={{ mx: 1, color: "#666", fontSize: "24px" }}
              >
                |
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Link
                  href="/"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#4285F4",
                    mr: 0.5,
                    ml: 2,
                    fontSize: "24px",
                    fontWeight: "light",
                  }}
                >
                  <Box
                    component={"img"}
                    src="src/assets/img/news/homeicon.png"
                    sx={{ mr: 0.5, width: "12px" }}
                  />
                  Home
                </Link>
                <Typography
                  sx={{ mx: 0.5, color: "#515252", fontSize: "24px", mr: 1 }}
                >
                  /
                </Typography>
                <Typography sx={{ color: "#515252", fontSize: "20px" }}>
                  ข่าวสารและกิจกรรม
                </Typography>
                <Typography
                  sx={{ mx: 0.5, color: "#515252", fontSize: "24px", mr: 1 }}
                >
                  /
                </Typography>
                <Typography sx={{ color: "#515252", fontSize: "20px" }}>
                    Create
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ mt: -1.5, width:'110%'}} />
          </Box>

          <Box sx={{display:'flex', m:3}}>
              <FormComponent />
              <Box sx={{ml:9, bgcolor:'#F4F5FA', height:'100vh',width:'578px', borderRadius:'8px'}}>
                  <Typography sx={{fontSize:'24px', mt:1, ml:2}}>รายละเอียดเนื้อหา</Typography>
                  <Divider sx={{width:'100%', mt:1}} />
              </Box>
          </Box>
        </Grid>

        <Grid size={3.8}>
          <Box sx={{ height: "100vh", width: "100%", bgcolor: "white" }}>
            <Box sx={{display:'flex', p:3}}>
                <Box component={'img'} src="/src/assets/img/icons/arrow.png" width={'24px'} height={'24px'} />
                <Typography sx={{color:'#05058C', fontWeight:'500', fontSize:'22px', ml:1.5, mt:-0.5}} >เลือกเเสดงผล</Typography>
            </Box>
            <Divider sx={{ mt: -1.6, width:'100%'}} />
            
            {/* Display Selection Content */}
            <Box sx={{ p: 2, overflowY: 'auto' }}>
              {/* Image Upload */}
              <Box sx={{ mb: 3 }}>
                <Typography component="label" sx={{ 
                  display: 'block', 
                  mb: 1,
                  fontSize: '16px',
                  color: '#000'
                }}>
                  ภาพปก <span style={{ color: '#FF0000' }}>*</span>
                </Typography>
                
                <Box sx={{ mb: 1 }}>
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      borderColor: '#3B82F6', 
                      color: '#3B82F6', 
                      textTransform: 'none',
                      borderRadius: '8px',
                      height: '40px',
                      px: 3
                    }}
                  >
                    เลือกไฟล์
                  </Button>
                  
                  {/* Displayed file with delete option */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
                    <Typography sx={{ color: '#3B82F6', flex: 1 }}>cover01.jpg</Typography>
                    <IconButton size="small">
                      <CloseIcon sx={{ color: '#3B82F6' }} />
                    </IconButton>
                  </Box>
                  
                  <Typography sx={{ color: '#666', fontSize: '12px' }}>
                    {fileInfo}
                  </Typography>
                </Box>

                {/* Link Input */}
                <Box sx={{ mt: 3, mb: 3 }}>
                  <Typography component="label" sx={{ 
                    display: 'block', 
                    mb: 1,
                    fontSize: '16px',
                    color: '#000'
                  }}>
                    ลิงค์ <span style={{ color: '#FF0000' }}>*</span>
                  </Typography>
                  
                  <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                    <TextField
                      placeholder="http://"
                      variant="outlined"
                      fullWidth
                      sx={{ 
                        mr: 1,
                        '& .MuiOutlinedInput-root': {
                          height: '44px',
                          '& fieldset': { borderColor: '#E0E0E0' }
                        }
                      }}
                    />
                    <Button 
                      variant="outlined" 
                      sx={{ 
                        borderColor: '#3B82F6', 
                        color: '#3B82F6', 
                        textTransform: 'none',
                        borderRadius: '8px',
                        height: '44px',
                        whiteSpace: 'nowrap',
                        minWidth: '100px'
                      }}
                    >
                      เลือกลิงค์
                    </Button>
                  </Box>
                </Box>

                <Divider sx={{ width: '100%', my: 3 }} />

                {/* Content Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#000' }}>
                    Content <span style={{ color: '#FF0000' }}>*</span>
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ color: '#666', fontSize: '14px', mr: 1 }}>
                      เพิ่มได้สูงสุด 10 รายการ
                    </Typography>
                    <IconButton 
                      sx={{ 
                        bgcolor: '#3B82F6', 
                        color: 'white',
                        '&:hover': { bgcolor: '#2563EB' },
                        width: '28px',
                        height: '28px'
                      }}
                      onClick={handleAddContent}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Divider sx={{ width: '100%', mb: 3 }} />

                {/* Content Items */}
                {contents.map((content, index) => (
                  <Box key={content.id} sx={{ mb: 4 }}>
                    <Typography component="label" sx={{ 
                      display: 'block', 
                      mb: 1,
                      fontSize: '16px',
                      fontWeight: 'medium',
                      color: '#000'
                    }}>
                      Content {content.id} <span style={{ color: '#FF0000' }}>*</span>
                    </Typography>
                    
                    <Box sx={{ mb: 1 }}>
                      <Button 
                        variant="outlined" 
                        sx={{ 
                          borderColor: '#3B82F6', 
                          color: '#3B82F6', 
                          textTransform: 'none',
                          borderRadius: '8px',
                          height: '40px',
                          px: 3
                        }}
                      >
                        เลือกไฟล์
                      </Button>
                      
                      {/* Displayed file with delete option */}
                      {content.file && (
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
                          <Typography sx={{ color: '#3B82F6', flex: 1 }}>{content.file}</Typography>
                          <IconButton size="small">
                            <CloseIcon sx={{ color: '#3B82F6' }} />
                          </IconButton>
                        </Box>
                      )}
                      
                      <Typography sx={{ color: '#666', fontSize: '12px' }}>
                        {fileInfo}
                      </Typography>
                    </Box>

                    {/* Link Input for Content */}
                    <Box sx={{ mt: 3, mb: 2 }}>
                      <Typography component="label" sx={{ 
                        display: 'block', 
                        mb: 1,
                        fontSize: '16px',
                        color: '#000'
                      }}>
                        ลิงค์ <span style={{ color: '#FF0000' }}>*</span>
                      </Typography>
                      
                      <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
                        <TextField
                          placeholder="http://"
                          variant="outlined"
                          fullWidth
                          sx={{ 
                            mr: 1,
                            '& .MuiOutlinedInput-root': {
                              height: '44px',
                              '& fieldset': { borderColor: '#E0E0E0' }
                            }
                          }}
                        />
                        <Button 
                          variant="outlined" 
                          sx={{ 
                            borderColor: '#3B82F6', 
                            color: '#3B82F6', 
                            textTransform: 'none',
                            borderRadius: '8px',
                            height: '44px',
                            whiteSpace: 'nowrap',
                            minWidth: '100px'
                          }}
                        >
                          เลือกลิงค์
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}