export const hasToken = () => {
    return localStorage.getItem("token") !== null;
};

export const isExpired = () => {
    const token = localStorage.getItem("token");
    const tokenDetails = JSON.parse(atob(token!.split(".")[1]));
    const isExpired = tokenDetails.exp * 1000 < Date.now();
    if (isExpired) {
        localStorage.clear();
    }
    return isExpired;
};

export const getRoleFromToken = () => {
    const token = localStorage.getItem("token");
    const tokenDetails = JSON.parse(atob(token!.split(".")[1]));
    return tokenDetails.role;
};

export const getIdFromToken = () => {
    const token = localStorage.getItem("token");
    const tokenDetails = JSON.parse(atob(token!.split(".")[1]));
    return tokenDetails.id;
};