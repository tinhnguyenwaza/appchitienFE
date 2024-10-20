export class Bill {
    id?: number; // 'id' có thể có hoặc không (dùng dấu ?)
    status: string;
    totalMoney: number; // Add this line
    totalPeople: number;
    idUser: number;
    constructor(status: string, totalMoney: number, totalPeople: number, idUser: number) {
      this.status = status;
      this.totalMoney = totalMoney;   // Initialize income
      this.totalPeople = totalPeople; // Initialize billId
      this.idUser = idUser;
      }
    }
  
