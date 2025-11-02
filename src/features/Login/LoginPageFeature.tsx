"use client";

import FormInputControl from "@/components/input/FormInputControl";
import ModalAlert from "@/components/modal/ModalAlert";
import { DflexColumn } from "@/components/styles/flex";
import { IModalData } from "@/interface/modal.interface";
import { setAuthUser } from "@/store/auth";
import { setIsEditModal, setIsIdParams } from "@/store/ui";
import { P14Medium } from "@/styles/text";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button, Card, Form, Image, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import * as yup from "yup";
import Swal from "sweetalert2";

const schema = yup.object({
  email: yup.string().required("email is required"),
  password: yup.string().required("Password is required"),
});

type LoginFormInputs = yup.InferType<typeof schema>;

export default function LoginPageFeature() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [modal, setModal] = useState<IModalData>({
    approved: false,
    size: "md",
    fullscreen: false,
    title: "Add User",
    description: "Set up and configure a new User",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await axios.post("/apps/api/v1/users/login", data);
      if (response?.data?.status === true) {
        dispatch(setAuthUser(response?.data?.data));
        Swal.fire({
          title: "Berhasil Login!",
          text: "berhasil login dan sekarang kamu akan di arahkan ke halaman dashbaord",
          icon: "success",
          draggable: true,
        });
        router.push("/admin/product");

        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Login failed:", error);
      Swal.fire({
        title: "Gagal Login!",
        text: "Gagal login silahkan coba lagi",
        icon: "error",
        draggable: true,
      });
      setErrorMessage(error.response?.data?.detail || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  //handle click
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

  return (
    <>
      <ContentLogin>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CardStyled>
            <Image alt="logo" src={"/assets/logo.svg"} style={{ width: "9.4rem", marginBottom: "1.06667rem" }} />
            <P14Medium style={{ color: "var(--neutral-600)", marginBottom: "2.13333rem" }}>
              Enter your username and password correctly
            </P14Medium>
            <div style={{ marginBottom: "1.06667rem" }}>
              <FormInputControl
                labelName="Email"
                placeholder="Enter email"
                register={register("email")}
                isInvalid={!!errors.email}
                message={errors.email?.message}
              />
            </div>
            <div style={{ marginBottom: "1.6rem" }}>
              <FormInputControl
                labelName="Password"
                placeholder="Enter password"
                register={register("password")}
                isInvalid={!!errors.password}
                message={errors.password?.message}
              />
            </div>
            <Button variant="primary" type="submit" className="text-white">
              {loading ? "Loading..." : "Sign In"} {loading && <Spinner animation="border" size="sm" />}
            </Button>
          </CardStyled>
        </Form>
      </ContentLogin>
      <ModalAlert modalProps={modal} onHide={handleClose} />
    </>
  );
}

const ContentLogin = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CardStyled = styled(Card)`
  padding: 2.13333rem;
  border-radius: 1.6rem;
  width: 27.6rem;
  border: 1px solid var(--neutral-200);
`;
