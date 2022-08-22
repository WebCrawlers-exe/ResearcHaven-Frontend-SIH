import React, { useEffect, useRef, useState } from "react";
import { Textarea, Button, useToast, Flex } from "@chakra-ui/react";
import { Alert, AlertIcon, AlertDescription } from "@chakra-ui/react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  DeleteIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";
import { Select } from "@chakra-ui/react";
import { Kbd } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../Hooks/useFetch";
function InputElement(props) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(props.value);
  const [value2, setValue2] = React.useState(props.name);
  const newDoc = { ...props.document };
  const toast = useToast();
  const inputValRef = useRef(null);
  const selectRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleInputChange = (e) => {
    setValue(e.target.value);
    handleSaveField();
  };
  const handleSave = async () => {
    setIsSaving(true);
    let url =
      "https://webcrawlers-sih.vercel.app/api/researchpaper/update/" + props.id;
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
      body: JSON.stringify(props.document),
    });
    let data = await response.json();
    if (data.success) {
      toast({
        title: data.message,
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top-right",
        marginTop: "2rem",
      });
      setIsSaving(false);
    } else {
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      setIsSaving(false);
    }
  };
  const handleSaveField = () => {
    newDoc[inputValRef.current.name] = inputValRef.current.value;
    props.setDocument(newDoc);
    // toast({
    //   title: "Successful",
    //   description: "Field Saved!",
    //   status: "success",
    //   duration: 1000,
    //   isClosable: true,
    // });
  };
  const handleSelectChange = () => {
    setValue2(selectRef.current.value);
    let index = selectRef.current.selectedIndex;
    props.setHeaderNum(index);
  };
  const handleDelete = async () => {
    setIsDeleting(true);
    let url =
      "https://webcrawlers-sih.vercel.app/api/researchpaper/delete/" + props.id;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("token"),
      },
    });
    let data = await response.json();
    if (data.success) {
      toast({
        title: data.message,
        status: "success",
        duration: 1500,
        isClosable: true,
        position: "top-right",
        marginTop: "2rem",
      });
      setIsSaving(false);
      navigate('/');
    } else {
      toast({
        title: "Error",
        description: data.message,
        status: "error",
        duration: 1500,
        isClosable: true,
      });
      setIsDeleting(false);
    }
  };
  useEffect(() => {});

  return (
    <>
      <Flex
        m={8}
        w="100%"
        align="center"
        justify="center"
        wrap={{ base: "wrap", md: "no-wrap", lg: "no-wrap" }}
      >
        <Button
          mb={8}
          isLoading={isSaving}
          loadingText="Saving"
          onClick={handleSave}
          colorScheme="facebook"
        >
          <SaveOutlinedIcon />
          &nbsp;Save Document{" "}
          <Kbd ml={2} color="white" bg="#171717">
            ctrl
          </Kbd>
          +
          <Kbd color="white" bg="#171717">
            S
          </Kbd>
        </Button>
        <Button 
        mb={8} 
        colorScheme="red" 
        ml={4}
        onClick={handleDelete}
        isLoading={isDeleting}
        loadingText="Deleting...">
          <DeleteIcon />
          &nbsp;Delete Document{" "}
          <Kbd ml={2} color="white" bg="#171717">
            del
          </Kbd>
        </Button>
        <Button
          mb={8}
          colorScheme="messenger"
          ml={4}
          onClick={() => {
            navigate("/dashboard/manage");
          }}
        >
          <ExternalLinkIcon />
          &nbsp;Manage Documents{" "}
          <Kbd ml={2} color="white" bg="#171717">
            ctrl
          </Kbd>
          +
          <Kbd color="white" bg="#171717">
            M
          </Kbd>
        </Button>
      </Flex>
      <Flex mb={4} align="center" justify="space-between" w="100%">
        <Button
          isDisabled={!props.headerNum}
          onClick={() => {
            handleSaveField();
            props.setHeaderNum(props.headerNum - 1);
          }}
        >
          <ArrowBackIcon />
          Previous
        </Button>
        <Select
          w="50%"
          textAlign="center"
          ref={selectRef}
          value={value2}
          onChange={handleSelectChange}
        >
          {props.headers.map((title, index) => {
            return (
              <option textAlign="center" key={index} value={title}>
                {title.toUpperCase().split("_").join(" ")}
              </option>
            );
          })}
        </Select>
        <Button
          display={props.headerNum !== props.headers.length - 1 ? "" : "none"}
          onClick={() => {
            handleSaveField();
            props.setHeaderNum(props.headerNum + 1);
          }}
        >
          Next
          <ArrowForwardIcon />
        </Button>
        <Button
          colorScheme="green"
          display={props.headerNum === props.headers.length - 1 ? "" : "none"}
          onClick={handleSave}
          isLoading={isSaving}
          loadingText="Saving"
        >
          Save Document
        </Button>
      </Flex>
      <Textarea
        ref={inputValRef}
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
        name={props.name}
        textAlign="left"
        value={value}
        placeholder={props.value ? value : "Nothing to show yet"}
        onChange={handleInputChange}
        size="lg"
        resize="none"
        variant="filled"
        autoFocus={true}
        _focus={{ outline: "none", boxShadow: "none" }}
        boxShadow="none"
        h="50%"
        p={8}
      />
      {/* <Button colorScheme="teal" onClick={handleSaveField} mt={8} mb={8}>
        Save this field
      </Button> */}
      <Alert
        mt={8}
        mb={8}
        status="warning"
        display="flex"
        align="center"
        justify="center"
      >
        <AlertDescription w="100%" display="flex" direction="row">
          <AlertIcon />
          You cannot undo the action of saving the field!
        </AlertDescription>
      </Alert>
    </>
  );
}

export default InputElement;
