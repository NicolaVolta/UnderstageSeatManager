import { ReactNode } from 'react';
import { ControlType, ItemControlType } from "../../Support/ItemControls";
import ColorPicker from 'rsuite-color-picker';
import { Container, Divider, FlexboxGrid, InputNumber, Slider, Toggle } from "rsuite";
import './styling/EditItemControlsStyle.css';

interface ControlElementProps{
    currentOption : ItemControlType
}

export function ControlElement( {currentOption } : ControlElementProps) {

    const getControlsLayout = () : ReactNode => {
        switch(currentOption.type){
            case ControlType.CHECKBOX:
                return <Toggle size="lg" checkedChildren="Open" unCheckedChildren="Close" />
            case ControlType.COLOR_PICKER:
                return <ColorPicker defaultValue="#000000"/>;
            case ControlType.NUMBER_PICKER:
                return <InputNumber size="lg"/>
            case ControlType.NUMBER_RANGE:
                return (
                    <FlexboxGrid justify="space-around" style={{alignItems: 'center'}}>
                        <FlexboxGrid.Item colspan={16}><Slider className='slider' /></FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={5}><InputNumber size="lg"/></FlexboxGrid.Item>
                    </FlexboxGrid>
                    
                );
        }
    }

    return (
        <Container className="singleControlContainer">
            <p className="elementText">{currentOption.description}</p>
            <Divider style={{marginTop:0, marginBottom:0}}/>
            <div className="elementValue">
                {getControlsLayout()}
            </div>
        </Container >
    );
}