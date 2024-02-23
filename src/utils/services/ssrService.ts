import { auth } from '@/Security/Provider';
import httpInstance from '../common';
import { signOut } from 'next-auth/react';

const getData = async (url: string) => {
  const session = await auth();
  try {
    const res: any = await httpInstance.get(url, {
      headers: {
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    });
    if (res?.status === '401') {
      signOut();
    }
    return res.data;
  } catch (error) {
    console.log(error, 'error');
  }
};

export default getData;
