import { useState } from "react";
import apiRequest from "../apiRequest";
import {
  Label,
  TextField,
  PrimaryButton,
  DefaultButton,
} from "@fluentui/react";

const controlStyles = {
  fieldGroup: {
    selectors: {
      ":focus-within": {
        border: "2px solid rgb(137, 247, 11)",
      },
      "::after": {
        border: "0px",
      },
    },
  },
};

const CreateDialog = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurName] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const reset = () => {
    setName("");
    setSurName("");
    setAddress("");
    setCity("");
    setUserType("");
  };

  const handleAdd = async () => {
    if (
      name === "" ||
      surname === "" ||
      userType === "" ||
      city === "" ||
      address === ""
    )
      return;

    const datum = new Date();

    const createdDate = datum.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const newUser = {
      name,
      surname,
      userType,
      createdDate,
      city,
      address,
    };

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    };

    const result = await apiRequest(
      "http://localhost:3003/persons",
      postOptions
    );
    console.log(newUser);
    reset();
  };

  return (
    <div>
      <Label required htmlFor={"name-input"}>
        Name:
      </Label>
      <TextField
        type="text"
        id={"name-input"}
        value={name}
        onChange={(
          event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
          newValue?: string
        ) => setName(newValue || "")}
        styles={controlStyles}
      />
      <Label required htmlFor={"surname-input"}>
        Surname:
      </Label>
      <TextField
        type="text"
        id={"surname-input"}
        value={surname}
        onChange={(
          event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
          newValue?: string
        ) => setSurName(newValue || "")}
        styles={controlStyles}
      />
      <Label required htmlFor={"userType-input"}>
        User type:
      </Label>
      <TextField
        type="text"
        id={"userType-input"}
        value={userType}
        onChange={(
          event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
          newValue?: string
        ) => setUserType(newValue || "")}
        styles={controlStyles}
      />
      <Label required htmlFor={"city-input"}>
        City:
      </Label>
      <TextField
        type="text"
        id={"city-input"}
        value={city}
        onChange={(
          event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
          newValue?: string
        ) => setCity(newValue || "")}
        styles={controlStyles}
      />
      <Label required htmlFor={"Address-input"}>
        Address:
      </Label>
      <TextField
        type="text"
        id={"Address-input"}
        value={address}
        onChange={(
          event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
          newValue?: string
        ) => setAddress(newValue || "")}
        styles={controlStyles}
      />
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        <PrimaryButton onClick={handleAdd} text="Create" />
        <DefaultButton onClick={reset} text="Reset" />
      </div>
    </div>
  );
};
export default CreateDialog;
