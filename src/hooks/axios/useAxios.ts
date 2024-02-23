import httpInstance from '@/utils/common';
import { PUBLIC_APIS } from '@/utils/services/apiService';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useToast from '../toast/useToast';

const useAxios = () => {
  const session = useSession();
  const toast = useToast();
  const history = useRouter();
  useEffect(() => {
    const requestInterceptor = httpInstance.interceptors.request.use(
      (config) => {
        const authToken = session?.data?.user.accessToken;
        if (
          !Object.values(PUBLIC_APIS).some((endpoint) =>
            config.url?.includes(endpoint)
          )
        ) {
          if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
          } else {
            throw new Error('Authentication token not found');
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = httpInstance.interceptors.response.use(
      (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }
        if (response.status === 401) {
          toast('You Have Been Logged Out, Please Login Again', false);
          history.push('/');
        } else if (response.status === 403) {
          toast('You Are Not Authorised', false);
          throw new Error('Forbidden Access');
        } else if (response.status === 500) {
          toast('Something Went Wrong', false);
          throw new Error('Internal Server Error');
        }
        // Reject the response to propagate the error further
        return Promise.reject(response);
      },
      (error) => {
        throw new Error('Network error');
      }
    );

    return () => {
      httpInstance.interceptors.request.eject(requestInterceptor);
      httpInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [session]); // eslint-disable-line

  const get = async (url: string, params = {}) => {
    try {
      const response = await httpInstance.get(url, { ...params });
      return response.data;
    } catch (error) {
      throw new Error(error as any);
    }
  };

  const post = async (url: string, data: any, config = {}) => {
    try {
      const response = await httpInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      throw new Error(error as any);
    }
  };

  const del = async (url: string, config = {}) => {
    try {
      const response = await httpInstance.delete(url, config);
      return response.data;
    } catch (error) {
      throw new Error(error as any);
    }
  };

  const put = async (url: string, config = {}) => {
    try {
      const response = await httpInstance.put(url, config);
      return response.data;
    } catch (error) {
      throw new Error(error as any);
    }
  };

  return { get, post, del, put };
};
export default useAxios;
