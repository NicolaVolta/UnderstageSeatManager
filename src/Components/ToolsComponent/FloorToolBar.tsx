import { IconButton, Container, Stack, FlexboxGrid, Button } from "rsuite";
import './styling/FloorToolBarStyle.css';
import { BsFillTrashFill, BsStack } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';

export function FloorToolBar(){
    return (
        <Container className="floorToolBar">
            <FlexboxGrid justify="space-between" align="bottom">
                <FlexboxGrid.Item>
                    <Stack direction="column-reverse" spacing={10} className="content">
                        <BsStack size="2em"/>
                        <Stack direction="column-reverse" spacing={1} className="floorContainer">
                            <Button appearance="subtle" color="blue" className="floorButton">1</Button>
                            <Button appearance="subtle" color="blue" className="floorButton">2</Button>
                            <Button appearance="subtle" color="blue" className="floorButton">3</Button>
                        </Stack>
                    </Stack>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                    <Stack direction="column-reverse" spacing={10} className="buttons">
                        <IconButton icon={<BsFillTrashFill size="1.3em"/>} className="singleButton" appearance="primary" color="red" circle/>
                        <IconButton icon={<AiOutlinePlus size="1.3em"/>} className="singleButton" appearance="primary" circle/>
                    </Stack>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Container>
    );
}