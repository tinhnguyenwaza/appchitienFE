import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Member } from './model/member.model';
import { Bill } from './model/bill.model';
import { BillDetail } from './model/billdetail.model';


export interface User {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  private apiUrl = 'http://localhost:8088/api/v1/common'; // Địa chỉ API

  constructor(private http: HttpClient) {}


  addMember(member: Member): Observable<Member> {
    return this.
    http.post<Member>(`${this.apiUrl}/addMenber`, member);
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/all`);
  }

  updateMember(id: number, member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}/update/${id}`, member);
  }

  deleteMember(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getMaxBillId(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getMaxBillId`);
  }

  // saveBillDetail1(billDetail: billDetail[]): Observable<BillDetail> {
  //   return this.http.post<BillDetail>(`${this.apiUrl}/addBillDetail`, billDetail).pipe(
  //     catchError((error: any) => { // Explicitly typing 'error' as 'any'
  //       console.error('Error saving bill detail:', error);
  //       return throwError(error);
  //     })
  //   );
  // }

  saveBillDetail(billDetail: BillDetail[]): Observable<BillDetail> { // Changed return type to Observable<BillDetail>
    return this.http.post<BillDetail>(`${this.apiUrl}/addAllBillDetail`, billDetail);
  }

  saveBill(bill: Bill): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addBill`, bill);
  }

  getBillDetailToIDStatus(): Observable<BillDetail[]> {
    return this.http.get<BillDetail[]>(`${this.apiUrl}/getBillDetailToIDBill`);
  }

  getBillToStatus(): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/getBillToStatus`);
  }
  
  UpdateBilllStatus(bill: Bill): Observable<Bill> { // Changed return type to Observable<Bill>
    return this.http.put<Bill>(`${this.apiUrl}/updateBill/${bill.id}`, bill);
  }
}
