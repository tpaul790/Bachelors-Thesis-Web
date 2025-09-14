export interface PageResponse<T> {
    content: T[];
    page: Page;
}

interface Page{
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export interface PageRequest{
    pageNumber: number;
    pageSize: number;
}