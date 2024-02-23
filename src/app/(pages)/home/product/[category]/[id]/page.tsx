import { AUTH_APIS } from '@/utils/services/apiService';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import ProductDetails from './ProductDetails';
import getData from '@/utils/services/ssrService';

const Index = async ({ params }: { params: { id: string } }) => {
  const res = await getData(AUTH_APIS['getProductDetails'] + `/${params.id}`);
  return (
    <Suspense fallback={<Loading />}>
      {res && (
        <ProductDetails
          name={res?.data?.name}
          price={res?.data?.price}
          image={res?.data?.image}
          desc={res?.data.desc}
          rating={res?.data.rating}
          backgroundImage={res?.data.backgroundImage}
        />
      )}
    </Suspense>
  );
};
export default Index;
