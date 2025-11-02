"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import { Dflex, DflexColumn } from "@/components/styles/flex";
import { IModalData } from "@/interface/modal.interface";
import { useSelector } from "react-redux";

interface IProps {
  modalProps: IModalData;
  onHide?: any;
  children?: any;
  ids?: string;
  declineSubmited?: boolean;
  backdrop?: any;
  className?: any;
}

export default function ModalForm({
  modalProps,
  onHide,
  children,
  ids = "id",
  declineSubmited = true,
  backdrop = "static",
  ...props
}: IProps) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [isClosing, setIsClosing] = useState(false);

  const id = "";
  const { isCallbackForm, isEditModal } = useSelector((state: any) => state.ui);

  const [modal, setModal] = useState<IModalData>({
    show: false,
    approved: false,
    size: modalProps?.size || "lg",
    scrollable: modalProps?.scrollable || true,
  });

  console.log(modalProps, "modal props");

  useEffect(() => {
    setIsClosing(false);
    setModal((prev) => ({
      ...prev,
      ...modalProps,
      show: modalProps.show ?? prev.show, // pertahankan nilai show yang dikirim
    }));
  }, [modalProps]);

  const modalDecline = () => {
    // searchParams.delete(ids);
    // setSearchParams(searchParams);
    setModal({ ...modal, show: false });
  };

  useEffect(() => {
    onHide();
  }, [isCallbackForm]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setModal({ ...modal, show: false });
      if (onHide) onHide(false);
    }, 250);
  };

  return (
    <>
      <ModalCustom
        centered
        backdrop={backdrop}
        keyboard={false}
        size={modal?.size || "lg"}
        show={modalProps?.show}
        onHide={onHide || handleClose}
        scrollable={modal?.scrollable}
        // animation={false}
        dialogClassName={`${
          isClosing
            ? "animate__animated animate__zoomOut animate__faster"
            : "animate__animated animate__zoomIn animate__faster"
        }`}
        {...props}
      >
        <Modal.Header style={{ borderBottom: "1px solid var(--neutral-200)", minHeight: "5rem" }} closeButton>
          <Dflex className="gap-2 align-items-center w-100">
            {modalProps?.icon}
            {modalProps?.icon && <>&nbsp;</>}
            <DflexColumn className="gap-0 w-100">
              <Title>
                {modalProps?.prefixTitle && <>{id ? "Ubah " : "Tambah "}</>}
                {modal?.title}
              </Title>
              <Description>{modal?.description}</Description>
            </DflexColumn>
          </Dflex>
        </Modal.Header>
        {children}
      </ModalCustom>
    </>
  );
}

const ModalCustom = styled(Modal)`
  .btn-close {
    margin-right: 0 !important;
  }
`;
export const Title = styled.p`
  font-size: 1.14286rem;
  font-style: normal;
  font-weight: 600;
  /* width: 90%; */
  margin-bottom: 0px;
`;
export const Description = styled.p`
  font-size: 0.9rem;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 0px;
  color: var(--black-350);
`;
