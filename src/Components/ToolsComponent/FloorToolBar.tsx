import { IconButton, Container, Stack, FlexboxGrid, Button, Modal } from "rsuite";
import './styling/FloorToolBarStyle.css';
import { BsFillTrashFill, BsStack } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState, useEffect } from 'react';

interface FloorToolBarProps {
    totalFloors : number,
    handleFloorAddRemove : (isAdd : boolean) => void,
    handleFloorSelection : (newFloor : number) => void,
}

export function FloorToolBar({ totalFloors, handleFloorAddRemove, handleFloorSelection } : FloorToolBarProps){
    const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
    const [currentFloor, setCurrentFloor] = useState<number>(0);
    const [totalFloorNumber, setTotalFloorNumber] = useState<number>(totalFloors);

    const handleFloorAddRemoveButtons = (isAdd : boolean) => {
        if(showConfirmDelete) setShowConfirmDelete(false);

        let newFloorNumber=totalFloorNumber===1 && !isAdd ? 1 : totalFloorNumber + (isAdd ? 1 : -1);
        let newCurrentFloor=totalFloorNumber===1 || currentFloor===0 ? 0 : currentFloor-1;

        handleFloorAddRemove(isAdd);
        handleFloorSelectionButton(newCurrentFloor);

        setTotalFloorNumber(newFloorNumber);
        setCurrentFloor(newCurrentFloor);         
    }

    const handleFloorSelectionButton = (index : number) => {
        setCurrentFloor(index);
        handleFloorSelection(index);
    }

    return (
        <>
            <Container className="floorToolBar">
                <FlexboxGrid justify="space-between" align="bottom">
                    <FlexboxGrid.Item>
                        <Stack direction="column-reverse" spacing={10} className="content">
                            <BsStack size="2em"/>
                            <Stack direction="column-reverse" spacing={1} className="floorContainer">
                                {[...Array(totalFloorNumber)].map((el, index)=> {
                                    return <Button key={index} 
                                    appearance="ghost" 
                                    color={currentFloor===index ? "yellow" : "blue"}
                                    className="floorButton"
                                    onClick={() => handleFloorSelectionButton(index)}>{index+1}</Button>
                                })}
                            </Stack>
                        </Stack>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <Stack direction="column-reverse" spacing={10} className="buttons">
                            <IconButton icon={<BsFillTrashFill size="1.3em"/>} className="singleButton" appearance="primary" color="red" circle onClick={() => setShowConfirmDelete(true)}/>
                            <IconButton icon={<AiOutlinePlus size="1.3em"/>} className="singleButton" appearance="primary" circle onClick={() => handleFloorAddRemoveButtons(true)}/>
                        </Stack>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Container>
            <Modal open={showConfirmDelete} onClose={() => setShowConfirmDelete(false)}>
                <Modal.Header>
                    <Modal.Title>Conferma eliminazione</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Sicuro di voler eliminare il piano n° {currentFloor+1}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowConfirmDelete(false)} appearance="subtle">
                        Annulla
                    </Button>
                    <Button onClick={() => handleFloorAddRemoveButtons(false)} appearance="primary" color="red">
                        Cancella
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}