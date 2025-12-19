import React from "react";
import apiUser from "~/api/user";

const useUser = () => {
  const [loading, setLoading] = React.useState<boolean | null>(null);
  const [user, setUser] = React.useState<any>({});
  const getUserInfo = async () => {
    setLoading(true);
    const res = await apiUser.me();
    if (res.success) {
      setUser(res.data);
    } else {
      console.log(res.e);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    getUserInfo();
  }, []);

  return { loading, user };
};

export default useUser;
