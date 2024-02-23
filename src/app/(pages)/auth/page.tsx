import AppTabs from '@/components/appTabs/AppHorizontalCentered';
import { Box } from '@mui/material';
import React from 'react';
import Customer from './customers/Customer';
import Product from './products/Product';
import Deals from './deals/Deals';
import Banner from './Banner/Banner';
import Category from './Category/Category';
import Orders from './Orders/Order';

const tabs = [
  <Customer key={'customer'} />,
  <Orders key={'order'} />,
  <Product key={'product'} />,
  <Deals key={'delas'} />,
  <Banner key={'banner'} />,
  <Category key={'category'} />,
];
function page() {
  return (
    <Box>
      <AppTabs tabs={tabs} />
    </Box>
  );
}

export default page;
