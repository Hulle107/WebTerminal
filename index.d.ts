export declare interface TerminalArea {
    left: number;
    top: number;
    width: number;
    height: number;
}

export declare interface TerminalSize {
    width: number;
    height: number;
}

export declare interface TerminalCoordinate {
    left: number;
    top: number;
}

export declare interface TerminalKeyInfo {
    keyCode: number;
    character: string;
}

export declare interface TerminalOptions {
    canvas: HTMLCanvasElement;
    defualtBackgroundColor?: TerminalColor;
    defaultForegroundColor?: TerminalColor;
    displayOptions?: {
        canvasWidth?: number;
        canvasHeight?: number;
    };
}

export declare class Terminal {
    backgroundColor: TerminalColor;
    bufferHeight: number;
    bufferWidth: number;
    cursorLeft: number;
    cursorSize: number;
    cursorTop: number;
    cursorVisible: boolean;
    foregroundColor: TerminalColor;
    windowHeight: number;
    windowLeft: number;
    windowTop: number;
    windowWidth: number;
    get buffer(): TerminalField[];
    get capsLock(): boolean;
    get keyAvailable(): boolean;
    get largestWindowHeight(): number;
    get largestWindowWidth(): number;
    get numberLock(): boolean;
    constructor(options: TerminalOptions);
    Clear(): void;
    GetCursorPosition(): TerminalCoordinate;
    MoveBufferArea(sourceArea: TerminalArea, targetCoordinate: TerminalCoordinate, sourceChar?: string, sourceForegroundColor?: TerminalColor, sourceBackgroundColor?: TerminalColor): void;
    async Read(intercept?: boolean): Promise<TerminalKeyInfo>;
    async ReadLine(intercept?: boolean): Promise<string?>;
    ResetColor(): void;
    SetBufferSize(size: TerminalSize): void;
    SetCursorPosition(coordinate: TerminalCoordinate): void;
    SetWindowPosition(coordinate: TerminalCoordinate): void;
    SetWindowSize(size: TerminalSize): void;
    Write(value: string): void;
    WriteLine(value?: string): void;
}

export declare class TerminalColor {
    color: string;
    constructor(color: string);
}

export declare interface TerminalColors {
    black: TerminalColor,
    blue: TerminalColor,
    cyan: TerminalColor;
    darkBlue: TerminalColor;
    darkCyan: TerminalColor;
    darkGray: TerminalColor;
    darkGreen: TerminalColor;
    darkMagenta: TerminalColor;
    darkRed: TerminalColor;
    darkYellow: TerminalColor;
    gray: TerminalColor;
    green: TerminalColor;
    magenta: TerminalColor;
    red: TerminalColor;
    white: TerminalColor;
    yellow: TerminalColor;
}

export declare interface TerminalDisplayOptions {
    canvas: HTMLCanvasElement;
    canvasWidth?: number;
    canvasHeight?: number;
}

export declare class TerminalDisplay {
    constructor(options: TerminalDisplayOptions);
}

export declare class TerminalField {
    backgroundColor: TerminalColor;
    character: string;
    foregroundColor: TerminalColor;
    constructor(character: string, foregroundColor: TerminalColor, backgroundColor: TerminalColor);
}

export declare class TerminalKeyboard {

}