import instance from "../CustomizeApi"

export const getDashBoard = (year) => instance.get(`/admin/dashboard/${year}`);
