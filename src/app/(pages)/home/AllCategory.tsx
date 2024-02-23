import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AUTH_APIS } from '@/utils/services/apiService';
import SingleCategory from './SingleCategory';
import { CategoryText } from '@/components/styles/Home/Section2';
import getData from '@/utils/services/ssrService';

const AllCategory = async () => {
  const res = await getData(AUTH_APIS['getCategories']);
  return (
    <Box>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item xs={12}>
          <Typography
            variant='h4'
            textAlign='center'
            color='green'
            textTransform='uppercase'
          >
            Our Speciality
          </Typography>
        </Grid>
        {res?.data?.map((category: any) => (
          <Grid item xs={12} md={3} key={category?.id} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <SingleCategory src={category.image} name={category.name} />
              <CategoryText>{category.name}</CategoryText>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default AllCategory;
