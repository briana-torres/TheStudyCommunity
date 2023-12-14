import React from 'react';
import { Box, Typography } from '@mui/material';
import Header from '../components/Header';

const LaunchSuccessPage = () => {
  return (
    <Box>
        <Header title="" />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
            <Typography variant="h4">
                Yay, you launched study buddy!
            </Typography>
            </Box>
    </Box>
  );
};

export default LaunchSuccessPage;