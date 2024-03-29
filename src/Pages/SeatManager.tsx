import { Component, createRef, ReactNode, RefObject } from 'react';
import { fabric } from 'fabric';
import { Canvas } from 'fabric/fabric-impl';
import { ToolMenu } from '../Components/ToolsComponent/ToolMenu';
import { ToolSelectionEnum } from '../Support/ToolSelectionEnum';
import { FigureItem } from '../FabricComponents/SimpleComponent.js/FigureItem';
import { BaseItem } from '../FabricComponents/BaseItem';
import { Utils } from '../Utils/Utils';
import { EditItemControls } from '../Components/EditElements/EditItemControls';
import { ZoomBar } from '../Components/ToolsComponent/ZoomBar';
import { FloorToolBar } from '../Components/ToolsComponent/FloorToolBar';
import { ContextMenu } from '../Components/ContextMenu/ContextMenu';
import { PositionType } from '../Support/types/GenericTypes';
import { SeatGroup } from '../FabricComponents/ComplexComponent/SeatGroup';
import { GRID_CELL_SIZE, MAX_HISTORY_LENGHT, MAX_ZOOM_IN, MAX_ZOOM_OUT } from '../Support/constants';
import { ImageItem } from '../FabricComponents/SimpleComponent.js/ImageItem';
import { TOOLS, ToolType } from '../Support/Tools';
import { TopBar } from '../Components/ToolsComponent/TopBar';

interface State{
    selectedTool : ToolType, 
    selectedItem : BaseItem | undefined, 
    showContextMenu : boolean, 
    contextMenuAnchorPoint : PositionType, 
    currentZoom : number,
}

export class SeatManager extends Component <{}, State>{
    private canvasRef : RefObject<HTMLCanvasElement>;
    private canvas : Canvas;
    private newElementCreating : BaseItem | undefined;
    private isMoving : boolean = false;
    private lastPositionInCanvas : PositionType | undefined;
    private placeMap : Map<number, Array<BaseItem>>;
    private selectedFloor : number = 0;
    private canvasGrid : Array<fabric.Object> = [];
    private intervalUpdateGrid : NodeJS.Timer;

    constructor(props:any){
        super(props);
        this.canvasRef=createRef<HTMLCanvasElement>();

        this.state = {
            selectedTool:TOOLS.filter(tool => tool.action===ToolSelectionEnum.SELECTION)[0],
            selectedItem:undefined,
            showContextMenu:false,
            contextMenuAnchorPoint: { x:0, y:0 },
            currentZoom:1,
        }

        this.placeMap=new Map();
        this.placeMap.set(0, []);
    }
    
    componentDidMount(): void {
        this.canvas=new fabric.Canvas(this.canvasRef.current, {
            preserveObjectStacking:true,
            height: window.innerHeight,
            width: window.innerWidth,
            fireRightClick: true,
            selection: false,
        });

        //this.canvas.selection=false;

        window.addEventListener("resize", () => {
            this.canvas.setWidth(window.innerWidth);
            this.canvas.setHeight(window.innerHeight);

            this.updateGrid();
        });

        window.addEventListener("keydown", (e) => {
            const keyName = e.key;

            switch(keyName){
                case 'Delete':
                    //this.deleteElement();                    
                break;
                case 'c':
                    //this.copyElement(e);
                break;
                case 'v':
                    //this.pasteElement(e);
                break;
                default:

                break;
            }
        });

        //prevent context menu from beign visualized
        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });

        this.setupCanvasListener();
        this.updateGrid();
    }

    private updateGrid = () => {
        this.canvas.calcViewportBoundaries()
        let points=this.canvas.vptCoords;

        if(Utils.isNullOrUndefined(points)) return;

        this.canvasGrid.forEach(el => {
            this.canvas.remove(el);
        });
        this.canvasGrid=[];

        let topX=points!.tl.x-points!.tl.x%GRID_CELL_SIZE;
        let topY=points!.tl.y-points!.tl.y%GRID_CELL_SIZE;

        let bottomX=points!.br.x;
        let bottomY=points!.br.y;
        
        for(let i=topX; i<bottomX; i+=GRID_CELL_SIZE){
            let line=new fabric.Line([i, topY, i, bottomY],{
                selectable:false,
                stroke:'#dedede',
                hoverCursor:'cursor'
            });
            
            this.canvasGrid.push(line);
            this.canvas.add(line);
            line.sendToBack();
        }

        for(let j=topY; j<bottomY; j+=GRID_CELL_SIZE){
            let line=new fabric.Line([topX, j, bottomX, j],{
                selectable:false,
                stroke:'#dedede',
                hoverCursor:'cursor'
            });

            this.canvasGrid.push(line);
            this.canvas.add(line);
            line.sendToBack();
        }
    }

    private setupCanvasListener = () => {
        //moving listener
        this.isMoving=false;

        this.canvas.on("mouse:down", (event) => {
            if(event.button!==1) return;

            if(this.canvas.getActiveObjects().length===0 && this.isMoving){
                this.lastPositionInCanvas={x:event.e.clientX, y:event.e.clientY};
                this.canvas.discardActiveObject();
            }
        });

        this.canvas.on("mouse:move", (event) => {
            if(this.isMoving && !Utils.isNullOrUndefined(this.lastPositionInCanvas)){
                let vpt = this.canvas.viewportTransform;
                vpt![4] += event.e.clientX - this.lastPositionInCanvas!.x;
                vpt![5] += event.e.clientY - this.lastPositionInCanvas!.y;

                this.canvas.requestRenderAll();
                this.lastPositionInCanvas={x:event.e.clientX, y:event.e.clientY};
            }
        });

        this.canvas.on("mouse:up", () => {
            Utils.resetObjectCoords(this.canvas);
            this.lastPositionInCanvas=undefined;

            this.updateGrid();
        });

        //zoom listener
        this.canvas.on("mouse:wheel", (event) => {
            if(!Utils.isNullOrUndefined(this.intervalUpdateGrid)) clearTimeout(this.intervalUpdateGrid);
            let delta=event.e.deltaY;

            let zoom=this.canvas.getZoom();
            zoom*=Math.pow(0.999,delta);
            
            this.handleZoomChange(zoom, {x: event.e.offsetX, y: event.e.offsetY});

            //prevent from scrolling down in case of overflow-y
            event.e.preventDefault();
            event.e.stopPropagation();
            this.intervalUpdateGrid=setTimeout(this.updateGrid, 500);
        });

        this.canvas.on("mouse:down", (event) => {
            if(event.button!==3){
                if(this.state.showContextMenu) this.setState({showContextMenu : false});
                return;
            } 

            this.setState({showContextMenu : true, contextMenuAnchorPoint : Utils.getMousePointer(this.canvas, event)});
        });

        this.canvas.on("selection:updated", () => this.handleElementSelection(false));
        this.canvas.on("selection:created", () => this.handleElementSelection(false));
        this.canvas.on("selection:cleared", () => this.handleElementSelection(true));
    }

    handleElementSelection = (clearSelection? : boolean) :void => {
        if(clearSelection){
            this.setState({selectedItem:undefined});
            return;
        } 

        let selectedObjects=this.canvas.getActiveObjects();

        if(selectedObjects.length!==1) return;

        let selectedItemArray : Array<BaseItem> = this.placeMap.get(this.selectedFloor)!.filter((currentItem) => {
            return currentItem.getElement===selectedObjects[0];
        });

        if(selectedItemArray.length!==1) return;

        let selectedItem : BaseItem = selectedItemArray[0];

        if(this.state.selectedItem===selectedItem) return;

        this.setState({selectedItem});
    }

    handleFinishCreation = (figureCreated : BaseItem) :void => {
        let floorElements=this.placeMap.get(this.selectedFloor);

        if(floorElements===undefined) floorElements=[];
        
        this.placeMap.set(this.selectedFloor, [...floorElements, figureCreated]);
        this.handleToolSelection(this.state.selectedTool);
    }

    handleToolSelection = (selectedTool : ToolType) :void => {
        //we stop the listeners to the pending creating element
        if(!Utils.isNullOrUndefined(this.newElementCreating)){
            this.newElementCreating!.stopListeners();
            this.newElementCreating=undefined;
        } 

        this.isMoving=false;
        fabric.Object.prototype.selectable = false;
        this.canvas.selection=false;

        switch(selectedTool.action){
            case ToolSelectionEnum.MOVE_INSIDE_CANVAS:
                this.isMoving=true;
                break;
            case ToolSelectionEnum.SELECTION:
                fabric.Object.prototype.selectable = true;
                break;
            case ToolSelectionEnum.SELECTION_DRAG:
                fabric.Object.prototype.selectable = true;
                this.canvas.selection=true;
                break;
            case ToolSelectionEnum.ADD_CIRCLE:
            case ToolSelectionEnum.ADD_SQUARE:
            case ToolSelectionEnum.ADD_TEXT:
                this.newElementCreating = new FigureItem(this.canvas, this.handleFinishCreation, selectedTool.action!==ToolSelectionEnum.ADD_TEXT, selectedTool.action);
                break;
            case ToolSelectionEnum.ADD_ICON:
                this.newElementCreating = new ImageItem(this.canvas, this.handleFinishCreation, false, selectedTool?.image ?? "");
                break;
            case ToolSelectionEnum.CREATE_SEAT_COLUMN:
            case ToolSelectionEnum.CREATE_SEAT_GROUP:
            case ToolSelectionEnum.CREATE_SEAT_ROW:
            case ToolSelectionEnum.CREATE_SEAT_DIAGONAL:
                this.newElementCreating = new SeatGroup(this.canvas, this.handleFinishCreation, true, selectedTool.action);
                break;
            case ToolSelectionEnum.CREATE_AREA:
                //this.newElementCreating = new FigureItem(this.canvas, this.handleFinishCreation, true, selectedTool);
                break;
        }

        this.setState({selectedTool});
    }

    handleZoomChange = (zoomLevel : number, zoomPoint : PositionType | undefined) => {
        if(Utils.isNullOrUndefined(zoomPoint)) zoomPoint={x:(this.canvas?.width ?? 0)/2, y:(this.canvas?.height ?? 0)/2}

        if(zoomLevel > MAX_ZOOM_OUT) zoomLevel=MAX_ZOOM_OUT;
        if(zoomLevel < MAX_ZOOM_IN) zoomLevel=MAX_ZOOM_IN;

        this.canvas.zoomToPoint(zoomPoint!, zoomLevel);
        
        Utils.resetObjectCoords(this.canvas);

        if(this.state.currentZoom!==zoomLevel) this.setState({currentZoom : zoomLevel});
    }

    handleFloorAddRemove = (isAdd : boolean) => {
        if(isAdd)
            this.placeMap.set(this.placeMap.size, []);
        else {
            if(this.placeMap.size===1) return this.placeMap.set(0, []);

            this.placeMap.delete(this.selectedFloor);

            let copyMap=new Map();

            let keysIterator=this.placeMap.keys();
            for(let i=0; i<this.placeMap.size; i++){
                let currentKey=keysIterator.next().value;
                copyMap.set(i, this.placeMap.get(currentKey) || []);
            }

            this.placeMap=copyMap;
        }
    }

    handleFloorSelection = (newFloor : number) => {
        this.selectedFloor=newFloor;
        this.loadFloor();
    }

    loadFloor = () =>{
        this.canvas.clear();
        let itemsToLoad=this.placeMap.get(this.selectedFloor);

        if(Utils.isNullOrUndefined(itemsToLoad)) return;

        itemsToLoad!.forEach((currentItem) => {
            this.canvas.add(currentItem.getElement);
        });
    }

    render(): ReactNode {
        return (
            <>
                <ToolMenu handleSelection={this.handleToolSelection} selectedTool={this.state.selectedTool}/>
                <EditItemControls selectedItem={this.state.selectedItem}/>
                <ZoomBar currentZoom={this.state.currentZoom} handleZoomChange={this.handleZoomChange}/>
                <FloorToolBar totalFloors={this.placeMap.size} handleFloorAddRemove={this.handleFloorAddRemove} handleFloorSelection={this.handleFloorSelection}/>
                <canvas id = 'canvas' ref={this.canvasRef}/>
                {this.state.showContextMenu && <ContextMenu position={this.state.contextMenuAnchorPoint}/>}
            </>
        )
    }
}