import { fabric } from 'fabric';
import {  IEvent, Canvas, Rect, Ellipse, Text, IText, Image } from 'fabric/fabric-impl';
import { GRID_CELL_SIZE } from '../Support/constants';
import { PositionType } from '../Support/types/GenericTypes';
const classifyPoint = require("robust-point-in-polygon");
export class Utils {

    static getMousePointer(canvas : Canvas, event : IEvent) : PositionType {
        return canvas.getPointer(event.e);
    }
    
    static createRect(width : number, height : number, color : string, angle : number) : Rect {
        return new fabric.Rect({
            height: height,
            width: width,
            fill: color,
            strokeWidth: 1,
            stroke:'#000000',
            angle:angle
        });
    } 

    static createEllipse(width : number, height : number, color : string) : Ellipse {
        return new fabric.Ellipse({
            ry: height/2,
            rx: width/2,
            fill: color,
            strokeWidth: 1,
            stroke:'#000000',
        });
    } 

    static createText(width : number, height : number, color : string, text : string) : Text {
        return new fabric.Text(text, {
            height: height,
            width: width,
            fill: color,
            strokeWidth: 1,
            stroke:'#000000',
        });
    } 

    static createPromptText(width : number, height : number, color : string) : IText {
        return new fabric.IText("Inserisci testo", {
            height: height,
            width: width,
            fill: color,
            strokeWidth: 1,
            stroke:'#000ff0',
        });
    } 

    static createImageFromSvg(path : string, callbackFunction : (results : fabric.Object[], options : any) => void) : void {
        fabric.loadSVGFromURL(path, (objects, options) => callbackFunction(objects, options));
    } 

    static isNullOrUndefined(element : any) : boolean {
        return element===undefined || element===null;
    }

    static resetObjectCoords(canvas : Canvas) : void {
        canvas.forEachObject(function(object){
            object.setCoords();
        })
    }

    static map(x : number, in_min : number, in_max : number, out_min : number, out_max : number) : number{
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    static isPointInsideShapeRobust(el : fabric.Object, polygon : fabric.Object) : boolean{
        let isInside = true;
        let polyPoints=polygon.getCoords();
        let polyCoords=[];
        let points=el.getCoords();

        for(let polyPoint of polyPoints){
            polyCoords.push([polyPoint.x, polyPoint.y]);
        }

        for(let point of points){
            if(!isInside) break;

            isInside=classifyPoint(polyCoords, [point.x, point.y])!==1;
        }
    
        return isInside;
    }

    static isSelectionEnable() : boolean {
        return fabric.Object.prototype.selectable || false;
    }
    
    static snapPositionToGrid(originalPosition : PositionType) : PositionType {
        let snapX=(originalPosition.x/GRID_CELL_SIZE);
        snapX=snapX%1>.5 ? Math.ceil(snapX) : Math.floor(snapX);
        snapX*=GRID_CELL_SIZE;

        let snapY=(originalPosition.y/GRID_CELL_SIZE);
        snapY=snapY%1>.5 ? Math.ceil(snapY) : Math.floor(snapY);
        snapY*=GRID_CELL_SIZE;

        
        return {x:snapX, y:snapY};
    }
}