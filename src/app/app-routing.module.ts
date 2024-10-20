import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberComponent } from './member/member.component'; 
import { BillComponent } from './bill/bill.component';
import { AppComponent } from './app.component';
import { BilldetailComponent } from './billdetail/billdetail.component';
const routes: Routes = [
  { path: 'member', component: MemberComponent },
  { path: 'bill', component: BillComponent },
  { path: 'about', component: BillComponent }, 
  { path: 'billDetail', component: BilldetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
