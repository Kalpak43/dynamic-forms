export const downloadCSV = (
  template: FormTemplate,
  responses: FormResponseType[]
): void => {
  if (!responses.length) return;

  const headers: string[] = [
    "Submission time",
    "Response ID",
    ...template.fields.map((field) => field.label),
  ];

  const csvRows: string[][] = responses.map((resp) => {
    return [
      String(
        new Date(resp.time).toLocaleDateString() +
          " " +
          new Date(resp.time).toLocaleTimeString()
      ),
      String(resp.responseId),
      ...template.fields.map((field) => {
        const answer = resp.response[field.id];

        if (field.type === "date" && answer) {
          return new Date(answer).toLocaleDateString("en-GB");
        } else if (field.type === "checkbox" && Array.isArray(answer)) {
          return answer.join(" | ");
        } else if (field.type === "file" && answer?.base64) {
          const byteCharacters = atob(answer.base64.split(",")[1]);
          const byteNumbers = new Array(byteCharacters.length)
            .fill(0)
            .map((_, i) => byteCharacters.charCodeAt(i));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: answer.type,
          });

          // Create a previewable object URL
          const blobUrl = URL.createObjectURL(blob);

          return blobUrl;
        } else if (field.type === "sign" && answer) {
          const byteCharacters = atob(answer.split(",")[1]);
          const byteNumbers = new Array(byteCharacters.length)
            .fill(0)
            .map((_, i) => byteCharacters.charCodeAt(i));
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: "image/png",
          });

          // Create a previewable object URL
          const blobUrl = URL.createObjectURL(blob);

          return blobUrl;
        }
        return answer !== undefined ? String(answer) : "-";
      }),
    ];
  });

  const csvContent: string = [
    headers.join(","), // Header row
    ...csvRows.map((row) => row.join(",")), // Data rows
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "responses.csv";
  a.click();
  URL.revokeObjectURL(url);
};
