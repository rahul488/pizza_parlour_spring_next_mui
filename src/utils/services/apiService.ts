//https://pizza-parlour.onrender.com/
export const PUBLIC_IMAGE_PRODUCT_DEALS =
  'https://pizza-parlour.onrender.com/pizza-parlour/public/img';
export const PUBLIC_APIS = {
  login: '/public/login',
  signup: '/public/createAccount',
  forgotPassword: '/public/forgot-password',
};
export const AUTH_APIS = {
  //ADMIN ROUTES START
  addProduct: '/admin/private/product/add',
  getAllCustomers: '/admin/private/customer',
  getAllProducts: '/admin/private/getAllProducts',
  deleteProduct: '/admin/private/product/delete',
  updateProduct: '/admin/private/product/update',
  addDeals: '/admin/private/addDeals',
  updateDeals: '/admin/private/deals',
  deleteDeals: '/admin/private/delete/deals',
  addBanner: '/admin/private/addBanner',
  deleteBanner: '/admin/private/deleteBanner',
  updateBanner: '/admin/private/updateBanner',
  addCateGories: '/admin/private/addCategory',
  updateCategories: '/admin/private/updateCategory',
  deleteCategories: '/admin/private/deleteCategory',
  getAllOrder: '/admin/private/getAllOrders',
  updateOrder: '/admin/private/updateOrder',

  //COMMON ROUTES START
  getCategories: '/common/private/categories',
  getBanners: '/common/private/getBanner',
  getDealDetails: '/common/private/deals',
  getProductByCategory: '/common/private/getProduct',
  getProductDetails: '/common/private/product',
  getAllDeals: '/common/private/getAllDeals',

  //CUSTOMER ROUTES START
  addToCart: '/customer/private/addToCart',
  addDealsToCart: '/customer/private/addDeals',
  getCartDetails: '/customer/private/getCart',
  deleteProductFromCart: '/customer/private/removeFromCart',
  accountDetails: '/customer/private/getAccountDetails',
  updatePassword: '/customer/private/update-password',
  getTop10Products: '/customer/private/getTop10products',
  createOrder: '/customer/private/create-order',
  completeOrder: '/customer/private/complete-order',
  getOrders: '/customer/private/get-order',
};
