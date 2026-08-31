// Get active user and set it to user 1 if null
// Get active role and set it to user if null
export const getActiveUser = () => {
    const data = localStorage.getItem(activeUser);
    const activeUser = data || 'user 1';
    return activeUser
};

export const getUserRole = () => {
    const data = localStorage.getItem(userRole);
    const userRole = data || 'user 1';
    return userRole
};

export function setActiveUserInfo(key, value) {
    localStorage.setItem(key, value);
    if (localStorage.getItem(key) === "admin") {
        localStorage.setItem('role', 'ADMIN' );
    } else {
        localStorage.setItem('role', 'USER' );
    }
}
