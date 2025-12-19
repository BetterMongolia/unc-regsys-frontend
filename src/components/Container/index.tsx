import * as React from "react";
import { Container as BaseContainer, ContainerProps } from "@chakra-ui/react";

interface IProps extends ContainerProps {}

const Container = (props: IProps) => (
  <BaseContainer maxW="container.xl" mx="auto" {...props} />
);

export default Container;
