import React from 'react'
import styled from 'styled-components'
import { flexbox, space, layout, border, position } from 'styled-system'
import { ReactComponent as Logo } from '../assets/img/logo.svg'

const Svgs = { Logo }

const SvgBase = styled.svg`
${flexbox};
    ${space};
    ${layout};
    ${border};
    ${position};
    ${(props) => props.fill && `fill: ${props.theme.colors[props.fill]}`};
    ${(props) => props.stroke && `stroke: ${props.theme.colors[props.stroke]}`};
`

export function Logo_svg({ name, ...props }) {
    return <SvgBase as={Svgs[name]} {...props} />
}
