"use client";

import { Dflex, DflexJustifyBetween } from "@/components/styles/flex";
import axios from "axios";
import React, { useEffect, useState, JSX } from "react";
import { Table, Spinner, Form, Modal, Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setIsEditModal } from "@/store/ui";
import styled from "styled-components";
import { P13Medium } from "@/styles/text";

interface Column {
  key: string;
  label: string;
  width?: string;
  render?: (row: any) => JSX.Element;
}

interface TableProps {
  endpoint: string;
  columns: Column[];
  dataAction?: any;
  idParams?: any;
  setDataAction?: any;
  customLabel?: string;
  paramsFilter?: any;
}

const DataTable: React.FC<TableProps> = ({
  endpoint,
  columns,
  dataAction,
  setDataAction,
  idParams,
  customLabel = "",
  paramsFilter,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { isCallbackForm } = useSelector((state: any) => state.ui);

  const handleClose = () => {
    setShowModal(false);
    setDataAction("");
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize, paramsFilter, isCallbackForm]);

  useEffect(() => {
    if (dataAction === "modal.delete") {
      setShowModal(true);
    }
    if (dataAction === "modal.edit") {
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
      fetchData(page, pageSize);
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const body = {
        ...paramsFilter,
        page,
        limit: pageSize,
        orderBy: paramsFilter?.orderBy || "created_at",
      };

      const response = await axios.post(`${endpoint}/get-all`, body);

      setData(response.data.users || response.data.data || []);
      setTotalPages(response.data.pagination.pages || 1);
    } catch (error) {
      console.error("Error fetching data", error);
      toast.error(`${error}`);
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
    <ContainerTable>
      {loading ? (
        <Table bordered>
          <thead>
            <tr>
              <th>
                <Dflex style={{ justifyContent: "center" }}>
                  <Skeleton height={25} width={250} />
                </Dflex>
              </th>
              {Array.from({ length: 5 }).map((_, index) => (
                <th key={index}>
                  <Dflex style={{ justifyContent: "center" }}>
                    <Skeleton height={25} width={250} />
                  </Dflex>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 8 }).map((_, index) => (
              <tr key={index}>
                <th>
                  <Dflex style={{ justifyContent: "center" }}>
                    <Skeleton height={25} width={250} />
                  </Dflex>
                </th>
                {Array.from({ length: 5 }).map((_, index) => (
                  <th key={index}>
                    <Dflex style={{ justifyContent: "center" }}>
                      <Skeleton height={25} width={250} />
                    </Dflex>
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <>
          <TableComponent>
            {/* HEADER */}
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.key} width={col.width}>
                    <P13Medium>{col.label}</P13Medium>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* BODY */}
            <TableBody>
              {data.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col.key} width={col.width}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </TableComponent>
        </>
      )}
      <HeaderFooterTable>
        <DflexJustifyBetween>
          <Form.Select style={{ height: "38px" }} onChange={handlePageSizeChange} value={pageSize} className="w-auto">
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
      </HeaderFooterTable>

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
    </ContainerTable>
  );
};

export default DataTable;

export const ContentTable = styled.div`
  border-bottom: 1px solid var(--neutral-200);
  padding: 0.67rem 1.06667rem;
`;

export const BodyTable = styled.div`
  border-left: 1px solid var(--neutral-200);
  border-right: 1px solid var(--neutral-200);
`;

export const HeaderTable = styled.div`
  padding: 0.8rem 1.06667rem;
  border: 1px solid var(--neutral-200);
  background: var(--neutral-100);
  border-top-right-radius: 0.53333rem;
  border-top-left-radius: 0.53333rem;
`;
export const HeaderFooterTable = styled.div`
  padding: 0.8rem 1.33333rem;
  border: 1px solid var(--neutral-200);
  border-top: none;
  border-bottom-right-radius: 0.53333rem;
  border-bottom-left-radius: 0.53333rem;
`;

const ContainerTable = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const TableComponent = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
  min-width: 700px; /* atur sesuai kebutuhan total kolom */
`;

const TableHeader = styled.div`
  display: table-header-group;
  background: var(--neutral-100);
  border: 1px solid var(--neutral-200);
  border-top-right-radius: 0.53333rem;
  border-top-left-radius: 0.53333rem;
  height: 3.46667rem;
`;

const TableRow = styled.div`
  display: table-row;
  border-bottom: 1px solid var(--neutral-200);
`;

const TableBody = styled.div`
  display: table-row-group;
  border-left: 1px solid var(--neutral-200);
  border-right: 1px solid var(--neutral-200);
`;

const TableCell = styled.div<{ width?: string }>`
  display: table-cell;
  vertical-align: middle;
  padding: 0.67rem 1.06667rem;
  min-width: ${(p) => p.width || "auto"};
`;
