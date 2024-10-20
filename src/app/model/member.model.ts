export class Member {
    id?: number; // 'id' có thể có hoặc không (dùng dấu ?)
    name: string;
    expense: number; // Add this line
    income: number;  // Add this line
    billId: number; // Ensure billId is initialized
    constructor(name: string, id?: number, expense: number = 0, income: number = 0, billId: number = 0) {
      this.name = name;
      this.expense = expense; // Initialize expense
      this.income = income;   // Initialize income
      this.billId = billId; // Initialize billId
      if (id) {
        this.id = id;
      }
    }
  }
