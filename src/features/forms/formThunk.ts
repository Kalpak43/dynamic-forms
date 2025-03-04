import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const createNewTemplate = createAsyncThunk(
  "forms/createNewTemplate",
  async (
    { id, predefined }: { id: string; predefined?: FormTemplate },
    { rejectWithValue }
  ) => {
    try {
      if (predefined) return predefined;

      const newFormTemplate: FormTemplate = {
        createdAt: new Date().getTime(),
        id: id,
        title: "Untitled Form",
        description: null,
        fields: [
          {
            type: "text",
            id: uuidv4(),
            label: "Untitled Question",
            required: false,
          },
        ],
        published: false,
        responses: [],
      };

      return newFormTemplate;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue("some error");
      }
    }
  }
);

export const editTemplate = createAsyncThunk(
  "form/editTemplate",
  async (
    { id, formTemplate }: { id: string; formTemplate: FormTemplate },
    { rejectWithValue }
  ) => {
    try {
      return { id, formTemplate };
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue("some error");
      }
    }
  }
);

export const deleteTemplate = createAsyncThunk(
  "form/deleteTemplate",
  async (id: string, { rejectWithValue }) => {
    try {
      return id;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue("some error");
      }
    }
  }
);

export const saveResponse = createAsyncThunk(
  "form/saveResponse",
  async (
    { formId, response }: { formId: string; response: FormResponseType },
    { rejectWithValue }
  ) => {
    try {
      console.log("RESPONSE: ", { formId, response });
      return { formId, response };
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      } else {
        return rejectWithValue("some error");
      }
    }
  }
);
