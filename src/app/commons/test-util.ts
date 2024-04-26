import { DebugElement } from "@angular/core";

export function click(el: DebugElement | HTMLElement): void {
    if(el instanceof HTMLElement) {
        el.click();
    } else {
        el.triggerEventHandler('click');
    }
}