import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mower-header',
  template: `<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="#">MowerApp</a>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
              <a class="nav-link" routerLink="/">Home
                  <span class="sr-only">(current)</span>
              </a>
          </li>
          <li class="nav-item">
              <a class="nav-link" routerLink="history">History
                  <span class="sr-only">(current)</span>
              </a>
          </li>
      </ul>
  </div>
</nav>`,
})
export class MowerHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

//   goToFilesList() {
//     this.router.navigate(['/history']);
//   }


}
