import { useBoolean } from "@fluentui/react-hooks";

import {
  DefaultButton,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogType,
  IDialogContentProps,
  IIconProps,
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
  setSelectedPerson: (n: null) => void;
};

const deleteBtnDialog: IButtonStyles = {
  root: {
    backgroundColor: "#fa5252",
    color: "#fff",
    padding: "16px 30px",
    border: "0px",
    borderRadius: "0.75rem",
  },
  rootHovered: {
    backgroundColor: "#e03131",
    color: "#fff",
  },
  rootPressed: {
    backgroundColor: "#fa5252",
    color: "#fff",
  },
};

const deleteIcon: IIconProps = {
  iconName: "Delete",
  styles:{
    root:{
      fontSize: "20px"
    }
  }
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

const displayNone: Partial<IDialogContentStyles> = {
  title: {
    display: "none",
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

const dialogContentProps: IDialogContentProps = {
  type: DialogType.normal,
  title: "Delete this person?",
  closeButtonAriaLabel: "Close",
  styles: dialogContentStyles,
};

const DeleteDialog = ({ handleDelete, setSelectedPerson }: DeleteDialogProps) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  const onClickDelete = () => {
    handleDelete();
    setSelectedPerson(null);
    toggleHideDialog();
  };

  return (
    <Stack>
      <DefaultButton
        onClick={toggleHideDialog}
        iconProps={deleteIcon}
        styles={deleteBtnDialog}
      />

      <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        minWidth={400}
        styles={dialogStyle}
        dialogContentProps={dialogContentProps}
      >
        <DialogContent
          title="Delete this person?"
          styles={displayNone}
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
