"use client";

import RenderIcons from "@/components/icons/RenderIcons";
import { Paragraph, ParagraphSub } from "@/styles/text";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import styled from "styled-components";
import { Controller, Control } from "react-hook-form";
import IconsUploadImage from "@/components/icons/IconsUploadImage";
import { Dflex } from "@/components/styles/flex";

type FormUploadProps = {
  fieldName: string;
  control: Control<any>;
  label?: string;
  watchImage?: any;
  isMulti?: boolean;
};

export default function FormUpload({ fieldName, control, label, watchImage, isMulti = true }: FormUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      {label && <p className="mb-2 fw-bold">{label}</p>}

      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <>
            <CardImageUpload
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={async (e) => {
                e.preventDefault();
                setIsDragging(false);
                const files = Array.from(e.dataTransfer.files);
                if (files.length) {
                  const urls = await uploadHandler(files);

                  if (isMulti) {
                    const current = Array.isArray(field.value) ? field.value : field.value ? [field.value] : [];
                    const newImages = [...current, ...urls];
                    field.onChange(newImages);
                    setPreviews(newImages);
                  } else {
                    field.onChange(urls[0]);
                    setPreviews([urls[0]]);
                  }
                }
              }}
              className={isDragging ? "dragging" : ""}
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? (
                <Spinner animation="border" variant="primary" />
              ) : watchImage?.length > 0 ? (
                <PreviewGrid>
                  {isMulti
                    ? (watchImage ?? []).map((img: any, i: number) => (
                        <PreviewImage key={i} src={img} alt={`Uploaded ${i + 1}`} />
                      ))
                    : watchImage && <PreviewImage src={watchImage} alt="Uploaded" />}
                </PreviewGrid>
              ) : (
                <IconsUploadImage />
              )}

              <input
                type="file"
                accept="image/*"
                multiple={isMulti}
                ref={inputRef}
                hidden
                onChange={async (e) => {
                  const files = e.target.files ? Array.from(e.target.files) : [];
                  if (files.length) {
                    const urls = await uploadHandler(files);

                    if (isMulti) {
                      const current = Array.isArray(field.value) ? field.value : field.value ? [field.value] : [];
                      const newImages = [...current, ...urls];
                      field.onChange(newImages);
                      setPreviews(newImages);
                    } else {
                      field.onChange(urls[0]);
                      setPreviews([urls[0]]);
                    }
                  }
                }}
              />
            </CardImageUpload>

            <Buttons onClick={() => inputRef.current?.click()}>
              <Dflex style={{ gap: "0.5333rem" }}>
                <RenderIcons iconName={"upload-simple"} iconSize={"18px"} />
                Unggah Gambar
              </Dflex>
            </Buttons>
          </>
        )}
      />
    </div>
  );

  /**
   * 🔁 Upload handler (auto pilih endpoint)
   */
  async function uploadHandler(files: File[]): Promise<string[]> {
    setUploading(true);
    try {
      const formData = new FormData();

      const endpoint = isMulti ? "/apps/api/v1/upload-images" : "/apps/api/v1/upload-images/single";

      if (isMulti) {
        files.forEach((file) => formData.append("files", file));
      } else {
        formData.append("file", files[0]);
      }

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      const imagePaths: string[] = isMulti ? data.images || [] : data.image ? [data.image] : [];

      const fullUrls = imagePaths.map((p) => `/apps${p}`);
      return fullUrls;
    } catch (err) {
      console.error(err);
      alert("Upload failed!");
      return [];
    } finally {
      setUploading(false);
    }
  }
}

const Buttons = styled(Button)`
  background: var(--neutral-50);
  border: 1px solid var(--neutral-200);
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.06667rem;
`;

const CardImageUpload = styled(Card)`
  border: none;
  min-height: 10.66667rem;
  border-radius: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--neutral-100);

  &:hover {
    cursor: pointer;
    background: var(--neutral-100);
  }
`;

const PreviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

export const PreviewImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 0.5rem;
  object-fit: cover;
  border: 1px solid var(--neutral-200);
`;
