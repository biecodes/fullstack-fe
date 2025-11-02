"use client";

import RenderIcons from "@/components/icons/RenderIcons";
import StarIcons from "@/components/icons/StarIcons";
import VectorIcons from "@/components/icons/VectorIcons";
import { Dflex, DflexColumn } from "@/components/styles/flex";
import { P14Medium } from "@/styles/text";
import Link from "next/link";
import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import styled from "styled-components";

interface IProps {
  item: any;
}

export default function CardProductList({ item }: IProps) {
  return (
    <>
      <CardStyled>
        <Card style={{ border: "none" }}>
          <Image
            alt="image"
            src={Array.isArray(item?.image) ? item.image[0] || "/assets/meja.svg" : item?.image || "/assets/meja.svg"}
            width={"100%"}
          />
          <div className="hover-detail">
            <Link href={`/product/detail/${item?._id}`}>
              <Buttons>
                <RenderIcons iconName={"eye"} iconSize={"1.133rem"} />
              </Buttons>
            </Link>
          </div>
        </Card>
        <Card.Body>
          <P14Medium style={{ fontWeight: "500", fontSize: "1.06667rem", lineHeight: "150%" }}>{item?.nama}</P14Medium>
          <DflexColumn style={{ gap: "0.8rem" }}>
            <Dflex className="align-items-center" style={{ gap: "0.53333rem" }}>
              <P14Medium style={{ fontWeight: "600", fontSize: "1.33333rem", color: "var(--primary)" }}>
                Rp {item?.harga}
              </P14Medium>
              <Dflex className="align-items-center">
                <CardDiskon>-12%</CardDiskon>
                <VectorIcons />
              </Dflex>
            </Dflex>
            <Dflex className="align-items-center" style={{ gap: "0.53333rem" }}>
              <Dflex style={{ gap: "0.26667rem" }} className="align-items-center">
                <StarIcons />
                <P14Medium style={{ fontWeight: "400" }}>4.9</P14Medium>
              </Dflex>
              <Rounded />
              <P14Medium style={{ fontWeight: "400" }}>121 Terjual</P14Medium>
            </Dflex>
          </DflexColumn>
        </Card.Body>
      </CardStyled>
    </>
  );
}

const Buttons = styled(Button)`
  padding: 0.3333rem 0.5333rem;
  border-radius: 0.533rem;
`;

const CardStyled = styled(Card)`
  border: 1px solid var(--neutral-200);
  border-radius: 0.8rem;
  overflow: hidden;
  .card-body {
    height: 10.86667rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.06667rem 1.33333rem 1.33333rem 1.33333rem;
  }

  &:hover {
    .hover-detail {
      opacity: 1;
      transition: all 0.5s ease-in-out;
    }
  }

  .hover-detail {
    background: #05050671;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 999;
    padding: 0.8rem;
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }
`;

export const CardDiskon = styled(Card)`
  display: flex;
  padding: 0.0634rem 0.4rem;
  justify-content: center;
  align-items: center;
  gap: 0.66667rem;
  border-radius: 0.13333rem 0 0 0.13333rem;
  background: var(--orange-50);
  border: none;
  font-size: 0.8rem;
  font-style: normal;
  font-weight: 500;
  color: var(--primary);
`;

export const Rounded = styled.div`
  width: 0.26667rem;
  height: 0.26667rem;
  background: var(--neutral-200);
  border-radius: 50%;
`;
