import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Description } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router";
import { createNewTemplate } from "../features/forms/formThunk";
import { useAppDispatch } from "../app/hooks";
import { v4 as uuidv4 } from "uuid";

function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();

  const handleCreateForm = async () => {
    const id = uuidv4();
    await dispatch(createNewTemplate(id));

    navigate(`/edit/${id}`);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff" }} className="">
      <Toolbar className="flex justify-between items-center px-2">
        <div className="flex items-center space-x-6">
          {/* <IconButton edge="start" className="text-gray-600" aria-label="menu">
            <Apps />
          </IconButton> */}
          <Link to={"/"} className="flex items-center space-x-2">
            <Description className="text-black text-3xl" />
            <Typography variant="h6" className="font-medium text-black">
              Forms
            </Typography>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {/* <IconButton className="hover:bg-gray-100 rounded-full">
            <Avatar
              sx={{ width: 32, height: 32 }}
              alt="User Avatar"
              src="/avatar-placeholder.png"
            />
          </IconButton> */}
          {!location.pathname.includes("/edit") && (
            <Button variant="contained" onClick={handleCreateForm}>
              Create Form
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
