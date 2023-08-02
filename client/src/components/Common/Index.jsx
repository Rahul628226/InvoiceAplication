import React from 'react';
import Main from '../Main';
import { Button, TextField, Container, Grid, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const Index = () => {
  return (
    <div style={{ paddingTop: '30px',paddingLeft:'130px'}}>
      <Container  sx={{ marginTop: '1rem'}}>
        {/* First Row */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 2,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <ButtonBase sx={{ width: '100%', height: 128 }}>
                <Img alt="complex" src="https://cdn3d.iconscout.com/3d/premium/thumb/product-5806313-4863042.png" />
              </ButtonBase>
              <Typography gutterBottom variant="subtitle1" component="div">
                Product
              </Typography>
            
            </Paper>
          </Grid>

          {/* Add two more similar Grid items here */}
          <Grid item xs={12} md={3}>
            {/* Content of the second paper box */}
            <Paper
              sx={{
                p: 2,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <ButtonBase sx={{ width: '100%', height: 128 }}>
                <Img alt="complex" src="https://www.freeiconspng.com/uploads/customers-icon-12.png" />
              </ButtonBase>
              <Typography gutterBottom variant="subtitle1" component="div">
                Customer
              </Typography>
             
              
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            {/* Content of the third paper box */}
            <Paper
              sx={{
                p: 2,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <ButtonBase sx={{ width: '100%', height: 128 }}>
                <Img alt="complex" src="https://cdn-icons-png.flaticon.com/512/7176/7176657.png" />
              </ButtonBase>
              <Typography gutterBottom variant="subtitle1" component="div">
                Invoice
              </Typography>
           
              
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            {/* Content of the third paper box */}
            <Paper
              sx={{
                p: 2,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              }}
            >
              <ButtonBase sx={{ width: '100%', height: 128 }}>
                <Img alt="complex" src="/static/images/grid/complex.jpg" />
              </ButtonBase>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
            
              
            </Paper>
          </Grid>
        </Grid>

        {/* Second Row */}
        <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
          <Grid item xs={12} md={4}>
            {/* Content of the fourth paper box */}
            
          </Grid>

          {/* Add two more similar Grid items here */}
          <Grid item xs={12} md={4}>
            {/* Content of the fifth paper box */}
          </Grid>

          <Grid item xs={12} md={4}>
            {/* Content of the sixth paper box */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
