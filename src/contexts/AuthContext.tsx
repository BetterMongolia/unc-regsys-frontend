import router, { useRouter } from "next/router";
import React, { useState, useContext, createContext } from "react";
import apiUser from "~/api/user";
import store from "~/utils/store";

interface IContext {
  Signin: (email: string, password: string) => any;
  Signout: () => void;
  user: any;
  loaded?: boolean;
  userFetch: () => void;
}

const authContext = createContext<IContext>({} as IContext);

const AuthConsumer = authContext.Consumer;

export { AuthConsumer };

export function ProvideAuth({ children }: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<any>(null);

  const Signin = async (email: any, password: any) => {
    const res = await apiUser.login(email, password);
    if (res.success) {
      const { accessToken } = res.data;
      setAccessToken(accessToken);
    } else {
      setAccessToken(null);
    }
    return res;
  };

  const Signout = () => {
    store.remove("token");
    setAccessToken(null);
    setUser(false);
  };

  const userFetch = async () => {
    const res = await apiUser.me();
    if (res.success) {
      setUser(res.data);
      setLoaded(true);
    } else {
      setUser(null);
      store.remove("token");
      setAccessToken(null);
    }
    return res;
  };

  React.useEffect(() => {
    if (accessToken) {
      store.set("token", accessToken);
      userFetch();
    }
  }, [accessToken]);

  React.useEffect(() => {
    const token = store.get("token");
    if (token) {
      setAccessToken(token);
    } else {
      setUser(false);
      setLoaded(true);
      // router.push("/");
    }
  }, []);

  return {
    user,
    Signin,
    Signout,
    loaded,
    userFetch,
  };
}
