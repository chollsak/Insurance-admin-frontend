import { Box, Divider, Grid, Link, Typography } from "@mui/material";
import React from "react";

export default function Form() {
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
            <Divider sx={{ mt: -1.5, width:'150%'}} />
          </Box>
        </Grid>
        <Grid size={3.8}>
          <Box sx={{ height: "100vh", width: "100%", bgcolor: "white" }}>
            <Box sx={{display:'flex', p:3}}>
                  <Box component={'img'} src="/src/assets/img/icons/arrow.png" width={'24px'} height={'24px'} />
                  <Typography sx={{color:'#05058C', fontWeight:'500', fontSize:'22px', ml:1.5, mt:-0.5}} >เลือกเเสดงผล</Typography>
            </Box>
            <Divider sx={{ mt: -1.6, width:'150%'}} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
