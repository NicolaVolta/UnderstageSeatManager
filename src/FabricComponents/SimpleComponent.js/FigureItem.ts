import { Canvas, IEvent, IText } from 'fabric/fabric-impl';
import { ToolSelectionEnum } from "../../Support/ToolSelectionEnum";
import { Utils } from "../../Utils/Utils";
import { BaseItem } from "../BaseItem";
import { FigureItemRectControls, FigureItemEllipseControls, FigureItemTextControls } from '../../Support/ItemControls';
import { PositionType } from '../../Support/types/GenericTypes';

export class FigureItem extends BaseItem {
    public figureType : ToolSelectionEnum;

    constructor(canvas:Canvas, finishCreateItemListener : Function, useShape : boolean, figureType:ToolSelectionEnum){
        super(canvas, finishCreateItemListener, useShape);
        this.figureType=figureType;
    }

    drawOnDragging(event : IEvent): void {}

    afterMouseReleased = (e? : IEvent): void => {
        
        if(this.element===undefined){
            switch(this.figureType){
                case ToolSelectionEnum.ADD_SQUARE:
                    this.element=Utils.createRect(this.elementShape.width ?? 0, this.elementShape.height ?? 0, "#000", 0);
                    this.elementProperty=FigureItemRectControls;
                    break;
                case ToolSelectionEnum.ADD_CIRCLE:
                    this.element=Utils.createEllipse(this.elementShape.width ?? 0, this.elementShape.height ?? 0, "#000");
                    this.elementProperty=FigureItemEllipseControls;
                    break;
                case ToolSelectionEnum.ADD_TEXT:
                    this.element=Utils.createPromptText(this.elementShape?.width ?? 0, this.elementShape?.height ?? 0, "#000");
                    this.elementProperty=FigureItemTextControls;
                    break;
                default:
                    return;
            }
            
            let mousePosition : PositionType | undefined;

            if(e !== undefined) mousePosition=Utils.getMousePointer(this.canvas, e);

            this.element.set({
                top:this.elementShape?.top ?? mousePosition?.y ?? 0,
                left:this.elementShape?.left ?? mousePosition?.x ?? 0
            });

            this.canvas.add(this.element);

            if(this.figureType === ToolSelectionEnum.ADD_TEXT){
                (this.element as IText).enterEditing();
                (this.element as IText).selectAll();
            } 
        }
    }
}