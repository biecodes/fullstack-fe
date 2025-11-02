"use client";

import DataAction from "@/components/action/DataAction";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import RenderIcons from "@/components/icons/RenderIcons";
import FormInputSearch from "@/components/input/FormInputSearch";
import ContentTitleLayout, { ContentProduct } from "@/components/layout/ContentTitleLayout";
import ModalAlert from "@/components/modal/ModalAlert";
import ModalForm from "@/components/modal/ModalForm";
import { SelectStatic } from "@/components/select/SelectStatic";
import { Dflex, DflexColumn, DflexJustifyBetween } from "@/components/styles/flex";
import DataTable from "@/components/table/DataTable";
import { CATEGORY_OPTIONS, Status_Options, Urutkan_Options } from "@/config/options.config";
import { ButtonSorting } from "@/features/Admin/AdminProductFeatures";
import ProductListForm from "@/features/Product/ProductListForm";
import UserListForm from "@/features/User/UserListForm";
import { formatDate } from "@/helpers/config.helper";
import { IModalData } from "@/interface/modal.interface";
import { setIsEditModal, setIsIdParams } from "@/store/ui";
import { P14Medium } from "@/styles/text";
import withAuth from "@/utils/withAuth";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Card, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";

function AdminUserFeatures() {
  const dispatch = useDispatch();
  const [action, setAction] = useState<any>();
  const [id, setId] = useState<any>();
  const [params, setParams] = useState<any>({
    searchBy: ["username", "status"],
    order: "desc",
    orderBy: "created_at",
  });

  const [searchInput, setSearchInput] = useState(params?.search || "");
  const [orderValue, setOrderValue] = useState(params?.order || "desc");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<any>();

  const [modal, setModal] = useState<IModalData>({
    approved: false,
    size: "md",
    fullscreen: false,
    title: "Tambah User",
    description: "Masukkan detail user untuk menambahkannya ke management user",
  });

  //handle click
  const handleAddClick = () => {
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));
    setAction("");
    dispatch(setIsEditModal(true));
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
      title: "Edit User",
    }));
    dispatch(setIsEditModal(true));
  };

  const handleDelete = (id: string) => {
    setAction("modal.delete");
    setId(id);
  };

  const columnData = [
    // { key: "no", label: "No" },
    {
      key: "username",
      label: "Nama User",
      width: "200px",
      render: (row: any) => (
        <Dflex style={{ gap: "0.8rem", alignItems: "center" }}>
          {row?.image ? (
            <Image
              style={{ width: "2.66667rem", height: "2.66667rem", borderRadius: "0.5333rem", objectFit: "cover" }}
              src={`${row?.image}`}
            />
          ) : (
            <>
              <Avatar name={row?.username} size="2.66667rem" round="0.53333rem" />
            </>
          )}
          <DflexColumn>
            <P14Medium>{row?.username}</P14Medium>
            <P14Medium style={{ fontWeight: "400", color: "var(--neutral-600)" }}>{row?.email}</P14Medium>
          </DflexColumn>
        </Dflex>
      ),
    },
    { key: "noTelepon", label: "No Telp", width: "100px", left: "25px" },
    {
      key: "created_at",
      label: "Tanggal Dibuat",
      width: "100px",
      left: "0px",
      render: (row: any) => <P14Medium>{formatDate(row?.created_at)}</P14Medium>,
    },
    {
      key: "status",
      label: "Status",
      width: "100px",
      left: "0px",
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
          <P14Medium style={{ color: "var(--orange)", cursor: "pointer" }}>Lihat Detail</P14Medium>
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
      search: watch("status"),
    }));
  }, [watch("status")]);

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
            title="Management User"
            descTitle="Lihat semua user yang memiliki akses di inventaris."
            textAdd="Tambah Users"
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
                placeholder="Semua Status"
                fieldName="status"
                control={control}
                options={Status_Options}
                required
              />
            </Dflex>
            <Dflex style={{ gap: "0.5333rem", alignItems: "center" }}>
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
          endpoint="/apps/api/v1/users"
          columns={columnData}
          dataAction={action}
          idParams={id}
          setDataAction={setAction}
          paramsFilter={params}
        />
      </ContentProduct>

      <ModalForm modalProps={modal} onHide={handleClose} className="modal-product">
        <UserListForm onClose={handleClose} />
      </ModalForm>
    </>
  );
}

export default withAuth(AdminUserFeatures);

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
  color: #e6871a;
  width: fit-content;

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
