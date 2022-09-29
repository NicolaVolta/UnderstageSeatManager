import { Dropdown } from "rsuite";
import './styling/ContextMenuStyle.css';
import { BsFillTrashFill } from 'react-icons/bs';
import { FaPaste, FaCopy } from 'react-icons/fa'
import { PositionType } from "../../Support/types/GenericTypes";

interface ContextMenuProps{
    position : PositionType
}

export function ContextMenu({ position } : ContextMenuProps){
    return (
        <Dropdown.Menu className="contextMenu" style={{top:position.y, left:position.x}}>
            <Dropdown.Item icon={<FaCopy color="#2196f3"/>}>
                <div className="description">Copia</div>
            </Dropdown.Item>
            <Dropdown.Item icon={<FaPaste color="#2196f3"/>}>
                <div className="description">Incolla</div>
            </Dropdown.Item>
            <Dropdown.Item divider/>
            <Dropdown.Item icon={<BsFillTrashFill color="#f44336"/>}>
                <div className="description">Elimina</div>
            </Dropdown.Item>
        </Dropdown.Menu>
    );
}