import { Component, input, inject } from '@angular/core';
import { Member } from '../../shared/models/member';
import { MembersService } from '../../services/members-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-members-list-component',
  imports: [RouterLink],
  templateUrl: './members-list-component.html',
  styleUrl: './members-list-component.css',
})
export class MembersListComponent {
  member = input.required<Member>();
  memberService = inject(MembersService);

  onDeleteMember(id: number) {
    this.memberService.deleteMember(id).subscribe({
      next: () => this.memberService.allMembers.reload(),
      error: (err) => console.warn(err),
    });
  }
}
