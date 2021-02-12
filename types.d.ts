declare type card = { word: string, definition: string, id: string }
declare type set = card[]
type Dict<T> = {
    [P in keyof any]: T;
};
declare namespace chrome.scripting {
    export function executeScript(injection: ScriptInjection, callback?: () => void)

    export function insertCSS(injection: CSSInjection, callback?: () => void)

    // export function executeScript(injection: SquareConfig, callback?: () => void)
}

interface Injection {
    files: string[]
    target: InjectionTarget
}

interface ScriptInjection extends Injection {

}

interface CSSInjection extends Injection {

}

interface InjectionTarget {
    tabId: number
}
