import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <div class="container">
    <nav class="side-menu">
      <h2>Menu</h2>
      <a routerLink="/">Home</a>
      <a routerLink="/about">About</a>
      <a routerLink="/contact">Contact</a>
    </nav>

    <div class="main-content">
      <header>
        {{ title }}
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>

    <footer>
      &copy; 2024 Professor Krasso
    </footer>
  </div>
`,
styles: `
     .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .side-menu {
    width: 250px; /* Increased width for the navigation menu */
    background-color: #343a40; /* Bootstrap dark background color */
    color: white;
    padding: 20px 10px; /* Added padding at the top */
    height: 100vh; /* Full height of the viewport */
    position: fixed; /* Fix the position to the left */
  }

  .side-menu h2 {
    margin-top: 0;
    border-bottom: 1px solid white; /* Add a line below the title */
    padding-bottom: 5px;
  }

  .side-menu a {
    display: block;
    margin-bottom: 10px;
    color: white;
    text-decoration: none;
  }

  .side-menu a:hover {
    text-decoration: underline;
  }

  .main-content {
    margin-left: 270px; /* Adjusted space to the left for the wider side menu */
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  header {
    text-align: center;
    font-size: 1.5em;
    margin-bottom: 20px; /* Add gap below the header */
    padding: 20px;
  }

  main {
    flex: 1;
    padding: 10px;
  }

  footer {
    text-align: center;
    background-color: #f8f9fa; /* Bootstrap light background color */
    color: black;
    padding: 10px;
    margin-top: auto; /* Push footer to the bottom */
  }
`
})
export class AppComponent {
  title = 'Welcome to the MEAN Stack!';
}
