import RenderIcons from "@/components/icons/RenderIcons";
import { Dflex, DflexColumn } from "@/components/styles/flex";
import { setAuthUser } from "@/store/auth";
import { P14Medium, Paragraph, Paragraph2 } from "@/styles/text";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Avatar from "react-avatar";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

export default function DropdownProfile({ isLight }: { isLight?: boolean }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const { authUser } = useSelector((state: any) => state.auth);
  const handleLogout = () => {
    router.push("/login");
    dispatch(setAuthUser(false));
  };

  return (
    <>
      <DropdownStyled>
        <Dropdown.Toggle style={{ background: "inherit", border: "none" }} id="dropdown-basic">
          <Dflex style={{ gap: "0.5333rem", alignItems: "center" }}>
            <DflexColumn style={{ gap: "0.1rem", alignItems: "start" }}>
              {isLight ? (
                <Paragraph className="m-0" style={{ color: "var(--neutral-50)", fontWeight: "600" }}>
                  {authUser?.username}
                </Paragraph>
              ) : (
                <Paragraph className="m-0" style={{ color: "var(--neutral-900)", fontWeight: "600" }}>
                  {authUser?.username}
                </Paragraph>
              )}
            </DflexColumn>
            <Avatar name="Chandra" size="36" round="50%" />
          </Dflex>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Header style={{ borderBottom: "1px solid var(--neutral-200)" }}>
            <Dflex className="align-items-center" style={{ gap: "0.5333rem" }}>
              <Avatar name="Chandra" size="36" round="50%" />

              <DflexColumn style={{ gap: "0.1rem", alignItems: "start" }}>
                <P14Medium className="m-0" style={{ color: "var(--neutral-900)" }}>
                  {authUser?.username}
                </P14Medium>
                <P14Medium className="m-0" style={{ color: "var(--neutral-600)" }}>
                  {authUser?.email}
                </P14Medium>
              </DflexColumn>
            </Dflex>
          </Dropdown.Header>
          <Dropdown.Item>
            <Link href="/admin/product" className="text-decoration-none" style={{ color: "inherit" }}>
              <Dflex className="align-items-center" style={{ gap: "0.5333rem" }}>
                <RenderIcons iconName="squares-four" iconSize="18px" />
                <Paragraph2 className="m-0">Products</Paragraph2>
              </Dflex>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link href="/admin/user" className="text-decoration-none" style={{ color: "inherit" }}>
              <Dflex className="align-items-center" style={{ gap: "0.5333rem" }}>
                <RenderIcons iconName="users-three" iconSize="18px" />
                <Paragraph2 className="m-0">Users</Paragraph2>
              </Dflex>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Dflex className="align-items-center" style={{ gap: "0.5333rem" }} onClick={handleLogout}>
              <RenderIcons iconName="sign-out" iconSize="18px" />
              <Paragraph2 className="m-0">Log Out</Paragraph2>
            </Dflex>
          </Dropdown.Item>
        </Dropdown.Menu>
      </DropdownStyled>
    </>
  );
}

const DropdownStyled = styled(Dropdown)`
  .btn {
    padding: 0;
    margin: 0;
  }

  .dropdown-item {
    padding: 0.4rem 0.938rem;
  }

  .dropdown-toggle::after {
    display: none !important;
  }
`;
