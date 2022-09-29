import { Canvas, Rect } from "fabric/fabric-impl";
import { Utils } from "../../Utils/Utils";
import { SEAT_WIDTH, SEAT_HEIGHT } from '../../Support/constants';

export class SeatItem {
    canvas : Canvas;
    element : Rect;

    constructor(canvas : Canvas, left : number, top : number, angle : number){
        this.canvas=canvas;
        this.element=Utils.createRect(SEAT_WIDTH, SEAT_HEIGHT, "#f2f2f2", 0);
        this.element.setControlsVisibility({mt: false, mb: false, ml: false, mr: false, bl: false, br: false, tl: false, tr: false, mtr: false});
        this.element.set({
            top:top,
            left:left,
            angle:angle,
        });
    }

    addSeatToCanvas = () : void => {
        this.canvas.add(this.element);
    }

    /*isInside = (parent : ZoneItem) => {
        let isInside=true;
        let points=this.element.aCoords;

        for(let key in points){
            if(isInside){
                let point=points[key];
                if(!parent.containsPoint(point)){
                    isInside=false;
                }
            }
        }

        if(!isInside){
            this.element.set({stroke:'red',strokeWidth: 2});
        }
        else{
            this.element.set({stroke:'#000000', strokeWidth: 1});
        }
    }*/

}