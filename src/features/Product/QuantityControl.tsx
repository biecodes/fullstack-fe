"use client";

import RenderIcons from "@/components/icons/RenderIcons";
import { useState } from "react";
import styled from "styled-components";

interface QuantityControlProps {
  initialQty?: number;
  minQty?: number;
  maxQty?: number;
  onChange?: (newQty: number) => void;
}

export default function QuantityControl({ initialQty = 1, minQty = 1, maxQty = 99, onChange }: QuantityControlProps) {
  const [quantity, setQuantity] = useState<number>(initialQty);

  const handleMinus = () => {
    if (quantity > minQty) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onChange?.(newQty);
    }
  };

  const handlePlus = () => {
    if (quantity < maxQty) {
      const newQty = quantity + 1;
      setQuantity(newQty);
      onChange?.(newQty);
    }
  };

  return (
    <CardPlusItem>
      <div className="minus" onClick={handleMinus}>
        <RenderIcons iconName={"minus"} iconSize={"1.33333rem"} />
      </div>
      <div className="items">{quantity}</div>
      <div className="plus" onClick={handlePlus}>
        <RenderIcons iconName={"plus"} iconSize={"1.33333rem"} />
      </div>
    </CardPlusItem>
  );
}

const CardPlusItem = styled.div`
  border-radius: 0.8rem;
  border: 1px solid var(--neutral-200);
  display: flex;
  align-items: center;

  .plus {
    height: 2.66667rem;
    width: 2.66667rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    border-left: 1px solid var(--neutral-200);
  }
  .minus {
    height: 2.66667rem;
    width: 2.66667rem;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-right: 1px solid var(--neutral-200);
  }
  .items {
    height: 2.66667rem;
    width: 2.66667rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
