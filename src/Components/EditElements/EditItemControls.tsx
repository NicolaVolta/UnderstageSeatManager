import { useEffect, useState } from 'react';
import { Container } from 'rsuite';
import { BaseItem } from '../../FabricComponents/BaseItem';
import { ItemControlsType } from '../../Support/ItemControls';
import { Utils } from '../../Utils/Utils';
import './styling/EditItemControlsStyle.css';
import { ControlElement } from './ControlElement';

interface ToolMenuProps{
    selectedItem : BaseItem | undefined
}

export function EditItemControls ({ selectedItem } : ToolMenuProps) {
    const [itemControls, setItemControls] = useState<ItemControlsType>();

    useEffect(() => {
        setItemControls(selectedItem?.elementProperty);
    }, [selectedItem])

    if(Utils.isNullOrUndefined(selectedItem)) return (<Container className='positionAbslute'>Niente selezionato</Container>);
    if(Utils.isNullOrUndefined(itemControls) || itemControls?.length===0) return (<Container className='positionAbslute'>Nessuna modifica possibile</Container>);

    /*itemControls!.map((currentOption) => {
        let pr=currentOption.property;
        console.log(selectedItem?.getElement.(pr));
        return "";
    })*/

    return (
        <Container className='positionAbslute parentContainer'>
            <Container className='controlsContainer'>
                {itemControls!.map((currentOption, index) => <ControlElement currentOption={currentOption} key={index}/>)}
            </Container>
        </Container>
    );
}

//currentValue={selectedItem!.getElement[currentOption.property]}