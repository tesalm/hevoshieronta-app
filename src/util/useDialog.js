import { useState } from "react";

const useDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState({});

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const openDialogWithProps = (props = {}) => {
    setDialogProps(props);
    setIsDialogOpen(true);
  };

  return {
    isDialogOpen,
    closeDialog,
    dialogProps,
    openDialogWithProps,
  };
}

export default useDialog;