import { Popover, Whisper, ButtonGroup, IconButton } from 'rsuite';
import { ToolSelectionEnum } from '../../Support/ToolSelectionEnum';
import './styling/ToolMenuStyle.css';
import { TOOLS } from '../../Support/Tools';

interface ToolMenuProps{
    handleSelection : (selectedTool : ToolSelectionEnum) => void,
    selectedTool : ToolSelectionEnum
}

export function ToolMenu({ handleSelection, selectedTool } : ToolMenuProps) {

    function handleToolSelection(id : ToolSelectionEnum) : void{
        handleSelection(id);
    }

    return (
        <div className='toolContainer'>
            <ButtonGroup vertical size="lg" className="buttonGroup">
                {TOOLS.map((currentTool,index) => {
                    if(currentTool.children.length===0){
                        return <IconButton appearance={currentTool.appearance} 
                                color={currentTool.action===selectedTool ? "yellow" : "blue"}
                                size="lg" 
                                icon={currentTool.icon} 
                                onClick={() => handleToolSelection(currentTool.action)}
                                key={index}/>
                    }
                    else{
                        return (
                            <Whisper
                                trigger="click" 
                                placement="right"
                                speaker={
                                    <Popover>
                                        <ButtonGroup vertical size="lg">
                                            {currentTool.children.map((subTool, index) => {
                                                return <IconButton appearance={subTool.appearance} 
                                                size="lg" 
                                                color={subTool.action===selectedTool ? "yellow" : "blue"}
                                                icon={subTool.icon} 
                                                onClick={() => handleToolSelection(subTool.action)}
                                                key={index}/>
                                            })}
                                        </ButtonGroup>
                                    </Popover>
                                }
                                key={index}
                            >
                                <IconButton appearance={currentTool.appearance} size="lg" icon={currentTool.icon}
                                color={
                                    currentTool.children.filter((subTool) => {
                                        return subTool.action===selectedTool;
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
