import { Box, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { getRouteMatcher } from "next/dist/shared/lib/router/utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import store from "~/utils/store";

const CallbackPage: NextPage = () => {
  const router = useRouter();
  const { accessToken } = router.query;

  useEffect(() => {
    if (accessToken){
      store.set('token', accessToken as string)
      router.push("/").then(()=> router.reload())
    }
  }, [accessToken]);


  

  return  <Box
                h="100vh"
                d="flex"
                justifyContent="center"
                alignItems="center"
                bg="primary"
              >
                <Spinner color="#fff" size="lg" thickness="5px" speed=".7s" />
          </Box>
};

export default CallbackPage;
