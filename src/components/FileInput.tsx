import { useCallback, useEffect, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const DropzoneArea = styled(Paper)(({ theme }) => ({
  border: "2px dashed #eeeeee",
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#bdbdbd",
  cursor: "pointer",
  transition: "border .24s ease-in-out",
}));

const acceptableFiles: Record<string, Accept> = {
  image: { "image/*": [] },
  video: { "video/*": [] },
  audio: { "audio/*": [] },
  doc: {
    "application/pdf": [],
    "application/msword": [],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      [],
    "application/vnd.ms-excel": [],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    "application/vnd.ms-powerpoint": [],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      [],
    "text/plain": [],
  },
  any: {}, // Accept all file types
};

interface FileInputProps {
  onChange: (file: File | null) => void;
  fileType?: keyof typeof acceptableFiles;
  disabled?: boolean;
  error?: string;
  value?: File | null; // Add this line
}

const MAX_SIZE = 5 * 1024 * 1024;

function FileInput({
  onChange,
  fileType = "any",
  disabled = false,
  value = null, // Add this line
}: FileInputProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(value); // Initialize with value

  useEffect(() => {
    setSelectedFile(value); // Update state when value changes
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
        onChange(acceptedFiles[0]);
      } else {
        setSelectedFile(null);
        onChange(null);
      }
    },
    [onChange]
  );

  const clearSelection = () => {
    setSelectedFile(null);
    onChange(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptableFiles[fileType],
    disabled,
    maxSize: MAX_SIZE,
  });

  return (
    <div>
      <DropzoneArea {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant="h6">Drop the file here ...</Typography>
        ) : (
          <Typography variant="h6">
            Drag 'n' drop a {fileType} file here, or click to select one
          </Typography>
        )}
      </DropzoneArea>

      {selectedFile && (
        <div style={{ marginTop: "10px" }}>
          <Typography variant="body1" sx={{ color: "green" }}>
            ✅ Uploaded: {selectedFile.name}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={clearSelection}
            sx={{ mt: 1 }}
          >
            Clear Selection
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileInput;
