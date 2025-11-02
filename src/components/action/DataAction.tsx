import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
import RenderIcons from "../icons/RenderIcons";
import { Dflex } from "@/components/styles/flex";

interface Props {
  handleDelete?: any;
  handleEdit?: any;
}

export default function DataAction({ handleDelete, handleEdit }: Props) {
  return (
    <Dflex style={{ justifyContent: "center" }}>
      <DropdownStyled>
        <Dropdown.Toggle variant="outline" id="dropdown-basic">
          <RenderIcons iconName="dots-three" iconStyle="bold" iconSize="20px" iconColor="var(--black-700)" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {handleDelete && (
            <Dropdown.Item onClick={handleDelete} className="text-danger">
              <Dflex className="gap-1" style={{ alignItems: "center" }}>
                <RenderIcons iconName="trash" iconStyle="duotone" iconSize="18px" /> Delete
              </Dflex>
            </Dropdown.Item>
          )}
          {handleEdit && (
            <Dropdown.Item onClick={handleEdit}>
              <Dflex className="gap-1" style={{ alignItems: "center" }}>
                <RenderIcons iconName="pencil-simple" iconStyle="duotone" iconSize="18px" /> Edit
              </Dflex>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </DropdownStyled>
    </Dflex>
  );
}

const DropdownStyled = styled(Dropdown)`
  .dropdown-toggle::after {
    display: none;
  }

  .dropdown-toggle {
    padding: 0 !important;
  }

  .btn:hover {
    color: var(--primary);
    border: none !important;
    background: transparent;
    border-radius: 0;
  }

  .btn.active,
  .btn.show {
    border: none;
  }
`;
