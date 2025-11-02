import styled from "styled-components";

interface Props {
  iconName: any;
  iconStyle?: any;
  iconSize?: any;
  iconColor?: any;
  size?: any;
}

export default function RenderIcons({ iconName, iconStyle, iconSize, iconColor, size }: Props) {
  return (
    <WrapperIcon size={size}>
      <i
        className={`${iconStyle ? `ph-${iconStyle}` : "ph"} ph-${iconName}`}
        style={{ fontSize: iconSize, color: iconColor }}
      ></i>
    </WrapperIcon>
  );
}

const WrapperIcon = styled.div<{ size?: string }>`
  justify-content: center;
  align-items: center;

  span,
  div,
  svg,
  i,
  img {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({ size }) => size || "1.5rem"};
    min-width: ${({ size }) => size || "1.5rem"};
    min-height: ${({ size }) => size || "1.5rem"};
    max-width: ${({ size }) => size || "1.5rem"};
    max-height: ${({ size }) => size || "1.5rem"};
  }
`;
