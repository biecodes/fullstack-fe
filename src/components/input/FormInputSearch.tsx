"use client";

import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import RenderIcons from "../icons/RenderIcons";

export default function FormInputSearch({
  placeholder = "Search...",
  value,
  onChange,
  version = "default",
}: {
  placeholder?: string;
  value?: string;
  onChange?: any;
  version?: string;
}) {
  return (
    <>
      {version === "V2" ? (
        <CardSearchV2>
          <RenderIcons iconName="magnifying-glass" iconSize="18px" iconColor="var(--neutral-500)" />
          <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
        </CardSearchV2>
      ) : (
        <CardSearch>
          <RenderIcons iconName="magnifying-glass" iconSize="18px" iconColor="var(--neutral-500)" />
          <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
        </CardSearch>
      )}
    </>
  );
}

const CardSearch = styled(Card)`
  background: var(--neutral-50);
  border-radius: 3.33333rem;
  border: 1px solid var(--neutral-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 3.46667rem;
  padding: 0 0.8rem;

  input {
    width: 100%;
    background: transparent;
    color: var(--black-500);
    outline: none;
    border: none;
    font-size: 0.9rem;

    ::placeholder {
      color: var(--black-500);
    }
  }
`;
const CardSearchV2 = styled(Card)`
  background: var(--neutral-50);
  border-radius: 0.66667rem;
  border: 1px solid var(--neutral-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  height: 2.66667rem;
  padding: 0 0.8rem;

  input {
    width: 100%;
    background: transparent;
    color: var(--black-500);
    outline: none;
    border: none;
    font-size: 0.9rem;

    ::placeholder {
      color: var(--black-500);
    }
  }
`;
