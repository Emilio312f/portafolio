import { Component, HostListener, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-cursor',
  standalone: true,
  template: '<div class="cursor-dot" [style.transform]="transform()"></div>'
})
export class CursorComponent implements OnDestroy {
  private readonly x = signal<number>(-100);
  private readonly y = signal<number>(-100);
  private frameId = 0;

  transform = signal('translate(-50%, -50%) translate3d(-100px, -100px, 0)');

  @HostListener('document:mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    cancelAnimationFrame(this.frameId);
    this.frameId = requestAnimationFrame(() => {
      this.x.set(event.clientX);
      this.y.set(event.clientY);
      this.transform.set(`translate(-50%, -50%) translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
    });
  }

  @HostListener('document:mousedown')
  onDown(): void {
    document.documentElement.style.setProperty('--cursor-scale', '1.5');
  }

  @HostListener('document:mouseup')
  onUp(): void {
    document.documentElement.style.setProperty('--cursor-scale', '1');
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frameId);
  }
}