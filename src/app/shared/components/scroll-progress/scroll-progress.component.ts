import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-scroll-progress',
  standalone: true,
  template: `<div class="scroll-progress" [style.transform]="'scaleX(' + progress() + ')'"></div>`
})
export class ScrollProgressComponent {
  readonly progress = signal(0);
  private frame = 0;

  @HostListener('window:scroll')
  onScroll(): void {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      this.progress.set(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
    });
  }
}
