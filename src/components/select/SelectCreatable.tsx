import React from "react";
import CreatableSelect from "react-select/creatable";
import { Controller } from "react-hook-form";

interface IProps {
  control: any;
  fieldName: string;
  placeholder?: string;
  isMulti?: boolean;
}

export default function SelectCreatable({
  control,
  fieldName,
  placeholder = "Select or create...",
  isMulti = true,
}: IProps) {
  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <div className="flex flex-col gap-1 w-full">
          <CreatableSelect
            ref={ref}
            isMulti={isMulti}
            placeholder={placeholder}
            value={
              isMulti ? value?.map((v: any) => ({ label: v, value: v })) || [] : value ? { label: value, value } : null
            }
            onChange={(newValue: any) => {
              if (isMulti) {
                onChange(newValue ? newValue.map((v: any) => v.value) : []);
              } else {
                onChange(newValue ? newValue.value : null);
              }
            }}
            classNamePrefix="react-select"
          />
          {error && <span className="text-red-500 text-sm">{error.message}</span>}
        </div>
      )}
    />
  );
}
