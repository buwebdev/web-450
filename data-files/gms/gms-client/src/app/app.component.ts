import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <header>
        <h1>Welcome to the MEAN Stack Starter Project</h1>
      </header>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <main>
        <section>
          <router-outlet />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 MEAN Stack Project</p>
      </footer>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      text-align: center;
      padding: 0;
      margin: 0 auto;
    }

    header, footer {
      background-color: #f8f9fa;
      padding: 10px 0;
    }

    nav ul {
      list-style-type: none;
      padding: 0;
    }

    nav ul li {
      display: inline;
      margin-right: 10px;
    }

    main {
      flex: 1;
    }
  `
})
export class AppComponent {
  title = 'ets-client';
}
