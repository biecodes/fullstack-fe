"use client";

import { Image } from "react-bootstrap";
import styled from "styled-components";
import RenderIcons from "../../components/icons/RenderIcons";
import Link from "next/link";
import { Dflex } from "@/components/styles/flex";
import { SidebarMenu } from "@/components/sidebar/sidebar-menu";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

interface Props {
  activeBars?: any;
  setActiveBars?: any;
}

export default function Sidebar({ activeBars, setActiveBars }: Props) {
  const pathname = usePathname();

  return (
    <>
      <SidebarWrapper className={activeBars ? "active" : ""}>
        <HeaderSidebar className={activeBars ? "active" : ""}>
          <Dflex style={{ background: "inherit" }} className="gap-3">
            {activeBars ? (
              <Image src="/static/logo-webloka-2.png" alt="" style={{ width: "3rem" }} />
            ) : (
              <Image src="/static/logo-webloka-1.png" alt="" style={{ width: "10.838rem" }} />
            )}
            {/* <DFlexColumnSidebar className={activeBars ? "active" : ""}>
              <h5>ALFANDHI</h5>
              <span>CODE</span>
            </DFlexColumnSidebar> */}
          </Dflex>
          <IconsClose onClick={() => setActiveBars(!activeBars)}>
            <RenderIcons iconName="x" iconStyle="bold" iconSize="18px" iconColor="var(--black-500)" />
          </IconsClose>
        </HeaderSidebar>
        {activeBars ? (
          <SubMenuTitle className={activeBars ? "active" : ""}></SubMenuTitle>
        ) : (
          <SubMenuTitle className={activeBars ? "active" : ""}>Overview</SubMenuTitle>
        )}
        <SidebarLink className={activeBars ? "active" : ""}>
          {SidebarMenu?.map((menu, index) => {
            const isActive = pathname === menu.path; // cek route sekarang
            return (
              <li key={index}>
                <Link href={menu.path} passHref legacyBehavior>
                  <a className={isActive ? "active text-blue-600 font-semibold" : ""}>
                    <RenderIcons
                      iconSize="20px"
                      iconName={menu?.iconName}
                      iconStyle={isActive ? "fill" : menu?.iconStyle} // kalau aktif jadi fill
                    />
                    <span>{menu.title}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </SidebarLink>
      </SidebarWrapper>

      {/* <SidebarWrapper className={activeBars ? "active" : ""}>
        <HeaderSidebar className={activeBars ? "active" : ""}>
          <Dflex style={{ background: "inherit" }} className="gap-3">
            <Image src="/static/logo.png" alt="" style={{ width: "2.838rem" }} />
            <DFlexColumnSidebar className={activeBars ? "active" : ""}>
              <h5>ALFANDHI</h5>
              <span>CODE</span>
            </DFlexColumnSidebar>
          </Dflex>
          <IconsClose onClick={() => setActiveBars(!activeBars)}>
            <RenderIcons iconName="x" iconStyle="bold" iconSize="18px" />
          </IconsClose>
        </HeaderSidebar>
        {activeBars ? (
          <SubMenuTitle className={activeBars ? "active" : ""}>Menu</SubMenuTitle>
        ) : (
          <SubMenuTitle className={activeBars ? "active" : ""}>Menu Dashboard</SubMenuTitle>
        )}

       
      </SidebarWrapper> */}
    </>
  );
}

const SidebarWrapper = styled.div`
  z-index: 999;
  min-height: 100vh;
  width: 20rem;
  height: 100%;
  background-color: var(--white);
  transition: all 0.4s ease;
  &.active {
    width: 80px;
    transition: 0.4s ease;
  }

  @media print {
    display: none;
  }

  @media (max-width: 768px) {
    position: absolute;
    transition: 0.4s ease;
    left: -400px;
    width: 20rem;
    &.active {
      width: 20rem;
      left: 0px;
      transition: 0.4s ease;
    }
  }
`;

const IconsClose = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--black-100);
  border-radius: 50%;
  position: absolute;
  top: 15px;
  right: 15px;
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }

  &:hover {
    color: var(--white);
  }
`;

const HeaderSidebar = styled.div`
  padding: 0px 1.563rem;
  height: 5rem;
  display: flex;
  align-items: center;
  background-color: inherit;
  border-bottom: 1px solid var(--black-25);
  &.active {
    padding: 0 16.7px;
  }
  @media (max-width: 768px) {
    &.active {
      padding: 0px 1.563rem;
    }
  }
`;

const SidebarLink = styled.ul`
  list-style: none;
  padding: 0 0.6rem;
  /* margin-top: 1.25rem; */

  &.active {
    /* padding: 0 1.25rem; */
    padding: 0 1rem;

    li {
      padding: 0 !important;
      margin: 0 !important;
      a {
        /* padding: 0 6.5px; */
        /* width: 34px; */
        /* height: 34px; */
        /* margin-bottom: 8px; */
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.6rem 0;
        width: 100%;
        @media (max-width: 768px) {
          display: block;
          justify-content: flex-start;
        }

        /* justify-content: center; */
        border-radius: 0.5333rem;
        color: var(--black-500);

        &:hover {
          color: var(--primary);
        }

        &.active {
          color: var(--primary);
        }

        span {
          /* display: none; */
          position: absolute;
          margin-left: 60px;
          text-align: left;
          opacity: 0;
          display: none;

          @media (max-width: 768px) {
            display: block;
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    &.active {
      li {
        a {
          display: flex;
          align-items: center;
          text-decoration: none;
          gap: 0.625rem;
          padding: 0.4rem 0.938rem;
          border-radius: 0.5333rem;

          width: 90%;
          /* margin-bottom: 0.313rem; */
          color: var(--black-500);

          &:hover {
            color: var(--primary);
          }

          span {
            font-size: 1rem;
            margin-left: 0;
            position: relative;
            opacity: 1;
          }
        }
      }
    }
  }

  li {
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      gap: 0.625rem;
      padding: 0.4rem 0.938rem;
      border-radius: 0.5333rem;
      width: 90%;
      margin-bottom: 0.2333rem;
      /* margin-bottom: 0.313rem; */
      color: var(--black-500);
      &:hover {
        color: var(--primary);
        background: var(--primary-50);
      }
      &.active {
        color: var(--primary);
        background: var(--primary-50);
      }

      span {
        font-size: 1rem;
        font-weight: 400;
      }
      i {
      }
    }
  }
`;

const SubMenuTitle = styled.h5`
  font-size: 0.875rem;
  text-transform: uppercase;
  color: var(--black-300);
  font-weight: 500;
  padding: 0px 1.563rem;
  margin-top: 20px;
  &.active {
    padding: 0 17px;
  }
  @media (max-width: 768px) {
    &.active {
      padding: 0px 1.563rem;
      &::after {
        content: "Overview";
      }
    }
  }
`;
