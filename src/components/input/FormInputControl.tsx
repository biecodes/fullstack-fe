import { Form } from "react-bootstrap";
import styled from "styled-components";

interface IProps {
  type?: string;
  placeholder: any;
  defaultValue?: string;
  register?: any;
  labelName?: any;
  message?: any;
  isInvalid?: boolean;
  as?: any;
  rows?: any;
  required?: boolean;
}

export default function FormInputControl({
  labelName,
  type = "text",
  placeholder,
  defaultValue,
  register,
  message,
  isInvalid,
  as = undefined,
  rows = undefined,
  required = false,
}: IProps) {
  return (
    <>
      {labelName && (
        <Form.Label>
          {labelName} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <FormControl
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        isInvalid={isInvalid}
        {...register}
        as={as}
        rows={rows}
      />
      {message && <Form.Control.Feedback type="invalid">{message}</Form.Control.Feedback>}
    </>
  );
}

const FormControl = styled(Form.Control)`
  border: 1px solid var(--neutral-200);
  width: 100%;
  padding: 0.4rem 0.938rem;
  border-radius: 0.66667rem;
  transition: all 0.4s ease;
  font-size: 0.933rem;

  &::placeholder {
    color: var(--neutral-500);
    font-weight: 400;
    font-size: 0.933rem;
  }
`;
