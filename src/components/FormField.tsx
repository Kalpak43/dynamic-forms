import {
  Card,
  CardContent,
  Input,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Switch } from "@mui/material";
import FileInput from "./FileInput";

interface FormFieldProps {
  data: FormFieldType;
  onFieldChange: (
    id: string,
    key: keyof FormFieldType,
    value: string | boolean
  ) => void;
  onDelete: (id: string) => void;
}

function FormField({ data, onFieldChange, onDelete }: FormFieldProps) {
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFieldChange(data.id, "label", e.target.value);
  };

  const handleFileTypeChange = (
    e: SelectChangeEvent<"image" | "video" | "audio" | "doc" | "any">
  ) => {
    onFieldChange(data.id, "fileType", e.target.value);
  };

  const handleTypeChange = (
    e: SelectChangeEvent<
      | "text"
      | "textarea"
      | "date"
      | "radio"
      | "checkbox"
      | "email"
      | "tel"
      | "file"
      | "sign"
      | "time"
      | "number"
    >
  ) => {
    onFieldChange(data.id, "type", e.target.value as FormFieldType["type"]);
  };

  return (
    <Card variant="outlined" style={{ width: "100%" }}>
      <CardContent>
        <div className="flex max-md:flex-col md:items-end gap-4 mb-4">
          <FormControl fullWidth style={{ marginTop: "1rem" }}>
            <Input
              value={data.label}
              onChange={handleLabelChange}
              placeholder={data.type}
              type="text"
            />
          </FormControl>
          <FormControl style={{ marginTop: "1rem", minWidth: "200px" }}>
            <InputLabel id={`type-select-label-${data.id}`}>Type</InputLabel>
            <Select
              labelId={`type-select-label-${data.id}`}
              value={data.type}
              label="Type"
              onChange={handleTypeChange}
              size="small"
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="textarea">Paragraph</MenuItem>
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="radio">Radio</MenuItem>
              <MenuItem value="checkbox">Checkbox</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="tel">Tel</MenuItem>
              <MenuItem value="file">File</MenuItem>
              <MenuItem value="sign">Signature</MenuItem>
              <MenuItem value="time">Time</MenuItem>
              <MenuItem value="number">Number</MenuItem>
            </Select>
          </FormControl>
        </div>

        {data.image && (
          <div className="relative my-4 border-1 border-gray-300 rounded-md p-2">
            <img
              src={data.image}
              alt=""
              className="w-full max-h-[300px] object-contain"
            />
            <IconButton
              sx={{
                aspectRatio: "1/1",
                color: "#000",
                position: "absolute",
                top: 2,
                right: 2,
                backgroundColor: "#fff",
              }}
              className="shadow"
              onClick={() => onFieldChange(data.id, "image", "")}
            >
              <CloseIcon />
            </IconButton>
          </div>
        )}

        <div className="mb-4">
          {data.type === "text" && (
            <FormControl fullWidth style={{ marginTop: "1rem" }}>
              <Input placeholder="Answer field" type={data.type} disabled />
            </FormControl>
          )}
          {data.type === "textarea" && (
            <FormControl fullWidth style={{ marginTop: "1rem" }}>
              <TextField
                placeholder="Long Answer field"
                rows={4}
                variant="standard"
                fullWidth
                multiline
                disabled
              />
            </FormControl>
          )}
          {data.type === "date" && (
            <FormControl fullWidth style={{ marginTop: "1rem" }}>
              <Input placeholder="Answer field" type={data.type} disabled />
            </FormControl>
          )}
          {data.type === "radio" && (
            <div style={{ marginTop: "1rem" }}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {data.options?.map((option, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                      gap: "0.5rem",
                    }}
                  >
                    <RadioButtonUncheckedIcon fontSize="small" />
                    <Input
                      value={option}
                      placeholder={`Option ${index + 1}`}
                      onChange={(e) => {
                        const newOptions = data.options
                          ? [...data.options]
                          : [];
                        newOptions[index] = e.target.value;
                        onFieldChange(data.id, "options", newOptions as any);
                      }}
                      margin="dense"
                    />
                    <IconButton
                      onClick={() => {
                        const newOptions = data.options
                          ? data.options.filter((_, i) => i !== index)
                          : [];

                        onFieldChange(data.id, "options", newOptions as any);
                      }}
                      size="small"
                      disabled={!data.options || data.options.length <= 1}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </li>
                ))}
              </ul>
              <Button
                variant="outlined"
                onClick={() => {
                  const newOptions = data.options
                    ? [...data.options, ""]
                    : [""];
                  onFieldChange(data.id, "options", newOptions as any);
                }}
                style={{ marginTop: "0.5rem" }}
                disabled={
                  data.options &&
                  data.options.length > 0 &&
                  data.options[data.options.length - 1] === ""
                }
              >
                Add Option
              </Button>
            </div>
          )}
          {data.type === "checkbox" && (
            <div style={{ marginTop: "1rem" }}>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {data.options?.map((option, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                      gap: "0.5rem",
                    }}
                  >
                    <CheckBoxOutlineBlankIcon fontSize="small" />
                    <Input
                      value={option}
                      placeholder={`Option ${index + 1}`}
                      onChange={(e) => {
                        const newOptions = data.options
                          ? [...data.options]
                          : [];
                        newOptions[index] = e.target.value;
                        onFieldChange(data.id, "options", newOptions as any);
                      }}
                      margin="dense"
                    />
                    <IconButton
                      onClick={() => {
                        const newOptions = data.options
                          ? data.options.filter((_, i) => i !== index)
                          : [];

                        onFieldChange(data.id, "options", newOptions as any);
                      }}
                      size="small"
                      disabled={!data.options || data.options.length <= 1}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </li>
                ))}
              </ul>
              <Button
                variant="outlined"
                onClick={() => {
                  const newOptions = data.options
                    ? [...data.options, ""]
                    : [""];
                  onFieldChange(data.id, "options", newOptions as any);
                }}
                style={{ marginTop: "0.5rem" }}
                disabled={
                  data.options &&
                  data.options.length > 0 &&
                  data.options[data.options.length - 1] === ""
                }
              >
                Add Option
              </Button>
            </div>
          )}
          {data.type === "email" && (
            <FormControl fullWidth style={{ marginTop: "1rem" }}>
              <Input placeholder="Answer field" type={data.type} disabled />
            </FormControl>
          )}
          {data.type === "tel" && (
            <FormControl fullWidth style={{ marginTop: "1rem" }}>
              <Input
                placeholder="Enter a valid phone number"
                type={data.type}
                disabled
              />
            </FormControl>
          )}
          {data.type === "file" && (
            <div className="mb-4">
              <div className="flex max-md:flex-col md:items-center gap-2 justify-between">
                <FormControl style={{ marginTop: "1rem", minWidth: "200px" }}>
                  <InputLabel id={`type-select-file-type-${data.id}`}>
                    Allowed
                  </InputLabel>
                  <Select
                    labelId={`type-select-file-type-${data.id}`}
                    value={data.fileType ?? "any"}
                    label="Type"
                    onChange={handleFileTypeChange}
                    size="small"
                  >
                    <MenuItem value="image">Image</MenuItem>
                    <MenuItem value="audio">Audio</MenuItem>
                    <MenuItem value="video">Video</MenuItem>
                    <MenuItem value="doc">Doc</MenuItem>
                    <MenuItem value="any">Any</MenuItem>
                  </Select>
                </FormControl>
                <p className="text-sm">
                  <strong>Max size: </strong>5MB
                </p>
              </div>
              <FormControl fullWidth style={{ marginTop: "1rem" }}>
                <FileInput
                  // placeholder="Enter a valid phone number"
                  onChange={() => {}}
                  fileType={data.fileType}
                  disabled
                />
              </FormControl>
            </div>
          )}
          {data.type === "sign" && (
            <div className="space-y-4">
              <div className="mx-auto h-[200px] w-[300px] border-1 border-gray-400 text-gray-400 flex items-center justify-center">
                <p>No signature added</p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Button disabled variant="outlined">
                  Sign Yourself
                </Button>
                <Button disabled variant="outlined" className="relative">
                  Upload from device
                </Button>
              </div>
            </div>
          )}
          {data.type === "time" && (
            <FormControl fullWidth style={{ marginTop: "1rem" }}>
              <Input placeholder="Time" type={data.type} disabled />
            </FormControl>
          )}
          {data.type === "number" && (
            <div className="space-y-2">
              <div className="flex max-md:flex-col md:items-center gap-2 justify-between">
                <FormControl fullWidth style={{ marginTop: "1rem" }}>
                  <InputLabel htmlFor="min-input">Min</InputLabel>
                  <Input
                    id="min-input"
                    placeholder="Enter a Number"
                    type={data.type}
                    onChange={(e) => {
                      onFieldChange(data.id, "min", e.target.value);
                    }}
                  />
                </FormControl>
                <FormControl fullWidth style={{ marginTop: "1rem" }}>
                  <InputLabel htmlFor="max-input">Max</InputLabel>
                  <Input
                    id="max-input"
                    placeholder="Enter a Number"
                    type={data.type}
                    onChange={(e) => {
                      onFieldChange(data.id, "max", e.target.value);
                    }}
                  />
                </FormControl>
              </div>
              <FormControl fullWidth style={{ marginTop: "1rem" }}>
                <Input placeholder="Enter a Number" type={data.type} disabled />
              </FormControl>
            </div>
          )}
        </div>

        {/* <Divider variant="middle" component="div" /> */}

        {/* other options */}
        <div className="flex items-center justify-end mt-4 divide-x-2 divide-gray-300 gap-2">
          <div className="flex items-center">
            <p>Required: </p>
            <Switch
              checked={data.required || false}
              onChange={(e) => {
                onFieldChange(data.id, "required", e.target.checked);
              }}
              // inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <div>
            <IconButton
              size="small"
              onClick={() => {
                onDelete(data.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FormField;
