import instance from "../CustomizeApi"

export const allUser = () => instance.get(`/admin/order/user`);
export const allBook = () => instance.get(`/admin/order/book`);
export const createOrder = (data) => instance.post(`/admin/order`, data);
export const getOrder = () => instance.get(`/admin/order/get-order`);
export const updateStatusOrder = (orderId, status) => instance.put(`/admin/order/status/${orderId}`, status);


