import PlusIcons from "@/components/icons/PlusIcons";
import { Dflex, DflexColumn, DflexJustifyBetween } from "@/components/styles/flex";
import { P14Medium } from "@/styles/text";
import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";

interface IProps {
  textAdd: string;
  onClick: any;
  title: string;
  descTitle: string;
  btnLain?: any;
}

export default function ContentTitleLayout({ textAdd, onClick, title, descTitle, btnLain }: IProps) {
  return (
    <>
      <DflexJustifyBetween className="align-items-center w-100">
        <DflexColumn style={{ gap: "0.5333rem" }}>
          <P14Medium className="m-0" style={{ fontSize: "1.33333rem", fontWeight: "500", lineHeight: "140%" }}>
            {title}
          </P14Medium>
          <P14Medium className="m-0" style={{ fontWeight: "400", lineHeight: "140%", color: "var(--neutral-600)" }}>
            {descTitle}
          </P14Medium>
        </DflexColumn>
        <Dflex style={{ gap: "0.5333rem" }}>
          {btnLain && { btnLain }}
          <Button variant="primary text-white" onClick={onClick}>
            <Dflex style={{ gap: "0.5333rem", alignItems: "center" }}>
              <PlusIcons />
              {textAdd}
            </Dflex>
          </Button>
        </Dflex>
      </DflexJustifyBetween>
    </>
  );
}

export const ContentProduct = styled.div`
  padding: 0 5.33333rem;
  margin-top: 2.66667rem;

  @media (max-width: 768px) {
    padding: 1.3333rem;
  }
`;
