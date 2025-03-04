import { Link, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { MouseEvent, useEffect, useState } from "react";
import {
  alpha,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  createTheme,
  FormControl,
  IconButton,
  Input,
  Menu,
  MenuItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { editTemplate } from "../features/forms/formThunk";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ImageIcon from "@mui/icons-material/Image";
import PaletteIcon from "@mui/icons-material/Palette";
import ShareIcon from "@mui/icons-material/Share";
import FormField from "../components/FormField";

import { Tabs, Tab } from "@mui/material";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { AppBar, Toolbar } from "@mui/material";
import { Description } from "@mui/icons-material";
import InputField from "../components/InputField";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

function Createpage() {
  const { templateId } = useParams();
  const dispatch = useAppDispatch();
  const { templates } = useAppSelector((state) => state.form);

  const [template, setTemplate] = useState<FormTemplate | null>(null);

  useEffect(() => {
    if (template) {
      dispatch(
        editTemplate({
          id: template.id,
          formTemplate: template,
        })
      );
    }
  }, [template]);

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

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    templates.forEach((template) => {
      if (template.id === templateId) {
        setTemplate(template);
      }
    });
  }, [templateId]);

  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={createTheme((template && template.theme) ?? {})}>
      <Box
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1), // Lighten the primary.main color
          // padding: 3,
          borderRadius: 2,
          minHeight: "100dvh",
        }}
      >
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

            <div className="flex items-center gap-4">
              <>
                <IconButton
                  //   className="absolute top-2 right-2"
                  // sx={{
                  //   position: "absolute",
                  //   top: 2,
                  //   right: 2,
                  // }}
                  onClick={handleMenuOpen}
                  onMouseDown={(event) => event.stopPropagation()} // Prevent accidental card click on mobile
                >
                  <PaletteIcon />
                </IconButton>
                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      setTemplate(
                        (x) =>
                          ({
                            ...x,
                            theme: {
                              palette: {
                                primary: {
                                  main: "#4caf50",
                                },
                              },
                            },
                          } as FormTemplate)
                      );
                    }}
                  >
                    <div className="w-6 aspect-square rounded-full bg-[#4caf50]"></div>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTemplate(
                        (x) =>
                          ({
                            ...x,
                            theme: {
                              palette: {
                                primary: {
                                  main: "#1976d2",
                                },
                              },
                            },
                          } as FormTemplate)
                      );
                    }}
                  >
                    <div className="w-6 aspect-square rounded-full bg-[#1976d2]"></div>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setTemplate(
                        (x) =>
                          ({
                            ...x,
                            theme: {
                              palette: {
                                primary: {
                                  main: "#ff5722",
                                },
                              },
                            },
                          } as FormTemplate)
                      );
                    }}
                  >
                    <div className="w-6 aspect-square rounded-full bg-[#ff5722]"></div>
                  </MenuItem>
                </Menu>
              </>
              {template && template.published ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    const formUrl = `${window.location.origin}/form/${template.id}`;
                    navigator.clipboard.writeText(formUrl);
                  }}
                >
                  <ShareIcon fontSize="small" className="mr-2" />
                  Share Link
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    setTemplate(
                      (x) =>
                        ({
                          ...x,
                          published: true,
                        } as FormTemplate)
                    );
                  }}
                >
                  Publish
                </Button>
              )}
            </div>
          </Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Questions" />
            <Tab label="Responses" />
            {/* <Tab label="Support Questions" /> */}
          </Tabs>
        </AppBar>
        <div className="">
          {template && (
            <Box>
              {activeTab === 0 && (
                <EditForm templateId={templateId!} />
                // <p>Edit</p>
              )}
              {activeTab === 1 && (
                // <ResponseTab template={template} setTemplate={setTemplate} />
                <p>Response</p>
              )}
            </Box>
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default Createpage;

export const EditForm = ({ templateId }: { templateId: string }) => {
  const dispatch = useAppDispatch();

  const { templates } = useAppSelector((state) => state.form);

  const [template, setTemplate] = useState<FormTemplate | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    templates.forEach((template) => {
      if (template.id === templateId) {
        setTemplate(template);
      }
    });
  }, [templateId]);

  useEffect(() => {
    if (template) {
      setTimeout(() => {
        dispatch(
          editTemplate({
            id: template.id,
            formTemplate: template,
          })
        );
      }, 5000);
    }
  }, [template]);

  const addField = (after: string, data: FormFieldType) => {
    if (!template) return;

    setTemplate((prevTemplate) => {
      if (!prevTemplate) return prevTemplate;

      const newFields = [...prevTemplate.fields];
      const index = newFields.findIndex((field) => field.id === after);

      if (index === -1) {
        // If 'after' field is not found, add the new field at the end
        newFields.push(data);
      } else {
        // Insert the new field after the 'after' field
        newFields.splice(index + 1, 0, data);
      }

      return { ...prevTemplate, fields: newFields } as FormTemplate;
    });
  };

  const deleteField = (id: string) => {
    if (!template) return;

    setTemplate({
      ...template,
      fields: template.fields.filter((field) => field.id !== id),
    });
  };

  // New function to update a field in the template
  const handleFieldChange = (
    id: string,
    key: keyof FormFieldType,
    value: string | boolean
  ) => {
    if (!template) return;

    setTemplate({
      ...template,
      fields: template.fields.map((field) => {
        if (field.id === id) {
          let updatedField = { ...field, [key]: value };

          if (key === "type" && (value === "radio" || value === "checkbox")) {
            // Ensure options exist and is not empty
            if (!updatedField.options || updatedField.options.length === 0) {
              updatedField = { ...updatedField, options: [""] };
            }
          }

          return updatedField;
        } else {
          return field;
        }
      }),
    });
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (!template) return template;
    console.log("ENDED ");
    const newFields = Array.from(template.fields);
    const [removed] = newFields.splice(result.source.index, 1);
    newFields.splice(result.destination.index, 0, removed);

    setTemplate(
      (x) =>
        ({
          ...x,
          fields: newFields,
        } as FormTemplate)
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    // Check if the click is outside of any form field
    if (!target.closest(".form-field-container")) {
      setFocusedField(null);
    }
  };

  // Add effect for click listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <main className="">
      <div className="space-y-4 max-w-3xl mx-auto">
        {/* title and description */}
        {template && (
          <Card
            sx={{
              borderTop: "8px solid",
              borderColor: (theme) => theme.palette.primary.main,
            }}
          >
            <CardContent>
              <FormControl fullWidth style={{ marginTop: "1rem" }}>
                <Input
                  type="text"
                  value={template.title}
                  onChange={(e) =>
                    setTemplate(
                      (x) => ({ ...x, title: e.target.value } as FormTemplate)
                    )
                  }
                  style={{
                    fontSize: "2rem",
                  }}
                  placeholder="Form title"
                />
              </FormControl>

              <FormControl fullWidth style={{ marginTop: "1rem" }}>
                <Input
                  type="text"
                  placeholder="Form description"
                  value={template.description ?? ""}
                  onChange={(e) =>
                    setTemplate(
                      (x) =>
                        ({
                          ...x,
                          description: e.target.value,
                        } as FormTemplate)
                    )
                  }
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </FormControl>
            </CardContent>
          </Card>
        )}
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable-list">
            {(provided) => (
              <div
                className="my-3 space-y-3"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {template?.fields.map((field, index) => (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`form-field-container relative flex flex-col items-center gap-2 p-2 bg-white rounded-md transition-all border-2 ${
                          focusedField == field.id
                            ? `shadow-md border-gray-400`
                            : "border-transparent"
                        }`}
                        onClick={() => setFocusedField(field.id)}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab"
                        >
                          <DragHandleIcon />
                        </div>
                        {/* Form Field */}
                        <FormField
                          data={field}
                          onFieldChange={handleFieldChange}
                          onDelete={deleteField}
                        />

                        {focusedField === field.id && (
                          <ButtonGroup
                            orientation="vertical"
                            aria-label="Vertical button group"
                            variant="contained"
                            sx={{
                              background: "#fff",
                              position: "absolute",
                              insetBlock: 0,
                              height: "fit-content",
                              left: "100%",
                              marginInline: "0.5rem",
                              marginTop: "auto",
                            }}
                          >
                            <IconButton
                              key={"image"}
                              onClick={() =>
                                document
                                  .getElementById(`image-upload-${field.id}`)
                                  ?.click()
                              }
                            >
                              <ImageIcon />
                              <input
                                type="file"
                                id={`image-upload-${field.id}`}
                                style={{ display: "none" }}
                                onChange={(e) => {
                                  const file = (e.target as HTMLInputElement)
                                    .files?.[0];
                                  if (file) {
                                    // Handle the image file here
                                    console.log("Selected image:", file);
                                    // You can use FileReader to read the image as a data URL
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      const imageDataUrl =
                                        reader.result as string;
                                      // Now you can use imageDataUrl to display the image or upload it
                                      console.log(
                                        "Image data URL:",
                                        imageDataUrl
                                      );
                                      // You might want to store the image data URL in the field state
                                      handleFieldChange(
                                        field.id,
                                        "image",
                                        imageDataUrl
                                      ); // Assuming you add 'image' to your FormField type
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                accept="image/*" // Optional: limit to image files
                              />
                            </IconButton>
                            <IconButton
                              key={"addd"}
                              onClick={() =>
                                addField(field.id, {
                                  id: uuidv4(),
                                  type: "text",
                                  label: "New Text",
                                  required: false,
                                })
                              }
                            >
                              <ControlPointIcon />
                            </IconButton>
                          </ButtonGroup>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* buttons */}
        <div className="text-right">
          <Button
            variant="contained"
            key={"addd"}
            onClick={() =>
              addField("", {
                id: uuidv4(),
                type: "text",
                label: "New Text",
                required: false,
              })
            }
          >
            <ControlPointIcon className="mr-2" /> Add Field
          </Button>
        </div>
      </div>
    </main>
  );
};

export const ResponseTab = ({
  template,
}: {
  template: FormTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<FormTemplate | null>>;
}) => {
  const responses = [...template.responses].sort((a, b) => {
    if (!a.time || !b.time) return 0;
    return b.time - a.time;
  });

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const [activeResponse, setActiveResponse] = useState(0);

  const handlePrevious = () => {
    if (activeResponse > 0) {
      setActiveResponse(activeResponse - 1);
    }
  };

  const handleNext = () => {
    if (activeResponse < template.responses.length - 1) {
      setActiveResponse(activeResponse + 1);
    }
  };

  return (
    <main>
      <div className="space-y-4 max-w-3xl mx-auto">
        <Card>
          <CardContent>
            <Typography variant="h4">
              {responses && <p>{responses.length} responses</p>}
            </Typography>
          </CardContent>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Summary" />
            <Tab label="Individual" />
            {/* <Tab label="Support Questions" /> */}
          </Tabs>
        </Card>
        {responses && responses.length > 0 && (
          <>
            {activeTab == 0 && (
              <Card>
                <CardContent className="overflow-x-auto">
                  <Table
                    sx={{
                      backgroundColor: "#f3f3f3",
                    }}
                  >
                    <TableHead>
                      <TableRow className="divide-x-1 divide-gray-300">
                        {/* Map each question as a header */}
                        <TableCell>Response ID</TableCell>
                        {template.fields.map((field) => (
                          <TableCell key={field.id}>{field.label}</TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {responses.map(
                        (resp) =>
                          resp.responseId && (
                            <TableRow
                              key={resp.responseId}
                              className="divide-x-1 divide-gray-300"
                            >
                              <TableCell>{resp.responseId}</TableCell>
                              {template.fields.map((field) => {
                                const answer = resp.response[field.id];

                                // Format the display value based on field type
                                let display = answer;

                                if (field.type === "date" && answer) {
                                  display = new Date(answer).toLocaleDateString(
                                    "en-GB"
                                  );
                                } else if (
                                  field.type === "file" &&
                                  answer?.base64
                                ) {
                                  try {
                                    // Convert Base64 to Blob
                                    const byteCharacters = atob(
                                      answer.base64.split(",")[1]
                                    );
                                    const byteNumbers = new Array(
                                      byteCharacters.length
                                    )
                                      .fill(0)
                                      .map((_, i) =>
                                        byteCharacters.charCodeAt(i)
                                      );
                                    const byteArray = new Uint8Array(
                                      byteNumbers
                                    );
                                    const blob = new Blob([byteArray], {
                                      type: answer.type,
                                    });

                                    // Create a previewable object URL
                                    const blobUrl = URL.createObjectURL(blob);

                                    display = (
                                      <a
                                        href={blobUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline text-blue-400"
                                      >
                                        Preview File
                                      </a>
                                    );
                                  } catch (error) {
                                    console.error(
                                      "Error converting Base64 to Blob:",
                                      error
                                    );
                                    display = "Invalid File";
                                  }
                                } else if (field.type === "sign" && answer) {
                                  try {
                                    // Convert Base64 to Blob
                                    const byteCharacters = atob(
                                      answer.split(",")[1]
                                    );
                                    const byteNumbers = new Array(
                                      byteCharacters.length
                                    )
                                      .fill(0)
                                      .map((_, i) =>
                                        byteCharacters.charCodeAt(i)
                                      );
                                    const byteArray = new Uint8Array(
                                      byteNumbers
                                    );
                                    const blob = new Blob([byteArray], {
                                      type: "image/png",
                                    });

                                    // Create a previewable object URL
                                    const blobUrl = URL.createObjectURL(blob);

                                    display = (
                                      <a
                                        href={blobUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline text-blue-400"
                                      >
                                        Preview File
                                      </a>
                                    );
                                  } catch (error) {
                                    console.error(
                                      "Error converting Signature Base64 to Blob:",
                                      error
                                    );
                                    display = "Invalid Signature";
                                  }
                                }

                                return (
                                  <TableCell
                                    key={field.id}
                                    className="min-w-[200px]"
                                  >
                                    {display !== undefined ? display : "-"}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          )
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
            {activeTab == 1 && (
              <>
                <Card>
                  <CardContent>
                    <div className="flex items-center justify-end gap-2">
                      <IconButton
                        onClick={handlePrevious}
                        disabled={activeResponse === 0}
                      >
                        <NavigateBeforeIcon />
                      </IconButton>
                      <p>
                        {activeResponse + 1} of {responses.length}
                      </p>
                      <IconButton
                        onClick={handleNext}
                        disabled={activeResponse === responses.length - 1}
                      >
                        <NavigateNextIcon />
                      </IconButton>
                    </div>
                    <p>
                      <strong>Response ID:</strong>{" "}
                      {responses[activeResponse].responseId}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {new Date(
                        responses[activeResponse].time
                      ).toLocaleDateString()}{" "}
                      {new Date(
                        responses[activeResponse].time
                      ).toLocaleTimeString()}
                    </p>
                  </CardContent>
                </Card>
                <Preview
                  template={template}
                  response={responses[activeResponse]}
                />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export const Preview = ({
  template,
  response,
}: {
  template: FormTemplate;
  response: FormResponseType;
}) => {
  return (
    <div className="space-y-4">
      {template.fields.map((field) => {
        return (
          <InputField
            key={field.id}
            data={field}
            value={response.response[field.id] ?? ""}
            onChange={() => {}}
            // error={error?.message as string}
            disabled={true}
          />
        );
      })}
    </div>
  );
};
