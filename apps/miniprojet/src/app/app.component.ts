import { Component } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
@Component({
  imports: [LoaderComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
