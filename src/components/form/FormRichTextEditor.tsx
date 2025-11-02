"use client";
import dynamic from "next/dynamic";
import { Controller } from "react-hook-form";
import { Form } from "react-bootstrap";

// Import editor only in client
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface Props {
  control: any;
  errors: any;
  fieldName: string;
}

export default function FormRichTextEditor({ control, errors, fieldName }: Props) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field }) => (
        <div>
          <Form.Label>Content</Form.Label>
          <ReactQuill
            theme="snow"
            value={field.value || ""}
            onChange={field.onChange}
            placeholder="Write your blog content here..."
          />
          {errors?.content && <div className="text-danger small">{errors.content.message}</div>}
        </div>
      )}
    />
  );
}
