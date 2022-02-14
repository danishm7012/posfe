export function isAuthenticated() {
    const token = localStorage.getItem('token')
    if (token) return true;
    else return false;
}
export function isAdmin() {
    const admin = localStorage.getItem('isadmin')
    if (admin) return true;
    else return false;
}

export default {
    isAuthenticated,
    isAdmin
}