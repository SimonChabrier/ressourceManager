const tokenManager = {

    // save token to local storage
    saveToken: (token) => {
        console.log('tokenManager.saveToken', token);
        if(token) {
            localStorage.setItem('token', token);
        }
    },

    // get token from local storage
    getToken: () => {
        return localStorage.getItem('token');
    },

    // remove token from local storage
    removeToken: () => {
        localStorage.removeItem('token');
    },  

    // check if token is valid
    isValid: () => {
        const token = tokenManager.getToken();
        if(token) {
            const payload = tokenManager.getPayload(token);
            return payload ? true : false;
        }
        return false;
    },

    // get payload from token
    getPayload: (token) => {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    },

    // check if user is admin
    isAdmin: () => {
        const token = tokenManager.getToken();
        if(token) {
            const payload = tokenManager.getPayload(token);
            return payload ? payload.isAdmin : false;
        }
        return false;
    },

    // check if user is logged in
    isLoggedIn: () => {
        return tokenManager.isValid();
    },

}

export default tokenManager;