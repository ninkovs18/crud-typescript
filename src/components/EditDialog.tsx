import { useState, useMemo } from "react";
import { useId, useBoolean } from "@fluentui/react-hooks";

import {
  DefaultButton,
  Dialog,
  DialogContent,
  Label,
  TextField,
  DialogFooter,
  PrimaryButton,
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

const dialogStyles = { main: { maxWidth: 450 } };

const editIcon = {
  iconName: "EditContact",
  styles: { root: { fontSize: "25px", color: "blue" } },
};
const editStyle = {
  root: {
    border: "0px",
    backgroundColor: "transparent",
  },
};

const submitStyle = {
  root: {
    backgroundColor: "blue",
    border: "0px",
  },
};

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

const EditDialog = ({ user, handleEdit }: EditDialogProps) => {
  const [userEdit, setUserEdit] = useState<IPerson>(user);

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const labelId = useId("dialogLabel");
  const subTextId = useId("subTextLabel");

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

  const modalProps = useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
    }),
    [labelId, subTextId]
  );

  return (
    <div data-is-scrollable="true">
      <DefaultButton
        onClick={editOpen}
        iconProps={editIcon}
        styles={editStyle}
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        modalProps={modalProps}
        minWidth={400}
      >
        <DialogContent title="Edit person">
          <Label required htmlFor={"name-input"}>
            Name:
          </Label>
          <TextField
            type="text"
            id={"name-input"}
            defaultValue={user.name}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, name: newValue || "" })}
            styles={controlStyles}
          />
          <Label required htmlFor={"surname-input"}>
            Surname:
          </Label>
          <TextField
            type="text"
            id={"surname-input"}
            defaultValue={user.surname}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, surname: newValue || "" })}
            styles={controlStyles}
          />
          <Label required htmlFor={"userType-input"}>
            User type:
          </Label>
          <TextField
            type="text"
            id={"userType-input"}
            defaultValue={user.userType}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, userType: newValue || "" })}
            styles={controlStyles}
          />
          <Label required htmlFor={"city-input"}>
            City:
          </Label>
          <TextField
            type="text"
            id={"city-input"}
            defaultValue={user.city}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, city: newValue || "" })}
            styles={controlStyles}
          />
          <Label required htmlFor={"Address-input"}>
            Address:
          </Label>
          <TextField
            type="text"
            id={"Address-input"}
            defaultValue={user.address}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, address: newValue || "" })}
            styles={controlStyles}
          />
        </DialogContent>
        <DialogFooter>
          <PrimaryButton
            styles={submitStyle}
            onClick={onClickEdit}
            text="Edit"
          />
          <DefaultButton onClick={toggleHideDialog} text="Close" />
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default EditDialog;
