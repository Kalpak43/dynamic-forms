import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteTemplate } from "../features/forms/formThunk";
import TemplateCard from "../components/TemplateCard";
import { useEffect } from "react";
import { sortTemplates } from "../features/forms/formSlice";
import { Typography } from "@mui/material";

function Homepage() {
  const dispatch = useAppDispatch();
  const { templates } = useAppSelector((state) => state.form);

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

  return (
    <main className="">
      <Typography variant="h6" sx={{
        marginBottom: "0.5rem"
      }}>Recent forms</Typography>
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
  );
}

export default Homepage;
