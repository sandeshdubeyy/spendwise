import api from "./api.services"

export interface Category{
    _id:string;
    name:string;
}

export const getCategory = async () => {
    const {data} = await api.get<{category: Category[]}>("/categories");
    return data.category;
}

export const createCategory = async (name: string) => {
    const { data } = await api.post<{ message: string; category: Category }>("/categories", { name });
    return data.category;
};

export const updateCategory = async (id: string, name: string) => {
    const { data } = await api.put<{ message: string; category: Category }>(`/categories/${id}`, { name });
    return data.category;
};

export const deleteCategory = async (id: string) => {
    await api.delete(`/categories/${id}`);
};
