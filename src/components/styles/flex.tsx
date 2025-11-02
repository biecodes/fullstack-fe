import styled from "styled-components";

export const Dflex = styled.div`
  display: flex;
`;

export const DflexAlignCenter = styled(Dflex)`
  align-items: center;
  gap: 1rem;
`;

export const DflexJustifyBetween = styled(Dflex)`
  justify-content: space-between;
`;

export const DflexColumn = styled(Dflex)`
  flex-direction: column;
`;
