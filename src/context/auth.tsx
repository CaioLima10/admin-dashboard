import { createContext, useEffect, useState } from "react";
import { IUserAuthProps, IUserProviderProps } from "./types";

export interface IContextData {
  user: IUserAuthProps | null;
  signed: boolean;
  signin: (email: string, password: string) => void;
  signup: (email: string, password: string) => void;

  signout: () => void;
}

export const AuthContext = createContext<IContextData>({} as IContextData);

export const AuthProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<IUserAuthProps | null>(null);

  useEffect(() => {
    const userToken = localStorage.getItem("users_token");
    const usersStorage = localStorage.getItem("users_db");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user: IUserAuthProps) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signed = !!user;

  const signin = (email: string, password: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db") || "[]");

    const hasUser = usersStorage?.filter(
      (user: IUserAuthProps) => user.email === email
    );

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser(hasUser);
        return;
      } else {
        return "E-mail ou senha incorreta";
      }
    } else {
      return "Usuario não cadastrado";
    }
  };

  const signup = (email: string, password: string) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_db") || "[]");

    const hasUser = usersStorage?.filter(
      (user: IUserAuthProps) => user.email === email
    );

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }
    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("users_db", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("users_token");
  };

  return (
    <AuthContext.Provider value={{ user, signed, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
