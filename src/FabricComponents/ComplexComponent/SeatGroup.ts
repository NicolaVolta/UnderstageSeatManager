import { Canvas, IEvent } from 'fabric/fabric-impl';
import { SEAT_WHOLE_HEIGHT, SEAT_WHOLE_WIDTH } from '../../Support/constants';
import { ToolSelectionEnum } from '../../Support/ToolSelectionEnum';
import { DimesionsType, PositionType } from '../../Support/types/GenericTypes';
import { Utils } from '../../Utils/Utils';
import { BaseItem } from '../BaseItem';
import { SeatItem } from './SeatItem';
import { fabric } from 'fabric';
import { couldStartTrivia } from 'typescript';

export class SeatGroup extends BaseItem{
    private groupType : ToolSelectionEnum;
    public seats : Array<Array<SeatItem | undefined>> = [];
    private groupDimension : DimesionsType = {w:0, h:0};

    constructor(canvas : Canvas, finishCreateItemListener : Function, useShape : boolean, groupType : ToolSelectionEnum){
        super(canvas, finishCreateItemListener, useShape)
        this.groupType=groupType;
    }

    drawOnDragging(e : IEvent): void {
        let width=Math.abs(this.elementShape?.width ?? 0);
        let height=Math.abs(this.elementShape?.height ?? 0);

        let top=this.originalElementShapePosition!.y;
        let left=this.originalElementShapePosition!.x;

        let rows=Math.floor(height/SEAT_WHOLE_HEIGHT);
        let cols=Math.floor(width/SEAT_WHOLE_WIDTH);

        let mousePosition=Utils.getMousePointer(this.canvas, e);

        if(this.groupDimension.w===cols && this.groupDimension.h===rows) return;

        if(rows>this.groupDimension.h){
            for(let i=this.seats.length; i<rows; i++){
                this.seats.push([]);
            }
        }

        if(cols>this.groupDimension.w){
            for(let i=0; i<this.seats.length;i++){
                for(let j=this.seats[i].length; j<cols;j++){
                    this.seats[i].push(undefined);
                }
            }
        }

        //create new seats
        if(cols>this.groupDimension.w || rows>this.groupDimension.h){
            for(let i=0; i<rows; i++){
                for(let j=0; j<cols; j++){
                    if(Utils.isNullOrUndefined(this.seats[i][j])){
                        /*let seatTop=top+((SEAT_HEIGHT+SEAT_PADDING)*i);
                        let seatLeft=left+((SEAT_WIDTH+SEAT_PADDING)*j);

                        if(this.originalElementShapePosition!.x - (mousePosition.x<0 ? 0 : mousePosition.x)>0)
                            seatLeft=left+((SEAT_WIDTH+SEAT_PADDING)*j*-1)-(SEAT_WIDTH+SEAT_PADDING);
                        if(this.originalElementShapePosition!.y - (mousePosition.y<0 ? 0 : mousePosition.y)>0)
                            seatTop=top+((SEAT_HEIGHT+SEAT_PADDING)*i*-1)-(SEAT_HEIGHT+SEAT_PADDING);*/

                        /*let c=(SEAT_HEIGHT+SEAT_PADDING)/Math.sqrt(2);

                        let newPositionLeft=left+(c);
                        let newPositionTop=top+(c);*/
                        
                        let angle=fabric.util.degreesToRadians(this.elementShape.angle || 0);

                        /*let Cx=left+width;
                        let Cy=top;*/

                        let Cx=this.originalElementShapePosition!.x+((SEAT_WHOLE_HEIGHT)*j)*(mousePosition.x<this.originalElementShapePosition!.x && angle===0 ? -1 : 1);
                        let Cy=this.originalElementShapePosition!.y+((SEAT_WHOLE_HEIGHT)*i)*(mousePosition.y<this.originalElementShapePosition!.y && angle===0 ? -1 : 1);

                        let Ox=this.originalElementShapePosition!.x;
                        let Oy=this.originalElementShapePosition!.y;

                        //let angle=fabric.util.degreesToRadians(270);

                        // rotate point
                        let xnew = Math.cos(angle) * (Cx - Ox) - Math.sin(angle) * (Cy-Oy) + Ox;
                        let ynew = Math.sin(angle) * (Cx - Ox) + Math.cos(angle) * (Cy-Oy) + Oy;

                        /*let line = new fabric.Line([this.originalElementShapePosition!.x, this.originalElementShapePosition!.y, xnew, ynew], {
                            stroke:"#000"
                        });

                        this.canvas.add(line);

                        let line2 = new fabric.Line([this.originalElementShapePosition!.x, this.originalElementShapePosition!.y, Cx, Cy], {
                            stroke:"#000"
                        });

                        this.canvas.add(line2);*/

                        /*let newPositionLeft=left+((SEAT_WHOLE_HEIGHT)*j);
                        let newPositionTop=top+((SEAT_WHOLE_HEIGHT)*i)+((this.elementShape.angle || 0)!=0 ? 0 : ynew);*/
                        
                        
                        var newSeat=new SeatItem(this.canvas, xnew, ynew, fabric.util.radiansToDegrees(angle));
                        this.canvas.add(newSeat.element);
                        this.seats[i][j]=newSeat;
                    }
                }
            }
            
        }
        
        /*let points=this.elementShape.getCoords();
        for(let i=0; i<this.seats.length;i++){
            for(let j=0; j<this.seats[i].length;j++){
                let el=this.seats[i][j]?.element ?? undefined;
                
                if(!Utils.isNullOrUndefined(el)){
                    let elCoords=el!.getCoords();
                    let isInside=true;

                    
                    for(let point of elCoords){
                        if(isInside){
                            for(let a = 0, b = 3; a < 4; b = a++) {
                                if( ( (points[a].y >= point.y ) !== (points[b].y >= point.y) ) &&
                                    (point.x <= (points[b].x - points[a].x) * (point.y - points[a].y) / (points[b].y - points[a].y) + points[a].x)
                                )
                                isInside=false;
                            }
                        }
                    }

                   /* for(let coord of elCoords ){
                        if(isInside){
                            if(!this.elementShape.containsPoint(coord, undefined, undefined, true)){
                                isInside=false;
                            }
                        }
                    }
*/
                    
            
                    /*if(!isInside)
                        this.canvas.remove(el!);*/
                    /*if(!inBounds){
                        this.canvas.remove(el!);
                    }*/
               /* }  
                    //this.canvas.remove(el!);
            }
        }*/

        //remove deleted seats
        let rowsToRemove=null;
        if(rows<this.groupDimension.h){
            rowsToRemove=this.seats.splice(rows, this.groupDimension.h-rows);

            for(let i=0;i<rowsToRemove.length;i++){
                for(let j=0;j<rowsToRemove[i].length;j++){
                    let element=rowsToRemove[i][j]?.element ?? undefined;
                    if(!Utils.isNullOrUndefined(element)) this.canvas.remove(element!);
                }
            }
        }

        let colsToRemove=[];
        if(cols<this.groupDimension.w){
            for(let i=0; i<this.seats.length;i++){
                colsToRemove.push(this.seats[i].splice(cols, this.groupDimension.w-cols));
            }
            for(let i=0;i<colsToRemove.length;i++){
                for(let j=0;j<colsToRemove[i].length;j++){
                    let element=colsToRemove[i][j]?.element ?? undefined;
                    if(!Utils.isNullOrUndefined(element)) this.canvas.remove(element!);
                }
            }
        }

        this.groupDimension.h=rows;
        this.groupDimension.w=cols;
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