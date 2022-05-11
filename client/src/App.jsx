import { createContext, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Scores, Print, Account, Login, Error } from "Pages/index";
import usersApi from "Helpers/usersApi";
import "Scss/App.scss";

export const UserContext = createContext();

const handleLogin = async (username, password) => {
  const data = { username: username, password: password };
  const response = await usersApi.login(data);
  if (response.status === 200) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } else {
    return null;
  }
};

const UserReducer = async (state, action) => {
  switch (action.type) {
    case "login":
      const data = await handleLogin(
        action.data.username,
        action.data.password
      );
      return data;
    case "logout":
      localStorage.removeItem("user");
      return null;
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(
    UserReducer,
    JSON.parse(localStorage.getItem("user"))
  );
  const user = async () => {
    return await state;
  };
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/scores" element={<Scores />}></Route>
        <Route path="/print/:action" element={<Print />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<Error />}></Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
