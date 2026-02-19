import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MembersComponent } from './members-component/members-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pumpifitFrontend');
}
