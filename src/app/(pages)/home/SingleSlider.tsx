'use client';
import { AppSwiper } from '@/components';
import { StyledBox } from '@/components/styles/Home/Section1';
import Box from '@mui/material/Box';
import { SwiperSlide } from 'swiper/react';
import { Typography } from '@mui/material';

type iProps = {
  banners: [
    {
      id: string;
      name: string;
      image: string;
      desc: string;
    }
  ];
};

const SingleSlider = ({ banners }: iProps) => {
  return (
    <AppSwiper>
      {banners?.length &&
        banners?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <StyledBox src={banner.image}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  position: 'relative',
                }}
              >
                <Typography variant='h2' boxShadow='5px 5px orange'>
                  {banner.name}
                </Typography>
                <Typography
                  variant='h5'
                  sx={{ marginTop: '10px', fontWeight: '550px' }}
                  p={4}
                >
                  {banner.desc}
                </Typography>
                {/* <Button variant="contained" color="warning">
                  Shop Now
                </Button> */}
              </Box>
            </StyledBox>
          </SwiperSlide>
        ))}
    </AppSwiper>
  );
};
export default SingleSlider;
