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
    <Stack>
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
          <TextField
            type="text"
            label="Name"
            defaultValue={user.name}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, name: newValue || "" })}
          />
          <TextField
            type="text"
            label="Surname"
            defaultValue={user.surname}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, surname: newValue || "" })}
          />
          <TextField
            type="text"
            label="User type"
            defaultValue={user.userType}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, userType: newValue || "" })}
          />
          <TextField
            type="text"
            label="City"
            defaultValue={user.city}
            onChange={(
              event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
              newValue?: string
            ) => setUserEdit({ ...userEdit, city: newValue || "" })}
          />
          <TextField
            type="text"
            label="Address"
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
          <DefaultButton onClick={toggleHideDialog} text="Close" />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
};

export default EditDialog;
