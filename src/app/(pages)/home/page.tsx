import Box from '@mui/material/Box';
import Slider from './Slider';
import AllCategory from './AllCategory';
import Top10Products from './Top10Products';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import Deals from './Deals';
import About from './About/About';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '4.5rem',
        flexDirection: 'column',
        paddingBottom: '2rem',
      }}
    >
      <Suspense fallback={<Loading />}>
        <Slider />
        <AllCategory />
        <Top10Products />
        <Deals />
        <About />
      </Suspense>
    </Box>
  );
};
export default Home;
