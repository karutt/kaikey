import styled from 'styled-components'
import {typography, flexbox, space, layout, border, position } from 'styled-system'

export const Text = styled.div`
  font-family: 'Hiragino Sans', sans-serif, serif;
  ${typography};
  ${flexbox};
  ${space};
  ${layout};
  ${border};
  ${position};
  ${(props) => props.color && `color: ${props.theme.colors[props.color]}`};
`
