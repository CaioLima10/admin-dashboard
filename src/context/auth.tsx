import { createContext, useEffect, useState } from "react";
import { IUserAuthProps, IUserProviderProps } from "./types";

export interface IContextData {
  user: IUserAuthProps | null;
  signed: boolean;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string, name: string) => void;
  signout: () => void;
}

export const AuthContext = createContext<IContextData>({} as IContextData);

export const AuthProvider = ({ children }: IUserProviderProps) => {
  const [signed, setSigned] = useState(() => {
    const isSigned = localStorage.getItem("isSigned");
    return isSigned === "true";
  });

  useEffect(() => {
    localStorage.setItem("isSigned", signed ? "true" : "false");
  }, [signed]);

  const [user, setUser] = useState<IUserAuthProps | null>(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const email = JSON.parse(userToken).email;
      const user = JSON.parse(usersStorage).find(
        (u: IUserAuthProps) => u.email === email
      );
      return user || null;
    }

    return null;
  });

  const signin = (email: string, password: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db") || "[]");

    const hasUser = usersStorage?.filter(
      (user: IUserAuthProps) => user.email === email
    );

    setSigned(true);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser(hasUser[0]);
        return;
      } else {
        return "E-mail ou senha incorreta";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (email: string, password: string, name: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db") || "[]");

    const hasUser = usersStorage?.filter(
      (user: IUserAuthProps) => user.email === email
    );

    setSigned(false);

    if (hasUser?.length) {
      return "Já existe uma conta com este e-mail";
    }

    const newUser = [...usersStorage, { email, password, name }];
    localStorage.setItem("users_db", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider value={{ user, signed, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
