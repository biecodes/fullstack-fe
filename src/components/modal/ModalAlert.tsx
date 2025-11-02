"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Modal } from "react-bootstrap";
import { useSearchParams } from "next/navigation";
import { Dflex, DflexColumn } from "@/components/styles/flex";
import { IModalData } from "@/interface/modal.interface";
import { useSelector } from "react-redux";
import SuccessIcon from "@/components/icons/SuccessIcon";
import { P14Medium } from "@/styles/text";

interface IProps {
  modalProps: IModalData;
  onHide?: any;
  children?: any;
  ids?: string;
  declineSubmited?: boolean;
  backdrop?: any;
  className?: any;
}

export default function ModalAlert({
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

  console.log(isEditModal, "isEditModal");

  const [modal, setModal] = useState<IModalData>({
    show: id ? true : false,
    approved: false,
    size: modalProps?.size || "lg",
    scrollable: modalProps?.scrollable || true,
  });

  useEffect(() => {
    setIsClosing(false); // Start the closing animation
    setModal({ ...modal, ...modalProps });
  }, [modalProps]);

  const modalDecline = () => {
    // searchParams.delete(ids);
    // setSearchParams(searchParams);
    setModal({ ...modal, show: false });
  };

  useEffect(() => {
    onHide();
  }, [isCallbackForm]);

  useEffect(() => {
    if (isEditModal === true) {
      setModal({ ...modal, show: true });
    }
  }, [isEditModal]);

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
        show={modal?.show}
        onHide={modalDecline}
        scrollable={modal?.scrollable}
        // animation={false}
        dialogClassName={`${
          isClosing
            ? "animate__animated animate__zoomOut animate__faster"
            : "animate__animated animate__zoomIn animate__faster"
        }`}
        {...props}
      >
        <Modal.Body style={{ padding: " 2.13333rem 1.6rem 1.6rem 1.6rem" }}>
          <DflexColumn style={{ gap: "1.06667rem", alignItems: "center" }}>
            <BoxAlert>
              <SuccessIcon />
            </BoxAlert>
            <DflexColumn style={{ marginBottom: "1.6rem", alignItems: "center" }}>
              <P14Medium style={{ fontSize: "1.06667rem", fontWeight: "600", lineHeight: "1.6rem" }}>
                {modal?.title || "Produk baru berhasil disimpan"}
              </P14Medium>
              <P14Medium style={{ fontSize: "0.8rem", fontWeight: "400", color: "var(--neutral-600)" }}>
                {modal?.description || "Produk baru berhasil disimpan"}
              </P14Medium>
            </DflexColumn>
          </DflexColumn>
          <Buttons variant="outline" onClick={onHide}>
            Tutup
          </Buttons>
        </Modal.Body>
      </ModalCustom>
    </>
  );
}

const Buttons = styled(Button)`
  border: 1px solid var(--neutral-200);
  height: 2.66667rem;
  width: 100%;
  border-radius: 0.66667rem;
`;

const BoxAlert = styled.div`
  display: flex;
  width: 4.8rem;
  height: 4.8rem;
  justify-content: center;
  align-items: center;
  gap: 0.66667rem;
  background: #ebf3eb;
  border-radius: 50%;
`;

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
