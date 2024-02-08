import { useState, useEffect } from "react";
import { useBoolean } from "@fluentui/react-hooks";

import {
  DefaultButton,
  Dialog,
  DialogContent,
  TextField,
  DialogFooter,
  PrimaryButton,
  Stack,
  DialogType,
  IDialogContentProps,
  Dropdown,
  IDropdownOption,
  IDropdownStyles,
  IRenderFunction,
  IDropdownProps,
  Icon,
  IIconProps,
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

type  Person = {
  id: number;
  name: string;
  surname: string;
  userType: string;
  createdDate: string;
  city: string;
  address: string;
}

type EditDialogProps = {
  user: Person;
  handleEdit: (editUser: Person) => Promise<void>;
  setSelectedPerson: (n: null) => void;
  userTypes: IUserType[];
};




const editBtnDialog: IButtonStyles = {
  root: {
    backgroundColor: "#7950f2",
    color: "#fff",
    padding: "16px 30px",
    border: "0px",
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

const editIcon: IIconProps = {
  iconName: "EditContact",
  styles:{
    root:{
      fontSize: "20px"
    }
  }
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
  rootDisabled: {
    backgroundColor: "#343a40",
    color: "#918c88",
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
  subText: {
    display: "none",
  },
};
const displayNone: Partial<IDialogContentStyles> = {
  title: {
    display: "none",
  },
};

const labelStyles: Partial<ILabelStyles> = {
  root: {
    color: "#fff",
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
    displaya: "none",
  },
  title: {
    backgroundColor: "#212529",
    border: 0,
    selectors: {
      ":after": { border: "0px" },
    },
  },
  dropdown: {
    borderBottom: "2px solid #6741d9",
    selectors: {
      "::after": {
        border: "0",
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

const dialogContentProps: IDialogContentProps = {
  type: DialogType.normal,
  title: "Edit person",
  closeButtonAriaLabel: "Close",
  styles: dialogContentStyles,
};

const EditDialog = ({ user, handleEdit, userTypes, setSelectedPerson }: EditDialogProps) => {
  const [userEdit, setUserEdit] = useState<Person>(user);

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  useEffect(() => {
    if (hideDialog) {
      setUserEdit(user);
    }
  }, [hideDialog, user]);

  // fast-deepequal

  const checkInput = () => {
    const equal = require("fast-deep-equal");
    if (
      userEdit.name === "" ||
      userEdit.surname === "" ||
      userEdit.userType === "" ||
      userEdit.userType === "All" ||
      userEdit.city === "" ||
      userEdit.address === "" ||
      equal(user, userEdit)
    )
      return true;
    return false;
  };

  const onClickEdit = () => {
    handleEdit(userEdit);
    setSelectedPerson(null);
    toggleHideDialog();
  };

  const onRenderTitle: IRenderFunction<IDropdownOption[]> = (options) => {
    if (options) {
      const option = options[0];
      return <span style={{ color: "#fff" }}>{option?.text}</span>;
    }
    return null;
  };

  const onRenderCaretDown: IRenderFunction<IDropdownProps> = (props) => {
    if (props) {
      return (
        <span style={{ color: "#6741d9", fontSize: "18px" }}>
          <Icon iconName="ChevronDown" />
        </span>
      );
    }
    return null;
  };

  const onRenderPlaceholder: IRenderFunction<IDropdownProps> = (props) => {
    if (props) {
      return (
        <div style={{ color: "#fff" }}>
          <span>{props.placeholder}</span>
        </div>
      );
    }
    return null;
  };

  const onChange = (
    event: React.FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    _index?: number
  ) => {
    setUserEdit({ ...userEdit, userType: option?.text || "All" });
  };
  return (
    <Stack>
      <DefaultButton
        onClick={toggleHideDialog}
        iconProps={editIcon}
        styles={editBtnDialog}
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
            defaultValue={user.name}
            onChange={(
              _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, name: newValue || "" })}
          />
          <TextField
            type="text"
            label="Surname"
            styles={textFieldStyles}
            defaultValue={user.surname}
            onChange={(
              _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, surname: newValue || "" })}
          />

          <TextField
            type="text"
            label="City"
            styles={textFieldStyles}
            defaultValue={user.city}
            onChange={(
              _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, city: newValue || "" })}
          />
          <TextField
            type="text"
            label="Address"
            styles={textFieldStyles}
            defaultValue={user.address}
            onChange={(
              _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, address: newValue || "" })}
          />
          <Dropdown
            placeholder="Select an option"
            options={userTypes}
            styles={dropdownStyles}
            selectedKey={userEdit.userType.toLowerCase()}
            onChange={onChange}
            onRenderTitle={onRenderTitle}
            onRenderCaretDown={onRenderCaretDown}
            onRenderPlaceholder={onRenderPlaceholder}
          />
        </DialogContent>
        <DialogFooter>
          <PrimaryButton
            styles={submitStyle}
            onClick={onClickEdit}
            text="Edit"
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

export default EditDialog;
