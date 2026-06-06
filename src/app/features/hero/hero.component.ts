import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { personal, stats } from '../../core/data/portfolio-data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="hero" class="hero">
      <div class="grid-bg"></div>
      <div class="container inner">
        <div class="left">
          <p class="kicker boot">
            <span class="ac">SYS.INIT</span> ›› {{ bootLine() }}<span class="blink">_</span>
          </p>

          <h1 class="name display">EMILIO<br />RAMÍREZ</h1>

          <p class="role">
            <span class="ac">▸</span> {{ role }} <span class="dim">// {{ tagline }}</span>
          </p>

          <p class="lede">{{ summary }}</p>

          <div class="cta">
            <button class="hud-btn primary" (click)="go('projects')">
              <span class="b">[</span> VER PROYECTOS <span class="b">]</span>
            </button>
            <button class="hud-btn" (click)="go('contact')">
              <span class="b">[</span> UPLINK / CONTACTO <span class="b">]</span>
            </button>
            <a class="hud-btn" href="assets/CV-Emilio-Ramirez.pdf" download target="_blank" rel="noopener">
              <span class="b">[</span> DESCARGAR CV ↓ <span class="b">]</span>
            </a>
          </div>

          <div class="readouts">
            <div class="ro" *ngFor="let s of statList">
              <span class="val display">{{ s.value }}<i>{{ s.suffix }}</i></span>
              <span class="lbl">{{ s.label }}</span>
            </div>
          </div>
        </div>

        <aside class="specs module">
          <span class="tk-bl"></span><span class="tk-br"></span>
          <div class="module-head">
            <span class="lead"><span class="sdot live"></span> SYSTEM_SPECS</span>
            <span>0x01</span>
          </div>
          <div class="module-body">
            <div class="field"><span class="k">ID</span><span class="v">{{ fullName }}</span></div>
            <div class="field"><span class="k">Role</span><span class="v">{{ role }}</span></div>
            <div class="field"><span class="k">Core</span><span class="v">Angular · React · TypeScript</span></div>
            <div class="field"><span class="k">Mobile</span><span class="v">Kotlin Multiplatform</span></div>
            <div class="field"><span class="k">Arch</span><span class="v">Clean · Hexagonal · SOLID</span></div>
            <div class="field"><span class="k">Base</span><span class="v">{{ location }}</span></div>
            <div class="field"><span class="k">Status</span><span class="v ok">● Disponible para proyectos</span></div>
          </div>
        </aside>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        position: relative;
        min-height: 100vh;
        min-height: 100svh;
        display: flex;
        align-items: center;
        padding: 7rem clamp(1.2rem, 4vw, 3rem) 6rem;
        overflow: hidden;
      }
      .grid-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        background-image:
          linear-gradient(var(--line) 1px, transparent 1px),
          linear-gradient(90deg, var(--line) 1px, transparent 1px);
        background-size: 70px 70px;
        mask-image: radial-gradient(110% 80% at 30% 40%, #000 35%, transparent 80%);
        -webkit-mask-image: radial-gradient(110% 80% at 30% 40%, #000 35%, transparent 80%);
        opacity: 0.6;
      }
      .inner {
        position: relative;
        z-index: 1;
        display: grid;
        grid-template-columns: 1.25fr 0.75fr;
        gap: clamp(2rem, 5vw, 4rem);
        align-items: center;
      }

      .boot { font-size: 0.74rem; margin: 0 0 1.4rem; letter-spacing: 0.14em; }
      .boot .ac { color: var(--accent); }
      .dim { color: var(--faint); }
      .ac { color: var(--accent); }

      .name {
        margin: 0;
        font-weight: 600;
        font-size: clamp(3rem, 10vw, 7rem);
        line-height: 0.92;
        letter-spacing: -0.05em;
      }
      .role {
        margin: 1.2rem 0 0;
        font-family: 'JetBrains Mono', monospace;
        font-size: clamp(0.85rem, 1.6vw, 1.05rem);
        color: var(--text);
        letter-spacing: 0.02em;
      }
      .lede {
        margin: 1.4rem 0 0;
        max-width: 40rem;
        color: var(--muted);
        font-size: clamp(0.98rem, 1.4vw, 1.12rem);
        line-height: 1.7;
      }

      .cta { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 2rem; }
      .hud-btn {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.78rem;
        letter-spacing: 0.1em;
        padding: 0.85rem 1.1rem;
        border: 1px solid var(--line-strong);
        background: transparent;
        color: var(--text);
        cursor: pointer;
        transition: 0.25s var(--ease);
      }
      .hud-btn .b { color: var(--accent); }
      .hud-btn:hover { border-color: var(--accent); background: rgba(224,96,58,0.06); }
      .hud-btn.primary { background: var(--accent); color: #100E0B; border-color: var(--accent); }
      .hud-btn.primary .b { color: #100E0B; }
      .hud-btn.primary:hover { background: #ED6E47; }

      .readouts {
        display: grid;
        grid-template-columns: repeat(4, auto);
        gap: clamp(1.2rem, 4vw, 2.6rem);
        margin-top: 2.6rem;
        padding-top: 1.6rem;
        border-top: 1px solid var(--line);
        width: fit-content;
      }
      .ro { display: flex; flex-direction: column; gap: 0.3rem; }
      .val { font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 600; line-height: 1; }
      .val i { color: var(--accent); font-style: normal; }
      .lbl {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.6rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--faint);
        max-width: 9rem;
        line-height: 1.4;
      }

      .specs { align-self: stretch; }
      .specs .v.ok { color: var(--lime); }

      @media (max-width: 920px) {
        .inner { grid-template-columns: 1fr; }
        .specs { display: none; }
      }
      @media (max-width: 520px) {
        .readouts { grid-template-columns: repeat(2, auto); }
      }
    `
  ]
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly role = personal.role;
  readonly tagline = personal.tagline;
  readonly summary = personal.summary;
  readonly fullName = personal.fullName;
  readonly location = personal.location;
  readonly statList = stats;

  readonly bootLine = signal('');
  private readonly full = 'loading profile :: OK';
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    let i = 0;
    this.timer = setInterval(() => {
      i++;
      this.bootLine.set(this.full.slice(0, i));
      if (i >= this.full.length && this.timer) clearInterval(this.timer);
    }, 40);
  }

  go(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }
}
