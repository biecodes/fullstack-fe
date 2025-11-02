import { Dflex, DflexColumn, DflexJustifyBetween } from "@/components/styles/flex";
import { P14Medium } from "@/styles/text";
import React from "react";
import { Form } from "react-bootstrap";

import styled from "styled-components";

type Props = {
  title?: any;
  register?: any;
  description?: any;
  bordered?: boolean;
  classNameTitle?: any;
  className?: any;
  tittleCustom?: any;
  onChange?: (value: string) => void;
  type?: "switch" | "check";
  disabled?: boolean;
  spaceBetween?: boolean; // ➕ Add this
  boldTitle?: boolean;
  iconInfo?: boolean;
  icon?: any;
  tooltipTitle?: string;
  style?: React.CSSProperties;
  checked?: any;
};

function FormInputSwitch({
  title,
  register,
  description,
  onChange,
  bordered = false,
  classNameTitle = "mb-0 text-ellipsis",
  className = "me-0",
  tittleCustom,
  type = "switch",
  disabled = false,
  spaceBetween = true,
  boldTitle = false,
  iconInfo = false,
  tooltipTitle = "default tooltip",
  icon,
  style = {
    color: "var(--black)",
  },
  checked,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked ? "aktif" : "nonaktif";
    if (onChange) onChange(value);
  };
  const renderFormCheck = () => {
    if (onChange) {
      return (
        <FormCheckStyled
          {...register}
          type={type === "switch" ? "switch" : "checkbox"}
          inline
          className={`${className} ${type === "check" ? "checkbox-type" : ""}`}
          onChange={handleChange}
          checked={checked}
          disabled={disabled} // Add disabled prop here
        />
      );
    } else {
      return (
        <FormCheckStyled
          {...register}
          type={type === "switch" ? "switch" : "checkbox"}
          inline
          checked={checked}
          className={`${className} ${type === "check" ? "checkbox-type" : ""}`}
          disabled={disabled} // Add disabled prop here
        />
      );
    }
  };

  const Container = spaceBetween ? DflexJustifyBetween : Dflex;

  return (
    <FormContainer className={`${bordered ? "bordered" : ""} gap-1`}>
      <Container style={{ gap: "0.5333rem", alignItems: "center" }}>
        {tittleCustom ? (
          <>{tittleCustom}</>
        ) : (
          <>{title && <P14Medium style={{ fontWeight: "400" }}>{title}</P14Medium>}</>
        )}
        {renderFormCheck()}
      </Container>
      {description && <P14Medium className="m-0 text-muted">{description}</P14Medium>}
    </FormContainer>
  );
}

export default FormInputSwitch;

export const FormCheckStyled = styled(Form.Check)`
  &.form-switch .form-check-input {
    width: 2.28571rem !important;
    height: 1.42857rem !important;
    cursor: pointer;
  }

  &.checkbox-type .form-check-input {
    width: 1.6rem !important;
    height: 1.6rem !important;
    cursor: pointer;
  }

  .form-switch .form-check-input {
    background-image: none !important;
  }

  .form-check-input {
    cursor: pointer;
  }
`;

export const FormContainer = styled(DflexColumn)`
  &.bordered {
    padding: 1.06667rem;
    border: 1px solid var(--black-75);
    border-radius: 0.8rem;
  }
`;
