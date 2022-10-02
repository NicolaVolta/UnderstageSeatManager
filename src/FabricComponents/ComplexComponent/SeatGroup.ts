import { Canvas, IEvent } from 'fabric/fabric-impl';
import { SEAT_WHOLE_HEIGHT, SEAT_WHOLE_WIDTH } from '../../Support/constants';
import { ToolSelectionEnum } from '../../Support/ToolSelectionEnum';
import { DimesionsType, PositionType } from '../../Support/types/GenericTypes';
import { Utils } from '../../Utils/Utils';
import { BaseItem } from '../BaseItem';
import { SeatItem } from './SeatItem';
import { fabric } from 'fabric';

interface LastShapeElementPropreties{
    angle : number,
    width : number,
    height : number
}
export class SeatGroup extends BaseItem{
    private groupType : ToolSelectionEnum;
    public seats : Array<Array<SeatItem | undefined>> = [];
    private groupDimension : DimesionsType = {w:0, h:0};
    private lastShapeElementProprieties : LastShapeElementPropreties = {
        angle:0,
        width:0,
        height:0
    };

    constructor(canvas : Canvas, finishCreateItemListener : Function, useShape : boolean, groupType : ToolSelectionEnum){
        super(canvas, finishCreateItemListener, useShape)
        this.groupType=groupType;
    }

    drawOnDragging(e : IEvent): void {
        let width=Math.abs(this.elementShape?.width ?? 0);
        let height=Math.abs(this.elementShape?.height ?? 0);

        let rows=Math.floor(height/SEAT_WHOLE_HEIGHT);
        let cols=Math.floor(width/SEAT_WHOLE_WIDTH);

        let mousePosition=Utils.getMousePointer(this.canvas, e);

        if((this.elementShape.width || 0)<this.lastShapeElementProprieties.width ||
            (this.elementShape.height || 0)<this.lastShapeElementProprieties.height ||
            (this.elementShape.angle || 0)!==this.lastShapeElementProprieties.angle){

            for(let i=this.seats.length-1; i>=0;i--){
                for(let j=this.seats[i].length-1; j>=0;j--){
                    let el=this.seats[i][j]?.element ?? undefined;
                    
                    if(Utils.isNullOrUndefined(el)) continue;

                    let isInside=Utils.isPointInsideShapeRobust(el!, this.elementShape);
                    
                    if(el?.angle!==(this.elementShape.angle || 0))
                        isInside=false;
                    
                    if(isInside) continue;

                    this.canvas.remove(el!);
                    this.seats[i].splice(j, 1);
                }

                if(this.seats[i].length===0)
                    this.seats.splice(i, 1);
            }
        }

        if(cols>this.groupDimension.w || rows>this.groupDimension.h || this.lastShapeElementProprieties.angle!==(this.elementShape.angle || 0)){
            let angle=fabric.util.degreesToRadians(this.elementShape.angle || 0);

            for(let i=0; i<rows; i++){
                if(Utils.isNullOrUndefined(this.seats[i])) this.seats[i]=[];

                for(let j=0; j<cols; j++){
                    if(!Utils.isNullOrUndefined(this.seats[i][j])) continue;

                    let Ox=this.originalElementShapePosition!.x;
                    let Oy=this.originalElementShapePosition!.y;

                    let Cx=Ox+(SEAT_WHOLE_WIDTH*j)*(mousePosition.x<Ox && angle===0 ? -1 : 1);
                    let Cy=Oy+(SEAT_WHOLE_HEIGHT*i)*(mousePosition.y<Oy && angle===0 ? -1 : 1);

                    let xnew = Math.cos(angle) * (Cx - Ox) - Math.sin(angle) * (Cy-Oy) + Ox;
                    let ynew = Math.sin(angle) * (Cx - Ox) + Math.cos(angle) * (Cy-Oy) + Oy;         
                    
                    if(mousePosition.x<Ox && angle===0 && this.groupType!==ToolSelectionEnum.CREATE_SEAT_COLUMN)
                        xnew-=SEAT_WHOLE_WIDTH;
                    
                    if(mousePosition.y<Oy && angle===0 && this.groupType!==ToolSelectionEnum.CREATE_SEAT_ROW)
                        ynew-=SEAT_WHOLE_HEIGHT;
                    
                    var newSeat=new SeatItem(this.canvas, xnew, ynew, fabric.util.radiansToDegrees(angle));
                    this.canvas.add(newSeat.element);
                    this.seats[i][j]=newSeat;
                }
            } 
        }

        this.groupDimension.h=rows;
        this.groupDimension.w=cols;

        this.lastShapeElementProprieties={
            angle:this.elementShape.angle || 0,
            height:this.elementShape.height || 0,
            width:this.elementShape.width || 0,
        };
    }

    afterMouseReleased(e?: IEvent<Event> | undefined): void {}
    
    protected override adjustShapeElementDimensions(originalDimension : DimesionsType): DimesionsType {
        switch(this.groupType){
            case ToolSelectionEnum.CREATE_SEAT_ROW:
                if(originalDimension.h!==SEAT_WHOLE_HEIGHT) return {...originalDimension, h:SEAT_WHOLE_HEIGHT};
                break;
            case ToolSelectionEnum.CREATE_SEAT_COLUMN:
                if(originalDimension.w!==SEAT_WHOLE_WIDTH) return {...originalDimension, w:SEAT_WHOLE_WIDTH};
                break;
        }

        return {...originalDimension};
    }

    protected override adjustShapeElementPosition(originalPosition : PositionType, mousePosition : PositionType) : PositionType{
        let newPosition=super.adjustShapeElementPosition(originalPosition, mousePosition);

        switch(this.groupType){
            case ToolSelectionEnum.CREATE_SEAT_ROW:
                return {...newPosition, y:originalPosition.y};
            case ToolSelectionEnum.CREATE_SEAT_COLUMN:
                return {...newPosition, x:originalPosition.x};
        }

        return {...newPosition};
    }

    protected updateShapeElement(e : IEvent){
        if(this.groupType!==ToolSelectionEnum.CREATE_SEAT_DIAGONAL) return super.updateShapeElement(e);

        let mousePosition=Utils.getMousePointer(this.canvas, e);

        let angle=Math.atan2(mousePosition.y-this.originalElementShapePosition!.y, mousePosition.x-this.originalElementShapePosition!.x);
        angle=fabric.util.radiansToDegrees(angle);

        let newWidth=Math.sqrt(Math.pow(this.originalElementShapePosition!.x - mousePosition.x,2)+
                                Math.pow(this.originalElementShapePosition!.y - mousePosition.y,2));
        let newHeight=SEAT_WHOLE_HEIGHT;

        this.elementShape.set({
            width:newWidth,
            height:newHeight,
            angle:angle,
        });
    }

}