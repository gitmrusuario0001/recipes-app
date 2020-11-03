import { Renderer2 } from '@angular/core';
import { Directive, HostListener, HostBinding, EventEmitter, Output, ElementRef } from '@angular/core';
@Directive({
  selector: '[appDropDown]'
})
export class DropdownDirective {
  @Output() selectedDropdown = new EventEmitter<boolean>();
  @HostBinding('class.show') isOpen = false;

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }
  // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  //   this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  // }
  @HostListener('click') toggleOpen(event: Event) {
    console.log('clicked');
    const dropdown = this.elementRef.nativeElement.nextElementSibling;
    if (!this.isOpen) {
      this.renderer.addClass(dropdown, 'show');
    } else {
      this.renderer.removeClass(dropdown, 'show');
    }
    this.isOpen = !this.isOpen;
    // this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
    this.selectedDropdown.emit(this.isOpen);
  }


}
