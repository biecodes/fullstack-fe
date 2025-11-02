"use client";

import React from "react";
import Select, { StylesConfig } from "react-select";
import { Controller, Control } from "react-hook-form";
import { Form } from "react-bootstrap";

export interface Option {
  label: string;
  value: string | number;
}

interface SelectStaticProps {
  fieldName: string;
  control: Control<any>;
  labelName?: string;
  placeholder?: string;
  options: Option[];
  isClearable?: boolean;
  isDisabled?: boolean;
  className?: string;
  required?: boolean;
  menuPlacement?: "auto" | "bottom" | "top";
  variant?: "default" | "V2";
}

/**
 * SelectStatic - reusable select integrated with react-hook-form
 */
export const SelectStatic: React.FC<SelectStaticProps> = ({
  fieldName,
  control,
  labelName,
  placeholder = "Pilih...",
  options,
  isClearable = true,
  isDisabled = false,
  className,
  required = false,
  menuPlacement,
  variant,
}) => {
  // Custom styles
  const customStyles: StylesConfig<Option, false> = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0.75rem",
      borderColor: state.isFocused ? "var(--orange)" : "var(--neutral-200)",
      boxShadow: state.isFocused ? "0 0 0 1px var(--orange)" : "none",
      "&:hover": { borderColor: "var(--orange)" },
      minHeight: "29px",
      backgroundColor: isDisabled ? "#f9fafb" : "white",
    }),

    menu: (provided) => ({
      ...provided,
      borderRadius: "0.75rem",
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "var(--orange)" : state.isFocused ? "#EFF6FF" : "white",
      color: state.isSelected ? "white" : "#111827",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111827",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };
  const customStylesV2: StylesConfig<Option, false> = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "0.75rem",
      borderColor: state.isFocused ? "var(--primary)" : "var(--black-100)",
      boxShadow: state.isFocused ? "0 0 0 1px var(--primary)" : "none",
      "&:hover": { borderColor: "var(--primary)" },
      minHeight: "2.66667rem",
      backgroundColor: isDisabled ? "var(--black-100)" : "white",
    }),

    menu: (provided) => ({
      ...provided,
      borderRadius: "0.75rem",
      zIndex: 50,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "var(--primary)" : state.isFocused ? "var(--black-100)" : "white",
      color: state.isSelected ? "white" : "var(--black-900)",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9CA3AF",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#111827",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  const SelectedStyles = variant === "V2" ? customStylesV2 : customStyles;

  return (
    <div>
      {labelName && (
        <Form.Label>
          {labelName} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <Controller
        name={fieldName}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Select
              inputId={fieldName}
              {...field}
              options={options}
              value={options.find((opt) => opt.value === field.value) || null}
              onChange={(selected) => field.onChange(selected?.value ?? null)}
              placeholder={placeholder}
              isClearable={isClearable}
              isDisabled={isDisabled}
              styles={SelectedStyles}
              menuPlacement={menuPlacement}
              classNamePrefix="select-static"
            />
            {fieldState.error && <p className="text-xs text-red-500 mt-1">{fieldState.error.message}</p>}
          </>
        )}
      />
    </div>
  );
};
