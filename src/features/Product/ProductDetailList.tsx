import { useEffect, useState } from "react";
import { Alert, Button, Card, Col, Form, InputGroup, Modal, Row, Spinner } from "react-bootstrap";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import FormData from "@/components/form/FormData";
import FormInputControl from "@/components/input/FormInputControl";
import { Dflex, DflexColumn, DflexJustifyBetween } from "@/components/styles/flex";
import FormInputRadio from "@/components/input/FormInputRadio";
import { setIsEditModal } from "@/store/ui";
import FormUpload, { PreviewImage } from "@/components/form/FormUpload";
import styled, { css } from "styled-components";
import { SelectStatic } from "@/components/select/SelectStatic";
import { CATEGORY_OPTIONS, UNITS_OPTIONS } from "@/config/options.config";
import { P14Medium } from "@/styles/text";
import FormInputSwitch from "@/components/input/FormInputSwitch";
import RenderIcons from "@/components/icons/RenderIcons";
import { IProductInterface } from "@/interface/product.interface";
import axios from "axios";
import { formatRupiah } from "@/helpers/config.helper";
import * as yup from "yup";

interface IProps {
  onClose?: any;
  watchId?: string;
  handleEdit?: any;
}

const schema = yup.object().shape({
  nama: yup.string().required(),
  kategori: yup.string().required(),
  harga: yup.number().required(),
  stokAwal: yup.number().required(),
});

export default function ProductDetailList({ onClose, watchId, handleEdit }: IProps) {
  const [dataParams, setDataParams] = useState<any>();
  const [respData, setRespData] = useState<any>();
  const [tabsActive, setTabsActive] = useState<any>("penambahan");
  const [editProduct, setEditProduct] = useState<boolean>(false);
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [responseUpdate, setResponseUpdate] = useState<any>();
  const [alertType, setAlertType] = useState<"success" | "danger">("success");
  const [totalStok, setTotalStok] = useState<number>(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<IProductInterface>({
    resolver: yupResolver(schema) as unknown as Resolver<IProductInterface>,
    mode: "onChange",
    defaultValues: {
      units: "units",
    },
  });

  useEffect(() => {
    const stokAwal = respData?.stokAwal || responseUpdate?.stokAwal || 0;
    const stokPenambahan = respData?.stokPenambahan || responseUpdate?.stokPenambahan || 0;
    const stokPengurangan = respData?.stokPengurangan || responseUpdate?.stokPengurangan || 0;

    const total = stokAwal + stokPenambahan - stokPengurangan;

    setTotalStok(total);
  }, [respData, responseUpdate]);

  const getOneIdProduct = async (id: string | number) => {
    try {
      const response = await axios.get(`/apps/api/v1/product/get-one/${id}`);
      setRespData(response.data.data);
      reset(response.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleSubmitForm = async (data: IProductInterface) => {
    setLoadingUpdate(true);
    try {
      const response: any = await axios.put(`/apps/api/v1/product/update/${data._id}`, data);
      setAlertType("success");
      setShowAlert(true);
      setResponseUpdate(response?.data?.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setAlertType("danger");
      setShowAlert(true);
    } finally {
      setLoadingUpdate(false);
      setEditProduct(false);
    }
  };

  useEffect(() => {
    if (!watchId) return;
    getOneIdProduct(watchId);
  }, [watchId, responseUpdate]);

  return (
    <>
      <Modal.Body>
        <Dflex style={{ gap: "1.33333rem" }}>
          <LeftContent>
            <PreviewImage src={respData?.image || "/assets/meja-1.png"} alt="Uploaded" />
          </LeftContent>
          <RightContent>
            <Row className="g-3">
              <Col md={6}>
                <DflexColumn style={{ gap: "0.26667rem" }}>
                  <P14Medium className="m-0" style={{ fontWeight: "400", color: "var(--neutral-600)" }}>
                    Nama Produk
                  </P14Medium>
                  <P14Medium className="m-0" style={{ fontWeight: "500", color: "var(--neutral-900)" }}>
                    {respData?.nama}
                  </P14Medium>
                </DflexColumn>
              </Col>
              <Col md={6}>
                <DflexColumn style={{ gap: "0.26667rem" }}>
                  <P14Medium className="m-0" style={{ fontWeight: "400", color: "var(--neutral-600)" }}>
                    Kategori Produk
                  </P14Medium>
                  <P14Medium className="m-0" style={{ fontWeight: "500", color: "var(--neutral-900)" }}>
                    {respData?.kategori}
                  </P14Medium>
                </DflexColumn>
              </Col>
              <Col md={12}>
                <DflexColumn style={{ gap: "0.26667rem" }}>
                  <P14Medium className="m-0" style={{ fontWeight: "400", color: "var(--neutral-600)" }}>
                    Deskripsi Produk
                  </P14Medium>
                  <P14Medium className="m-0" style={{ fontWeight: "500", color: "var(--neutral-900)" }}>
                    {respData?.deskripsi}
                  </P14Medium>
                </DflexColumn>
              </Col>

              <Col md={12}>
                <DflexJustifyBetween className="w-100" style={{ alignItems: "center" }}>
                  <DflexColumn style={{ gap: "0.26667rem" }}>
                    <P14Medium className="m-0" style={{ fontWeight: "400", color: "var(--neutral-600)" }}>
                      Harga Satuan
                    </P14Medium>
                    <P14Medium className="m-0" style={{ fontWeight: "500", color: "var(--neutral-900)" }}>
                      {formatRupiah(respData?.harga)}
                    </P14Medium>
                  </DflexColumn>
                  <Card
                    style={{
                      padding: "0.8rem 1.06667rem",
                      borderRadius: "0.8rem",
                      background: "var(--neutral-100)",
                      border: "none",
                      minWidth: "15.2rem",
                    }}
                  >
                    <DflexJustifyBetween style={{ alignItems: "center" }}>
                      <DflexColumn style={{ gap: "0.26667rem" }}>
                        <P14Medium className="m-0" style={{ fontWeight: "400", color: "var(--neutral-600)" }}>
                          Stok Saat ini
                        </P14Medium>
                        <P14Medium className="m-0" style={{ fontWeight: "500", color: "var(--neutral-900)" }}>
                          {totalStok}
                        </P14Medium>
                      </DflexColumn>
                      <P14Medium className="m-0" style={{ fontWeight: "600", color: "var(--orange)" }}>
                        Perbarui
                      </P14Medium>
                    </DflexJustifyBetween>
                  </Card>
                </DflexJustifyBetween>
              </Col>
              <Col md={12}>
                <DflexColumn style={{ gap: "0.26667rem" }}>
                  <P14Medium className="m-0" style={{ fontWeight: "400", color: "var(--neutral-600)" }}>
                    Status
                  </P14Medium>
                  <BadgeStatus status={respData?.status}>{respData?.status}</BadgeStatus>
                </DflexColumn>
              </Col>
              {editProduct && (
                <Col md={12}>
                  <Form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
                    <CardEdit>
                      <Card.Body>
                        <DflexColumn style={{ gap: "1.06667rem" }}>
                          <DflexColumn>
                            <Form.Label>
                              Update Stok <span className="text-danger">*</span>
                            </Form.Label>
                            <DflexJustifyBetween className="align-items-center" style={{ gap: "0.8rem" }}>
                              <div style={{ width: "100%" }}>
                                {tabsActive === "penambahan" && (
                                  <FormInputControl
                                    register={register("stokPenambahan")}
                                    placeholder={totalStok}
                                    required
                                    type="number"
                                    message={errors?.stokPenambahan?.message}
                                    isInvalid={errors?.stokPenambahan as boolean | undefined}
                                  />
                                )}
                                {tabsActive === "pengurangan" && (
                                  <FormInputControl
                                    register={register("stokPengurangan")}
                                    placeholder={totalStok}
                                    required
                                    type="number"
                                    message={errors?.stokPengurangan?.message}
                                    isInvalid={errors?.stokPengurangan as boolean | undefined}
                                  />
                                )}
                              </div>
                              <TabWrapper>
                                <TabsItem
                                  className={tabsActive === "penambahan" ? "active" : ""}
                                  onClick={() => setTabsActive("penambahan")}
                                >
                                  Penambahan
                                </TabsItem>
                                <TabsItem
                                  className={tabsActive === "pengurangan" ? "active" : ""}
                                  onClick={() => setTabsActive("pengurangan")}
                                >
                                  Pengurangan
                                </TabsItem>
                              </TabWrapper>
                            </DflexJustifyBetween>
                          </DflexColumn>
                          <Dflex style={{ gap: "0.8rem" }}>
                            <Button variant="outline-primary" onClick={() => setEditProduct(false)}>
                              Cancel
                            </Button>
                            <Button variant="primary" type="submit" className="text-white">
                              <Dflex style={{ gap: "0.5333rem" }}>
                                {loadingUpdate ? "Update" : "Update"}
                                {loadingUpdate ? (
                                  <Spinner animation="border" size="sm" />
                                ) : (
                                  <RenderIcons iconName={"check"} iconSize={"18px"} />
                                )}
                              </Dflex>
                            </Button>
                          </Dflex>
                        </DflexColumn>
                      </Card.Body>
                    </CardEdit>
                  </Form>
                </Col>
              )}
              {showAlert && (
                <Col md={12}>
                  <Alert variant={alertType}>
                    <DflexJustifyBetween className={`text-${alertType}`}>
                      <Dflex style={{ gap: "0.5333rem" }} className={`text-${alertType}`}>
                        <RenderIcons
                          iconName={alertType === "success" ? "check-circle" : "x-circle"}
                          iconSize={"18px"}
                          iconStyle={"fill"}
                          iconColor={`text-${alertType}`}
                        />
                        {alertType === "success" ? "Stok berhasil diperbarui!" : "Gagal memperbarui stok!"}
                      </Dflex>
                      <div onClick={() => setShowAlert(false)} style={{ cursor: "pointer" }}>
                        <RenderIcons iconName={"x"} iconSize={"20px"} iconColor={`text-${alertType}`} />
                      </div>
                    </DflexJustifyBetween>
                  </Alert>
                </Col>
              )}
            </Row>
          </RightContent>
        </Dflex>
      </Modal.Body>
      <Modal.Footer>
        <Col>
          <DflexJustifyBetween>
            <div></div>
            <Dflex style={{ gap: "0.5333rem" }}>
              <Button onClick={onClose} variant="outline-primary">
                Close
              </Button>
              <Button variant="primary" className="text-white" onClick={() => setEditProduct(true)}>
                <Dflex style={{ gap: "0.5333rem" }}>
                  <RenderIcons iconName={"pencil-simple"} iconSize={"18px"} />
                  Edit Produk
                </Dflex>
              </Button>
            </Dflex>
          </DflexJustifyBetween>
        </Col>
      </Modal.Footer>
    </>
  );
}

const TabWrapper = styled.div`
  display: flex;
  padding: 0.26667rem;
  align-items: center;
  border-radius: 0.66667rem;
  background: var(--neutral-100);
  height: fit-content;
`;

const TabsItem = styled.div`
  display: flex;
  padding: 0.26667rem;
  align-items: center;
  border-radius: 0.66667rem;
  cursor: pointer;

  &:hover {
    background: var(--neutral-50);
    color: var(--neutral-600);
  }
  &.active {
    background: var(--neutral-50);
    color: var(--neutral-600);
  }
`;

const CardEdit = styled(Card)`
  border-radius: 0.8rem;
  border: 1px solid var(--neutral-200);

  .card-body {
    padding: 1.06667rem 1.33333rem;
  }
`;

const LeftContent = styled.div`
  min-width: 16.7rem;
`;
const RightContent = styled.div`
  width: 100%;
`;

const CardStyledStatus = styled(Card)`
  border: 1px solid var(--neutral-200);
  border-radius: 0.8rem;

  .card-body {
    padding: 1.06667rem 1.33333rem;
  }
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
  min-width: 3.13rem;
  width: fit-content;

  ${({ status }) => {
    switch (status) {
      case "aktif":
        return css`
          background: #ebf3eb;
          color: #499949;
          border: 1px solid #499949;
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
          border: 1px solid #e6871a;
        `;
      default:
        return css`
          background: #fff0df;
          color: #e6871a;
          border: 1px solid #e6871a;
        `;
    }
  }}
`;
