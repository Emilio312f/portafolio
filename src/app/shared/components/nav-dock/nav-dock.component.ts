import { AfterViewInit, Component, HostListener, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { personal } from '../../../core/data/portfolio-data';

interface NavItem {
  id: string;
  label: string;
}

@Component({
  selector: 'app-nav-dock',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="topnav" [class.scrolled]="scrolled()">
      <a class="brand" (click)="scrollTo('hero')">
        <span class="brand-mark mono">ER</span>
        <span class="brand-name">{{ name }}</span>
      </a>

      <nav class="links">
        <button
          *ngFor="let item of items"
          type="button"
          class="link mono"
          [class.active]="active() === item.id"
          (click)="scrollTo(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <a class="cta" (click)="scrollTo('contact')">
        <span class="dot"></span> Disponible
      </a>

      <button type="button" class="burger" (click)="menuOpen.set(!menuOpen())" [class.open]="menuOpen()">
        <span></span><span></span>
      </button>
    </header>

    <div class="mobile-menu" [class.open]="menuOpen()">
      <button
        *ngFor="let item of items"
        type="button"
        class="m-link display"
        [class.active]="active() === item.id"
        (click)="scrollTo(item.id); menuOpen.set(false)"
      >
        {{ item.label }}
      </button>
    </div>
  `,
  styles: [
    `
      :host { --h: 64px; }

      .topnav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: var(--h);
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0 clamp(1rem, 4vw, 2.4rem);
        transition: background 0.4s var(--ease), border-color 0.4s var(--ease), backdrop-filter 0.4s var(--ease);
        border-bottom: 1px solid transparent;
      }
      .topnav.scrolled {
        background: rgba(8, 8, 16, 0.6);
        border-bottom: 1px solid var(--line);
        backdrop-filter: blur(18px);
        -webkit-backdrop-filter: blur(18px);
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        cursor: pointer;
      }
      .brand-mark {
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        border-radius: 9px;
        font-weight: 700;
        font-size: 0.82rem;
        color: #07070d;
        background: var(--grad);
        box-shadow: 0 6px 20px rgba(124, 92, 255, 0.4);
      }
      .brand-name {
        font-weight: 600;
        font-size: 0.95rem;
        letter-spacing: -0.01em;
      }

      .links {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        margin: 0 auto;
        padding: 0.3rem;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: rgba(255, 255, 255, 0.02);
        backdrop-filter: blur(10px);
      }
      .link {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.5rem 0.85rem;
        border-radius: 999px;
        font-size: 0.74rem;
        letter-spacing: 0.02em;
        color: var(--muted);
        transition: color 0.25s var(--ease), background 0.25s var(--ease);
      }
      .link:hover { color: var(--text); }
      .link.active {
        color: var(--text);
        background: rgba(124, 92, 255, 0.16);
        box-shadow: inset 0 0 0 1px rgba(124, 92, 255, 0.4);
      }

      .cta {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.9rem;
        border-radius: 999px;
        border: 1px solid var(--line);
        background: var(--surface-2);
        font-size: 0.78rem;
        color: var(--muted);
        cursor: pointer;
        transition: 0.25s var(--ease);
      }
      .cta:hover { color: var(--text); border-color: rgba(139, 233, 168, 0.5); }
      .dot {
        width: 7px; height: 7px;
        border-radius: 999px;
        background: var(--lime);
        box-shadow: 0 0 10px var(--lime);
        animation: pulse 2s ease infinite;
      }
      @keyframes pulse { 50% { opacity: 0.4; } }

      .burger {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 6px;
      }
      .burger span {
        width: 22px; height: 2px;
        background: var(--text);
        border-radius: 2px;
        transition: 0.3s var(--ease);
      }
      .burger.open span:first-child { transform: translateY(3.5px) rotate(45deg); }
      .burger.open span:last-child { transform: translateY(-3.5px) rotate(-45deg); }

      .mobile-menu {
        position: fixed;
        inset: var(--h) 0 auto 0;
        z-index: 99;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        padding: 1rem clamp(1rem, 5vw, 2rem) 1.5rem;
        background: rgba(8, 8, 16, 0.92);
        border-bottom: 1px solid var(--line);
        backdrop-filter: blur(20px);
        transform: translateY(-110%);
        opacity: 0;
        pointer-events: none;
        transition: transform 0.4s var(--ease), opacity 0.3s var(--ease);
      }
      .mobile-menu.open { transform: translateY(0); opacity: 1; pointer-events: auto; }
      .m-link {
        background: transparent;
        border: none;
        text-align: left;
        cursor: pointer;
        padding: 0.7rem 0.4rem;
        font-size: 1.4rem;
        color: var(--muted);
        border-bottom: 1px solid var(--line);
      }
      .m-link.active { color: var(--text); }

      @media (max-width: 880px) {
        .links, .cta { display: none; }
        .burger { display: flex; }
        .brand-name { display: none; }
      }
    `
  ]
})
export class NavDockComponent implements AfterViewInit, OnDestroy {
  readonly name = personal.name;
  readonly items: NavItem[] = [
    { id: 'about', label: 'Sobre mí' },
    { id: 'skills', label: 'Stack' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'timeline', label: 'Trayectoria' },
    { id: 'contact', label: 'Contacto' }
  ];

  readonly active = signal('hero');
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);

  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const ids = ['hero', ...this.items.map((i) => i.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.active.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((s) => this.observer?.observe(s));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
