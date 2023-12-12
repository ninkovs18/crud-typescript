import { useState, useMemo } from "react";
import apiRequest from "../apiRequest";
import { useId, useBoolean } from "@fluentui/react-hooks";
import {
  TextField,
  DefaultButton,
  Dialog,
  DialogContent,
  DialogFooter,
  PrimaryButton,
} from "@fluentui/react";

const dialogStyles = { main: { maxWidth: 450 } };

const submitStyle = {
  root: {
    backgroundColor: "blue",
    border: "0px",
  },
};

const createBtnDialog = {
  root: {
    backgroundColor: "blue",
    color: "white",
    border: "1px solid black",
  },
};

type CreateDialogProps = {
  data: IPerson[];
  handleAddPerson: (newPerson: IPerson) => Promise<void>;
};

interface IPerson {
  id: number;
  name: string;
  surname: string;
  userType: string;
  createdDate: string;
  city: string;
  address: string;
}

const CreateDialog = ({ data, handleAddPerson }: CreateDialogProps) => {
  const [name, setName] = useState<string>("");
  const [surname, setSurName] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const labelId = useId("dialogLabel");
  const subTextId = useId("subTextLabel");

  const reset = () => {
    setName("");
    setSurName("");
    setAddress("");
    setCity("");
    setUserType("");
  };
  const modalProps = useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
    }),
    [labelId, subTextId]
  );

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
    const id = data[data.length - 1].id + 1;
    const newUser = {
      id,
      name,
      surname,
      userType,
      createdDate,
      city,
      address,
    };

    handleAddPerson(newUser);
    toggleHideDialog();
    reset();
  };

  return (
    <div data-is-scrollable="true">
      <DefaultButton
        onClick={toggleHideDialog}
        text="Create person"
        styles={createBtnDialog}
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        modalProps={modalProps}
        minWidth={400}
      >
        <DialogContent title="Create person">
          <TextField
            type="text"
            label="Name"
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setName(newValue || "")}
          />
          <TextField
            type="text"
            label="Surname"
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setSurName(newValue || "")}
          />
          <TextField
            type="text"
            label="User type"
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserType(newValue || "")}
          />
          <TextField
            type="text"
            label="City"
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setCity(newValue || "")}
          />
          <TextField
            type="text"
            label="Address"
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setAddress(newValue || "")}
          />
        </DialogContent>
        <DialogFooter>
          <PrimaryButton
            styles={submitStyle}
            onClick={handleAdd}
            text="Create"
          />
          <DefaultButton onClick={toggleHideDialog} text="Close" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};
export default CreateDialog;
