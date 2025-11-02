import ProductDetailFeatures from "@/features/Product/ProductDetailFeatures";
import React from "react";

export default function DetailProduct({ params }: any) {
  const { id } = params;

  return (
    <>
      <ProductDetailFeatures params={id} />
    </>
  );
}
