import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { architectureLayers, projects } from '../../core/data/portfolio-data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="projects" class="section">
      <div class="container">
        <div class="sec-head" appReveal>
          <span class="idx">// 03</span>
          <span>PROYECTOS</span>
          <span class="rule"></span>
          <span class="status">{{ pad(all.length) }} FILES</span>
        </div>

        <h2 class="sec-title head" appReveal>
          Trabajo que ya<br /><span class="ac">vive en producción.</span>
        </h2>

        <!-- featured -->
        <article class="module featured" *ngFor="let p of featured" appReveal>
          <span class="tk-bl"></span><span class="tk-br"></span>
          <div class="module-head">
            <span class="lead"><span class="sdot"></span> {{ p.id }}.dossier</span>
            <span class="flag">★ FEATURED</span>
          </div>
          <div class="fbody">
            <div class="fleft">
              <h3 class="ptitle display">{{ p.title }}</h3>
              <div class="meta">
                <div class="field"><span class="k">Role</span><span class="v">{{ p.role }}</span></div>
                <div class="field"><span class="k">Year</span><span class="v">{{ p.year }}</span></div>
                <div class="field"><span class="k">Stack</span><span class="v">{{ p.stack.join(' · ') }}</span></div>
              </div>
              <p class="psum">{{ p.summary }}</p>
              <ul class="points">
                <li *ngFor="let h of p.highlights"><span class="ac">›</span> {{ h }}</li>
              </ul>
            </div>
            <div class="fright">
              <div class="arch-cap">CLEAN_ARCHITECTURE //</div>
              <div class="layer" *ngFor="let l of layers; let i = index">
                <span class="ln">{{ pad(i + 1) }}</span>
                <div class="lc">
                  <strong>{{ l.label }}</strong>
                  <p>{{ l.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- others -->
        <div class="grid">
          <article class="module card" *ngFor="let p of others" appReveal>
            <span class="tk-bl"></span><span class="tk-br"></span>
            <div class="module-head">
              <span class="lead"><span class="sdot"></span> {{ p.id }}.dossier</span>
              <span>{{ p.year }}</span>
            </div>
            <div class="module-body">
              <h3 class="display">{{ p.title }}</h3>
              <p class="prole">{{ p.role }}</p>
              <p class="psum">{{ p.summary }}</p>
              <div class="tags">
                <span *ngFor="let s of p.stack">{{ s }}</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .ac { color: var(--accent); }
      .head { margin-bottom: clamp(2rem, 5vh, 3rem); }

      .featured { margin-bottom: 1.4rem; }
      .flag { color: var(--accent); }
      .fbody {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        gap: clamp(1.5rem, 4vw, 3rem);
        padding: 1.4rem;
      }
      .ptitle { margin: 0 0 1.1rem; font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 600; letter-spacing: -0.03em; }
      .meta { margin-bottom: 1.2rem; }
      .meta .field { grid-template-columns: 5rem 1fr; }
      .psum { margin: 0 0 1.2rem; color: var(--muted); line-height: 1.7; }
      .points { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.55rem; }
      .points li { color: var(--text); font-size: 0.9rem; line-height: 1.5; display: flex; gap: 0.5rem; }

      .arch-cap {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.66rem;
        letter-spacing: 0.16em;
        color: var(--faint);
        margin-bottom: 0.8rem;
      }
      .layer {
        display: flex;
        gap: 0.8rem;
        padding: 0.9rem;
        border: 1px solid var(--line);
        border-left: 2px solid var(--accent);
        margin-bottom: 0.6rem;
        background: rgba(255,255,255,0.012);
      }
      .layer .ln { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--accent); }
      .lc strong { display: block; font-size: 0.95rem; margin-bottom: 0.25rem; }
      .lc p { margin: 0; color: var(--muted); font-size: 0.8rem; line-height: 1.5; }

      .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.4rem; }
      .card h3 { margin: 0 0 0.25rem; font-size: 1.45rem; font-weight: 600; }
      .prole { font-family: 'JetBrains Mono', monospace; font-size: 0.74rem; color: var(--accent); margin: 0 0 0.9rem; }
      .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1rem; }
      .tags span {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        padding: 0.35rem 0.6rem;
        border: 1px solid var(--line);
        color: var(--muted);
      }

      @media (max-width: 860px) {
        .fbody { grid-template-columns: 1fr; }
        .grid { grid-template-columns: 1fr; }
      }
    `
  ]
})
export class ProjectsComponent {
  readonly all = projects;
  readonly featured = projects.filter((p) => p.featured);
  readonly others = projects.filter((p) => !p.featured);
  readonly layers = architectureLayers;

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
