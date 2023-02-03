import { createContext } from "react";

const AuthContext = createContext({
    userInfo: {},
    totalCountCategories: {},
    countAnimeByMember: {},
    animes: {},
    liveActions: {},
    comics: {},
    members: {}
});

export default AuthContext;