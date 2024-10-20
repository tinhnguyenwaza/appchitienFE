import { Component } from '@angular/core';
import UserService from '../user.service';
import { Router } from '@angular/router';
import { BillDetail } from '../model/billdetail.model';
import { Bill } from '../model/bill.model';
import { Member } from '../model/member.model';
@Component({
  selector: 'app-billdetail',
  templateUrl: './billdetail.component.html',
  styleUrls: ['./billdetail.component.scss']
})
export class BilldetailComponent {
  billDetails: BillDetail[] = [];
  bills: Bill[] = [];
  showDetails = true;
  members: Member[] = [];
  totals: { name: string, expenseAmount: number, incomeAmount: number }[] = [];

  constructor(private userService: UserService, private Router: Router) { }

  ngOnInit(): void {
    this.loadData(); // Gọi loadData trong ngOnInit
  }

  // Thêm phương thức loadData để tải lại dữ liệu
  loadData(): void {
    this.userService.getBillDetailToIDStatus().subscribe((data: any) => {
      this.billDetails = data;
      this.calculateTotals(); // Tính toán lại tổng sau khi nhận dữ liệu mới
    }); 
    this.userService.getBillToStatus().subscribe((data: any) => {
      this.bills = data;
    }); 

    this.userService.getMembers().subscribe((data: any) => {
      this.members = data;
    });
  }

  // Add this method to your component class
  filterBillDetails(billId: number | undefined) {
    // Change 'const' to 'let' to allow reassignment
    let filteredDetails: BillDetail[] = [];

    filteredDetails = this.billDetails.filter(detail => detail.idBill === billId);
    
    return filteredDetails;
  }

  totaTienTrenNguoi(bili: Bill | undefined) {
    // Check if bili is defined and has totalMoney and totalPeople
    if (bili && bili.totalMoney !== undefined && bili.totalPeople !== undefined) {
      return bili.totalMoney / bili.totalPeople;
    }
    return 0; // Return 0 or any default value if bili is undefined
  }

  calculateTotals() {
    const uniqueNames = new Set<string>();

    this.billDetails.forEach(detail => {
      if (detail.name) {
        uniqueNames.add(detail.name);
      }
    });

    const uniqueNameList = Array.from(uniqueNames);

    this.totals = uniqueNameList.map(name => {
      let expenseAmount = 0;
      let incomeAmount = 0;

      this.billDetails.forEach(detail => {
        if (detail.name === name) {
          expenseAmount += detail.expenseAmount || 0;
          incomeAmount += detail.incomeAmount || 0;
        }
      });

      return { name, expenseAmount, incomeAmount };
    });

    console.log(this.totals);
  }

  thanhToan(bill : Bill) {
    bill.status = 'N';
   
    this.userService.UpdateBilllStatus(bill).subscribe((data: any) => {
      this.loadData(); // Gọi lại phương thức loadData để làm mới dữ liệu
    }); 

    console.log('Thanh Toán button clicked');
  }
}
