import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, httpResource } from '@angular/common/http';

import { Member, memberFormData } from '../shared/models/member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  membersAPIUrl = environment.membersAPI;
  allMembers = httpResource<Member[]>(() => this.membersAPIUrl);
  httpClient = inject(HttpClient);

  getAllMembers() {
    return this.allMembers;
  }

  getMemberById(id: string) {
    const memberId = +id;
    return httpResource<Member>(() => `${this.membersAPIUrl}${memberId}`);
  }

  updateMember(member: memberFormData): Observable<Member> {
    const updatedMember = {
      id: +member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      age: +member.age,
    };
    return this.httpClient.put<Member>(
      `${this.membersAPIUrl}${updatedMember.id}`,
      updatedMember,
    );
  }

  deleteMember(id: number): Observable<Member> {
    return this.httpClient.delete<Member>(`${this.membersAPIUrl}${id}`);
  }
}
