import { Container, FlexboxGrid, InputNumber, Slider, Stack } from 'rsuite';
import { BsZoomIn, BsZoomOut } from 'react-icons/bs';
import './styling/ZoomBarStyle.css';
import { Utils } from '../../Utils/Utils';
import { MAX_ZOOM_IN, MAX_ZOOM_OUT } from '../../Support/constants';
import { PositionType } from '../../Support/types/GenericTypes';
import { useEffect, useState } from 'react';

interface ZoomBarProps{
    currentZoom : number,
    handleZoomChange : (zoomLevel : number, zoomPoint : PositionType | undefined) => void,
}

export function ZoomBar({ currentZoom, handleZoomChange } : ZoomBarProps){

    const handleChange = (newValue : string | number, event : React.SyntheticEvent) : void => {
        let newZoomLevel=1;
        if(newValue<100)
            newZoomLevel= Utils.map((newValue as number), 0, 100, MAX_ZOOM_IN, 1);
        else if(newValue>100)
            newZoomLevel= Utils.map((newValue as number), 100, 200, 1, MAX_ZOOM_OUT);

        handleZoomChange(newZoomLevel, undefined);
    }

    let zoomLevel=100;
        if(currentZoom<1)
            zoomLevel= Utils.map(currentZoom, MAX_ZOOM_IN, 1, 0, 100);
        else if(currentZoom>1)
            zoomLevel= Utils.map(currentZoom, 1, MAX_ZOOM_OUT, 100, 200); 
    zoomLevel=Math.floor(zoomLevel);

    return(
        <Container className='bottomToolBar'>
            <Stack direction='row'>
                <FlexboxGrid justify="space-around" style={{justifyContent:'center',alignItems: 'center', width:'18em'}}>
                    <FlexboxGrid.Item colspan={4} style={{display:'flex',justifyContent: 'center', alignItems:'center'}}><BsZoomOut/></FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={16}>
                        <Slider className='slider' 
                                defaultValue={100} 
                                min={0} 
                                max={200} 
                                graduated 
                                progress
                                value={zoomLevel}
                                onChange={(value, e) => handleChange(value, e)}/>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4} style={{display:'flex',justifyContent: 'center', alignItems:'center'}}><BsZoomIn/></FlexboxGrid.Item>
                </FlexboxGrid>
                <div className="zoomLevel">
                    <InputNumber className={'custom-input-number'} value={zoomLevel} onChange={(value, e) => handleChange(value, e)}/>
                </div>
            </Stack>
        </Container>
    );
}
