import { BsBoundingBoxCircles, BsSquare, BsCircle, BsTextareaT, BsImage } from 'react-icons/bs';
import { MdEventSeat } from 'react-icons/md';
import { FiMove } from 'react-icons/fi'
import { FaShapes } from 'react-icons/fa'
import { GiArrowCursor } from 'react-icons/gi'
import { GrSelect } from 'react-icons/gr'
import { TypeAttributes } from 'rsuite/esm/@types/common';
import { ToolSelectionEnum } from './ToolSelectionEnum';
import { EmergencyExitIcon, EntranceIcon, MouseSelectionIcon, SeatColumnIcon, SeatDiagonalIcon, SeatGroupIcon, SeatRowIcon, StairsDownIcon, StairsIcon, StairsUpIcon, WcDisabledIcon, WcSignIcon } from '../Utils/Icons';
import restroom_image from "./../assets/wcSign.svg";
import restroom_disabled_image from "./../assets/wcDisabled.svg";
import emergency_exit_image from "./../assets/emergencyExit.svg";
import entrance_image from "./../assets/entrance.svg";
import stairs_image from "./../assets/stairs.svg";
import stairs_up_image from "./../assets/stairsUp.svg";
import stairs_down_image from "./../assets/stairsDown.svg";
export interface ToolType {
    id : number,
    action : ToolSelectionEnum,
    icon : JSX.Element,
    appearance : TypeAttributes.Appearance,
    children : Array<ToolType>,
    image? : string
}

export const TOOLS : Array<ToolType> =[
    {
        id:1,
        action:ToolSelectionEnum.SELECTION,
        icon:<GiArrowCursor size="1.5em"/>,
        appearance:'primary',
        children:[]
    },
    {
        id:2,
        action:ToolSelectionEnum.MOVE_INSIDE_CANVAS,
        icon:<FiMove size="1.5em"/>,
        appearance:'primary',
        children:[]
    },
    {
        id:7,
        action:ToolSelectionEnum.SELECTION_DRAG,
        icon:<MouseSelectionIcon/>,
        appearance:'primary',
        children:[]
    },
    {
        id:3,
        action:ToolSelectionEnum.CREATE_AREA,
        icon:<BsBoundingBoxCircles/>,
        appearance:'primary',
        children:[]
    },
    {
        id:4,
        action:ToolSelectionEnum.NO_SELECTION,
        icon:<MdEventSeat size="1.5em"/>,
        appearance:'primary',
        children:[
            {
                id:4.1,
                action:ToolSelectionEnum.CREATE_SEAT_ROW,
                icon:<SeatRowIcon/>,
                appearance:'primary',
                children:[]
            },
            {
                id:4.2,
                action:ToolSelectionEnum.CREATE_SEAT_COLUMN,
                icon:<SeatColumnIcon/>,
                appearance:'primary',
                children:[]
            },
            {
                id:4.3,
                action:ToolSelectionEnum.CREATE_SEAT_DIAGONAL,
                icon:<SeatDiagonalIcon/>,
                appearance:'primary',
                children:[]
            },
            {
                id:4.4,
                action:ToolSelectionEnum.CREATE_SEAT_GROUP,
                icon:<SeatGroupIcon/>,
                appearance:'primary',
                children:[]
            }
        ]
    },
    {
        id:5,
        action:ToolSelectionEnum.NO_SELECTION,
        icon:<FaShapes/>,
        appearance:'primary',
        children:[
            {
                id:5.1,
                action:ToolSelectionEnum.ADD_SQUARE,
                icon:<BsSquare size="1.5em"/>,
                appearance:'primary',
                children:[]
            },
            {
                id:5.2,
                action:ToolSelectionEnum.ADD_CIRCLE,
                icon:<BsCircle size="1.5em"/>,
                appearance:'primary',
                children:[]
            },
            {
                id:5.3,
                action:ToolSelectionEnum.ADD_TEXT,
                icon:<BsTextareaT size="1.5em"/>,
                appearance:'primary',
                children:[]
            }
        ]
    },
    {
        id:6,
        action:ToolSelectionEnum.NO_SELECTION,
        icon:<BsImage/>,
        appearance:'primary',
        children:[
            {
                id:6.1,
                action:ToolSelectionEnum.ADD_ICON,
                icon:<WcSignIcon/>,
                appearance:'primary',
                children:[],
                image:restroom_image
            },
            {
                id:6.2,
                action:ToolSelectionEnum.ADD_ICON,
                icon:<WcDisabledIcon/>,
                appearance:'primary',
                children:[],
                image:restroom_disabled_image
            },
            {
                id:6.3,
                action:ToolSelectionEnum.ADD_ICON,
                icon:<EmergencyExitIcon/>,
                appearance:'primary',
                children:[],
                image:emergency_exit_image
            },
            {
                id:6.4,
                action:ToolSelectionEnum.ADD_ICON,
                icon:<EntranceIcon/>,
                appearance:'primary',
                children:[],
                image:entrance_image
            },
            {
                id:6.5,
                action:ToolSelectionEnum.ADD_ICON,
                icon:<StairsIcon/>,
                appearance:'primary',
                children:[],
                image:stairs_image
            },
            {
                id:6.6,
                action:ToolSelectionEnum.ADD_ICON,
                icon:<StairsUpIcon/>,
                appearance:'primary',
                children:[],
                image:stairs_up_image
            },
            {
                id:6.7,
                action:ToolSelectionEnum.ADD_ICON,
                icon:<StairsDownIcon/>,
                appearance:'primary',
                children:[],
                image:stairs_down_image
            }
        ]
    }
]