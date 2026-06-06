import { AfterViewInit, Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursorComponent } from './shared/components/cursor/cursor.component';
import { LandingComponent } from './features/landing/landing.component';
import { personal } from './core/data/portfolio-data';

interface NavItem { id: string; label: string; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CursorComponent, LandingComponent],
  template: `
    <div class="vignette"></div>
    <app-cursor />

    <!-- fixed HUD frame -->
    <div class="frame" aria-hidden="true">
      <span class="c tl"></span><span class="c tr"></span>
      <span class="c bl"></span><span class="c br"></span>
    </div>

    <!-- top status bar -->
    <header class="bar top">
      <div class="seg">
        <span class="sdot live"></span>
        <span class="lead">EMILIO_RAMIREZ</span>
        <span class="dim">// PORTFOLIO_OS</span>
        <span class="dim v">v2.6</span>
      </div>
      <div class="seg right">
        <span class="dim hide-sm">PE/UTC-5</span>
        <span class="clock">{{ clock() }}</span>
        <span class="ok hide-sm">● ONLINE</span>
        <button class="burger" [class.open]="menuOpen()" (click)="menuOpen.set(!menuOpen())" aria-label="Menú">
          <span></span><span></span>
        </button>
      </div>
    </header>

    <!-- mobile menu overlay -->
    <div class="mmenu" [class.open]="menuOpen()">
      <button
        *ngFor="let item of nav; let i = index"
        class="mnode"
        [class.active]="active() === item.id"
        (click)="go(item.id); menuOpen.set(false)"
      >
        <span class="mi">{{ pad(i + 1) }}</span>
        <span class="ml">{{ item.label }}</span>
      </button>
    </div>

    <!-- left rail nav -->
    <nav class="rail">
      <button
        *ngFor="let item of nav; let i = index"
        class="rnode"
        [class.active]="active() === item.id"
        (click)="go(item.id)"
      >
        <span class="ri">{{ pad(i + 1) }}</span>
        <span class="rl">{{ item.label }}</span>
        <span class="rtick"></span>
      </button>
    </nav>

    <!-- scrollable content -->
    <main class="scroll">
      <app-landing />
    </main>

    <!-- bottom status bar -->
    <footer class="bar bottom">
      <div class="seg">
        <span class="dim">LAT</span> -8.11 <span class="dim">LON</span> -79.02
        <span class="dim">//</span> TRUJILLO, PE
      </div>
      <div class="seg center prog">
        <span class="dim">SECTOR</span>
        <span class="ac">{{ pad(activeIndex() + 1) }}</span>
        <span class="dim">/ 06</span>
        <span class="pbar"><span class="pfill" [style.width.%]="((activeIndex() + 1) / 6) * 100"></span></span>
      </div>
      <div class="seg right">
        <span class="dim">SCROLL</span> <span class="arr">▼</span>
      </div>
    </footer>

    <div class="scanlines"></div>
  `,
  styles: [
    `
      :host { display: block; }

      .frame {
        position: fixed;
        inset: 12px;
        border: 1px solid var(--line);
        pointer-events: none;
        z-index: 40;
      }
      .frame .c { position: absolute; width: 14px; height: 14px; border: 1px solid var(--accent); }
      .frame .tl { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
      .frame .tr { top: -1px; right: -1px; border-left: 0; border-bottom: 0; }
      .frame .bl { bottom: -1px; left: -1px; border-right: 0; border-top: 0; }
      .frame .br { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }

      .bar {
        position: fixed;
        left: 28px; right: 28px;
        z-index: 45;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.68rem;
        letter-spacing: 0.12em;
        color: var(--muted);
        pointer-events: none;
      }
      .bar.top { top: 22px; }
      .bar.bottom { bottom: 22px; }
      .bar .seg { display: inline-flex; align-items: center; gap: 0.6rem; pointer-events: auto; }
      .bar .right { justify-content: flex-end; }
      .dim { color: var(--faint); }
      .lead { color: var(--text); }
      .v { color: var(--accent); }
      .clock { color: var(--text); font-variant-numeric: tabular-nums; }
      .ok { color: var(--lime); }
      .ac { color: var(--accent); }

      .prog { gap: 0.5rem; }
      .pbar { width: 90px; height: 4px; border: 1px solid var(--line-strong); margin-left: 0.3rem; }
      .pfill { display: block; height: 100%; background: var(--accent); transition: width 0.4s var(--ease); }
      .arr { color: var(--accent); animation: nudge 1.6s ease infinite; }
      @keyframes nudge { 50% { transform: translateY(2px); opacity: 0.5; } }

      /* left rail */
      .rail {
        position: fixed;
        left: 30px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 45;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
      }
      .rnode {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.45rem 0.3rem;
        font-family: 'JetBrains Mono', monospace;
        color: var(--faint);
        transition: color 0.25s var(--ease);
      }
      .rnode .ri { font-size: 0.66rem; }
      .rnode .rl {
        font-size: 0.66rem;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        opacity: 0;
        transform: translateX(-6px);
        transition: 0.3s var(--ease);
      }
      .rnode .rtick { width: 14px; height: 1px; background: currentColor; }
      .rnode:hover { color: var(--muted); }
      .rnode:hover .rl { opacity: 1; transform: translateX(0); }
      .rnode.active { color: var(--accent); }
      .rnode.active .rl { opacity: 1; transform: translateX(0); }
      .rnode.active .rtick { width: 24px; }

      .scroll {
        position: relative;
        z-index: 1;
        padding: 0 0 0 84px;
      }

      /* burger + mobile menu */
      .burger {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: none;
        border: none;
        cursor: pointer;
        padding: 6px;
        margin-left: 0.3rem;
        pointer-events: auto;
      }
      .burger span { width: 22px; height: 2px; background: var(--accent); transition: 0.3s var(--ease); }
      .burger.open span:first-child { transform: translateY(3.5px) rotate(45deg); }
      .burger.open span:last-child { transform: translateY(-3.5px) rotate(-45deg); }

      .mmenu {
        position: fixed;
        inset: 0;
        z-index: 44;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.4rem;
        padding: 2rem clamp(1.5rem, 8vw, 3rem);
        background: rgba(8, 8, 12, 0.96);
        backdrop-filter: blur(16px);
        opacity: 0;
        pointer-events: none;
        transform: translateY(-8px);
        transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
      }
      .mmenu.open { opacity: 1; pointer-events: auto; transform: translateY(0); }
      .mnode {
        display: flex;
        align-items: baseline;
        gap: 1rem;
        background: none;
        border: none;
        border-bottom: 1px solid var(--line);
        padding: 1rem 0.2rem;
        cursor: pointer;
        text-align: left;
        color: var(--muted);
        font-family: 'Space Grotesk', sans-serif;
      }
      .mnode .mi { font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; color: var(--accent); }
      .mnode .ml { font-size: 1.6rem; font-weight: 500; letter-spacing: -0.02em; }
      .mnode.active { color: var(--text); }

      @media (max-width: 860px) {
        .rail { display: none; }
        .scroll { padding-left: 0; }
        .bar { left: 20px; right: 20px; }
        .bar .v, .prog .pbar { display: none; }
        .burger { display: flex; }
      }
      @media (max-width: 560px) {
        .bar.bottom .center { display: none; }
        .hide-sm { display: none; }
      }
    `
  ]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  readonly name = personal.name;
  readonly nav: NavItem[] = [
    { id: 'hero', label: 'Inicio' },
    { id: 'about', label: 'Sobre' },
    { id: 'skills', label: 'Stack' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'timeline', label: 'Log' },
    { id: 'contact', label: 'Uplink' }
  ];

  readonly active = signal('hero');
  readonly clock = signal('--:--:--');
  readonly menuOpen = signal(false);

  private observer?: IntersectionObserver;
  private timer?: ReturnType<typeof setInterval>;

  activeIndex(): number {
    return Math.max(0, this.nav.findIndex((n) => n.id === this.active()));
  }

  pad(n: number): string { return n.toString().padStart(2, '0'); }

  go(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngAfterViewInit(): void {
    this.tick();
    this.timer = setInterval(() => this.tick(), 1000);

    const sections = this.nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => !!el);

    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) this.active.set(e.target.id);
        },
        { rootMargin: '-45% 0px -50% 0px' }
      );
      sections.forEach((s) => this.observer?.observe(s));
    }
  }

  private tick(): void {
    const d = new Date();
    const p = (n: number) => n.toString().padStart(2, '0');
    this.clock.set(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.timer) clearInterval(this.timer);
  }
}
