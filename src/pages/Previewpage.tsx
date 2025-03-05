import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  createTheme,
  Divider,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ResponseModal from "../components/ResponseModal";

function Previewpage() {
  const { formId } = useParams();

  const { templates } = useAppSelector((state) => state.form);
  const [currentForm, setCurrentForm] = useState<FormTemplate | null>(null);
  const [validationSchema, setValidationSchema] = useState<any>(null);

  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [formResponses, setFormResponses] = useState<{ [key: string]: any }>(
    {}
  ); // State to store form responsesF

  useEffect(() => {
    const template = templates.find((template) => template.id === formId);
    setCurrentForm(template ?? null);
  }, [formId]);

  useEffect(() => {
    if (currentForm) {
      const schema: { [key: string]: any } = {};
      currentForm.fields.forEach((field) => {
        let fieldSchema: any = yup.string();

        // Add required validation if field is required
        if (field.required) {
          fieldSchema = fieldSchema.required(`${field.label} is required`);
        }

        // Add specific validation based on field type
        switch (field.type) {
          case "date":
            fieldSchema = yup
              .date()
              .transform((current, value) => (value === "" ? null : current))
              .nullable();
            if (field.required) {
              fieldSchema = fieldSchema.required(`This field is required`);
            }
            break;
          case "radio":
            fieldSchema = yup.string();
            if (field.required) {
              fieldSchema = fieldSchema.required(`This field is required`);
            }
            break;
          case "checkbox":
            fieldSchema = yup.array().of(yup.string());
            if (field.required) {
              fieldSchema = fieldSchema.min(1, `Select at least 1 option`);
            }
            break;
          case "email":
            fieldSchema = yup.string().email("Invalid email format");
            if (field.required) {
              fieldSchema = fieldSchema.required(`This field is required`);
            }
            break;
          case "tel":
            fieldSchema = yup
              .string()
              .matches(
                /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                "Invalid phone number"
              );
            if (field.required) {
              fieldSchema = fieldSchema.required(`This field is required`);
            }
            break;
          case "file":
            fieldSchema = yup.mixed();
            if (field.required) {
              fieldSchema = fieldSchema.test(
                "fileRequired",
                "This field is required",
                (value: any) => {
                  return value instanceof File; // Ensures a file is selected
                }
              );
            }
            break;
          case "signature":
            fieldSchema = yup
              .string()
              .matches(
                /^data:image\/png;base64,([A-Za-z0-9+/=]+)$/,
                "Invalid signature format"
              )
              .required("Signature is required");
            break;
          case "number":
            fieldSchema = yup
              .number()
              .transform((value, originalValue) => {
                // Convert empty strings to `null` or `undefined`
                return originalValue === "" ? 0 : value;
              })
              .typeError("Must be a number"); // Custom error message for invalid numbers

            if (field.required) {
              fieldSchema = fieldSchema.required("This field is required");
            }
            if (field.min !== undefined) {
              fieldSchema = fieldSchema.min(
                field.min,
                `Minimum value is ${field.min}`
              );
            }
            if (field.max !== undefined) {
              fieldSchema = fieldSchema.max(
                field.max,
                `Maximum value is ${field.max}`
              );
            }
            break;
          default:
            fieldSchema = yup.string();
            if (field.required) {
              fieldSchema = fieldSchema.required(`This field is required`);
            }
        }

        schema[field.id] = fieldSchema;
      });

      setValidationSchema(yup.object().shape(schema));
    }
  }, [currentForm]);

  const {
    handleSubmit,
    reset,
    control, // Use control instead of register
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const template = templates.find((template) => template.id === formId);
    setCurrentForm(template ?? null);
  }, [formId]);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onSubmit = async (data: { [key: string]: any }) => {
    const processedData = { ...data };

    // Convert file fields to Base64
    if (currentForm) {
      for (const field of currentForm.fields) {
        if (field.type === "file" && data[field.id]) {
          const file = data[field.id]; // Extract first file from FileList
          if (file) {
            processedData[field.id] = {
              base64: await fileToBase64(file),
              name: file.name,
              type: file.type,
              size: file.size,
            };
          }
        }
      }
    }

    // if (formId && processedData) {
    //   const rId = uuidv4();
    //   await dispatch(
    //     saveResponse({
    //       formId: formId,
    //       response: {
    //         responseId: rId,
    //         response: processedData,
    //         time: new Date().getTime(),
    //       } as FormResponseType,
    //     })
    //   );
    // }

    // Transform responses using field labels as keys
    const transformedResponses = currentForm?.fields.reduce((acc, field) => {
      if (processedData[field.id] !== undefined) {
        if (field.type === "date") {
          acc[field.label] = new Date(
            processedData[field.id]
          ).toLocaleDateString();
        } else if (field.type === "file") {
          const fileData = processedData[field.id];
          if (fileData && fileData.base64) {
            acc[field.label] = (
              <a href={fileData.base64} download={fileData.name}>
                {fileData.name}
              </a>
            ); // Provide a download link
          }
        } else {
          acc[field.label] = processedData[field.id];
        }
      }
      return acc;
    }, {} as { [key: string]: any });

    setFormResponses(transformedResponses || {});
    setModalOpen(true);
  };

  const handleClearForm = () => {
    reset();
  };

  return (
    <ThemeProvider
      theme={createTheme((currentForm && currentForm.theme) ?? {})}
    >
      <Box
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1), // Lighten the primary.main color
          padding: 3,
          borderRadius: 2,
          minHeight: "100dvh",
        }}
      >
        <main>
          {currentForm ? (
            <form
              className="space-y-4 max-w-3xl mx-auto"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Card
                sx={{
                  borderTop: "8px solid",
                  borderColor: (theme) => theme.palette.primary.main,
                }}
              >
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 1.5 }} component="div">
                    {currentForm.title} <strong>(Preview)</strong>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {currentForm.description}
                  </Typography>
                  <Divider variant="middle" component="div" />
                  <Typography
                    variant="body2"
                    sx={{ mt: 1.5 }}
                    className="text-red-500"
                  >
                    * means required
                  </Typography>
                </CardContent>
              </Card>

              {currentForm.fields.map((field) => (
                <Controller
                  key={field.id}
                  name={field.id}
                  control={control}
                  defaultValue={
                    field.type === "checkbox"
                      ? []
                      : field.type === "date"
                      ? null
                      : field.type === "radio"
                      ? ""
                      : ""
                  }
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <InputField
                      data={field}
                      value={value}
                      onChange={onChange}
                      error={error?.message as string}
                      disabled={true}
                    />
                  )}
                />
              ))}

              <div className="flex items-center justify-between">
                <Button type="submit" variant="contained" disabled>
                  Submit
                </Button>
                <Button
                  type="button"
                  size="small"
                  variant="text"
                  onClick={handleClearForm}
                >
                  Clear Form
                </Button>
              </div>
            </form>
          ) : (
            <div className="min-h-screen flex items-center justify-center">
              No such Form available
            </div>
          )}
        </main>
      </Box>
      {/* Render the modal */}
      <ResponseModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          window.location.reload();
        }}
        responses={formResponses}
      />
    </ThemeProvider>
  );
}

export default Previewpage;
