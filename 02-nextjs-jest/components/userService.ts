
export const fetchUsers = async () => {
    return _fetchUsers(fetch)
}

export const _fetchUsers = async (ft: typeof globalThis.fetch) => {
    return ft('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());
}