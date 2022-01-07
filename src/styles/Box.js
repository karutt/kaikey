import styled from 'styled-components'
import { flexbox, space, layout, border, position, background, typography, shadow } from 'styled-system'

export const Box = styled.div`
  ${flexbox};
  ${space};
  ${layout};
  ${border};
  ${position};
  ${background};
  ${typography};
  ${shadow};
  ${(props) => props.color && `color: ${props.theme.colors[props.color]}`};
  ${(props) => props.bg && `background-color: ${props.theme.colors[props.bg]}`};
  ${(props) => props.line && `border: solid 0.5px ${props.theme.colors["grayc6"]}`};
  ${(props) => props.lineBottom && `border-bottom: solid 0.5px ${props.theme.colors["grayc6"]}`};
`
