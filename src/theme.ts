import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // or 'dark' for dark mode
    primary: {
      main: "#1976d2", // A shade of blue
      light: "#42a5f5", // Lighter blue
      dark: "#1565c0", // Darker blue
      contrastText: "#ffffff", // Text color for contrast
    },
    secondary: {
      main: "#9c27b0", // A shade of purple
      light: "#ba68c8", // Lighter purple
      dark: "#7b1fa2", // Darker purple
      contrastText: "#ffffff", // Text color for contrast
    },
    error: {
      main: "#d32f2f", // A shade of red
      light: "#ef5350", // Lighter red
      dark: "#c62828", // Darker red
      contrastText: "#ffffff", // Text color for contrast
    },
    warning: {
      main: "#ed6c02", // A shade of orange
      light: "#ff9800", // Lighter orange
      dark: "#e65100", // Darker orange
      contrastText: "#ffffff", // Text color for contrast
    },
    info: {
      main: "#0288d1", // A shade of blue
      light: "#03a9f4", // Lighter blue
      dark: "#01579b", // Darker blue
      contrastText: "#ffffff", // Text color for contrast
    },
    success: {
      main: "#2e7d32", // A shade of green
      light: "#4caf50", // Lighter green
      dark: "#1b5e20", // Darker green
      contrastText: "#ffffff", // Text color for contrast
    },
    background: {
      default: "#e9e9e9", // Default background color
      paper: "#ffffff", // Background color for Paper components
    },
    text: {
      primary: "#212121", // Primary text color
      secondary: "#757575", // Secondary text color
      disabled: "#bdbdbd", // Disabled text color
    },
    divider: "#e0e0e0", // Divider color
  },
});

export default theme;
