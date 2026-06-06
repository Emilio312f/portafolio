import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PortfolioStateService {
  private readonly bootSeenState = signal<boolean>(false);
  private readonly activeSectionState = signal<'home' | 'about' | 'skills' | 'projects' | 'timeline' | 'contact'>('home');
  private readonly selectedProjectState = signal<string>('helcore');

  readonly bootSeen = computed(() => this.bootSeenState());
  readonly activeSection = computed(() => this.activeSectionState());
  readonly selectedProject = computed(() => this.selectedProjectState());

  markBootSeen(): void {
    this.bootSeenState.set(true);
    localStorage.setItem('dev-os-boot-seen', 'true');
  }

  restoreSession(): void {
    this.bootSeenState.set(localStorage.getItem('dev-os-boot-seen') === 'true');
  }

  setActiveSection(section: 'home' | 'about' | 'skills' | 'projects' | 'timeline' | 'contact'): void {
    this.activeSectionState.set(section);
  }

  setSelectedProject(projectId: string): void {
    this.selectedProjectState.set(projectId);
  }
}