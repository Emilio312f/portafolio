import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { timeline } from '../../core/data/portfolio-data';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="timeline" class="section">
      <div class="container">
        <div class="sec-head" appReveal>
          <span class="idx">// 04</span>
          <span>SYSTEM_LOG</span>
          <span class="rule"></span>
          <span class="status">{{ pad(items.length) }} ENTRIES</span>
        </div>

        <h2 class="sec-title head" appReveal>
          Aprendiendo en la cancha:<br /><span class="ac">hackathons y producto real.</span>
        </h2>

        <div class="log">
          <div class="entry" *ngFor="let t of items; let i = index" appReveal>
            <div class="lcol">
              <span class="ln mono">{{ pad(items.length - i) }}</span>
              <span class="node"></span>
            </div>
            <div class="ecard">
              <div class="etop">
                <span class="tag mono" [class.work]="t.kind === 'work'">{{ kindLabel(t.kind) }}</span>
                <span class="year mono">{{ t.year }}</span>
              </div>
              <h3 class="display">{{ t.title }}</h3>
              <p class="org mono">{{ t.org }}</p>
              <p class="desc">{{ t.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .ac { color: var(--accent); }
      .mono { font-family: 'JetBrains Mono', monospace; }
      .head { margin-bottom: clamp(2rem, 5vh, 3rem); }

      .log { position: relative; }
      .entry {
        display: grid;
        grid-template-columns: 3rem 1fr;
        gap: 1rem;
        padding-bottom: 1rem;
      }
      .lcol { position: relative; display: flex; flex-direction: column; align-items: center; }
      .ln { font-size: 0.7rem; color: var(--faint); margin-bottom: 0.5rem; }
      .node {
        width: 10px; height: 10px;
        border: 1px solid var(--accent);
        background: var(--bg);
        position: relative;
        z-index: 1;
      }
      .lcol::after {
        content: '';
        position: absolute;
        top: 1.6rem; bottom: -1rem;
        width: 1px;
        background: var(--line);
      }
      .entry:last-child .lcol::after { display: none; }

      .ecard {
        border: 1px solid var(--line);
        border-left: 2px solid var(--accent);
        padding: 1.1rem 1.3rem;
        background: rgba(255,255,255,0.012);
      }
      .etop { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.6rem; }
      .tag {
        font-size: 0.62rem;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--accent);
        border: 1px solid var(--line-strong);
        padding: 0.2rem 0.45rem;
      }
      .tag.work { color: var(--lime); }
      .year { font-size: 0.72rem; color: var(--faint); }
      .ecard h3 { margin: 0 0 0.25rem; font-size: 1.1rem; font-weight: 600; line-height: 1.3; }
      .org { margin: 0 0 0.5rem; font-size: 0.76rem; color: var(--muted); }
      .desc { margin: 0; color: var(--muted); font-size: 0.9rem; line-height: 1.6; }
    `
  ]
})
export class TimelineComponent {
  readonly items = timeline;

  kindLabel(kind: 'work' | 'hackathon' | 'edu'): string {
    return kind === 'work' ? 'DEPLOY' : kind === 'hackathon' ? 'HACKATHON' : 'EDU';
  }
  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
