export const getToken = () => (localStorage.getItem('store') !== null ? JSON.parse(localStorage.getItem('store')).token.value : null)
