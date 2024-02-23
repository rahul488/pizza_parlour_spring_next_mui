import { AUTH_APIS } from '@/utils/services/apiService';
import getData from '@/utils/services/ssrService';
import Account from './Account';

const Index = async () => {
  const res = await getData(AUTH_APIS['accountDetails']);
  return res && <Account name={res?.data?.name} email={res?.data?.email} />;
};
export default Index;
