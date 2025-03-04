import { Card, CardContent } from "@mui/material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent } from "react";
import { useNavigate } from "react-router";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";

function TemplateCard({
  template,
  onShare,
  onDelete,
}: {
  template: FormTemplate;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation(); // Prevents card click event
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event: MouseEvent | KeyboardEvent) => {
    event.stopPropagation(); // Prevents card click event
    setAnchorEl(null);
  };

  const handleShareClick = (event: MouseEvent) => {
    event.stopPropagation(); // Prevents card click event
    handleMenuClose(event);
    onShare(template.id);
  };

  const handleDeleteClick = (event: MouseEvent) => {
    event.stopPropagation(); // Prevents card click event
    handleMenuClose(event);
    onDelete(template.id);
  };

  return (
    <Card
      key={template.id}
      className="cursor-pointer relative"
      onClick={() => navigate(`/edit/${template.id}`)}
    >
      <CardContent
        sx={{
          position: "relative",
        }}
      >
        <div>
          <h3 className=" font-semibold">{template.title}</h3>
          <p className="text-gray-700 text-sm">
            {new Date(template.createdAt).toLocaleDateString()}{" "}
            {new Date(template.createdAt).toLocaleTimeString()}
          </p>
        </div>

        {/* Three-dot button */}
        <IconButton
          //   className="absolute top-2 right-2"
          sx={{
            position: "absolute",
            top: 2,
            right: 2,
          }}
          onClick={handleMenuOpen}
          onMouseDown={(event) => event.stopPropagation()} // Prevent accidental card click on mobile
        >
          <MoreVertIcon />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleShareClick}>
            <ShareIcon fontSize="small" className="mr-2" />
            Share
          </MenuItem>
          <MenuItem onClick={handleDeleteClick}>
            <DeleteIcon fontSize="small" className="mr-2" />
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}

export default TemplateCard;
