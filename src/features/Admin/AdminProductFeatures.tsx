"use client";

import DataAction from "@/components/action/DataAction";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import RenderIcons from "@/components/icons/RenderIcons";
import FormInputSearch from "@/components/input/FormInputSearch";
import ContentTitleLayout, { ContentProduct } from "@/components/layout/ContentTitleLayout";
import ModalAlert from "@/components/modal/ModalAlert";
import ModalForm from "@/components/modal/ModalForm";
import { SelectStatic } from "@/components/select/SelectStatic";
import { Dflex, DflexJustifyBetween } from "@/components/styles/flex";
import DataTable from "@/components/table/DataTable";
import { CATEGORY_OPTIONS, Status_Options, Urutkan_Options } from "@/config/options.config";
import ProductDetailList from "@/features/Product/ProductDetailList";
import ProductListForm from "@/features/Product/ProductListForm";
import { formatRupiah } from "@/helpers/config.helper";
import { IModalData } from "@/interface/modal.interface";
import { setIsEditModal, setIsIdParams } from "@/store/ui";
import { P14Medium } from "@/styles/text";
import withAuth from "@/utils/withAuth";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Button, Card, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";

function AdminProductFeatures() {
  const dispatch = useDispatch();
  const [action, setAction] = useState<any>();
  const [id, setId] = useState<any>();
  const [params, setParams] = useState<any>({
    searchBy: ["nama", "kategori", "status"],
    order: "desc",
    orderBy: "created_at",
  });
  const [searchInput, setSearchInput] = useState(params?.search || "");
  const [orderValue, setOrderValue] = useState(params?.order || "desc");

  const [modal, setModal] = useState<IModalData>({
    show: false,
    approved: false,
    size: "md",
    fullscreen: false,
    title: "Tambah Produk",
    description: "Masukkan detail produk untuk menambahkannya ke inventaris.",
  });

  const [modalDetail, setModalDetail] = useState<IModalData>({
    show: false,
    approved: false,
    size: "md",
    fullscreen: false,
    title: "Detail Produk",
    description: "Berikut adalah detail dari produk yang dipilih.",
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<any>();

  //handle click
  const handleDetailProduk = (id: any) => {
    setModalDetail((prevState: any) => ({
      ...prevState,
      show: true,
    }));
    setId(id);
  };

  const handleCloseDetailProduk = () => {
    setModalDetail((prevState: any) => ({
      ...prevState,
      show: false,
    }));
  };
  const handleAddClick = () => {
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
  };

  const handleClose = () => {
    setModal((prevState: any) => ({
      ...prevState,
      show: false,
    }));
    dispatch(setIsEditModal(false));
    dispatch(setIsIdParams(""));
  };

  const handleEdit = (id: any) => {
    setAction("modal.edit");
    dispatch(setIsIdParams(id));
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
      title: "Edit Produk",
    }));
    setModalDetail((prevState: any) => ({
      ...prevState,
      show: false,
    }));
  };

  const handleDelete = (id: string) => {
    setAction("modal.delete");
    setId(id);
  };

  const columnData = [
    // { key: "no", label: "No" },
    {
      key: "nama",
      label: "Nama Produk",
      width: "250px",
      render: (row: any) => (
        <Dflex style={{ gap: "0.5333rem", alignItems: "center" }}>
          {row?.image ? (
            <Image
              style={{ width: "2.66667rem", height: "2.66667rem", borderRadius: "0.5333rem", objectFit: "cover" }}
              src={row?.image[0]}
            />
          ) : (
            <>
              <Avatar name={row?.nama} size="2.66667rem" round="0.53333rem" />
            </>
          )}
          <P14Medium>{row?.nama}</P14Medium>
        </Dflex>
      ),
    },
    { key: "kategori", label: "Kategori", width: "100px", left: "70px" },
    { key: "stokAwal", label: "Stok", width: "100px", left: "70px" },
    {
      key: "harga",
      label: "Harga (Rp)",
      width: "100px",
      left: "70px",
      render: (row: any) => <P14Medium>{formatRupiah(row?.harga)}</P14Medium>,
    },
    {
      key: "status",
      label: "Status",
      width: "20px",
      left: "70px",
      render: (row: any) => (
        <>
          <BadgeStatus status={row?.status}>
            <RenderIcons iconName={"check-circle"} iconStyle={"fill"} />
            {row?.status}
          </BadgeStatus>
        </>
      ),
    },
    {
      key: "actions",
      label: "Actions",

      render: (row: any) => (
        <Dflex style={{ gap: "0.5333rem", alignItems: "center" }}>
          <P14Medium style={{ color: "var(--orange)", cursor: "pointer" }} onClick={() => handleDetailProduk(row?._id)}>
            Lihat Detail
          </P14Medium>
          <DataAction handleDelete={() => handleDelete(row?._id)} handleEdit={() => handleEdit(row?._id)} />
        </Dflex>
      ),
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    setParams((prev: any) => ({
      ...prev,
      search: searchInput,
    }));
  }, [searchInput]);

  useEffect(() => {
    setParams((prev: any) => ({
      ...prev,
      search: watch("kategori"),
    }));
  }, [watch("kategori")]);

  useEffect(() => {
    setParams((prev: any) => ({
      ...prev,
      search: watch("status"),
    }));
  }, [watch("status")]);

  useEffect(() => {
    setParams((prev: any) => ({
      ...prev,
      orderBy: watch("urutkan"),
    }));
  }, [watch("urutkan")]);

  useEffect(() => {
    setParams((prev: any) => ({
      ...prev,
      order: orderValue,
    }));
  }, [orderValue]);

  return (
    <>
      <HeaderDashboard />
      <ContentProduct>
        <div style={{ marginBottom: "1.6rem" }}>
          <ContentTitleLayout
            title="Daftar Produk"
            descTitle="Lihat semua produk yang tersedia di inventaris."
            textAdd="Tambah Produk"
            onClick={handleAddClick}
          />
        </div>
        <CardStyled>
          <DflexJustifyBetween>
            <Dflex style={{ gap: "0.5333rem" }}>
              <FormInputSearch
                version="V2"
                value={searchInput}
                placeholder="Cari Produk"
                onChange={handleInputChange}
              />
              <SelectStatic
                variant="V2"
                placeholder="Semua Kategori"
                fieldName="kategori"
                control={control}
                options={CATEGORY_OPTIONS}
                required
              />
              <SelectStatic
                variant="V2"
                placeholder="Semua Status"
                fieldName="status"
                control={control}
                options={Status_Options}
                required
              />
            </Dflex>
            <Dflex style={{ gap: "0.5333rem", alignItems: "center" }}>
              <P14Medium>Urutkan:</P14Medium>
              <SelectStatic
                variant="V2"
                placeholder="Nama Produk"
                fieldName="urutkan"
                control={control}
                options={Urutkan_Options}
                required
              />
              {orderValue === "asc" ? (
                <ButtonSorting onClick={() => setOrderValue("desc")}>
                  <RenderIcons iconName={"sort-ascending"} iconSize={"18px"} />
                  Asc
                </ButtonSorting>
              ) : (
                <ButtonSorting onClick={() => setOrderValue("asc")}>
                  <RenderIcons iconName={"sort-descending"} iconSize={"18px"} />
                  Desc
                </ButtonSorting>
              )}
            </Dflex>
          </DflexJustifyBetween>
        </CardStyled>
        <DataTable
          endpoint="/apps/api/v1/product"
          columns={columnData}
          dataAction={action}
          idParams={id}
          setDataAction={setAction}
          paramsFilter={params}
        />
      </ContentProduct>

      <ModalForm modalProps={modal} onHide={handleClose} className="modal-product">
        <ProductListForm setModal={setModal} onClose={handleClose} />
      </ModalForm>

      <ModalForm modalProps={modalDetail} onHide={handleCloseDetailProduk} className="modal-product">
        <ProductDetailList onClose={handleCloseDetailProduk} watchId={id} handleEdit={handleEdit} />
      </ModalForm>
    </>
  );
}

export default withAuth(AdminProductFeatures);

export const ButtonSorting = styled.button`
  display: flex;
  height: 2.66667rem;
  padding: 0 0.8rem;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  gap: 0.53333rem;
  border-radius: 0.66667rem;
  border: 1px solid var(--neutral-200);
  font-size: 0.93333rem;
  font-style: normal;
  font-weight: 500;
  background: none;
`;

const CardStyled = styled(Card)`
  padding: 1.06667rem 1.33333rem;
  border: 1px solid var(--neutral-200);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-bottom: none;
`;

const BadgeStatus = styled.div<{ status?: string }>`
  display: flex;
  height: 1.86667rem;
  padding: 0.26667rem 0.66667rem 0.26667rem 0.4rem;
  justify-content: center;
  align-items: center;
  gap: 0.26667rem;
  border-radius: 6.6rem;
  background: #fff0df;
  width: fit-content;
  color: #e6871a;

  ${({ status }) => {
    switch (status) {
      case "aktif":
        return css`
          background: #ebf3eb;
          color: #499949;
        `;
      case "nonaktif":
        return css`
          background: var(--neutral-100);
          color: var(--neutral-600);
        `;
      case "menipis":
        return css`
          background: #fff0df;
          color: #e6871a;
        `;
      default:
        return css`
          background: #fff0df;
          color: #e6871a;
        `;
    }
  }}
`;
