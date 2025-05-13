import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';

const PromotionDetails: React.FC = () => {
  const [formData, setFormData] = useState({
    titleTH: '',
    titleEN: '',
    descriptionTH: '',
    descriptionEN: '',
    dateRange: ''
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };
  return (
    <Box sx={{ 
      width: '100%', 
      px: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }}>
      {/* Title (TH) */}
      <Box>
        <Typography 
          component="label" 
          htmlFor="title-th"
          sx={{ 
            fontSize: '18px',
            color: '#555',
            mb: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Title (TH) <Box component="span" sx={{ color: '#FF0000', ml: 0.5 }}>*</Box>
        </Typography>
        <TextField
            size='small'
          id="title-th"
          fullWidth
          variant="outlined"
          value={formData.titleTH}
          onChange={handleChange('titleTH')}
          sx={{
            mt: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#E0E0E0',
              },
              '&:hover fieldset': {
                borderColor: '#BDBDBD',
              },
            },
          }}
        />
      </Box>

      {/* Title (EN) */}
      <Box>
        <Typography 
          component="label" 
          htmlFor="title-en"
          sx={{ 
            fontSize: '18px',
            color: '#555',
            mb: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Title (EN) <Box component="span" sx={{ color: '#FF0000', ml: 0.5 }}>*</Box>
        </Typography>
        <TextField
         size='small'
          id="title-en"
          fullWidth
          variant="outlined"
          value={formData.titleEN}
          onChange={handleChange('titleEN')}
          sx={{
            mt: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#E0E0E0',
              },
              '&:hover fieldset': {
                borderColor: '#BDBDBD',
              },
            },
          }}
        />
      </Box>

      <Divider sx={{ borderColor: '#F0F0F0', my:3}} />

      {/* Description (TH) */}
      <Box>
        <Typography 
          component="label" 
          htmlFor="description-th"
          sx={{ 
            fontSize: '18px',
            color: '#555',
            mb: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Description (TH) <Box component="span" sx={{ color: '#FF0000', ml: 0.5 }}>*</Box>
        </Typography>
        <TextField
         size='small'
          id="description-th"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={formData.descriptionTH}
          onChange={handleChange('descriptionTH')}
          sx={{
            mt: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#E0E0E0',
              },
              '&:hover fieldset': {
                borderColor: '#BDBDBD',
              },
            },
          }}
        />
      </Box>

      {/* Description (EN) */}
      <Box>
        <Typography 
          component="label" 
          
          htmlFor="description-en"
          sx={{ 
            fontSize: '18px',
            color: '#555',
            mb: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Description (EN) <Box component="span" sx={{ color: '#FF0000', ml: 0.5 }}>*</Box>
        </Typography>
        <TextField
         size='small'
          id="description-en"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={formData.descriptionEN}
          onChange={handleChange('descriptionEN')}
          sx={{
            mt: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#E0E0E0',
              },
              '&:hover fieldset': {
                borderColor: '#BDBDBD',
              },
            },
          }}
        />
      </Box>

      <Divider sx={{ borderColor: '#F0F0F0' }} />

      {/* Start - End Date */}
      <Box>
        <Typography 
          component="label" 
          htmlFor="date-range"
          sx={{ 
            fontSize: '18px',
            color: '#555',
            mb: 1,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Start - End Date <Box component="span" sx={{ color: '#FF0000', ml: 0.5 }}>*</Box>
        </Typography>
        <TextField
          id="date-range"
           size='small'
          fullWidth
          placeholder="DD/MM/YYYY – DD/MM/YYYY"
          variant="outlined"
          value={formData.dateRange}
          onChange={handleChange('dateRange')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <Box
                    component="img"
                    src="/src/assets/img/icons/calendar.png"
                    alt="Calendar"
                    sx={{ width: '20px', height: '20px' }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            mt: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#E0E0E0',
              },
              '&:hover fieldset': {
                borderColor: '#BDBDBD',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PromotionDetails;