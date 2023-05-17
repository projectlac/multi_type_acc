import api from "api/api";

export const getListNewsCategory = () => {
    return api.get(`/tag/get-all`);
};
export const getNewsCategoryBySlug = (slug: string) => {
    return api.get(`/tag/get-one/${slug}`);
};
export const createNewsCategory = (name: string) => {
    return api.post(`/tag/create/`, { name });
};
export const updateNewsCategory = (slug: string, name: string) => {
    return api.put(`/tag/update/${slug}`, { name });
};
export const deleteNewsCategory = (slug: string) => {
    return api.delete(`/tag/delete/${slug}`);
};

export const getNews = (limit: number, offset: number, search: string) => {
    return api.get(`/news?limit=${limit}&offset=${offset}&search=${search}`);
}
export const getNewsBySlug = (slug: string) => {
    return api.get(`/news/get-detail/${slug}`);
};
export const getRecommendById = (id: string) => {
    return api.get(`/news/recommend/${id}`);
};

export const createNews = (formData: FormData) => {
    return api.post(`/news/create/`, formData);
};
export const updateNews = (slug: string, formData: FormData) => {
    return api.put(`/news/update/${slug}`, formData);
};
export const deleteNews = (slug: string) => {
    return api.delete(`/news/delete/${slug}`);
};
