import { Routes } from '@angular/router';
import { MembersComponent } from './members-component/members-component';
import { DetailsComponent } from './members-component/details-component/details-component';

export const routes: Routes = [
  { path: '', component: MembersComponent },
  { path: 'details/:id', component: DetailsComponent },
];
