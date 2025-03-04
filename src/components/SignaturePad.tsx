import { Button } from "@mui/material";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

function SignaturePadInput({ saveSign }: { saveSign: (img: string) => void }) {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [penColor, setPenColor] = useState("#000000"); // Default black color

  // Function to clear the signature
  const clearSignature = () => {
    sigCanvas.current?.clear();
  };

  // Function to save signature as an image
  const saveSignature = () => {
    if (sigCanvas.current) {
      const dataURL = sigCanvas.current.toDataURL("image/png");

      //   // Extract Base64 string without the prefix
      //   const base64String = dataURL.replace(/^data:image\/png;base64,/, "");

      saveSign(dataURL);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end gap-1">
        <p>Color:</p>
        <div
          className="aspect-square max-w-[20px] flex-1 overflow-hidden rounded-full relative"
          style={{
            backgroundColor: penColor,
          }}
        >
          <input
            type="color"
            value={penColor}
            onChange={(e) => setPenColor(e.target.value)}
            className="cursor-pointer absolute inset-0 h-full w-full opacity-0"
          />
        </div>
      </div>

      <div className="border">
        <SignatureCanvas
          ref={sigCanvas}
          penColor={penColor}
          canvasProps={{
            width: 300,
            height: 200,
            className: "signature-canvas",
          }}
        />
      </div>
      <div className="mt-3 flex justify-between gap-3">
        <Button
          variant="contained"
          onClick={saveSignature}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={clearSignature}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear
        </Button>
      </div>
    </div>
  );
}

export default SignaturePadInput;
