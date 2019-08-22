const INDEX = "/";
const SIGNUP = "/signup";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

const USERS = "/users";
const USER_DETAIL = "/:id";

const ACCOUNT = "/account";
const PROFILE = "/profile";
const PASSWORD = "/password";

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const AUTH = "/auth";
const GITHUB = "/github";
const GITHUB_CALLBACK = "/github/callback";

const routes = {
    index: INDEX,
    signup: SIGNUP,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: (id?: string) => {
        if (id) return `/${id}`;
        return USER_DETAIL;
    },
    account: ACCOUNT,
    profile: PROFILE,
    password: PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id?: string) => {
        if (id) return `/${id}`;
        return VIDEO_DETAIL;
    },
    editVideo: (id?: string) => {
        if (id) return `/${id}/edit`;
        return EDIT_VIDEO;
    },
    deleteVideo: (id?: string) => {
        if (id) return `/${id}/delete`;
        return DELETE_VIDEO;
    },
    auth: AUTH,
    github: GITHUB,
    githubCallback: GITHUB_CALLBACK
};

export default routes;
