import { AUTH_APIS } from '@/utils/services/apiService';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import getData from '@/utils/services/ssrService';
import DealDetails from './DealsDetail';

const Index = async ({ params }: { params: { id: string } }) => {
  const res = await getData(AUTH_APIS['getDealDetails'] + `/${params.id}`);
  return (
    <Suspense fallback={<Loading />}>
      {res && (
        <DealDetails
          id={res?.data?.id}
          name={res?.data?.name}
          price={res?.data?.price}
          desc={res?.data.desc}
          image={res?.data?.image}
          products={res?.data?.products}
          backgroundImage={res?.data?.backgroundImage}
        />
      )}
    </Suspense>
  );
};
export default Index;
