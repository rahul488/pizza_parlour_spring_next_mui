import Box from '@mui/material/Box';
import Link from 'next/link';
import { Suspense } from 'react';
import { AUTH_APIS } from '@/utils/services/apiService';
import Product from '../Products';
import Loading from '@/app/loading';
import AppNavigator from '@/components/appCommon/AppNavigator';
import getData from '@/utils/services/ssrService';

const Index = async ({ params }: { params: { category: string } }) => {
  const res = await getData(
    AUTH_APIS['getProductByCategory'] + `/${params.category}`
  );
  return (
    <Suspense fallback={<Loading />}>
      <Box sx={{ p: 2 }}>
        <AppNavigator
          pageName={params.category.toUpperCase()}
          image={res?.data?.backgroundImageUrl}
        >
          <Link href='/home'>Home</Link> /
          <Link href={`/home/product/${params.category}`}>
            {params.category}
          </Link>
        </AppNavigator>
        <Box margin='1rem 0'>
          {res && res.data.page.content ? (
            <Product productArr={res.data.page} categroy={params.category} />
          ) : null}
        </Box>
      </Box>
    </Suspense>
  );
};
export default Index;
