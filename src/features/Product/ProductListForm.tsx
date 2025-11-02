import { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Modal, Row, Spinner } from "react-bootstrap";

import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormData from "@/components/form/FormData";
import FormInputControl from "@/components/input/FormInputControl";
import { Dflex, DflexColumn, DflexJustifyBetween } from "@/components/styles/flex";
import FormInputRadio from "@/components/input/FormInputRadio";
import { setIsEditModal } from "@/store/ui";
import FormUpload from "@/components/form/FormUpload";
import styled from "styled-components";
import { SelectStatic } from "@/components/select/SelectStatic";
import { CATEGORY_OPTIONS, UNITS_OPTIONS } from "@/config/options.config";
import { P14Medium } from "@/styles/text";
import FormInputSwitch from "@/components/input/FormInputSwitch";
import RenderIcons from "@/components/icons/RenderIcons";
import { IProductInterface } from "@/interface/product.interface";

interface IProps {
  onClose?: any;
  setModal?: any;
}

const schema = yup.object().shape({
  nama: yup.string().required(),
  kategori: yup.string().required(),
  harga: yup.number().required(),
  stokAwal: yup.number().required(),
});

export default function ProductListForm({ onClose, setModal }: IProps) {
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [respData, setRespData] = useState();
  const dispatch = useDispatch();

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

  const watchId = watch("_id");
  const watchImage = watch("image") as unknown as string[];
  console.log(watch("status"), "iniu status");

  const onSubmit: SubmitHandler<IProductInterface> = async (data) => {
    const paramsSubmit: IProductInterface = {
      ...data,
      stokPengurangan: data.stokPengurangan || 0,
      stokPenambahan: data.stokPenambahan || 0,
      stokMenipis: data.stokMenipis || 0,
      status: data.status === true ? "aktif" : "nonaktif",
      discount: data.discount || 0,
      terjual: data.terjual || 0,
      rating: data.rating || 0,
    };

    setDataParams(paramsSubmit);
    dispatch(setIsEditModal(false));
  };

  return (
    <FormData
      reset={reset}
      path="/apps/api/v1/product"
      dataParams={dataParams}
      setLoading={setLoading}
      setRespData={setRespData}
      ids={watchId}
      setModal={setModal}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Dflex style={{ gap: "1.33333rem" }}>
            <LeftContent>
              <FormUpload isMulti={true} watchImage={watchImage} control={control} fieldName="image" />
            </LeftContent>
            <RightContent>
              <Row className="g-3">
                <Col md={6}>
                  <FormInputControl
                    register={register("nama")}
                    placeholder="Masukkan nama produk"
                    labelName="Nama Produk"
                    required
                    message={errors?.nama?.message}
                    isInvalid={errors?.nama as boolean | undefined}
                  />
                </Col>
                <Col md={6}>
                  <SelectStatic
                    fieldName="kategori"
                    labelName="Kategori"
                    control={control}
                    options={CATEGORY_OPTIONS}
                    required
                  />
                </Col>
                <Col md={12}>
                  <FormInputControl
                    register={register("deskripsi")}
                    placeholder="Masukkan deskripsi produk"
                    labelName="Deskripsi Produk"
                    message={errors?.deskripsi?.message}
                    isInvalid={errors?.deskripsi as boolean | undefined}
                    as={"textarea"}
                    rows={4}
                  />
                </Col>
                <Col md={6}>
                  <Form.Label>Harga Satuan</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>Rp</InputGroup.Text>
                    <Form.Control placeholder="0" {...register("harga")} />
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <Dflex style={{ gap: "0.5333rem", alignItems: "end" }}>
                    <div>
                      <FormInputControl
                        register={register("stokAwal")}
                        placeholder="0"
                        labelName="Stok Awal"
                        required
                        message={errors?.stokAwal?.message}
                        isInvalid={errors?.stokAwal as boolean | undefined}
                      />
                    </div>
                    <SelectStatic
                      placeholder="units"
                      fieldName="units"
                      control={control}
                      options={UNITS_OPTIONS}
                      required
                    />
                  </Dflex>
                </Col>
                <Col md={12}>
                  <CardStyledStatus>
                    <Card.Body>
                      <DflexJustifyBetween style={{ alignItems: "center", gap: "3.3333rem" }}>
                        <DflexColumn>
                          <P14Medium style={{ lineHeight: "1.33333rem", fontWeight: "500" }}>Status Produk</P14Medium>
                          <P14Medium
                            style={{
                              lineHeight: "1.2rem",
                              fontWeight: "400",
                              color: "var(--neutral-600)",
                              fontSize: "0.8rem",
                            }}
                          >
                            Sistem akan menandai produk sebagai “Menipis” secara otomatis jika stoknya mendekati habis.
                          </P14Medium>
                        </DflexColumn>
                        <FormInputSwitch
                          title={"Nonaktif"}
                          register={register("status")}
                          checked={watch("status") === "aktif" ? true : false}
                        />
                      </DflexJustifyBetween>
                    </Card.Body>
                  </CardStyledStatus>
                </Col>
                {watch("status") && (
                  <Col md={12}>
                    <Form.Label>
                      Produk Menipis <span className="text-danger">*</span>
                    </Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control placeholder="0" {...register("stokMenipis")} />
                      <InputGroup.Text>{watch("units")}</InputGroup.Text>
                    </InputGroup>
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
                <Button type="submit" variant="primary" className="text-white">
                  <Dflex style={{ gap: "0.5333rem" }}>
                    {loading ? "Loading" : "Tambah"}
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <RenderIcons iconName={"check"} iconSize={"18px"} />
                    )}
                  </Dflex>
                </Button>
              </Dflex>
            </DflexJustifyBetween>
          </Col>
        </Modal.Footer>
      </Form>
    </FormData>
  );
}

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
