import { AUTH_APIS } from '@/utils/services/apiService';
import getData from '@/utils/services/ssrService';
import { Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import SingleDeal from './SingleDeal';
import { SingleDealProps } from '@/types';

const Deals = async () => {
  const res = await getData(AUTH_APIS['getAllDeals'] + `?page=0&size=10`);
  return (
    <Box>
      <Typography
        variant='h4'
        textAlign='center'
        color='green'
        textTransform='uppercase'
      >
        All time deals
      </Typography>
      <Box sx={{ marginTop: '1rem' }}>
        {res && res?.status ? (
          <SingleDeal deal={res?.data?.content as [SingleDealProps]} />
        ) : null}
      </Box>
    </Box>
  );
};
export default Deals;
