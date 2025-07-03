import instance from "../CustomizeApi"

export const getAllCategories = () => instance.get('/admin/book/category');
export const getCategoryById = (id) => instance.get(`/admin/book/category/${id}`);
export const createCategory = (data) =>
    instance.post('/admin/book/category', {
        name: data.name,
        description: data.description,
    });

export const updateCategory = (id, data) =>
    instance.put(`/admin/book/category/${id}`, {
        name: data.name,
        description: data.description,
    });
export const deleteCategory = (id) => instance.delete(`/admin/book/category/${id}`);

export const createBook = (data) => instance.post('/admin/book', data);
export const updateBook = (id, data) => instance.put(`/admin/book/${id}`, data);
export const getBookById = (id) => instance.get(`/admin/book/${id}`);