import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { skillCategories } from '../../core/data/portfolio-data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="skills" class="section">
      <div class="container">
        <div class="sec-head" appReveal>
          <span class="idx">// 02</span>
          <span>STACK_TÉCNICO</span>
          <span class="rule"></span>
          <span class="status">LOADED</span>
        </div>

        <h2 class="sec-title head" appReveal>
          Herramientas que domino<br /><span class="ac">de la UI a la base de datos.</span>
        </h2>

        <div class="grid">
          <div class="module" *ngFor="let cat of categories; let i = index" appReveal>
            <span class="tk-bl"></span><span class="tk-br"></span>
            <div class="module-head">
              <span class="lead"><span class="sdot"></span> {{ cat.title }}</span>
              <span>{{ pad(cat.items.length) }}</span>
            </div>
            <div class="module-body">
              <ul class="techs">
                <li *ngFor="let item of cat.items">
                  <span class="mk">›</span>{{ item.label }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .ac { color: var(--accent); }
      .head { margin-bottom: clamp(2rem, 5vh, 3rem); }
      .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.4rem 1.4rem;
      }
      .techs {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.6rem 1.2rem;
      }
      .techs li {
        display: flex;
        align-items: center;
        gap: 0.55rem;
        font-size: 0.92rem;
        color: var(--text);
      }
      .techs .mk { color: var(--accent); font-family: 'JetBrains Mono', monospace; }

      @media (max-width: 760px) {
        .grid { grid-template-columns: 1fr; }
      }
    `
  ]
})
export class SkillsComponent {
  readonly categories = skillCategories;

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
