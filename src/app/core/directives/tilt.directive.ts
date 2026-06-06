import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    const element = this.elementRef.nativeElement;
    const bounds = element.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - y) * 10;
    const rotateY = (x - 0.5) * 12;

    element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.elementRef.nativeElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }
}