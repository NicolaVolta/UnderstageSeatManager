import { fabric } from 'fabric';
import {  IEvent, Canvas, Rect, Ellipse, Text, IText } from 'fabric/fabric-impl';
import { PositionType } from '../Support/types/GenericTypes';

export class Utils {

    static getMousePointer(canvas:Canvas, event:IEvent) : PositionType {
        return canvas.getPointer(event.e);
    }
    
    static createRect(width:number, height:number, color:string, angle:number) : Rect {
        return new fabric.Rect({
            height: height,
            width: width,
            fill: color,
            strokeWidth: 1,
            stroke:'#000000',
            angle:angle
        });
    } 

    static createEllipse(width:number, height:number, color:string) : Ellipse {
        return new fabric.Ellipse({
            ry: height/2,
            rx: width/2,
            fill: color,
            strokeWidth: 1,
            stroke:'#000000',
        });
    } 

    static createText(width:number, height:number, color:string, text:string) : Text {
        return new fabric.Text(text, {
            height: height,
            width: width,
            fill: color,
            strokeWidth: 1,
            stroke:'#000000',
        });
    } 

    static createPromptText(width:number, height:number, color:string) : IText {
        return new fabric.IText("Inserisci testo", {
            height: height,
            width: width,
            fill: color,
            strokeWidth: 1,
            stroke:'#000ff0',
        });
    } 

    static isNullOrUndefined(element:any) : boolean {
        return element===undefined || element===null;
    }

    static resetObjectCoords(canvas:Canvas) : void {
        canvas.forEachObject(function(object){
            object.setCoords();
            
            /*if(object instanceof TheaterSeatGroup)
                object.checkIsSeatInsideGroup();*/
        })
    }

    static map(x : number, in_min : number, in_max : number, out_min : number, out_max : number) : number{
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}