import styled from 'styled-components'
import { flexbox, space, layout, border, position } from 'styled-system'

export const Box = styled.div`
  ${flexbox};
  ${space};
  ${layout};
  ${border};
  ${position};
  ${(props) => props.bg && `background-color: ${props.theme.colors[props.bg]}`};
`
