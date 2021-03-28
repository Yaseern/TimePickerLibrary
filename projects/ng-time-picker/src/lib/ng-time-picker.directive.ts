import { AfterViewInit, Directive, ElementRef, Input } from "@angular/core";

@Directive({ selector: '[scrollTo]' })
export class ScrollToDirective implements AfterViewInit {
    @Input("scrollTo") scrollTo: boolean;
    constructor(private elRef: ElementRef) { }
    ngAfterViewInit() {
        if (this.scrollTo) {
            this.elRef.nativeElement.scrollIntoView({ behavior: "smooth" });
        }
    }
}