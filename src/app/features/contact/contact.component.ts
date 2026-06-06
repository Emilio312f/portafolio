import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../core/directives/reveal.directive';
import { personal } from '../../core/data/portfolio-data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealDirective],
  template: `
    <section id="contact" class="section">
      <div class="container">
        <div class="sec-head" appReveal>
          <span class="idx">// 05</span>
          <span>UPLINK</span>
          <span class="rule"></span>
          <span class="status">OPEN</span>
        </div>

        <h2 class="sec-title head" appReveal>
          ¿Tienes un proyecto<br /><span class="ac">en mente?</span>
        </h2>

        <div class="grid">
          <div class="module" appReveal>
            <span class="tk-bl"></span><span class="tk-br"></span>
            <div class="module-head">
              <span class="lead"><span class="sdot live"></span> TERMINAL</span>
              <span>tty/01</span>
            </div>
            <div class="module-body term">
              <p><span class="p">$</span> whoami</p>
              <p class="o">{{ fullName }}</p>
              <p><span class="p">$</span> cat status.log</p>
              <p class="o ok">● Disponible para freelance, prácticas y colaboraciones.</p>
              <p><span class="p">$</span> contact --list</p>
              <p class="o">{{ email }}</p>
              <p class="o ok">WhatsApp · usa el botón ▸</p>
              <p class="o">{{ location }}<span class="blink">_</span></p>

              <div class="quick">
                <a class="q wa" [href]="'https://wa.me/' + waNumber" target="_blank" rel="noopener">[ WHATSAPP ]</a>
                <button class="q" (click)="copyEmail()">{{ copied() ? '[ COPIADO ]' : '[ COPIAR EMAIL ]' }}</button>
                <a class="q" href="assets/CV-Emilio-Ramirez.pdf" download target="_blank" rel="noopener">[ CV.PDF ↓ ]</a>
                <a class="q" [href]="github" target="_blank" rel="noopener">[ GITHUB ]</a>
                <a class="q" [href]="linkedin" target="_blank" rel="noopener">[ LINKEDIN ]</a>
              </div>
            </div>
          </div>

          <form class="module" appReveal (ngSubmit)="send()">
            <span class="tk-bl"></span><span class="tk-br"></span>
            <div class="module-head">
              <span class="lead"><span class="sdot"></span> TRANSMIT</span>
              <span>msg/new</span>
            </div>
            <div class="module-body">
              <label><span class="k">// nombre</span>
                <input name="name" [(ngModel)]="form.name" placeholder="tu nombre" required />
              </label>
              <label><span class="k">// email</span>
                <input type="email" name="email" [(ngModel)]="form.email" placeholder="tucorreo@empresa.com" required />
              </label>
              <label><span class="k">// mensaje</span>
                <textarea name="message" rows="4" [(ngModel)]="form.message" placeholder="hola emilio, queremos construir…" required></textarea>
              </label>
              <button type="submit" class="send">{{ sendLabel() }}</button>
              <p class="stat mono ok" *ngIf="status() === 'ok'">{{ statusLine() }}</p>
            </div>
          </form>
        </div>

        <footer class="foot mono">
          <span>© {{ year }} {{ name }} · TRUJILLO, PE</span>
          <span class="dim">BUILD :: Angular · TypeScript</span>
        </footer>
      </div>
    </section>
  `,
  styles: [
    `
      .ac { color: var(--accent); }
      .mono { font-family: 'JetBrains Mono', monospace; }
      .head { margin-bottom: clamp(2rem, 5vh, 3rem); }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.4rem; }

      .term { font-family: 'JetBrains Mono', monospace; font-size: 0.84rem; line-height: 1.8; }
      .term p { margin: 0; }
      .term .p { color: var(--accent); margin-right: 0.5rem; }
      .term .o { color: var(--muted); }
      .term .o.ok { color: var(--lime); }

      .quick { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.2rem; }
      .q {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        padding: 0.5rem 0.7rem;
        border: 1px solid var(--line-strong);
        color: var(--muted);
        cursor: pointer;
        background: transparent;
        transition: 0.25s var(--ease);
      }
      .q:hover { border-color: var(--accent); color: var(--text); }
      .q.wa { border-color: color-mix(in srgb, var(--lime) 55%, var(--line-strong)); color: var(--lime); }
      .q.wa:hover { border-color: var(--lime); color: var(--lime); }

      label { display: block; margin-bottom: 0.9rem; }
      label .k {
        display: block;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.68rem;
        letter-spacing: 0.1em;
        color: var(--faint);
        margin-bottom: 0.4rem;
      }
      input, textarea {
        width: 100%;
        padding: 0.7rem 0.85rem;
        border: 1px solid var(--line);
        background: rgba(0,0,0,0.25);
        color: var(--text);
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.86rem;
        resize: vertical;
        transition: border-color 0.2s var(--ease);
      }
      input::placeholder, textarea::placeholder { color: var(--faint); }
      input:focus, textarea:focus { outline: none; border-color: var(--accent); }
      .send {
        width: 100%;
        margin-top: 0.3rem;
        padding: 0.85rem;
        background: var(--accent);
        color: #100E0B;
        border: none;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8rem;
        letter-spacing: 0.08em;
        cursor: pointer;
        transition: background 0.2s var(--ease);
      }
      .send:hover { background: #ED6E47; }
      .send:disabled { opacity: 0.6; cursor: wait; }
      .stat { margin: 0.7rem 0 0; font-size: 0.74rem; color: var(--muted); }
      .stat.ok { color: var(--lime); }
      .stat.err { color: var(--accent); }

      .foot {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin-top: 2.4rem;
        padding-top: 1.4rem;
        border-top: 1px solid var(--line);
        font-size: 0.72rem;
        color: var(--muted);
      }
      .dim { color: var(--faint); }

      @media (max-width: 760px) {
        .grid { grid-template-columns: 1fr; }
      }
    `
  ]
})
export class ContactComponent {
  readonly name = personal.name;
  readonly fullName = personal.fullName;
  readonly location = personal.location;
  readonly email = personal.email;
  readonly phone = personal.phone;
  readonly github = personal.github;
  readonly linkedin = personal.linkedin;
  readonly year = new Date().getFullYear();

  // Número de WhatsApp (derivado del teléfono, solo dígitos con código país).
  readonly waNumber = personal.phone.replace(/\D/g, '');

  readonly copied = signal(false);
  readonly status = signal<'idle' | 'ok'>('idle');
  form = { name: '', email: '', message: '' };

  copyEmail(): void {
    navigator.clipboard?.writeText(this.email).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    });
  }

  sendLabel(): string {
    return '[ ENVIAR POR WHATSAPP ▸ ]';
  }

  statusLine(): string {
    return this.status() === 'ok' ? '> ✓ Abriendo WhatsApp con tu mensaje…' : '';
  }

  send(): void {
    if (!this.form.name || !this.form.email || !this.form.message) return;

    const text =
      `Hola Emilio, soy *${this.form.name}*.\n\n` +
      `${this.form.message}\n\n` +
      `Mi correo: ${this.form.email}\n` +
      `— enviado desde tu portfolio`;

    window.open(`https://wa.me/${this.waNumber}?text=${encodeURIComponent(text)}`, '_blank');
    this.status.set('ok');
    setTimeout(() => this.status.set('idle'), 4000);
  }
}
