import { useState, useMemo } from "react";
import { useId, useBoolean } from "@fluentui/react-hooks";

import {
  DefaultButton,
  Dialog,
  DialogContent,
  TextField,
  DialogFooter,
  PrimaryButton,
  Stack,
} from "@fluentui/react";

import {
  IButtonStyles,
  IDialogStyles,
  ITextFieldStyles,
  ILabelStyles,
  IDialogContentStyles,
} from "@fluentui/react";

type EditDialogProps = {
  user: IPerson;
  handleEdit: (editUser: IPerson) => Promise<void>;
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

const editIcon = {
  iconName: "EditContact",
  styles: {
    root: {
      color: "#fff",
      padding: "10px",
      backgroundColor: "#7950f2",
      borderRadius: "50%",
      selectors: {
        ":hover": { backgroundColor: "#6741d9" },
      },
    },
  },
};
const editBtnDialog: IButtonStyles = {
  root: {
    border: "0px",
    borderRadius: "0.75rem",
    width: "50px",
    backgroundColor: "transparent",
    padding: "0px",
  },
  flexContainer: {
    justifyContent: "start",
    background: "#transparent",
    selectors: {
      ":hover": { background: "#212529" },
    },
  },
};

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
    color: "white",
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
    color: "#fff",
    fontSize: "35px",
  },
};

const labelStyles: Partial<ILabelStyles> = {
  root: {
    color: "#fff",
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

const EditDialog = ({ user, handleEdit }: EditDialogProps) => {
  const [userEdit, setUserEdit] = useState<IPerson>(user);

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const editOpen = () => {
    toggleHideDialog();
    console.log(user);
    console.log(userEdit);
  };

  const onClickEdit = () => {
    if (
      userEdit.name === "" ||
      userEdit.surname === "" ||
      userEdit.userType === "" ||
      userEdit.city === "" ||
      userEdit.address === ""
    )
      return;
    handleEdit(userEdit);
    toggleHideDialog();
  };

  return (
    <Stack>
      <DefaultButton
        onClick={editOpen}
        iconProps={editIcon}
        styles={editBtnDialog}
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        minWidth={400}
        styles={dialogStyle}
      >
        <DialogContent title="Edit person" styles={dialogContentStyles}>
          <TextField
            type="text"
            label="Name"
            styles={textFieldStyles}
            defaultValue={user.name}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, name: newValue || "" })}
          />
          <TextField
            type="text"
            label="Surname"
            styles={textFieldStyles}
            defaultValue={user.surname}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, surname: newValue || "" })}
          />
          <TextField
            type="text"
            label="User type"
            styles={textFieldStyles}
            defaultValue={user.userType}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, userType: newValue || "" })}
          />
          <TextField
            type="text"
            label="City"
            styles={textFieldStyles}
            defaultValue={user.city}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, city: newValue || "" })}
          />
          <TextField
            type="text"
            label="Address"
            styles={textFieldStyles}
            defaultValue={user.address}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, address: newValue || "" })}
          />
        </DialogContent>
        <DialogFooter>
          <PrimaryButton
            styles={submitStyle}
            onClick={onClickEdit}
            text="Edit"
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

export default EditDialog;
