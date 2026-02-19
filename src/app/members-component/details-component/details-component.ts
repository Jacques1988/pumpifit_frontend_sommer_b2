import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MembersService } from '../../services/members-service';

@Component({
  selector: 'app-details-component',
  imports: [RouterLink],
  templateUrl: './details-component.html',
  styleUrl: './details-component.css',
})
export class DetailsComponent {
  route = inject(ActivatedRoute);
  memberId = toSignal<string | null | undefined>(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: null },
  );
  memberService = inject(MembersService);
  member = this.memberService.getMemberById(this.memberId()!);

  constructor() {
    setTimeout(() => {
      console.log(this.member.value());
    }, 2000);
  }
}
