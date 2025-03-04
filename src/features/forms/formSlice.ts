import { createSlice, Draft } from "@reduxjs/toolkit";
import {
  createNewTemplate,
  deleteTemplate,
  editTemplate,
  saveResponse,
} from "./formThunk";

interface formState {
  templates: FormTemplate[];
  error: string | null;
  loading: boolean;
}

const initialState: formState = {
  templates: [],
  error: null,
  loading: false,
};

export const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    sortTemplates: (state) => {
      state.templates.sort((a, b) => b.createdAt - a.createdAt);
    },
  },
  extraReducers(builder) {
    builder.addCase(createNewTemplate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewTemplate.fulfilled, (state, action) => {
      state.templates.push(action.payload as Draft<FormTemplate>);
      state.loading = false;
    });
    builder
      .addCase(createNewTemplate.rejected, (state, action) => {
        state.error = action.payload as string | null;
        state.loading = false;
      })
      .addCase(editTemplate.fulfilled, (state, action) => {
        const index = state.templates.findIndex(
          (template) => template.id === action.payload.id
        );
        if (index !== -1) {
          state.templates[index] = action.payload
            .formTemplate as Draft<FormTemplate>;
        }
      })
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        state.templates = state.templates.filter(
          (template) => template.id !== action.payload
        );
      })
      .addCase(saveResponse.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveResponse.fulfilled, (state, action) => {
        state.loading = false;
        const response = action.payload.response;
        const formId = action.payload.formId;

        const templateIndex = state.templates.findIndex(
          (template) => template.id === formId
        );

        if (templateIndex !== -1) {
          if (!state.templates[templateIndex].responses) {
            state.templates[templateIndex].responses = [];
          }
          state.templates[templateIndex].responses?.push(response);
        }
      })
      .addCase(saveResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { sortTemplates } = formSlice.actions;

export default formSlice.reducer;
