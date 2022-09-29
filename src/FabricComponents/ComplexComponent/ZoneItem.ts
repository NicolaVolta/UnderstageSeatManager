import { Canvas, IEvent } from "fabric/fabric-impl";
import { Utils } from "../../Utils/Utils";
import { BaseItem } from "../BaseItem";

export class ZoneItem extends BaseItem {
    seat : any[];
    resizingElement : boolean = false;

    constructor(canvas:Canvas, finishCreateItemListener : Function, useShape : boolean){
        super(canvas, finishCreateItemListener, useShape);
        this.seat=[];
    }
    
    drawOnDragging(event : IEvent): void {}

    afterMouseReleased(e?: IEvent<Event> | undefined): void {
        if(this.element!==undefined) return;

        this.element=Utils.createRect(this.elementShape.width ?? 0, this.elementShape.height ?? 0, "#dedede", 0);
        this.element.set({
            top:this.elementShape.top,
            left:this.elementShape.left
        });

        this.canvas.add(this.element);

        this.element.on('mousedown',this.selectAllZone);
        this.element.on('mousedblclick', this.selectOnlyZone);
        this.element.on('mouseup', this.finishResizing);
    }

    getEditableProprieties(): void {}

    private selectAllZone(){

    }

    private selectOnlyZone(){
        if(this.element===undefined) return;

        this.element.set({
            lockMovementX:true,
            lockMovementY:true,
        });

        this.canvas.discardActiveObject();
        this.canvas.setActiveObject(this.element);
        this.canvas.requestRenderAll();

        this.resizingElement=true;
    }

    private finishResizing(){
        if(!this.resizingElement) return;

        this.resizingElement=false;
        this.canvas.discardActiveObject();
        this.element.setCoords();
        this.canvas.requestRenderAll();
    }

}