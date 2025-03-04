import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createNewTemplate, deleteTemplate } from "../features/forms/formThunk";
import TemplateCard from "../components/TemplateCard";
import { useEffect } from "react";
import { sortTemplates } from "../features/forms/formSlice";
import { alpha, Box, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";

const eventRegistrationForm: EmptyFormTemplate = {
  createdAt: Date.now(),
  title: "Event Registration Form",
  description:
    "Register for our upcoming event by filling out the details below.",
  fields: [
    {
      type: "text",
      id: uuidv4(),
      label: "Full Name",
      required: true,
    },
    {
      type: "email",
      id: uuidv4(),
      label: "Email Address",
      required: true,
    },
    {
      type: "tel",
      id: uuidv4(),
      label: "Phone Number",
      required: true,
    },
    {
      type: "date",
      id: uuidv4(),
      label: "Event Date",
      required: true,
    },
    {
      type: "radio",
      id: uuidv4(),
      label: "Event Type",
      required: true,
      options: ["Webinar", "Workshop", "Conference"],
    },
    {
      type: "checkbox",
      id: uuidv4(),
      label: "Dietary Preferences",
      required: false,
      options: ["Vegetarian", "Vegan", "Gluten-Free", "None"],
    },
    {
      type: "textarea",
      id: uuidv4(),
      label: "Additional Comments",
      required: false,
    },
  ],
  theme: {
    palette: {
      primary: {
        main: "#1976D2", // Blue theme
      },
    },
  },
  published: false,
  responses: [],
};

const feedbackForm: EmptyFormTemplate = {
  createdAt: Date.now(),
  title: "Customer Feedback Form",
  description:
    "We value your feedback! Please share your thoughts about our service.",
  fields: [
    { id: uuidv4(), type: "text", label: "Full Name", required: false },
    { id: uuidv4(), type: "email", label: "Email Address", required: false },
    {
      id: uuidv4(),
      type: "radio",
      label: "How satisfied are you with our service?",
      required: true,
      options: [
        "Very Satisfied",
        "Satisfied",
        "Neutral",
        "Dissatisfied",
        "Very Dissatisfied",
      ],
    },
    {
      id: uuidv4(),
      type: "textarea",
      label: "Please share your feedback",
      required: false,
    },
    {
      id: uuidv4(),
      type: "checkbox",
      label: "Would you recommend us?",
      required: true,
      options: ["Yes", "No"],
    },
  ],
  theme: {
    palette: {
      primary: {
        main: "#FF9800", // Orange theme
      },
    },
  },
  published: false,
  responses: [],
};

const contactInfoForm: EmptyFormTemplate = {
  createdAt: Date.now(),
  title: "Contact Information Form",
  description:
    "Please provide your contact details so we can reach out to you.",
  fields: [
    {
      id: uuidv4(),
      type: "text",
      label: "Full Name",
      required: true,
    },
    { id: uuidv4(), type: "email", label: "Email Address", required: true },
    { id: uuidv4(), type: "tel", label: "Phone Number", required: true },
    {
      id: uuidv4(),
      type: "text",
      label: "Company/Organization (Optional)",
      required: false,
    },
    { id: uuidv4(), type: "textarea", label: "Address", required: false },
    {
      id: uuidv4(),
      type: "textarea",
      label: "Additional Comments",
      required: false,
    },
  ],
  theme: {
    palette: {
      primary: {
        main: "#4CAF50", // Green theme
      },
    },
  },
  published: false,
  responses: [],
};

const jobApplicationForm: EmptyFormTemplate = {
  createdAt: Date.now(),
  title: "Job Application Form",
  description: "Apply for your desired position by filling out this form.",
  fields: [
    { id: uuidv4(), type: "text", label: "Full Name", required: true },
    { id: uuidv4(), type: "email", label: "Email Address", required: true },
    { id: uuidv4(), type: "tel", label: "Phone Number", required: true },
    {
      id: uuidv4(),
      type: "text",
      label: "Position Applied For",
      required: true,
    },
    {
      id: uuidv4(),
      type: "file",
      label: "Upload Resume",
      required: true,
      fileType: "doc",
    },
    {
      id: uuidv4(),
      type: "file",
      label: "Upload Cover Letter (Optional)",
      required: false,
      fileType: "doc",
    },
    {
      id: uuidv4(),
      type: "radio",
      label: "Experience Level",
      required: true,
      options: ["Entry Level", "Mid Level", "Senior Level"],
    },
    {
      id: uuidv4(),
      type: "checkbox",
      label: "Skills",
      required: true,
      options: [
        "JavaScript",
        "React",
        "Node.js",
        "Python",
        "Java",
        "SQL",
        "UI/UX Design",
      ],
    },
    {
      id: uuidv4(),
      type: "date",
      label: "Available Start Date",
      required: true,
    },
    {
      id: uuidv4(),
      type: "textarea",
      label: "Why should we hire you?",
      required: false,
    },
  ],
  theme: {
    palette: {
      primary: {
        main: "#2196F3", // Blue theme
      },
    },
  },
  published: false,
  responses: [],
};

function Homepage() {
  const dispatch = useAppDispatch();
  const { templates } = useAppSelector((state) => state.form);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(sortTemplates());
  }, [dispatch]);

  const handleTemplateShare = (id: string) => {
    const formUrl = `${window.location.origin}/form/${id}`;
    navigator.clipboard.writeText(formUrl);
  };
  const handleTemplateDelete = async (id: string) => {
    await dispatch(deleteTemplate(id));
  };

  const createEventForm = async (template: EmptyFormTemplate) => {
    const id = uuidv4();
    await dispatch(
      createNewTemplate({
        id: id,
        predefined: {
          id: id,
          ...template,
        },
      })
    );

    navigate(`/edit/${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="">
        <Typography
          variant="h5"
          sx={{
            marginBottom: "0.5rem",
          }}
        >
          Start a New Form
        </Typography>
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-8">
          <Card
            className="cursor-pointer relative border border-gray-300"
            sx={{
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
            onClick={async () => {
              const id = uuidv4();
              await dispatch(createNewTemplate({ id }));

              navigate(`/edit/${id}`);
            }}
          >
            <CardContent className="flex flex-col items-center justify-center h-full">
              <AddIcon
                fontSize="large"
                sx={{
                  color: (theme) => theme.palette.primary.main,
                }}
              />
              <Typography>Blank Form</Typography>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer relative border border-gray-300"
            sx={{
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
            onClick={() => {
              createEventForm(eventRegistrationForm);
            }}
          >
            <CardContent className="space-y-4">
              <Box
                className="border border-gray-200  aspect-square flex items-center justify-center"
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                }}
              >
                {/* <CelebrationIcon
                  fontSize="large"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                  }}
                /> */}
                <img
                  src="/event.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Event Registration form
              </Typography>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer relative border border-gray-300"
            sx={{
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
            onClick={() => {
              createEventForm(feedbackForm);
            }}
          >
            <CardContent className="space-y-4">
              <Box
                className="border border-gray-200  aspect-square flex items-center justify-center"
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/feedback.jpg"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Feedback form
              </Typography>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer relative border border-gray-300"
            sx={{
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
            onClick={() => {
              createEventForm(contactInfoForm);
            }}
          >
            <CardContent className="space-y-4">
              <Box
                className="border border-gray-200  aspect-square flex items-center justify-center"
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/contact.webp"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Contact Info form
              </Typography>
            </CardContent>
          </Card>
          <Card
            className="cursor-pointer relative border border-gray-300"
            sx={{
              "&:hover": {
                borderColor: (theme) => theme.palette.primary.main,
              },
            }}
            onClick={() => {
              createEventForm(jobApplicationForm);
            }}
          >
            <CardContent className="space-y-4">
              <Box
                className="border border-gray-200  aspect-square flex items-center justify-center"
                sx={{
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.2),
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/job.webp"
                  alt=""
                  className="h-full w-full object-cover"
                />
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                }}
              >
                Job application form
              </Typography>
            </CardContent>
          </Card>
        </div>
      </main>
      <main className="bg-white flex-1">
        <Typography
          variant="h5"
          sx={{
            marginBottom: "0.5rem",
          }}
        >
          Recent forms
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onShare={handleTemplateShare}
              onDelete={handleTemplateDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Homepage;
