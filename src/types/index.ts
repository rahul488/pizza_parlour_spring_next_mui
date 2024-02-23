import { ReactNode } from 'react';

export type CartType = {
  products: CartItemType[];
};
export type CartItemType = {
  id: string;
  quantity: number;
  name: string;
  price: number;
};
export type ActionTypes = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  decreseQuantity: (id: string, quantity: number) => void;
  removeAll: () => void;
  addAll: (item: [CartItemType]) => void;
};
export type signupForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isShowPasswordField?: boolean;
};

export type accountTypes = {
  name: string;
  email: string;
};

type DealProductProps = {
  id: string;
  name: string;
  price: number;
  desc: string;
  image: string;
  rating: number;
};
export type SingleDealProps = {
  image: string | undefined;
  id: string;
  name: string;
  price: number;
  desc: string;
  products: DealProductProps[];
};

export type HeadCell = {
  disablePadding: boolean;
  id: string;
  width?: string;
  tooltip?: boolean;
  label: string;
  icon?: ReactNode;
  numeric: boolean;
};
export type SysytemMode = {
  mode: 'light' | 'dark';
};
export type SystemModeActionTypes = {
  darkMode: (mode: string) => void;
};
export type AddressForm = {
  receiverName: string;
  receiverEmail: string;
  state: string;
  pinCode: string;
  district: string;
  address: string;
  phoneNumber: string;
  altPhoneNumber: string;
  city: string;
};

export type methodType = {
  GET: 'GET';
  POST: 'POST';
  DELETE: 'DELETE';
  PUT: 'PUT';
};
