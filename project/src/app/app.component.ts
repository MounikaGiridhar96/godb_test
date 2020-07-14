import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  button: any;
  title(title: any) {
    throw new Error("Method not implemented.");
  }
  constructor(private router:Router){}
nav()
{
  this.button=!this.button
  this.router.navigate(['/login'])
}
}
