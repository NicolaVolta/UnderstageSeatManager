import { BsBoundingBoxCircles, BsSquare, BsCircle, BsTextareaT } from 'react-icons/bs';
import { MdEventSeat } from 'react-icons/md';
import { FiMove } from 'react-icons/fi'
import { FaShapes, FaRestroom } from 'react-icons/fa'
import { GiArrowCursor } from 'react-icons/gi'
import { TypeAttributes } from 'rsuite/esm/@types/common';
import { ToolSelectionEnum } from './ToolSelectionEnum';
import { SeatColumnIcon, SeatDiagonalIcon, SeatGroupIcon, SeatRowIcon } from '../Utils/Icons';

interface ToolType {
    action : ToolSelectionEnum,
    icon : JSX.Element,
    appearance : TypeAttributes.Appearance,
    children : Array<ToolType>
}

export const TOOLS : Array<ToolType> =[
    {
        action:ToolSelectionEnum.SELECTION,
        icon:<GiArrowCursor size="1.5em"/>,
        appearance:'primary',
        children:[]
    },
    {
        action:ToolSelectionEnum.MOVE_INSIDE_CANVAS,
        icon:<FiMove size="1.5em"/>,
        appearance:'primary',
        children:[]
    },
    {
        action:ToolSelectionEnum.CREATE_AREA,
        icon:<BsBoundingBoxCircles/>,
        appearance:'primary',
        children:[]
    },
    {
        action:ToolSelectionEnum.NO_SELECTION,
        icon:<MdEventSeat size="1.5em"/>,
        appearance:'primary',
        children:[
            {
                action:ToolSelectionEnum.CREATE_SEAT_ROW,
                icon:<SeatRowIcon/>,
                appearance:'primary',
                children:[]
            },
            {
                action:ToolSelectionEnum.CREATE_SEAT_COLUMN,
                icon:<SeatColumnIcon/>,
                appearance:'primary',
                children:[]
            },
            {
                action:ToolSelectionEnum.CREATE_SEAT_DIAGONAL,
                icon:<SeatDiagonalIcon/>,
                appearance:'primary',
                children:[]
            },
            {
                action:ToolSelectionEnum.CREATE_SEAT_GROUP,
                icon:<SeatGroupIcon/>,
                appearance:'primary',
                children:[]
            }
        ]
    },
    {
        action:ToolSelectionEnum.NO_SELECTION,
        icon:<FaShapes/>,
        appearance:'primary',
        children:[
            {
                action:ToolSelectionEnum.ADD_SQUARE,
                icon:<BsSquare size="1.5em"/>,
                appearance:'primary',
                children:[]
            },
            {
                action:ToolSelectionEnum.ADD_CIRCLE,
                icon:<BsCircle size="1.5em"/>,
                appearance:'primary',
                children:[]
            },
            {
                action:ToolSelectionEnum.ADD_TEXT,
                icon:<BsTextareaT size="1.5em"/>,
                appearance:'primary',
                children:[]
            }
        ]
    },
    {
        action:ToolSelectionEnum.NO_SELECTION,
        icon:<FaRestroom/>,
        appearance:'primary',
        children:[
            {
                action:ToolSelectionEnum.NO_SELECTION,
                icon:<FaRestroom size="1.5em"/>,
                appearance:'primary',
                children:[]
            },
            {
                action:ToolSelectionEnum.NO_SELECTION,
                icon:<FaRestroom size="1.5em"/>,
                appearance:'primary',
                children:[]
            },
            {
                action:ToolSelectionEnum.NO_SELECTION,
                icon:<BsTextareaT size="1.5em"/>,
                appearance:'primary',
                children:[]
            }
        ]
    }
]