import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, httpResource } from '@angular/common/http';

import { Member } from '../shared/models/member';
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

  deleteMember(id: number): Observable<Member> {
    return this.httpClient.delete<Member>(`${this.membersAPIUrl}${id}`);
  }
}
