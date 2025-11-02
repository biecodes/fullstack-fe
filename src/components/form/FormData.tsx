"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCallbackForm, setIsEditModal, setIsIdParams } from "../../store/ui";
import { toast } from "react-toastify";
import axios from "axios";
import { IModalData } from "@/interface/modal.interface";
import ModalAlert from "@/components/modal/ModalAlert";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";

interface IProps {
  reset: any;
  setValue?: any;
  path: any;
  dataParams: any;
  ids?: any;
  setError?: any;
  children?: any;
  setRespData?: any;
  respData?: any;
  setLoading: any;
  loading?: any;
  style?: any;
  isOffcanvas?: boolean;
  getDataCustom?: any;
  setModal?: any;
}

const FormData: React.FC<IProps> = ({
  reset,
  setValue,
  path,
  dataParams,
  ids,
  setError,
  children,
  setRespData,
  setLoading,
  style,
  isOffcanvas = false,
  getDataCustom,
  setModal,
}) => {
  const dispatch = useDispatch();
  const { isIdParams } = useSelector((state: any) => state.ui);

  useEffect(() => {
    if (isIdParams) {
      fetchDataId();
    }
  }, [isIdParams]);

  const fetchDataId = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${path}/get-one/${isIdParams}`);
      setRespData(response.data.data);
      reset(response.data.data);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataParams) {
      fetchDataPost();
      dispatch(setIsEditModal(true));
    }
  }, [dataParams]);

  const fetchDataPost = async () => {
    setLoading(true);
    try {
      const response = ids
        ? await axios.put(`${path}/update/${ids}`, dataParams)
        : await axios.post(`${path}/add`, dataParams);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: response?.data?.message ? response?.data?.message : `Sukses ${ids ? "Update" : "Tambah"} Data`,
        showConfirmButton: false,
        timer: 2000,
      });

      if (response?.data?.success === true) {
        if (getDataCustom) {
          getDataCustom();
        }

        setModal((prevState: any) => ({
          ...prevState,
          show: false,
        }));
      }
      dispatch(setCallbackForm(nanoid()));
      dispatch(setIsEditModal(false));
    } catch (error: any) {
      dispatch(setCallbackForm(nanoid()));
      dispatch(setIsEditModal(false));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message ? error.response.data.message : `Gagal ${ids ? "Update" : "Tambah"} Data`,
        confirmButtonColor: "#d33",
      });

      console.error(error, "ini error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={style}>{children}</div>;
    </>
  );
};

export default FormData;
