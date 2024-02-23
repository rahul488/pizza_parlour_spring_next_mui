'use client';

import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Rating,
  Typography,
} from '@mui/material';

type iProps = {
  orderDetails: any;
};
const ViewOrder = ({ orderDetails }: iProps) => {
  return (
    <Box>
      <Paper style={{ padding: '1rem' }}>
        <Typography textAlign='center' variant='h6'>
          Order Details
        </Typography>
        <Grid container spacing={2}>
          {orderDetails?.orderedProducts.map((product: any) => (
            <>
              <Grid item xs={12}>
                <Typography justifyContent='flex-start' variant='h5'>
                  Products
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} key={product.id}>
                <Card>
                  <CardMedia
                    component='img'
                    height='194'
                    image={product.image}
                    alt={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {product.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {product.desc}
                    </Typography>
                    <Rating
                      sx={{ marginTop: '1rem' }}
                      name='simple-controlled'
                      value={product.rating}
                      readOnly
                    />
                  </CardContent>
                  <CardActions>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CurrencyRupee />
                      <Typography variant='h5' color='text.secondary'>
                        {product.price}
                      </Typography>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>

        {orderDetails?.orderDeals.map((deal: any) => (
          <Grid
            container
            spacing={2}
            marginTop={2}
            component={Paper}
            key={deal.id}
            sx={{ backgroundColor: '#ebba34' }}
          >
            <Grid item xs={12}>
              <Typography justifyContent='flex-start' variant='h5'>
                Deals
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} padding={2}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component='img'
                  height='194'
                  image={deal.image}
                  alt={deal.name}
                ></CardMedia>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {deal.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {deal.desc}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CurrencyRupee />
                    <Typography variant='h5' color='text.secondary'>
                      {deal.price}
                    </Typography>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography textAlign='center' variant='h5'>
                {`Deal's Product`}
              </Typography>
            </Grid>
            {deal?.products.map((product: any) => (
              <Grid item xs={12} md={6} key={product.id} padding={2}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component='img'
                    height='194'
                    image={product.image}
                    alt={product.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {product.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {product.desc}
                    </Typography>
                    <Rating
                      sx={{ marginTop: '1rem' }}
                      name='simple-controlled'
                      value={product.rating}
                      readOnly
                    />
                  </CardContent>
                  <CardActions>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CurrencyRupee />
                      <Typography variant='h5' color='text.secondary'>
                        {product.price}
                      </Typography>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ))}
      </Paper>
    </Box>
  );
};
export default ViewOrder;
