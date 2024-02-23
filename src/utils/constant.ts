export const DiscountOptions: { label: string; value: number }[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
].map((val) => ({ label: `${val * 10}%`, value: val * 10 }));
export const ProdcutType: { label: string; value: string }[] = [
  {
    label: 'Pizza',
    value: 'pizza',
  },
  {
    label: 'Sides',
    value: 'sides',
  },
  {
    label: 'Drinks',
    value: 'drinks',
  },
  {
    label: 'Desserts',
    value: 'desserts',
  },
];
export const queryConstant = {
  signUp: 'sign-up',
  getProductByCategories: 'get-product',
  getAllProducts: 'get-all-products',
  addTocart: 'add-to-cart',
  addNewProduct: 'add-product',
  deleteProduct: 'delete-product',
  updateProduct: 'update-product',
  getAllOrders: 'get-all-orders',
  updateOrder: 'update-order',
  getAllCustomers: 'get-all-customers',
  getAllCategories: 'get-all-categories',
  deleteCategory: 'delete-category',
  addCategory: 'add-category',
  updateCategory: 'update-category',
  getUserOrder: 'get-user-orders',
};
