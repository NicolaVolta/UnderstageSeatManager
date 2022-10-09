import { fabric } from "fabric";
import { Canvas, IEvent, Rect } from "fabric/fabric-impl";
import { ItemControlsType } from "../Support/ItemControls";
import { DimesionsType, PositionType } from '../Support/types/GenericTypes';
import { Utils } from "../Utils/Utils";

export abstract class BaseItem {
    protected canvas : Canvas;
    protected finishCreateItemListener : Function;
    protected element : fabric.Object;
    protected useShape : boolean;
    protected elementShape : Rect;
    private isDrawing : boolean = false;
    public elementProperty : ItemControlsType = [];
    protected originalElementShapePosition : PositionType | undefined;

    constructor(canvas : Canvas, finishCreateItemListener : Function, useShape : boolean){
        this.canvas=canvas;
        this.finishCreateItemListener=finishCreateItemListener;
        this.useShape=useShape;

        this.canvas.on("mouse:down", this.startDrawing);
    }

    public get getElement() : fabric.Object {
        return this.element;
    }

    abstract drawOnDragging(e? : IEvent) : void;
    abstract afterMouseReleased(e? : IEvent) : void;

    startDrawing = (e : IEvent) :void => {
        if(e.button!==1) return;
        
        if(!this.useShape && Utils.isNullOrUndefined(this.canvas.getActiveObject())){
            this.afterMouseReleased(e);
            this.finishCreateItemListener(this);
            this.canvas.off("mouse:down", this.startDrawing);
            return;
        }

        this.renderElementShape(e);
    }

    private renderElementShape = (e : IEvent) : void => {
        if(!Utils.isNullOrUndefined(this.canvas.getActiveObject()) && this.element!==null) return;

        this.elementShape=Utils.createRect(0, 0, "rgba(0,0,0,0)", 0);

        this.canvas.on("mouse:move", this.resizeElementShape);
        this.canvas.on("mouse:up", this.endElementShape);

        this.isDrawing=true;
        let mousePosition=Utils.getMousePointer(this.canvas, e);

        mousePosition=Utils.snapPositionToGrid(mousePosition);

        this.elementShape.set({
            left:mousePosition.x,
            top:mousePosition.y
        });

        this.originalElementShapePosition={...mousePosition};

        this.canvas.add(this.elementShape);
    }

    protected resizeElementShape = (e : IEvent) : void => {
        if(!this.isDrawing || Utils.isNullOrUndefined(this.elementShape)) return;
        
        this.canvas.remove(this.elementShape);

        this.updateShapeElement(e);

        this.canvas.add(this.elementShape);

        this.elementShape.setCoords();
        this.drawOnDragging(e);
    }

    protected updateShapeElement(e : IEvent){
        let mousePosition=Utils.getMousePointer(this.canvas, e);

        mousePosition=Utils.snapPositionToGrid(mousePosition);

        let newWidth=Math.sqrt(Math.pow(this.originalElementShapePosition!.x - mousePosition.x,2));
        let newHeight=Math.sqrt(Math.pow(this.originalElementShapePosition!.y - mousePosition.y,2));

        let newDimensions = this.adjustShapeElementDimensions({w:newWidth, h:newHeight});
        let newPosition = this.adjustShapeElementPosition({x:(this.elementShape?.left ?? 0), y:(this.elementShape?.top ?? 0)}, mousePosition);

        this.elementShape.set({
            width:newDimensions.w,
            height:newDimensions.h,
            top:newPosition.y,
            left:newPosition.x
        });
    }

    protected adjustShapeElementDimensions(originalDimensions : DimesionsType) : DimesionsType{
        return {...originalDimensions};
    }

    protected adjustShapeElementPosition(originalPosition : PositionType, mousePosition : PositionType) : PositionType{
        let newPosition={...originalPosition};
        
        if(this.originalElementShapePosition!.x>mousePosition.x)
            newPosition={...newPosition, x:mousePosition.x}
        
        if(this.originalElementShapePosition!.y>mousePosition.y)
            newPosition={...newPosition, y:mousePosition.y}

        return newPosition;
    }
    
    private endElementShape = (e : IEvent) : void => {
        if(Utils.isNullOrUndefined(this.elementShape)) return;
        
        this.isDrawing=false;
        this.originalElementShapePosition=undefined;

        this.stopListeners();

        this.canvas.remove(this.elementShape);

        this.afterMouseReleased();
        this.finishCreateItemListener(this);
    }

    public stopListeners = () => {
        this.canvas.off({
            "mouse:down" : this.startDrawing,
            "mouse:move" : this.resizeElementShape,
            "mouse:up" : this.endElementShape
        });
    }
}