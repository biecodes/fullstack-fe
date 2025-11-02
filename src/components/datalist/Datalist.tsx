"use client";

import React, { useEffect, useState } from "react";
import { Spinner, Form, Modal, Button, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCallbackForm, setIsEditModal, setIsIdParams } from "@/store/ui";
import axios from "axios";
import { DflexJustifyBetween } from "@/components/styles/flex";

interface IProps {
  endpoint: string;
  dataAction: any;
  idParams: any;
  setDataAction: any;
  customLabel?: string;
  skeleton?: any;
  skeletonSize?: any;
  children?: any;
  setDataResult: any;
  params?: any;
}

const DataList: React.FC<IProps> = ({
  endpoint,
  dataAction,
  setDataAction,
  idParams,
  skeleton,
  skeletonSize,
  children,
  customLabel = "",
  setDataResult,
  params,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showModal, setShowModal] = useState(false);
  const { isCallbackForm } = useSelector((state: any) => state.ui);
  const dispatch = useDispatch();
  const paramsdata = {
    page: page,
    limit: pageSize,
    ...params,
  };

  const handleClose = () => {
    setShowModal(false);
    setDataAction();
  };

  useEffect(() => {
    // if (paramsdata && pageSize && page) {
    fetchData();
    // }
  }, [params]);

  useEffect(() => {
    if (isCallbackForm) {
      fetchData();
    }
  }, [isCallbackForm]);

  useEffect(() => {
    if (dataAction === "modal.delete") {
      setShowModal(true);
    }
  }, [dataAction, idParams]);

  //handle edit
  useEffect(() => {
    if (dataAction === "modal.edit" && idParams) {
      dispatch(setIsIdParams(idParams));
      dispatch(setIsEditModal(true));
    }
  }, [dataAction, idParams]);

  const deleteData = async () => {
    if (dataAction !== "modal.delete") {
      console.log("Aksi tidak valid:", dataAction);
      return;
    }

    setLoading(true);
    try {
      const resp = await axios.delete(`${endpoint}/delete/${idParams}`);
      console.log(resp, "ini resp");
      toast.success(`Sukses Delete Data ${customLabel}`);
      fetchData();
      dispatch(setCallbackForm(false));
      handleClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      dispatch(setCallbackForm(false));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${endpoint}/get-all`, paramsdata);
      setDataResult(response.data.data);
      setTotalPages(response.data.totalPages);
      dispatch(setCallbackForm(false));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
      dispatch(setCallbackForm(false));
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setPage(1);
  };

  return (
    <div>
      {loading ? (
        <>
          <Row className="g-3">
            {Array.from({ length: skeletonSize ? skeletonSize : pageSize }).map((_, index) => (
              <React.Fragment key={index}>{skeleton}</React.Fragment>
            ))}
          </Row>
        </>
      ) : (
        <>{children}</>
      )}
      <DflexJustifyBetween className="mt-3">
        <Form.Select onChange={handlePageSizeChange} value={pageSize} className="w-auto">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Form.Select>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </DflexJustifyBetween>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Hapus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.</Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="danger" onClick={deleteData} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Ya, Hapus"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DataList;
