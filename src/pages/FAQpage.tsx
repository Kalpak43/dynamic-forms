import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PaletteIcon from "@mui/icons-material/Palette";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function FAQpage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <Typography
        variant="h5"
        sx={{
          marginBottom: "0.5rem",
          color: (theme) => theme.palette.primary.main,
        }}
      >
        Frequently Asked Questions
      </Typography>
      <div className="max-w-[800px]">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
              }}
            >
              Creating a form
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            To create a form, you can select from{" "}
            <strong>existing templates</strong> that present on{" "}
            <strong>home page</strong> or create a <strong>blank form</strong>{" "}
            by clicking on <strong>Create Form</strong> button in the header.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
              }}
            >
              Editing the Form
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Once you click on "create form" you will be taken to{" "}
            <strong>edit page</strong>. Here, you can change the title,
            description of the form as well as add/remove fields as per your
            requirements. There are different types of fields that can be used
            for different types of inputs. You can change the theme of the font
            i.e. the color and background of the form by clicking on{" "}
            <IconButton>
              <PaletteIcon />
            </IconButton>{" "}
            icon in the header.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
              }}
            >
              Previewing the form
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Before publishing the form, you can preview it by clicking on{" "}
            <IconButton>
              <VisibilityIcon />
            </IconButton>{" "}
            icon in the header.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4-content"
            id="panel4-header"
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
              }}
            >
              Saving the form
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Once you click on <strong>Create Form</strong> or start editing an{" "}
            <strong>existing template</strong>, the forms will be auto saved and
            can be viewed in the <strong>Recent Forms</strong> section in the{" "}
            <strong>homepage</strong>.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5-content"
            id="panel5-header"
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
              }}
            >
              Publishing/Sharing the form
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Once the editing is done, you can share the form with people by
            first clicking on <strong>Publish</strong> button in the header.
            After that option to <strong>Share Link</strong> will be displayed
            in place of publish button. Upon clicking the{" "}
            <strong>Share Link</strong> button a link to the form will be copied
            to your <strong>clipboard</strong>. You can share this link to
            people for them to be able to fill out the form.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel6-content"
            id="panel6-header"
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
              }}
            >
              Viewing the responses
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            You can view <strong>responses</strong> for any of the forms you
            have created by clicking on them in the{" "}
            <strong>recent forms</strong> section in the home page. Then once
            you are on <strong>edit form</strong> page,{" "}
            <strong>go to Responses</strong> tab. There you will be able to see
            all the responses in <strong>tabular format</strong> or you can
            choose to individual submissions by clicking on the{" "}
            <strong>Individual</strong> tab.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel7-content"
            id="panel7-header"
          >
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
              }}
            >
              Deleting a form
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            On homepage, under <strong>recent forms</strong> section you will be
            able to see all the forms created by you till now. To delete a form,
            you can clicking on the{" "}
            <IconButton>
              <MoreVertIcon />
            </IconButton>{" "}
            icon besides the form title. A menu will open which will have the
            option to <strong>Delete</strong> the form.
          </AccordionDetails>
        </Accordion>
      </div>
    </main>
  );
}

export default FAQpage;
