import { useState, useEffect } from "react";
import { useBoolean } from "@fluentui/react-hooks";
import {
  TextField,
  DefaultButton,
  Dialog,
  DialogContent,
  DialogFooter,
  PrimaryButton,
  Stack,
  DialogType,
  IDialogContentProps,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react";
import {
  IButtonStyles,
  IDialogStyles,
  ITextFieldStyles,
  ILabelStyles,
  IDialogContentStyles,
} from "@fluentui/react";

interface IUserType {
  text: string;
  key: string;
}

type CreateDialogProps = {
  data: IPerson[];
  handleAddPerson: (newPerson: IPerson) => Promise<void>;
  userTypes: IUserType[];
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
  rootDisabled: {
    backgroundColor: "#343a40",
    color: "#918c88",
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
const displayNone: Partial<IDialogContentStyles> = {
  title: {
    display: "none",
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
  fieldGroup: {
    border: "0px",
    borderBottom: "2px solid #6741d9",
    selectors: {
      ":focus-within": {
        borderBottom: "2px solid #6741d9",
      },
      ":hover": {
        borderBottom: "2px solid #6741d9",
      },
      "::after": {
        border: "0px",
      },
    },
  },
  field: {
    color: "#dee2e6",
    fontSize: "17px",
    backgroundColor: "#212529",
  },
};

const dropdownStyles: Partial<IDropdownStyles> = {
  root: {
    minWidth: "200px",
    maxWidth: "300px",
    backgroundColor: "#2b3035",
    marginTop: "20px",
  },
  dropdownItemHeader: {
    color: "#dee2e6",
  },
  label: {
    display: "none",
  },
  title: {
    backgroundColor: "#343a40",
    color: "#dee2e6",
    selectors: {
      ":focus-within": {
        color: "#fff",
      },
    },
  },
  dropdownItem: {
    backgroundColor: "#2b3035",
    color: "#dee2e6",
    selectors: {
      ":hover": {
        backgroundColor: "#6741d9",
        color: "white",
      },
    },
  },
  caretDown: {
    color: "#6741d9",
    fontWeight: "bolder",
  },
  dropdownItemSelected: {
    backgroundColor: "#343a40",
    color: "#dee2e6",
    selectors: {
      ":hover": {
        backgroundColor: "#6741d9",
        color: "white",
      },
    },
  },
};

const dialogContentProps: IDialogContentProps = {
  type: DialogType.normal,
  title: "Create person",
  closeButtonAriaLabel: "Close",
  styles: dialogContentStyles,
};

const CreateDialog = ({
  data,
  handleAddPerson,
  userTypes,
}: CreateDialogProps) => {
  const [name, setName] = useState<string>("");
  const [surname, setSurName] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  useEffect(() => {
    if (!hideDialog) {
      reset();
    }
  }, [hideDialog]);

  const reset = () => {
    setName("");
    setSurName("");
    setAddress("");
    setCity("");
    setUserType("");
  };

  const checkInput = () => {
    if (
      name === "" ||
      surname === "" ||
      userType === "" ||
      userType === "All" ||
      city === "" ||
      address === ""
    )
      return true;
    return false;
  };
  const handleAdd = async () => {
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
        dialogContentProps={dialogContentProps}
      >
        <DialogContent styles={displayNone}>
          <TextField
            type="text"
            label="Name"
            styles={textFieldStyles}
            onChange={(
              _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setName(newValue || "")}
          />
          <TextField
            type="text"
            label="Surname"
            styles={textFieldStyles}
            onChange={(
              _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setSurName(newValue || "")}
          />

          <TextField
            type="text"
            label="City"
            styles={textFieldStyles}
            onChange={(
              _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setCity(newValue || "")}
          />
          <TextField
            type="text"
            label="Address"
            styles={textFieldStyles}
            onChange={(
              _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setAddress(newValue || "")}
          />
          <Dropdown
            placeholder="User type"
            options={userTypes}
            styles={dropdownStyles}
            onChange={(
              _event: React.FormEvent<HTMLDivElement>,
              option?: IDropdownOption,
              _index?: number
            ) => setUserType(option?.text || "All")}
          />
        </DialogContent>
        <DialogFooter>
          <PrimaryButton
            styles={submitStyle}
            onClick={handleAdd}
            text="Create"
            disabled={checkInput()}
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
