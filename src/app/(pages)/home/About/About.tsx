import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Image from 'next/image';

const About = () => {
  return (
    <Box>
      <Grid container spacing={1} justifyContent='center'>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            textAlign='center'
            color='green'
            textTransform='uppercase'
          >
            About Us
          </Typography>
        </Grid>
      </Grid>
      <Box mt={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src='/about.png' alt='about' />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: '600px',
                display: 'flex',
                alignItems: { lg: 'center' },
              }}
              p={2}
            >
              <Typography variant='h6'>
                {`Welcome to our pizza haven, where every slice tells a story of
                tradition, flavor, and passion. Since 1999, we've been
                delighting taste buds with our handcrafted pizzas, made from the
                finest ingredients sourced from local producers. Our commitment
                to quality shines through in every bite, as we blend traditional
                recipes with innovative flavors to create a truly unforgettable
                experience. Join us on a culinary journey that celebrates the
                art of pizza making and the joy of sharing delicious meals with
                loved ones.`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default About;
