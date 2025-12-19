import { Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";

const CustomCheckbox = (props: any) => {
  const { check } = props;

  return check ? (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onChange(false);
      }}
      type="button"
      style={{
        color: "#3083FF",
      }}
    >
      <RiCheckboxFill size="21"/>
    </button>
  ) : (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        props.onChange(true);

      }}
      type="button"
      style={{
        color: "#3083FF",
      }}
    >
      <RiCheckboxBlankLine  size="21"/>
    </button>
  );

  return (
    <Checkbox
      type="checkbox"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      border="1px solid"
      checked={check}
      defaultChecked={check}
      w={4}
      h={4}
      borderColor="#3083FF"
      iconColor="white"
      backgroundColor={check ? "#3083FF" : "#fff"}
      onChange={(e) => {
        props.onChange(e.target.checked);
      }}
      size="md"
      colorScheme="#3083FF"
    ></Checkbox>
  );
};

export default CustomCheckbox;
