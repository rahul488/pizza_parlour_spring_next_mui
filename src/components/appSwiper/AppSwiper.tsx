'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { ReactNode } from 'react';
import { Navigation } from 'swiper/modules';

type swiperProps = {
  children: ReactNode;
};

const AppSwiper = ({ children }: swiperProps) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className='mySwiper'>
      {children}
    </Swiper>
  );
};
export default AppSwiper;
