import styled from 'styled-components'
import {
  space,
  color,
  typography,
  layout,
  flexbox,
  background,
  border,
  position,
  shadow,
} from "styled-system";
import { Link } from "react-router-dom";

export const Clickable = styled(Link)`
  ${space};
  ${color};
  ${typography};
  ${layout};
  ${flexbox};
  ${background};
  ${border};
  ${position};
  ${shadow};
  text-decoration: none;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
