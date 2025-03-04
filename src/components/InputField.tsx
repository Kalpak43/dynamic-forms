import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import FileInput from "./FileInput";
import { useEffect, useState } from "react";
import SignaturePadInput from "./SignaturePad";
import Modal from "@mui/material/Modal";

interface InputFieldProps {
  data: FormFieldType;
  onChange: (value: any) => void;
  value: any;
  error?: string;
  disabled: boolean;
}

function InputField({
  data,
  onChange,
  value,
  error,
  disabled,
}: InputFieldProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: any) => {
    if (data.type === "checkbox") {
      const newValue = Array.isArray(value) ? [...value] : [];
      if (event.target.checked) {
        newValue.push(event.target.value);
      } else {
        const index = newValue.indexOf(event.target.value);
        if (index > -1) {
          newValue.splice(index, 1);
        }
      }
      onChange(newValue);
    } else {
      onChange(event.target.value);
    }
  };

  // Function to convert Base64 to Blob URL
  const getBlobUrl = (base64: string, mimeType: string) => {
    try {
      const byteCharacters = atob(base64.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length)
        .fill(0)
        .map((_, i) => byteCharacters.charCodeAt(i));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error converting Base64 to Blob:", error);
      return null;
    }
  };

  useEffect(() => console.log(value), [value]);

  return (
    <Card variant="outlined" sx={{ width: "100%" }} className="shadow-sm">
      <CardContent>
        <Typography
          sx={{
            marginBottom: "0.5rem",
          }}
          variant="body1"
          component="div"
        >
          {data.label}
          {data.required && <span className="text-red-500"> *</span>}
        </Typography>

        {data.image && (
          <div className="relative my-4 border-1 border-gray-300 rounded-md p-2">
            <img
              src={data.image}
              alt=""
              className=" w-full max-h-[300px] object-contain"
            />
          </div>
        )}

        <Typography variant="body2" component="div">
          {data.type === "text" && (
            <FormControl fullWidth style={{ marginTop: "1rem" }}>
              <Input
                value={value}
                onChange={handleChange}
                placeholder="Your answer"
                type={data.type}
                // required={data.required}
                disabled={disabled}
              />
              <br />
              {error && (
                <FormHelperText error>
                  <ErrorOutlineIcon fontSize="small" /> {error}
                </FormHelperText>
              )}
            </FormControl>
          )}
          {data.type === "textarea" && (
            <FormControl fullWidth style={{ marginTop: "1rem" }}>
              <TextField
                value={value}
                onChange={handleChange}
                placeholder="Your answer"
                rows={4}
                variant="filled"
                fullWidth
                multiline
                // required={data.required}
                disabled={disabled}
              />
              <br />
              {error && (
                <FormHelperText error>
                  <ErrorOutlineIcon fontSize="small" /> {error}
                </FormHelperText>
              )}
            </FormControl>
          )}
          {data.type === "date" &&
            (!disabled ? (
              <FormControl style={{ marginTop: "1rem" }}>
                <Input
                  value={value || ""}
                  onChange={handleChange}
                  type={data.type}
                  disabled={disabled}
                />
                <br />
                {error && (
                  <FormHelperText error>
                    <ErrorOutlineIcon fontSize="small" /> {error}
                  </FormHelperText>
                )}
              </FormControl>
            ) : (
              <>
                <Input
                  value={new Date(value).toLocaleDateString("en-GB") || ""}
                  onChange={handleChange}
                  type={"text"}
                  disabled={disabled}
                />
              </>
            ))}
          {data.type === "radio" && (
            <FormControl error={!!error}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                // name={data.id}
                value={value || ""}
                onChange={handleChange}
              >
                {data.options &&
                  data.options.map((opt, i) => {
                    return (
                      <FormControlLabel
                        key={i}
                        value={opt}
                        control={<Radio disabled={disabled} />}
                        label={opt}
                      />
                    );
                  })}
              </RadioGroup>
              <br />
              {error && (
                <FormHelperText error>
                  <ErrorOutlineIcon fontSize="small" /> {error}
                </FormHelperText>
              )}
            </FormControl>
          )}
          {data.type === "checkbox" && (
            <FormControl>
              {data.options &&
                data.options.map((opt) => {
                  return (
                    <FormControlLabel
                      key={opt}
                      control={
                        <Checkbox
                          onChange={handleChange}
                          value={opt}
                          checked={
                            Array.isArray(value) ? value.includes(opt) : false
                          }
                          disabled={disabled}
                        />
                      }
                      label={opt}
                    />
                  );
                })}
              <br />
              {error && (
                <FormHelperText error>
                  <ErrorOutlineIcon fontSize="small" /> {error}
                </FormHelperText>
              )}
            </FormControl>
          )}
          {data.type === "email" && (
            <FormControl fullWidth style={{ marginTop: "1rem" }}>
              <Input
                value={value}
                onChange={handleChange}
                placeholder="Enter a valid email ID"
                type={data.type}
                // required={data.required}
                disabled={disabled}
              />
              <br />
              {error && (
                <FormHelperText error>
                  <ErrorOutlineIcon fontSize="small" /> {error}
                </FormHelperText>
              )}
            </FormControl>
          )}
          {data.type === "tel" && (
            <FormControl fullWidth style={{ marginTop: "1rem" }}>
              <Input
                value={value}
                onChange={handleChange}
                placeholder="Enter a valid Phone number"
                type={data.type}
                // required={data.required}
                disabled={disabled}
              />
              <br />
              {error && (
                <FormHelperText error>
                  <ErrorOutlineIcon fontSize="small" /> {error}
                </FormHelperText>
              )}
            </FormControl>
          )}
          {data.type === "file" &&
            (!disabled ? (
              <FormControl fullWidth style={{ marginTop: "1rem" }}>
                <FileInput
                  onChange={onChange}
                  disabled={disabled}
                  error={error}
                  fileType={data.fileType}
                  value={value}
                />
                <br />
                {error && (
                  <FormHelperText error>
                    <ErrorOutlineIcon fontSize="small" /> {error}
                  </FormHelperText>
                )}
              </FormControl>
            ) : (
              <>
                {(() => {
                  const fileType = value.base64
                    .split(",")[0]
                    ?.split(":")[1]
                    ?.split(";")[0]; // Extract MIME type
                  const blobUrl = getBlobUrl(value.base64, fileType);

                  if (!blobUrl)
                    return <Typography color="error">Invalid File</Typography>;

                  if (fileType.startsWith("image/")) {
                    return (
                      <img
                        src={blobUrl}
                        alt="Uploaded"
                        className=" w-full max-h-[300px] object-contain border border-gray-300"
                      />
                    );
                  } else if (fileType.startsWith("video/")) {
                    return (
                      <video
                        src={blobUrl}
                        controls
                        className=" w-full max-h-[300px] object-contain border"
                      />
                    );
                  } else if (fileType.startsWith("audio/")) {
                    return <audio src={blobUrl} controls />;
                  } else {
                    return (
                      <a href={blobUrl} download="file">
                        Download File
                      </a>
                    );
                  }
                })()}
              </>
            ))}

          {data.type === "sign" && (
            <div className="space-y-4">
              {value ? (
                <img
                  src={value}
                  alt="No signature to preview"
                  className="mx-auto border  border-gray-300"
                  height={200}
                  width={300}
                />
              ) : (
                <div className="mx-auto h-[200px] w-[300px] border-1 border-gray-400 flex items-center justify-center">
                  <p>No signature added</p>
                </div>
              )}
              {!disabled && (
                <div className="flex items-center justify-center gap-2">
                  <Button variant="outlined" onClick={handleOpen}>
                    Sign Yourself
                  </Button>
                  <Button variant="outlined" className="relative">
                    Upload from device
                    <input
                      type="file"
                      accept="image/png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                          const reader = new FileReader();

                          reader.onloadend = () => {
                            const base64String = reader.result as string;
                            console.log("Base64 String:", base64String);
                            // You can store base64String in state or send it to an API
                            onChange(base64String);
                          };

                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 opacity-0"
                    />
                  </Button>
                </div>
              )}
              <Modal open={open} onClose={handleClose}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <SignaturePadInput saveSign={onChange} />
                </Box>
              </Modal>

              {error && (
                <FormHelperText error>
                  <ErrorOutlineIcon fontSize="small" /> {error}
                </FormHelperText>
              )}
            </div>
          )}
          {data.type === "time" &&
            (!disabled ? (
              <FormControl style={{ marginTop: "1rem" }}>
                <Input
                  value={value || ""}
                  onChange={handleChange}
                  type={data.type}
                  disabled={disabled}
                />
                <br />
                {error && (
                  <FormHelperText error>
                    <ErrorOutlineIcon fontSize="small" /> {error}
                  </FormHelperText>
                )}
              </FormControl>
            ) : (
              <>
                <Input
                  value={new Date(value).toLocaleDateString("en-GB") || ""}
                  onChange={handleChange}
                  type={"text"}
                  disabled={disabled}
                />
              </>
            ))}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InputField;
