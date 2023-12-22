export const indexMethod = (page, id) => {
    return (page.currentPage - 1) * page.pageSize + id + 1
}
