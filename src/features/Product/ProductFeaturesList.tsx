"use client";

import CardProductList from "@/components/card/CardProductList";
import DataList from "@/components/datalist/Datalist";
import DropdownProfile from "@/components/dropdown/DropdownProfile";
import LogoWhite from "@/components/icons/LogoWhite";
import RenderIcons from "@/components/icons/RenderIcons";
import FormInputSearch from "@/components/input/FormInputSearch";
import { Dflex, DflexColumn, DflexJustifyBetween } from "@/components/styles/flex";
import DataTable from "@/components/table/DataTable";
import { P14Medium, Paragraph, Paragraph2, ParagraphSub } from "@/styles/text";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import Avatar from "react-avatar";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import styled from "styled-components";

export default function ProductFeaturesList() {
  const [respData, setRespData] = useState([]);
  const [params, setParams] = useState({
    searchBy: ["nama", "kategori"],
    order: "desc",
    search: "",
  });
  const [searchInput, setSearchInput] = useState(params?.search || "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    setParams((prev) => ({
      ...prev,
      search: searchInput, 
    }));
  };

  const [id, setId] = useState<any>();
  const [dataAction, setDataAction] = useState<any>();

  const dataResult = useMemo(() => {
    return respData?.map((item: any, i: number) => {
      return (
        <Col lg={3} xs={12} sm={6} md={6} key={item.id}>
          <CardProductList item={item} />
        </Col>
      );
    });
  }, [respData]);

  return (
    <>
      <ContentTop>
        <HeaderTop>
          <LogoWhite />
          <DropdownProfile isLight={true} />
        </HeaderTop>
        <DflexColumn style={{ alignItems: "center", gap: "0rem", marginTop: "3rem" }}>
          <PTextTitle>Cari Funitur Impian</PTextTitle>
          <P14Medium style={{ color: "rgba(255, 255, 255, 0.80)", textAlign: "center" }}>
            Cari furnitur mulai dari meja, lemari, hingga rak disini
          </P14Medium>
          <div
            style={{ width: "100%", marginTop: "2.13333rem", display: "flex", gap: "0.8rem", justifyContent: "center" }}
          >
            <div style={{ width: "53rem" }}>
              <FormInputSearch value={searchInput} placeholder="Cari Produk" onChange={handleInputChange} />
            </div>
            <ButtonSearch onClick={handleSearchClick}>
              <RenderIcons iconName="magnifying-glass" iconSize="18px" iconColor="var(--neutral-50)" />
            </ButtonSearch>
          </div>
        </DflexColumn>
      </ContentTop>
      <ContentProduct className="mt-5">
        <Row className="g-3">
          <Col md={12}>
            <DflexJustifyBetween className="w-100" style={{ flexWrap: "wrap", gap: "0.8rem" }}>
              <DflexColumn style={{ gap: "0.53333rem" }}>
                <P14Medium style={{ fontSize: "1.66667rem", fontWeight: "600" }}>Rekomendasi</P14Medium>
                <P14Medium style={{ fontWeight: "400", color: "var(--neutral-600)" }}>
                  Produk - produk pilihan terbaik dari kami
                </P14Medium>
              </DflexColumn>
              <ButtonOutline>Lihat Semua Produk</ButtonOutline>
            </DflexJustifyBetween>
          </Col>
          <DataList
            idParams={id}
            dataAction={dataAction}
            setDataAction={setDataAction}
            endpoint="/apps/api/v1/product"
            setDataResult={setRespData}
            params={params}
          >
            <Row className="g-3">{dataResult}</Row>
          </DataList>
        </Row>
      </ContentProduct>
    </>
  );
}

const ContentProduct = styled.div`
  padding: 0rem 5.33333rem;

  @media (max-width: 768px) {
    padding: 1.3333rem;
  }
`;

const ButtonSearch = styled(Button)`
  height: 3.46667rem;
  width: 3.46667rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  aspect-ratio: 1 / 1;
`;

const PTextTitle = styled.p`
  overflow: hidden;
  color: var(--neutral-50);
  text-align: center;
  text-overflow: ellipsis;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 0.5333rem;
  line-height: 140%; /* 2.24rem */
`;

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

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  height: 4rem;
  align-items: center;
`;

const ContentTop = styled.div`
  padding: 0rem 5.33333rem 4rem 5.33333rem;
  gap: 0.66667rem;
  height: 20.375rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%),
    url("/assets/background-image.svg") lightgray 50% / cover no-repeat;

  @media (max-width: 768px) {
    padding: 0rem 1.33333rem 4rem 1.33333rem;
  }
`;

const ButtonOutline = styled.button`
  border-radius: 0.66667rem;
  padding: 0.8rem;
  border: 1px solid var(--neutral-200);
  background: none;
  height: 2.66667rem;
  display: flex;
  align-items: center;
  font-size: 0.93333rem;
`;
