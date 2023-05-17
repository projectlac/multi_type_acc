export interface INewsCategory {
    created_at: string
    id: number
    is_deleted: boolean
    name: string
    parent: null | string
    slug: string
    updated_at: string
}

export interface INewsCategoryRespon {
    data: INewsCategory[];
    total: number;
}

export interface INews {
    id: number,
    created_at: string,
    updated_at: string,
    is_deleted: false,
    title: string,
    detail: string,
    keyword: string,
    description: string,
    image: string,
    slug: string,
    views: string,
    status: string,
    tag: string,
    tags: any

}

export interface INewsRespon {
    data: INews[];
    total: number;
}