import { fabric } from 'fabric';
import { PositionType } from '../../Support/types/GenericTypes';
import { Canvas, IEvent } from 'fabric/fabric-impl';
import { Utils } from "../../Utils/Utils";
import { BaseItem } from "../BaseItem";
import { ImageItemControls } from '../../Support/ItemControls';


export class ImageItem extends BaseItem {
    public image : string;
    private initialImagePosition : PositionType;

    constructor(canvas:Canvas, finishCreateItemListener : Function, useShape : boolean, image:string){
        super(canvas, finishCreateItemListener, useShape);
        this.image=image;
        this.elementProperty=ImageItemControls;
    }

    drawOnDragging(event : IEvent): void {}

    afterMouseReleased = (e? : IEvent): void => {
        if(this.element===undefined){
            Utils.createImageFromSvg(this.image, this.imageLoaded);

            if(e !== undefined) this.initialImagePosition=Utils.getMousePointer(this.canvas, e);
        }
    }

    imageLoaded = (results : fabric.Object[], options : any) => {
        /*results.forEach((el) => {
            if(el.fill!=="") el.fill="red";
        });*/

        this.element=fabric.util.groupSVGElements(results, options);

        this.element.scaleToWidth(50);
        this.element.scaleToHeight(50);

        this.element.set({
            originX:'center',
            originY:'center',
            top:this.initialImagePosition.y,
            left:this.initialImagePosition.x
        });

        this.canvas.add(this.element);
    }
}