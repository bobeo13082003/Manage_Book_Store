import instance from "../CustomizeApi"

export const createUser = (data) => {
    return instance.post('/admin/user', data)
}

export const updateUser = (id, data) => instance.put(`/admin/user/${id}`, data);

export const allUser = () => instance.get(`/admin/user/all-user`);

