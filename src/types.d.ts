interface FormFieldType {
  type:
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
    | "number";
  id: string;
  label: string;
  required: boolean;
  options?: string[];
  image?: string;
  fileType?: "image" | "video" | "audio" | "doc" | "any";
  min?: number;
  max?: number;
}

interface FormResponseType {
  responseId: string;
  response: { [key: string]: any };
  time: number;
}

interface FormTemplate {
  createdAt: number;
  id: string;
  title: string;
  description: string | null;
  fields: FormField[];
  theme?: {
    palette: {
      primary: {
        main: string;
      };
    };
  };
  published?: boolean;
  responses: FormResponseType[];
}

interface EmptyFormTemplate {
  createdAt: number;
  title: string;
  description: string | null;
  fields: FormField[];
  theme?: {
    palette: {
      primary: {
        main: string;
      };
    };
  };
  published?: boolean;
  responses: FormResponseType[];
}
