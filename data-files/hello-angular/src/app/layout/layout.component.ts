import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="layout">
      <header class="layout__header bg-dark text-light">
        <div class="container layout__header-container">
          <h1 class="layout__title">Hello Angular</h1>
          <nav class="layout__nav">
            <a routerLink="/" class="layout__link">Home</a>
            <a routerLink="/about" class="layout__link">About</a>
            <a routerLink="/contact" class="layout__link">Contact</a>
          </nav>
        </div>
      </header>
      <main class="layout__main">
        <router-outlet></router-outlet>
      </main>
      <footer class="layout__footer bg-dark text-light">
        <div class="container layout__footer-container">
          <nav class="layout__footer-nav">
            <a routerLink="/" class="layout__link">Home</a>
            <a routerLink="/about" class="layout__link">About</a>
            <a routerLink="/contact" class="layout__link">Contact</a>
          </nav>
          <p class="layout__copyright">&copy; {{ currentYear }} Professor Krasso</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .bg-dark {
      background-color: #343a40;
    }
    .text-light {
      color: #f8f9fa;
    }
    .container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 15px;
    }
    .layout__header, .layout__footer {
      padding: 1rem 0;
    }
    .layout__header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .layout__title {
      margin: 0;
      font-size: 1.5rem;
    }
    .layout__nav, .layout__footer-nav {
      display: flex;
      gap: 1rem;
    }
    .layout__link {
      color: #f8f9fa;
      text-decoration: none;
    }
    .layout__link:hover {
      text-decoration: underline;
    }
    .layout__main {
      padding: 2rem 15px;
      flex: 1;
    }
    .layout__footer {
      text-align: center;
    }
    .layout__footer-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .layout__footer-nav {
      justify-content: center;
      margin-bottom: 1rem;
    }
    .layout__copyright {
      margin-top: 1rem;
      font-size: 0.875rem;
    }
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
  `]
})
export class LayoutComponent {
  currentYear: number = new Date().getFullYear();
}
