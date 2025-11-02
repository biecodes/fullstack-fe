import { Controller } from "react-hook-form";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import { Dflex } from "@/components/styles/flex";

interface IPropsRadio {
  fieldName: any;
  value: string;
  label: string;
  control: any;
  defaultValue?: string;
  disabled?: boolean;
  isInvalid?: boolean;
}

export default function FormInputRadio({
  fieldName,
  value,
  label,
  control,
  defaultValue,
  disabled,
  isInvalid,
  ...props
}: IPropsRadio) {
  return (
    <>
      <Controller
        name={fieldName}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value: fieldValue, onChange, ...fieldProps } }) => {
          const isSelected = fieldValue === value;

          const handleClick = () => {
            if (!disabled) {
              onChange(value);
            }
          };

          return (
            <RadioButtonContainer
              className={isInvalid ? "border-danger" : ""}
              isSelected={isSelected}
              disabled={disabled}
              onClick={handleClick}
            >
              <FormCheckStyled
                type="radio"
                disabled={disabled}
                {...fieldProps}
                value={value}
                checked={isSelected}
                onChange={() => onChange(value)}
                isInvalid={isInvalid}
                inline
              />
              <p>{label}</p>
            </RadioButtonContainer>
          );
        }}
      />
    </>
  );
}

const RadioButtonContainer = styled(Dflex)<{ isSelected: boolean; disabled?: boolean }>`
  border: 1px solid ${({ isSelected }) => (isSelected ? "var(--primary)" : "#E6E9F0")};
  border-radius: 0.57143rem;
  padding: 0.3rem 0.4rem;
  gap: 0.3333rem;
  position: relative;
  display: flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")}; /* optional for strict disable */

  .form-check-input {
    position: relative;
    margin-left: 0;
    margin-top: 0;
  }

  p {
    font-size: 0.85714rem;
    font-style: normal;
    font-weight: 600;
    margin: 0;
    color: ${({ isSelected }) => (isSelected ? "var(--primary)" : "var(--black)")};
  }
`;

const FormCheckStyled = styled(Form.Check)`
  &.form-check-inline {
    margin-right: 0 !important;
    display: flex;
  }
`;
