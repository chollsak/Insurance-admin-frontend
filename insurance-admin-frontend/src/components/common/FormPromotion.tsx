import {
    Box,
    Divider,
    Link,
    Typography,
    Button,
    TextField,
    IconButton,
  } from "@mui/material";
  import React, { useState } from "react";
  import Grid from "@mui/material/Grid";
import FormComponentPromotion from "./FormComponentPromotion";
import PromotionDetails from "./PromotionDetail";
  
  interface ContentItem {
    id: number;
    file: string;
    link: string;
  }
  
  const FormPromotion: React.FC = () => {
    const [contents, setContents] = useState<ContentItem[]>([
      { id: 1, file: "cover01.jpg", link: "" },
      { id: 2, file: "banner2.jpg", link: "" },
    ]);
  
    const fileInfo = "สกุลไฟล์.jpg ขนาดไฟล์ 374 x 100 px , ขนาดไม่เกิน 100 kb";
  
    const handleAddContent = (): void => {
      const newId =
        contents.length > 0 ? Math.max(...contents.map((c) => c.id)) + 1 : 1;
      setContents([...contents, { id: newId, file: "", link: "" }]);
    };
  
    const handleRemoveContent = (id: number): void => {
      setContents(contents.filter((content) => content.id !== id));
    };
  
    return (
      <Box>
        <Grid container spacing={2} sx={{justifyContent:'space-between'}}>
          <Grid item xs={8.2}>
            <Box sx={{ pt: 3, pl: 3 }}>
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
                      src="/src/assets/img/news/homeicon.png"
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
              <Divider sx={{ mt: -1.5, width: "110%" }} />
            </Box>
  
            <Box sx={{ display: "flex", m: 2, gap:3}}>
              <FormComponentPromotion />
              <Box
                sx={{
                  bgcolor: "#F4F5FA",
                  height: "520px",
                  width: "500px",
                  borderRadius: "8px",
                  mb: 2,
                }}
              >
                <Typography sx={{ fontSize: "24px", mt: 1, ml: 2 }}>
                  รายละเอียดเนื้อหา
                </Typography>
                <Divider sx={{ width: "100%", mt: 1 }} />
              </Box>
            </Box>
          </Grid>
  
          <Grid item={true} xs={3.8} component={"div"}>
            <Box sx={{ height: "650px", width: "400px", display: "flex", flexDirection: "column" }}>
              {/* Fixed Header */}
              <Box sx={{ display: "flex", p: 3, backgroundColor: "white" }}>
                <Box
                  component={"img"}
                  src="/src/assets/img/icons/arrow.png"
                  width={"24px"}
                  height={"24px"}
                />
                <Typography
                  sx={{
                    color: "#05058C",
                    fontWeight: "500",
                    fontSize: "22px",
                    ml: 1.5,
                    mt: -0.5,
                  }}
                >
                  เลือกเเสดงผล
                </Typography>
              </Box>
              <Divider sx={{ mt: -1.6, width: "100%" }} />
  
              {/* Scrollable Content Area */}
              <Box sx={{ 
                flex: 1,
                overflowY: "auto", 
                overflowX: "hidden", 
                backgroundColor: "white"
              }}>
                {/* Image Upload */}
                <Box sx={{ mb: 3 }}>
                  <Divider
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#3978E9",
                      height: "1px",
                      fontSize: "16px",
                      fontWeight: 500,
                      borderTop: "1px solid",
                      width: "100%",
                    }}
                  />
                  <Typography
                    sx={{
                      width: "100%",
                      fontSize: "20px",
                      bgcolor: "#F2F8FF",
                      color: "#05058C",
                      fontWeight: "500",
                      padding: "8px 0",
                      paddingLeft: "28px", // Equivalent to mx: 3.5
                      boxSizing: "border-box",
                    }}
                  >
                    ภาพ Promotion
                  </Typography>
                  <Divider
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#3978E9",
                      height: "1px",
                      fontSize: "16px",
                      fontWeight: 500,
                      borderTop: "1px solid",
                      width: "100%",
                    }}
                  />
  
                  <Box
                    sx={{
                      mx: 3.5,
                      my: 2,
                      display: "flex",
                      justifyContent: "space-between", // Add this to create space-between
                      alignItems: "center", // Add this to vertically center items
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#3B82F6",
                        color: "#3B82F6",
                        textTransform: "none",
                        borderRadius: "8px",
                        height: "36px",
                        fontSize: "20px",
                        px: 3,
                      }}
                    >
                      เลือกไฟล์
                    </Button>
  
                    {/* Displayed file with delete option */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 0, // Remove top margin
                        mb: 0, // Remove bottom margin
                      }}
                    >
                      <Typography
                        sx={{ color: "#0073FB", mr: 1, fontSize: "20px" }}
                      >
                        cover01.jpg
                      </Typography>
                      <IconButton sx={{ width: "13.33px", height: "13.33px" }}>
                        <Box
                          component="img"
                          src="/src/assets/img/icons/close.png"
                          alt="Close"
                          sx={{ width: "13px", height: "13px" }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography
                    sx={{ color: "#676767", fontSize: "19px", ml: 3.5 }}
                  >
                    {fileInfo}
                  </Typography>
  
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      my: 2, // Add margin top and bottom for spacing,
                    }}
                  >
                    <Divider
                      sx={{
                        color: "#E0E3EE",
                        height: "1px",
                        fontSize: "16px",
                        fontWeight: 500,
                        borderTop: "1px solid",
                        width: "90%",
                        borderColor: "#E0E3EE", // Make sure border color matches text color
                      }}
                    />
                  </Box>
  
                  {/* Link Input */}
                  <Box sx={{ mt: 2, mb: 4 }}>
                    <Typography
                      component="label"
                      sx={{
                        display: "block",
                        mb: 1,
                        fontSize: "20px",
                        color: "#000",
                        mx: 3.5,
                      }}
                    >
                      ลิงค์ <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
  
                    <Box
                      sx={{
                        display: "flex",
                        mb: 1,
                        alignItems: "center",
                        mx: 3.5,
                      }}
                    >
                      <TextField
                        placeholder="http://"
                        variant="outlined"
                        fullWidth
                        sx={{
                          mr: 1,
                          width: "265px",
                          "& .MuiOutlinedInput-root": {
                            height: "44px",
                            "& fieldset": { borderColor: "#E0E0E0" },
                          },
                        }}
                      />
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: "#3B82F6",
                          color: "#3B82F6",
                          textTransform: "none",
                          borderRadius: "8px",
                          height: "36px",
                          width: "100px",
                          whiteSpace: "nowrap",
                          minWidth: "100px",
                          fontSize: "20px",
                        }}
                      >
                        เลือกลิงค์
                      </Button>
                    </Box>
                  </Box>
  
                  {/* Content Section */}
                  <Divider
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#3978E9",
                      height: "1px",
                      fontSize: "16px",
                      fontWeight: 500,
                      borderTop: "1px solid",
                      width: "100%",
                    }}
                  />
                  <Typography
                    sx={{
                      width: "100%",
                      fontSize: "20px",
                      bgcolor: "#F2F8FF",
                      color: "#05058C",
                      fontWeight: "500",
                      padding: "8px 0",
                      paddingLeft: "28px", // Equivalent to mx: 3.5
                      boxSizing: "border-box",
                    }}
                  >
                    Content
                  </Typography>
                  <Divider
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#3978E9",
                      height: "1px",
                      fontSize: "16px",
                      fontWeight: 500,
                      borderTop: "1px solid",
                      width: "100%",
                    }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      mx: 3.5,
                      mt: -1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#000",
                        display: "none",
                      }}
                    >
                      Content <span style={{ color: "#FF0000" }}>*</span>
                    </Typography>
  
                  </Box>
  
                <PromotionDetails />

                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
  
        <Button
          sx={{
            display: "block",
            margin: "0 auto",
            mt: -4,
            mb:2,
            width:'100px'
          }}
          variant="contained"
        >
          <Typography>Save</Typography>
        </Button>
      </Box>
    );
  };
  
  export default FormPromotion;