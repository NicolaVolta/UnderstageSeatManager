import { Popover, Whisper, ButtonGroup, IconButton, Container, Stack } from 'rsuite';
import { ToolSelectionEnum } from '../../Support/ToolSelectionEnum';
import './styling/ToolMenuStyle.css';
import { TOOLS, ToolType } from '../../Support/Tools';
import { ReactNode } from 'react';

interface ToolMenuProps{
    handleSelection : (selectedTool : ToolType) => void,
    selectedTool : ToolType
}

export function ToolMenu({ handleSelection, selectedTool } : ToolMenuProps) {

    const handleToolSelection = (tool : ToolType) : void => {
        handleSelection(tool);
    }

    const getSubButton = (subTools : Array<ToolType>) : ReactNode => {
        let returnElement : Array<ReactNode> = [];
        const ELEMENT_PER_ROW=4;

        for(let i=0; i<subTools.length; i+=ELEMENT_PER_ROW){
            let chunk=subTools.slice(i, i+ELEMENT_PER_ROW);

            returnElement.push(
                <ButtonGroup vertical size="lg" key={i}>
                    {chunk.map((el, index)=>{
                        return <IconButton appearance={el.appearance} 
                        size="lg" 
                        color={el.id===selectedTool.id ? "yellow" : "blue"}
                        icon={el.icon} 
                        onClick={() => handleToolSelection(el)}
                        key={index}/>
                    })}
                </ButtonGroup>
            );
        }

        return returnElement;
    }

    return (
        <div className='toolContainer'>
            <ButtonGroup vertical size="lg" className="buttonGroup">
                {TOOLS.map((currentTool,index) => {
                    if(currentTool.children.length===0){
                        return <IconButton appearance={currentTool.appearance} 
                                color={currentTool.id===selectedTool.id ? "yellow" : "blue"}
                                size="lg" 
                                icon={currentTool.icon} 
                                onClick={() => handleToolSelection(currentTool)}
                                key={index}/>
                    }
                    else{
                        return (
                            <Whisper
                                trigger="click" 
                                placement="right"
                                speaker={
                                    <Popover>
                                        <Container>
                                            <Stack>
                                                {getSubButton(currentTool.children)} 
                                            </Stack>
                                        </Container>
                                    </Popover>
                                }
                                key={index}
                            >
                                <IconButton appearance={currentTool.appearance} size="lg" icon={currentTool.icon}
                                color={
                                    currentTool.children.filter((subTool) => {
                                        return subTool.id===selectedTool.id;
                                    }).length!==0 ? "yellow" : "blue"
                                }/>
                            </Whisper>
                        );
                    }
                })}
            </ButtonGroup>
        </div>
    );
}
