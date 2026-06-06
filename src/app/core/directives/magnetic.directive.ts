import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    const element = this.elementRef.nativeElement;
    const bounds = element.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    element.style.transform = `translate3d(${x * 0.14}px, ${y * 0.14}px, 0)`;
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.elementRef.nativeElement.style.transform = 'translate3d(0, 0, 0)';
  }
}