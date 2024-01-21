import { useState, useMemo } from "react";
import { useId, useBoolean } from "@fluentui/react-hooks";
import {
  TextField,
  DefaultButton,
  Dialog,
  DialogContent,
  DialogFooter,
  PrimaryButton,
  Stack,
  ITextStyles,
} from "@fluentui/react";
import {
  IButtonStyles,
  IDialogStyles,
  ITextFieldStyles,
  ILabelStyles,
  IDialogContentStyles,
} from "@fluentui/react";

const submitStyle: IButtonStyles = {
  root: {
    backgroundColor: "#7950f2",
    color: "#fff",
    border: "0px",
    borderRadius: "0.75rem",
    padding: "15px 20px",
  },
  rootHovered: {
    backgroundColor: "#6741d9",
    color: "#fff",
    border: "0px",
  },
  rootPressed: {
    backgroundColor: "#7950f2",
    border: "0px",
    color: "#fff",
  },
};
const closeBtnStyle: IButtonStyles = {
  root: {
    backgroundColor: "#fa5252",
    color: "#fff",
    border: "0px",
    borderRadius: "0.75rem",
    padding: "15px 20px",
  },
  rootHovered: {
    backgroundColor: "#e03131",
    color: "#fff",
    border: "0px",
  },
  rootPressed: {
    backgroundColor: "#fa5252",
    color: "#fff",
  },
};
const createBtnDialog: IButtonStyles = {
  root: {
    backgroundColor: "#7950f2",
    color: "#fff",
    padding: "16px 30px",
    border: "0px",
    marginRight: "20px",
    borderRadius: "0.75rem",
  },
  rootHovered: {
    backgroundColor: "#6741d9",
    color: "#fff",
  },
  rootPressed: {
    backgroundColor: "#7950f2",
    color: "#fff",
  },
};

const dialogStyle: IDialogStyles = {
  main: {
    backgroundColor: "#212529",
  },
  root: {
    backgroundColor: "transparent",
  },
};

const dialogContentStyles: Partial<IDialogContentStyles> = {
  title: {
    color: "#dee2e6",
    fontSize: "35px",
  },
};

const labelStyles: Partial<ILabelStyles> = {
  root: {
    color: "#dee2e6",
  },
};
const textFieldStyles: Partial<ITextFieldStyles> = {
  subComponentStyles: {
    label: labelStyles,
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
    <Stack>
      <DefaultButton
        onClick={toggleHideDialog}
        text="Create person"
        styles={createBtnDialog}
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        minWidth={400}
        styles={dialogStyle}
      >
        <DialogContent title="Create person" styles={dialogContentStyles}>
          <TextField
            type="text"
            label="Name"
            styles={textFieldStyles}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setName(newValue || "")}
          />
          <TextField
            type="text"
            label="Surname"
            styles={textFieldStyles}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setSurName(newValue || "")}
          />
          <TextField
            type="text"
            label="User type"
            styles={textFieldStyles}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserType(newValue || "")}
          />
          <TextField
            type="text"
            label="City"
            styles={textFieldStyles}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setCity(newValue || "")}
          />
          <TextField
            type="text"
            label="Address"
            styles={textFieldStyles}
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
          <DefaultButton
            onClick={toggleHideDialog}
            text="Close"
            styles={closeBtnStyle}
          />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
};
export default CreateDialog;
