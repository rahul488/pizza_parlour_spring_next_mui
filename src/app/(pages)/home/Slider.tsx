import Box from '@mui/material/Box';
import SingleSlider from './SingleSlider';
import { AUTH_APIS } from '@/utils/services/apiService';
import getData from '@/utils/services/ssrService';

const Slider = async () => {
  const res = await getData(AUTH_APIS['getBanners']);
  return <Box>{res && <SingleSlider banners={res?.data.content} />}</Box>;
};
export default Slider;
