export interface ItemControlType {
    description : string,
    property : string,
    type : ControlType
}

export enum ControlType {
    COLOR_PICKER = 0,
    NUMBER_PICKER = 1,
    NUMBER_RANGE = 2,
    CHECKBOX = 3
}

export interface ItemControlsType extends Array<ItemControlType>{}

export const FigureItemTextControls : ItemControlsType = [
    {
        description : "Colore del testo",
        property : "stroke",
        type : ControlType.COLOR_PICKER
    },
    {
        description : "Dimensione del testo",
        property : "fontSize",
        type : ControlType.NUMBER_PICKER
    },
    {
        description : "Rotazione",
        property : "angle",
        type : ControlType.NUMBER_RANGE
    },
    {
        description : "Colore di sfondo",
        property : "backgroundColor",
        type : ControlType.COLOR_PICKER
    },
    {
        description : "Attiva bordo",
        property : "hasBorder",
        type : ControlType.CHECKBOX
    }
    ,
    {
        description : "Colore del bordo",
        property : "borderColor",
        type : ControlType.COLOR_PICKER
    }
];

export const FigureItemRectControls : ItemControlsType = [
    {
        description : "Colore di sfondo",
        property : "backgroundColor",
        type : ControlType.COLOR_PICKER
    },
    {
        description : "Larghezza",
        property : "width",
        type : ControlType.NUMBER_PICKER
    },
    {
        description : "Altezza",
        property : "height",
        type : ControlType.NUMBER_PICKER
    },
    {
        description : "Rotazione",
        property : "angle",
        type : ControlType.NUMBER_RANGE
    },
    {
        description : "Attiva bordo",
        property : "hasBorder",
        type : ControlType.CHECKBOX
    },
    {
        description : "Colore del bordo",
        property : "borderColor",
        type : ControlType.COLOR_PICKER
    },
    {
        description : "Bordo arrotondato",
        property : "rx|ry",
        type : ControlType.NUMBER_RANGE
    },
    {
        description : "Larghezza",
        property : "width",
        type : ControlType.NUMBER_PICKER
    },
    {
        description : "Altezza",
        property : "height",
        type : ControlType.NUMBER_PICKER
    },
    {
        description : "Rotazione",
        property : "angle",
        type : ControlType.NUMBER_RANGE
    },
    {
        description : "Attiva bordo",
        property : "hasBorder",
        type : ControlType.CHECKBOX
    },
    {
        description : "Colore del bordo",
        property : "borderColor",
        type : ControlType.COLOR_PICKER
    },
    {
        description : "Bordo arrotondato",
        property : "rx|ry",
        type : ControlType.NUMBER_RANGE
    }
];

export const FigureItemEllipseControls : ItemControlsType = [
    {
        description : "Colore di sfondo",
        property : "backgroundColor",
        type : ControlType.COLOR_PICKER
    },
    {
        description : "Larghezza",
        property : "width",
        type : ControlType.NUMBER_PICKER
    },
    {
        description : "Altezza",
        property : "height",
        type : ControlType.NUMBER_PICKER
    },
    {
        description : "Rotazione",
        property : "angle",
        type : ControlType.NUMBER_RANGE
    },
    {
        description : "Attiva bordo",
        property : "hasBorder",
        type : ControlType.CHECKBOX
    },
    {
        description : "Colore del bordo",
        property : "borderColor",
        type : ControlType.COLOR_PICKER
    }
];

export const ImageItemControls : ItemControlsType = [
    {
        description : "Colore",
        property : "backgroundColor",
        type : ControlType.COLOR_PICKER
    },
    {
        description : "Larghezza",
        property : "width",
        type : ControlType.NUMBER_PICKER
    },
    {
        description : "Altezza",
        property : "height",
        type : ControlType.NUMBER_PICKER
    },
    {
        description : "Rotazione",
        property : "angle",
        type : ControlType.NUMBER_RANGE
    }
];