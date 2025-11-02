"use client";

import styled from "styled-components";
import { Card, Dropdown, Image } from "react-bootstrap";

import Avatar from "react-avatar";
import RenderIcons from "@/components/icons/RenderIcons";
import { Dflex, DflexColumn } from "@/components/styles/flex";
import FormInputSearch from "@/components/input/FormInputSearch";
import { P14Medium, Paragraph, Paragraph2, ParagraphSub } from "@/styles/text";
import Link from "next/link";
import ThemeToggle from "@/components/action/ThemeToggle";
import LogoBlack from "@/components/icons/LogoBlack";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/store/auth";
import { useRouter } from "next/navigation";
import DropdownProfile from "@/components/dropdown/DropdownProfile";

export default function HeaderDashboard({ activeBars, setActiveBars }: any) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <DFlexJBetween>
          <LogoBlack />
          <Dflex className="align-items-center" style={{ gap: "0.8333rem" }}>
            <DropdownProfile />
          </Dflex>
        </DFlexJBetween>
      </HeaderContent>
    </HeaderWrapper>
  );
}

const HeaderContent = styled.div`
  width: 100%;
  border-radius: 0.5333rem;
  padding: 0rem 5.33333rem;

  @media (max-width: 768px) {
    padding: 1.3333rem;
  }
`;

const HeaderWrapper = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  transition: 0.4s ease;
  border-bottom: 1px solid var(--neutral-200);

  @media (max-width: 576px) {
    padding: 0 0.6333rem;
  }

  @media print {
    display: none;
  }
`;

const DFlexJBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
