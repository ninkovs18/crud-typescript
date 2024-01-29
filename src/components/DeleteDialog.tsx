import { useBoolean } from "@fluentui/react-hooks";

import {
  DefaultButton,
  Dialog,
  DialogContent,
  DialogFooter,
  PrimaryButton,
  Stack,
} from "@fluentui/react";

import {
  IButtonStyles,
  IDialogStyles,
  IDialogContentStyles,
} from "@fluentui/react";

type DeleteDialogProps = {
  handleDelete: () => Promise<void>;
};

const deleteIcon = {
  iconName: "Delete",
  styles: {
    root: {
      color: "#fff",
      padding: "10px",
      backgroundColor: "#fa5252",
      borderRadius: "50%",
      selectors: {
        ":hover": { backgroundColor: "#e03131" },
      },
    },
  },
};
const deleteBtnStyle: IButtonStyles = {
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
    fontSize: "30px",
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

const DeleteDialog = ({ handleDelete }: DeleteDialogProps) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const onClickDelete = () => {
    handleDelete();
    toggleHideDialog();
  };

  return (
    <Stack>
      <DefaultButton
        onClick={toggleHideDialog}
        iconProps={deleteIcon}
        styles={deleteBtnStyle}
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        minWidth={400}
        styles={dialogStyle}
      >
        <DialogContent
          title="Delete this person?"
          styles={dialogContentStyles}
        ></DialogContent>
        <DialogFooter>
          <PrimaryButton
            styles={submitStyle}
            onClick={onClickDelete}
            text="Delete"
          />
          <DefaultButton
            text="Close"
            onClick={toggleHideDialog}
            styles={closeBtnStyle}
          />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
};

export default DeleteDialog;
