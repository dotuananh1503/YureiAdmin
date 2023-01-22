import { createContext } from "react";

const AuthContext = createContext({
    userInfo: {},
    totalCountCategories: {},
    animes: {},
    liveActions: {},
    comics: {},
    members: {}
});

export default AuthContext;