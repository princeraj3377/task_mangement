
// The frontend and API are served from the same domain in production.
const API_URL = "";



const API = {

    REGISTER: `${API_URL}/user/register`,

    LOGIN: `${API_URL}/user/login`,

    IS_AUTH: `${API_URL}/user/is_auth`,



    CREATE_TASK: `${API_URL}/task/create`,

    ALL_TASKS: `${API_URL}/task/all_tasks`,

    ONE_TASK: (taskId) =>
        `${API_URL}/task/one_task/${taskId}`,

    UPDATE_TASK: (taskId) =>
        `${API_URL}/task/update_task/${taskId}`,

    DELETE_TASK: (taskId) =>
        `${API_URL}/task/delete_task/${taskId}`
};



const TOKEN_KEY = "token";


function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}


function saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}


function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}


function isLoggedIn() {
    return !!getToken();
}



function getAuthHeaders() {

    const token = getToken();

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}



function getJsonHeaders() {

    return {
        "Content-Type": "application/json"
    };
}
