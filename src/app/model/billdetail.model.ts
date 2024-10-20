export class BillDetail {
    expenseAmount: number; // Add this line
    incomeAmount: number;
    name: string;
    idBill: number;
    
    constructor( expenseAmount: number, incomeAmount: number,name: string, idBill: number) {
      
      this.expenseAmount = expenseAmount;   // Initialize income
      this.incomeAmount = incomeAmount; // Initialize billId
      this.name = name;
      this.idBill = idBill;
      }
    }
  