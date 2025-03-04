import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface ResponseModalProps {
  open: boolean;
  onClose: () => void;
  responses: { [key: string]: any };
}

function ResponseModal({ open, onClose, responses }: ResponseModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Form Responses</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {Object.entries(responses).map(([fieldId, value]) => (
            <Box key={fieldId}>
              <Typography variant="subtitle1">
                <strong>{fieldId}:</strong>
              </Typography>
              <Typography variant="body1">
                {Array.isArray(value) ? value.join(", ") : value}
              </Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ResponseModal;
