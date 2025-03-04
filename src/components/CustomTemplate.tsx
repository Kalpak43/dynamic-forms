import { Card } from "@mui/material";
import React from "react";

function CustomTemplate() {
  return (
    <Card
      className="cursor-pointer relative border border-gray-300 aspect-square"
      sx={{
        "&:hover": {
          borderColor: (theme) => theme.palette.primary.main,
        },
      }}
    ></Card>
  );
}

export default CustomTemplate;
