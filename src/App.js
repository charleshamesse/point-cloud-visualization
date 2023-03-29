import * as React from 'react';

import PageCollection from './pages/PageCollection.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './App.css';


const theme = createTheme();

function App(props) {

  const navItems = ['Home', 'About', 'Contact'];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Point Cloud Visualization
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <PageCollection />
    </ThemeProvider>
  );
}

export default App;
