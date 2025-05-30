import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  InputAdornment
} from '@mui/material';

interface FormData {
  category: string;
  title: string;
  effectiveDate: string;
  status: string;
}

const FormComponent: React.FC = () => {
  // Add useNavigate hook for routing
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    category: 'Banner',
    title: '',
    effectiveDate: '',
    status: 'Active'
  });

  // Track whether this is the initial render
  const [isInitialRender, setIsInitialRender] = useState(true);

  // Create separate handlers for different input types
  const handleTextFieldChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSelectChange = (field: keyof FormData) => (event: React.ChangeEvent<{ value: unknown }>) => {
    setFormData({
      ...formData,
      [field]: event.target.value as string
    });
  };

  // Handle category change specifically
  const handleCategoryChange = (event: any) => {
    const newCategory = event.target.value as string;
    setFormData({
      ...formData,
      category: newCategory
    });

    // Navigate based on the selected category
    if (newCategory === 'Banner') {
      navigate('/banner/create');
    } else if (newCategory === 'Promotion') {
      navigate('/promotion/create');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ width: '100%', maxWidth: '540px' }}>
        <Box sx={{ mb: 3 }}>
          <Typography component="label" sx={{
            display: 'block',
            mb: 1,
            fontSize: '22px',
            fontWeight: 400,
            color: '#000'
          }}>
            Category <span style={{ color: '#FF0000' }}>*</span>
          </Typography>
          <FormControl sx={{ width: '340px' }}>
            <Select
              value={formData.category}
              onChange={handleCategoryChange}
              displayEmpty
              IconComponent={() => (
                <Box
                  component="img"
                  src="/src/assets/img/icons/v.png"
                  alt="Arrow Down"
                  sx={{ width: '16px', height: '16px', mr: 1.5 }}
                />
              )}
              sx={{
                height: '44px',
                backgroundColor: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E0E0E0'
                }
              }}
            >
              <MenuItem value="Banner">Banner</MenuItem>
              <MenuItem value="Promotion">Promotion</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography component="label" sx={{
            display: 'block',
            mb: 1,
            fontSize: '22px',
            fontWeight: 400,
            color: '#000'
          }}>
            Title <span style={{ color: '#FF0000' }}>*</span>
          </Typography>
          <TextField
            fullWidth
            value={formData.title}
            onChange={handleTextFieldChange('title')}
            variant="outlined"
            sx={{
              backgroundColor: '#FFFFFF',
              width: '341px',
              '& .MuiOutlinedInput-root': {
                height: '44px',
                '& fieldset': {
                  borderColor: '#E0E0E0'
                }
              }
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography component="label" sx={{
            display: 'block',
            mb: 1,
            fontSize: '22px',
            fontWeight: 400,
            color: '#000'
          }}>
            Effective Date <span style={{ color: '#FF0000' }}>*</span>
          </Typography>
          <TextField
            fullWidth
            value={formData.effectiveDate}
            onChange={handleTextFieldChange('effectiveDate')}
            placeholder="DD/MM/YYYY – DD/MM/YYYY"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Box
                      component="img"
                      src="/src/assets/img/icons/calendar.png"
                      alt="Calendar"
                      sx={{ width: '16px', height: '16px', mr: 0 }}
                    />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              backgroundColor: '#FFFFFF',
              '& .MuiOutlinedInput-root': {
                height: '44px',
                '& fieldset': {
                  borderColor: '#E0E0E0'
                }
              }
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography component="label" sx={{
            display: 'block',
            mb: 1,
            fontSize: '22px',
            fontWeight: 400,
            color: '#000'
          }}>
            Status <span style={{ color: '#FF0000' }}>*</span>
          </Typography>
          <FormControl fullWidth>
            <Select
              value={formData.status}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  status: e.target.value as string
                });
              }}
              displayEmpty
              IconComponent={() => (
                <Box
                  component="img"
                  src="/src/assets/img/icons/v.png"
                  alt="Arrow Down"
                  sx={{ width: '16px', height: '16px', mr: 1.5 }}
                />
              )}
              sx={{
                height: '44px',
                backgroundColor: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E0E0E0'
                }
              }}
            >
              <MenuItem value="Active">Active</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default FormComponent;