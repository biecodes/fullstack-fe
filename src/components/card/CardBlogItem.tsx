import DataAction from "@/components/action/DataAction";
import { DflexJustifyBetween } from "@/components/styles/flex";
import { Paragraph, ParagraphSub } from "@/styles/text";
import React from "react";
import { Button, Card } from "react-bootstrap";
import styled from "styled-components";

export default function CardBlogItem({ item, onEdit, onDelete }: any) {
  return (
    <>
      <CardStyled>
        <Card.Img variant="top" src={item?.image} />
        <Card.Body>
          <Card.Title>
            <Paragraph>{item?.title}</Paragraph>
          </Card.Title>
          <Card.Text>
            <ParagraphSub>{item?.content}</ParagraphSub>
          </Card.Text>
          <DflexJustifyBetween>
            <Button size="sm" variant="primary">
              Read More
            </Button>
            <DataAction handleDelete={() => onDelete(item?._id)} handleEdit={() => onEdit(item?._id)} />
          </DflexJustifyBetween>
        </Card.Body>
      </CardStyled>
    </>
  );
}

const CardStyled = styled(Card)`
  border: none;
  .card-body {
    border: none;
  }
  border-radius: 0.5333rem;
`;
