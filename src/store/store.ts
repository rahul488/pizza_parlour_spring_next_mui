import {
  ActionTypes,
  CartType,
  SystemModeActionTypes,
  SysytemMode,
} from '@/types/index';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_STATE = {
  products: [],
  mode: '',
};

export const useCartStore = create(
  persist<CartType & ActionTypes>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      async addToCart(item) {
        const products = get().products;
        const productInState = products?.find(
          (product) => product.id === item.id
        );
        if (productInState) {
          const updatedProducts = products.map((product) =>
            product.id === productInState.id
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                }
              : product
          );
          set((state) => ({
            products: updatedProducts,
          }));
        } else {
          set((state) => ({
            products: [...state.products, item],
          }));
        }
      },
      removeFromCart(id) {
        set((state) => ({
          products: state.products.filter((product) => product.id !== id),
        }));
      },
      decreseQuantity(id, quantity) {
        const products = get().products;
        const currProduct = products?.find((product) => product.id === id);
        if (currProduct) {
          const updatedProducts = products.map((product) =>
            product.id === id
              ? {
                  ...product,
                  quantity: product.quantity - quantity,
                }
              : product
          );
          set((state) => ({
            products: updatedProducts,
          }));
        }
      },
      addAll(item) {
        set((state) => ({
          products: item,
        }));
      },
      async removeAll() {
        set((state) => ({
          products: [],
        }));
      },
    }),
    { name: 'cart', skipHydration: true }
  )
);

export const useSystemMode = create(
  persist<SysytemMode & SystemModeActionTypes>(
    (set, get) => ({
      mode: 'light',
      darkMode: (color) => {
        set((state) => ({
          mode: color as any,
        }));
      },
    }),
    { name: 'mode', skipHydration: true }
  )
);
