import { Component, inject, signal, effect } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MembersService } from '../../services/members-service';
import {
  form,
  FormField,
  submit,
  required,
  readonly,
} from '@angular/forms/signals';
import { memberFormData } from '../../shared/models/member';

@Component({
  selector: 'app-details-component',
  imports: [RouterLink, FormField],
  templateUrl: './details-component.html',
  styleUrl: './details-component.css',
})
export class DetailsComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  memberId = toSignal<string | null | undefined>(
    this.route.paramMap.pipe(map((params) => params.get('id'))),
    { initialValue: null },
  );
  memberService = inject(MembersService);
  member = this.memberService.getMemberById(this.memberId()!);
  memberFormModel = signal<memberFormData>({
    id: '',
    first_name: '',
    last_name: '',
    age: '',
  });
  memberForm = form(this.memberFormModel, (schemePath) => {
    readonly(schemePath.id);
    required(schemePath.first_name);
    required(schemePath.last_name);
    required(schemePath.age);
  });

  constructor() {
    effect(() => {
      if (this.member.hasValue()) {
        this.memberFormModel.set({
          id: this.member.value()!.id.toString(),
          first_name: this.member.value()!.first_name,
          last_name: this.member.value()!.last_name,
          age: this.member.value()!.age.toString(),
        });
      }
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.memberForm, async () => {
      this.memberService.updateMember(this.memberFormModel()).subscribe({
        next: () => {
          this.memberService.allMembers.reload();
          this.router.navigate(['']);
        },
        error: (err) => console.warn(err),
      });
    });
  }
}
