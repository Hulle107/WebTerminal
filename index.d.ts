export declare interface TerminalSize {
    width: number;
    height: number;
}

export declare interface TerminalCoordinate {
    left: number;
    top: number;
}

export declare interface TerminalArea {
    left: number;
    top: number;
    width: number;
    height: number;
}

export declare interface TerminalKeyInfo {
    keyCode: number;
    character: string;
}

export declare interface TerminalColor {
    name: string;
    styleString: string;
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

export declare interface TerminalField {
    character: string;
    backgroundColor: TerminalColor;
    foregroundColor: TerminalColor;
}

export declare interface TerminalOptions {
    defualtBackgroundColor?: TerminalColor;
    defaultForegroundColor?: TerminalColor;
    terminalDisplay?: TerminalDisplay;
    terminalKeyboard?: TerminalKeyboard;
}

export declare interface TerminalDisplayOptions {
    canvas: HTMLCanvasElement;
    canvasWidth?: number;
    canvasHeight?: number;
}

export declare interface TerminalKeyboardOptions {
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
    MoveBufferArea(sourceArea: TerminalArea, targetCoordinate: TerminalCoordinate, replace?: TerminalField): void;
    async Read(intercept?: boolean): Promise<TerminalKeyInfo>;
    async ReadLine(intercept?: boolean): Promise<string|undefined>;
    ResetColor(): void;
    SetBufferSize(size: TerminalSize): void;
    SetCursorPosition(coordinate: TerminalCoordinate): void;
    SetWindowPosition(coordinate: TerminalCoordinate): void;
    SetWindowSize(size: TerminalSize): void;
    Write(value: string): void;
    WriteLine(value?: string): void;
}

export declare class TerminalDisplay {
    constructor(options: TerminalDisplayOptions);
}

export declare class TerminalKeyboard {
    constructor(options: TerminalKeyboardOptions);
}