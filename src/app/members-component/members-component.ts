import { Component, inject, signal } from '@angular/core';
import { MembersListComponent } from './members-list-component/members-list-component';
import { MembersService } from '../services/members-service';
import { Member } from '../shared/models/member';

@Component({
  selector: 'app-members-component',
  imports: [MembersListComponent],
  templateUrl: './members-component.html',
  styleUrl: './members-component.css',
})
export class MembersComponent {
  members = inject(MembersService).getAllMembers();
}
