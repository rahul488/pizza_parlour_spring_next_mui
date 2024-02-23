import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AUTH_APIS } from '@/utils/services/apiService';
import SingleProducts from './SingleProduct';
import getData from '@/utils/services/ssrService';

const Top10Products = async () => {
  const res = await getData(AUTH_APIS['getTop10Products']);
  return (
    <Grid container spacing={2} justifyContent='center'>
      <Grid item xs={12}>
        <Typography
          variant='h4'
          color='green'
          textAlign='center'
          textTransform='uppercase'
        >
          Todays top 10
        </Typography>
      </Grid>
      {res &&
        res?.data.map((product: any) => (
          <SingleProducts
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            id={product.id}
            category={product.category}
          />
        ))}
    </Grid>
  );
};
export default Top10Products;
