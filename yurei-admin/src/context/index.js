import { createContext } from "react";

const AuthContext = createContext({
    userInfo: {},
    totalCountCategories: {},
    countAnimeByMember: {},
    animes: [],
    liveActions: [],
    comics: [],
    members: [],
    quizData: []
});

export default AuthContext;