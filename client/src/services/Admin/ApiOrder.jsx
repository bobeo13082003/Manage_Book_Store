import instance from "../CustomizeApi"

export const allUser = () => instance.get(`/admin/order/user`);
export const allBook = () => instance.get(`/admin/order/book`);
export const createOrder = (data) => instance.post(`/admin/order`, data);

