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
import { CATEGORY_OPTIONS, ROLE_OPTIONS, UNITS_OPTIONS } from "@/config/options.config";
import { P14Medium } from "@/styles/text";
import FormInputSwitch from "@/components/input/FormInputSwitch";
import RenderIcons from "@/components/icons/RenderIcons";
import { IProductInterface } from "@/interface/product.interface";
import { IUSERInterface } from "@/interface/user.interface";

interface IProps {
  onClose?: any;
}

const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

export default function UserListForm({ onClose }: IProps) {
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
  } = useForm<IUSERInterface>({
    resolver: yupResolver(schema) as unknown as Resolver<IUSERInterface>,
    mode: "onChange",
  });

  const watchId = watch("_id");
  const watchImage = watch("image") as unknown as string[];

  const onSubmit: SubmitHandler<IUSERInterface> = async (data) => {
    const paramsSubmit: IUSERInterface = {
      ...data,
      status: data.status === true ? "aktif" : "nonaktif",
    };

    setDataParams(paramsSubmit);
    dispatch(setIsEditModal(false));
  };

  return (
    <FormData
      reset={reset}
      path="/apps/api/v1/users"
      dataParams={dataParams}
      setLoading={setLoading}
      setRespData={setRespData}
      ids={watchId}
    >
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Dflex style={{ gap: "1.33333rem" }}>
            <LeftContent>
              <FormUpload isMulti={false} watchImage={watchImage} control={control} fieldName="image" />
            </LeftContent>
            <RightContent>
              <Row className="g-3">
                <Col md={6}>
                  <FormInputControl
                    register={register("username")}
                    placeholder="Masukkan name user"
                    labelName="Nama User"
                    required
                    message={errors?.username?.message}
                    isInvalid={errors?.username as boolean | undefined}
                  />
                </Col>
                <Col md={6}>
                  <SelectStatic fieldName="role" labelName="Role" control={control} options={ROLE_OPTIONS} required />
                </Col>
                <Col md={12}>
                  <FormInputControl
                    register={register("email")}
                    placeholder="Masukkan email"
                    labelName="Email"
                    message={errors?.email?.message}
                    isInvalid={errors?.email as boolean | undefined}
                    required
                  />
                </Col>
                <Col md={12}>
                  <FormInputControl
                    register={register("number")}
                    placeholder="Masukkan No Telephone"
                    labelName="No Telephone"
                    message={errors?.number?.message}
                    isInvalid={errors?.number as boolean | undefined}
                    required
                  />
                </Col>
                <Col md={12}>
                  <FormInputControl
                    register={register("password")}
                    placeholder="Masukkan Password"
                    labelName="Password"
                    message={errors?.password?.message}
                    isInvalid={errors?.password as boolean | undefined}
                    required
                  />
                </Col>

                <Col md={12}>
                  <CardStyledStatus>
                    <Card.Body>
                      <DflexJustifyBetween style={{ alignItems: "center", gap: "3.3333rem" }}>
                        <DflexColumn>
                          <P14Medium style={{ lineHeight: "1.33333rem", fontWeight: "500" }}>Status User</P14Medium>
                          <P14Medium
                            style={{
                              lineHeight: "1.2rem",
                              fontWeight: "400",
                              color: "var(--neutral-600)",
                              fontSize: "0.8rem",
                            }}
                          >
                            Jika user telah lama tidak aktif anda bisa menonaktifkan status user secara manual
                          </P14Medium>
                        </DflexColumn>
                        <FormInputSwitch title={"Nonaktif"} register={register("status")} />
                      </DflexJustifyBetween>
                    </Card.Body>
                  </CardStyledStatus>
                </Col>
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
