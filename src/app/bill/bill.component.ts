import { Component } from '@angular/core';
import { Router } from '@angular/router';
import UserService from '../user.service';
import { Member } from '../model/member.model';
import { Bill } from '../model/bill.model';
import { BillDetail } from '../model/billdetail.model';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent {
  member: Member = new Member(''); // Khởi tạo đối tượng Member
  members: Member[] = []; // Mảng để lưu các thành viên
  maxBillId: number = 0;
  billDetails: BillDetail[] = [];
  checkDisableButtonSave: boolean = false;
  checkERR: boolean = false;
  checkSaveSeccess: boolean = false;

  constructor(private userService: UserService, private Router: Router) { }


  ngOnInit(): void {
    this.userService.getMembers().subscribe((data: any) => {
      this.members = data;
    });

    this.userService.getMaxBillId().subscribe((data: any) => {
      this.maxBillId = data.id + 1;
    });
    // Set default income to 0 for each member
  }

  getTotalExpense() {

    const total = this.members.reduce((total, member) => total + (member.expense || 0), 0);
    return isNaN(total) ? 0 : total; // Trả về 0 nếu tổng là NaN
  }

  getTienTrenNguoi() {

    return Math.floor(this.getTotalExpense() / this.members.length);
  }

  getThu(expense: number) {
    return expense - this.getTienTrenNguoi();
  }

  calculateIncome() {
    this.members.forEach(member => {
      member.income = Math.floor(this.getThu(member.expense || 0)); // Sử dụng 0 nếu expense không có
    });

    if (this.getTotalExpense() > 0) {
      this.checkDisableButtonSave = true;
      this.checkERR = false;
    } else {
      this.checkERR = true;  // Thông báo cho người dùng nhập dữ liệu
      this.checkDisableButtonSave = false;
    }

  }

  deleteMember(id: number) {
    this.members = this.members.filter(member => member.id !== id)
  }

  saveBillDetail() {
    if (this.getTotalExpense() > 0) {
      this.checkDisableButtonSave = true;
      this.checkERR = false;
      this.checkSaveSeccess = true;
    } else {
      this.checkERR = true;  // Thông báo cho người dùng nhập dữ liệu
      this.checkDisableButtonSave = false;
      return;
    }

    this.billDetails = this.members.map(member => ({
      expenseAmount: member.expense || 0,
      incomeAmount: member.income || 0,
      name: member.name,
      idBill: this.maxBillId
    }));

    this.userService.saveBillDetail(this.billDetails).subscribe(() => {
      this.billDetails = [];
      location.reload(); // Reload the page after saving bill details
    });

    const bill = new Bill('Y', this.getTotalExpense(), this.members.length, 1);
    this.userService.saveBill(bill).subscribe(() => {
      setTimeout(() => {
        location.reload(); // Reload the page after a delay
      }, 6000); // Delay in milliseconds (e.g., 2000ms = 2 seconds)
    });
  }
}
