import React, { useState } from 'react';
import { 
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface FormData {
  category: string;
  title: string;
  effectiveDate: string;
  status: string;
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    category: 'Banner',
    title: '',
    effectiveDate: '',
    status: 'Active'
  });

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
          <FormControl fullWidth>
            <Select
              value={formData.category}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  category: e.target.value as string
                });
              }}
              displayEmpty
              IconComponent={KeyboardArrowDownIcon}
              sx={{ 
                height: '44px',
                backgroundColor: '#FFFFFF',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E0E0E0'
                }
              }}
            >
              <MenuItem value="Banner">Banner</MenuItem>
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
              width:'341px',
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
                    <CalendarTodayIcon sx={{ color: '#9E9E9E' }} />
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
              IconComponent={KeyboardArrowDownIcon}
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