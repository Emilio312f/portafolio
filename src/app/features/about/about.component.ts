import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { personal } from '../../core/data/portfolio-data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="about" class="section">
      <div class="container">
        <div class="sec-head" appReveal>
          <span class="idx">// 01</span>
          <span>SOBRE_MÍ</span>
          <span class="rule"></span>
          <span class="status">READ</span>
        </div>

        <div class="grid">
          <div class="left" appReveal>
            <h2 class="sec-title">
              Junior por años,<br /><span class="ac">senior por estándares.</span>
            </h2>
            <p class="bio">
              Soy <strong>{{ fullName }}</strong>, {{ tagline }} en 8.º ciclo. Trabajo a diario con
              <strong>Angular, React, TypeScript</strong> y <strong>Kotlin Multiplatform</strong>, y me obsesiona
              que el código sea tan limpio como la interfaz: arquitectura por capas, SOLID y componentes que escalan.
            </p>
            <p class="bio">
              No solo entrego pantallas: pienso en producto, performance y en cómo cada decisión técnica impacta al
              negocio. He competido en <strong>4 hackathons nacionales</strong> y construido un
              <strong>ERP multi-tenant</strong> real en producción.
            </p>
            <div class="traits">
              <span class="t" *ngFor="let tr of traits">{{ tr }}</span>
            </div>
          </div>

          <aside class="module" appReveal>
            <span class="tk-bl"></span><span class="tk-br"></span>
            <div class="module-head">
              <span class="lead"><span class="sdot"></span> PROFILE.DAT</span>
              <span>0x02</span>
            </div>
            <div class="module-body">
              <div class="field"><span class="k">Nombre</span><span class="v">{{ fullName }}</span></div>
              <div class="field"><span class="k">Rol</span><span class="v">{{ role }}</span></div>
              <div class="field"><span class="k">Estudios</span><span class="v">Ing. Sistemas · 8.º ciclo (UPN)</span></div>
              <div class="field"><span class="k">Base</span><span class="v">{{ location }}</span></div>
              <div class="field"><span class="k">Idiomas</span><span class="v">Español · Inglés (avanzado)</span></div>
              <div class="field"><span class="k">Foco</span><span class="v">Producto · Arquitectura · Performance</span></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .ac { color: var(--accent); }
      .grid {
        display: grid;
        grid-template-columns: 1.15fr 0.85fr;
        gap: clamp(2rem, 5vw, 4rem);
        align-items: start;
      }
      .bio {
        margin: 1.4rem 0 0;
        color: var(--muted);
        font-size: clamp(1rem, 1.4vw, 1.15rem);
        line-height: 1.8;
      }
      .bio strong { color: var(--text); font-weight: 600; }
      .traits { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.6rem; }
      .t {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        padding: 0.45rem 0.75rem;
        border: 1px solid var(--line);
        color: var(--muted);
      }
      .t:hover { border-color: var(--accent); color: var(--text); }
      .module .v.ok { color: var(--lime); }

      @media (max-width: 860px) {
        .grid { grid-template-columns: 1fr; }
      }
    `
  ]
})
export class AboutComponent {
  readonly fullName = personal.fullName;
  readonly tagline = personal.tagline;
  readonly role = personal.role;
  readonly location = personal.location;
  readonly traits = ['Clean Architecture', 'SOLID', 'Microservicios', 'RxJS · Signals', 'UX/UI', 'Docker'];
}
