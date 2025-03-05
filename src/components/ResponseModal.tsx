import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface ResponseModalProps {
  open: boolean;
  onClose: () => void;
  responses: { [key: string]: any };
}

function ResponseModal({ open, onClose }: ResponseModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Form Responses</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          Form submitted Successfully
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResponseModal;
