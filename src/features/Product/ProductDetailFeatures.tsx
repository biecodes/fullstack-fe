"use client";

import { CardDiskon, Rounded } from "@/components/card/CardProductList";
import HeaderDashboard from "@/components/header/HeaderDashboard";
import RenderIcons from "@/components/icons/RenderIcons";
import StarIcons from "@/components/icons/StarIcons";
import VectorIcons from "@/components/icons/VectorIcons";
import { Dflex, DflexColumn } from "@/components/styles/flex";
import QuantityControl from "@/features/Product/QuantityControl";
import { formatRupiah } from "@/helpers/config.helper";
import { P14Medium } from "@/styles/text";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import styled from "styled-components";

export default function ProductDetailFeatures({ params }: { params: any }) {
  const [loading, setLoading] = useState(false);
  const [respData, setRespData] = useState<any>();

  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (respData?.image) {
      if (Array.isArray(respData.image)) {
        setSelectedImage(respData.image[0]);
      } else if (typeof respData.image === "string") {
        setSelectedImage(respData.image);
      }
    }
  }, [respData]);

  const mainImage = selectedImage || "/assets/meja-1.png";

  const images = Array.isArray(respData?.image) ? respData.image : respData?.image ? [respData.image] : [];

  const getOneIdProduct = async (id: string | number) => {
    try {
      const response = await axios.get(`/apps/api/v1/product/get-one/${id}`);
      setRespData(response.data.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (!params) return;
    getOneIdProduct(params);
  }, [params]);

  return (
    <>
      <HeaderDashboard />
      <div className="container" style={{ marginTop: "2.66667rem" }}>
        <Row className="g-4">
          <Col md={4}>
            <Card style={{ border: "none" }}>
              <Image
                alt="main-image"
                src={mainImage}
                width={"100%"}
                style={{
                  borderRadius: "0.8rem",
                  objectFit: "cover",
                  maxHeight: "400px",
                }}
              />
            </Card>

            <GridContent>
              {images.length > 0 ? (
                images.map((img: string, index: number) => (
                  <Card
                    key={index}
                    style={{
                      border: "none",
                      cursor: "pointer",
                      outline: img === selectedImage ? "2px solid var(--primary)" : "none",
                    }}
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      alt={`thumbnail-${index}`}
                      src={img}
                      width={"100%"}
                      style={{
                        borderRadius: "0.5rem",
                        objectFit: "cover",
                        height: "80px",
                        opacity: img === selectedImage ? 0.7 : 1,
                      }}
                    />
                  </Card>
                ))
              ) : (
                <>
                  {[...Array(4)].map((_, i) => (
                    <Card key={i} style={{ border: "none" }}>
                      <Image
                        alt={`placeholder-${i}`}
                        src={"/assets/meja-1.png"}
                        width={"100%"}
                        style={{ borderRadius: "0.5rem", objectFit: "cover", height: "80px" }}
                      />
                    </Card>
                  ))}
                </>
              )}
            </GridContent>
          </Col>
          <Col md={8}>
            <Card style={{ borderRadius: "0.8rem", border: "1px solid var(--neutral-200)", padding: "1.6rem" }}>
              <P14Medium style={{ fontWeight: "500", fontSize: "1.6rem", lineHeight: "150%", marginBottom: "0.8rem" }}>
                {respData?.nama}
              </P14Medium>
              <Dflex className="align-items-center" style={{ gap: "0.53333rem" }}>
                <Dflex style={{ gap: "0.26667rem" }} className="align-items-center">
                  <P14Medium style={{ fontWeight: "400" }}>4.9</P14Medium>
                  <Dflex style={{ gap: "0.26667rem" }}>
                    <StarIcons />
                    <StarIcons />
                    <StarIcons />
                    <StarIcons />
                    <StarIcons />
                  </Dflex>
                </Dflex>
                <Rounded />
                <P14Medium style={{ fontWeight: "400" }}>121 Terjual</P14Medium>
              </Dflex>
              <Dflex
                className="align-items-center"
                style={{ gap: "0.53333rem", marginTop: "1.33333rem", marginBottom: "2.66667rem" }}
              >
                <P14Medium style={{ fontWeight: "600", fontSize: "2.13333rem", color: "var(--primary)" }}>
                  {formatRupiah(respData?.harga)}
                </P14Medium>
                <Dflex className="align-items-center">
                  <CardDiskon>-12%</CardDiskon>
                  <VectorIcons />
                </Dflex>
              </Dflex>
              <Dflex style={{ marginBottom: "2.66667rem" }}>
                <P14Medium style={{ width: "10rem", fontSize: "1.06667rem", fontWeight: "400" }}>Pengiriman</P14Medium>
                <DflexColumn style={{ gap: "0.5333rem" }}>
                  <P14Medium className="m-0" style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                    Garansi Tiba: 4 - 6 September
                  </P14Medium>
                  <P14Medium
                    className="m-0"
                    style={{ fontSize: "0.933rem", fontWeight: "400", color: "var(--neutral-600)" }}
                  >
                    Dapatkan Voucher s/d Rp10.000 jika pesanan terlambat.
                  </P14Medium>
                </DflexColumn>
              </Dflex>
              <Dflex style={{ marginBottom: "2.66667rem" }}>
                <P14Medium style={{ width: "10rem", fontSize: "1.06667rem", fontWeight: "400" }}>Pengiriman</P14Medium>
                <Dflex style={{ alignItems: "center", gap: "0.8rem" }}>
                  <QuantityControl initialQty={1} onChange={(qty: any) => console.log("Jumlah sekarang:", qty)} />
                  <BadgeItem>Tersedia</BadgeItem>
                </Dflex>
              </Dflex>
              <Button variant="primary text-white">Beli Produk</Button>
            </Card>
          </Col>
          <Col md={12}>
            <TitleDescription>Description</TitleDescription>
          </Col>
          <Col md={12}>
            <Card style={{ border: "none" }}>
              <Card.Body>
                <P14Medium style={{ fontWeight: "400", fontSize: "1.06667rem", lineHeight: "150%" }}>
                  {respData?.deskripsi}
                </P14Medium>
                {/* <P14Medium style={{ fontWeight: "400", fontSize: "1.06667rem", lineHeight: "150%" }}>
                  Hadirkan nuansa mewah dan elegan di ruang makan Anda dengan Meja Makan Kayu Jati – Ukuran Besar 100m².
                  Terbuat dari kayu jati pilihan yang terkenal kokoh, tahan lama, dan memiliki serat alami yang indah,
                  meja ini tidak hanya berfungsi sebagai tempat makan tetapi juga sebagai investasi furnitur jangka
                  panjang.
                </P14Medium>
                <br />
                <P14Medium style={{ fontWeight: "400", fontSize: "1.06667rem", lineHeight: "150%" }}>
                  Dengan ukuran ekstra besar 100m², meja ini sangat ideal untuk ruang makan keluarga besar, acara
                  gathering, atau restoran yang ingin memberikan kesan eksklusif kepada tamunya. Permukaan meja yang
                  luas memungkinkan penataan hidangan lebih leluasa, sementara finishing halusnya memberikan sentuhan
                  elegan sekaligus mudah dibersihkan.
                </P14Medium>
                <br />
                <P14Medium style={{ fontWeight: "400", fontSize: "1.06667rem", lineHeight: "150%" }}>
                  Spesifikasi Produk:
                </P14Medium>
                <ul>
                  <li>Material: 100% Kayu Jati Solid</li>
                  <li>Ukuran: 100m² (custom ukuran dapat dipesan)</li>
                  <li>Warna: Natural kayu jati dengan finishing glossy/matte</li>
                  <li>Kapasitas: Hingga 12–16 orang</li>
                  <li>Kelebihan: Tahan rayap, kuat, dan berkarakter alami</li>
                </ul>
                <P14Medium style={{ fontWeight: "400", fontSize: "1.06667rem", lineHeight: "150%" }}>
                  Kelebihan Produk:
                </P14Medium>
                <DflexColumn>
                  <P14Medium style={{ fontWeight: "400", fontSize: "1.06667rem", lineHeight: "150%" }}>
                    ✅ Material premium, awet hingga puluhan tahun
                  </P14Medium>
                  <P14Medium style={{ fontWeight: "400", fontSize: "1.06667rem", lineHeight: "150%" }}>
                    ✅ Desain elegan dan mewah
                  </P14Medium>
                  <P14Medium style={{ fontWeight: "400", fontSize: "1.06667rem", lineHeight: "150%" }}>
                    ✅ Cocok untuk rumah, villa, atau restoran besar
                  </P14Medium>
                  <P14Medium style={{ fontWeight: "400", fontSize: "1.06667rem", lineHeight: "150%" }}>
                    ✅ Permukaan meja luas dan mudah dibersihkan
                  </P14Medium>
                </DflexColumn> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

const TitleDescription = styled.div`
  display: flex;
  padding: 0.53333rem 1.06667rem;
  gap: 0.66667rem;
  border-radius: 0.8rem;
  background: var(--neutral-100);
  font-size: 1.33333rem;
  font-weight: 600;
  line-height: 150%; /* 2rem */
  color: var(--neutral-900);
`;

const GridContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
  align-items: start;
  margin-top: 1.333rem;

  .card {
    border-radius: 0.8rem;
    overflow: hidden;
    border: none;

    img {
      border-radius: 0.8rem;
      height: 5.73333rem;
    }
  }
`;

const BadgeItem = styled.div`
  display: flex;
  padding: 0.26667rem 0.53333rem;
  justify-content: center;
  align-items: center;
  gap: 0.66667rem;
  border-radius: 0.53333rem;
  background: #ebf3eb;
  color: #499949;
`;
