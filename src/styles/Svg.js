import React from 'react'
import styled from 'styled-components'
import { flexbox, space, layout, border, position } from 'styled-system'
import { ReactComponent as logo } from '../assets/img/logo.svg'
import { ReactComponent as reorder } from '../assets/img/reorder.svg'
import { ReactComponent as reset_stage } from '../assets/img/reset_stage.svg'
import { ReactComponent as delete_item } from '../assets/img/delete_item.svg'
import { ReactComponent as delete_num } from '../assets/img/delete_num.svg'
import { ReactComponent as close_modal } from '../assets/img/close_modal.svg'
import { ReactComponent as delete_count } from '../assets/img/delete_count.svg'
import { ReactComponent as delete_history } from '../assets/img/delete_history.svg'
import { ReactComponent as edit_stroke2 } from '../assets/img/edit_stroke2.svg'
import { ReactComponent as edit_stroke1 } from '../assets/img/edit_stroke1.svg'
import { ReactComponent as add_item } from '../assets/img/add_item.svg'
import { ReactComponent as download } from '../assets/img/download.svg'
import { ReactComponent as Export } from '../assets/img/export.svg'
import { ReactComponent as left_arrow } from '../assets/img/left_arrow.svg'


const Svgs = {
    logo, reorder, reset_stage, delete_item,
    delete_num, close_modal, delete_count, delete_history,
    edit_stroke2, edit_stroke1, add_item, download, Export, left_arrow
}

const SvgBase = styled.svg`
${flexbox};
    ${space};
    ${layout};
    ${border};
    ${position};
    ${(props) => props.fill && `fill: ${props.theme.colors[props.fill]}`};
    ${(props) => props.stroke && `stroke: ${props.theme.colors[props.stroke]}`};
    cursor: pointer;
`

export function Icon({ name, ...props }) {
    return <SvgBase as={Svgs[name]} {...props} />
}
