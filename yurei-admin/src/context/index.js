import { createContext } from "react";

const AuthContext = createContext({
    userInfo: {},
    setUserInfo: () => {}
});

export default AuthContext;