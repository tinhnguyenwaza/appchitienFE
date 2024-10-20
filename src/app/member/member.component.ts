import { Component } from '@angular/core';
import { Member } from '../model/member.model';
import UserService from '../user.service';
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent {
  member: Member = new Member(''); // Khởi tạo đối tượng Member
  members: Member[] = []; // Mảng để lưu các thành viên
  editingMemberId: number | null = null; // Thêm thuộc tính này
  updateTimeout: any; // Biến để lưu setTimeout

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMembers().subscribe((data: any) => {
      this.members = data;
    });
  }


  onSubmit() {
    this.userService.addMember(this.member).subscribe(response => {
      console.log('Thành viên đã được thêm:', response);
      this.members.push(response);
      this.member = new Member('');
    });
  }


  getUpdateMember(id: number) {
    this.editingMemberId = id;
  }

  onInputChange(newValue: string, member: any) {
    // Xóa timeout cũ nếu có
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
     this.updateTimeout = setTimeout(() => {
      this.updateMember(newValue, member); 
    }, 5000); 
  }

  updateMember(newValue: any, member: any) {
    member.name = newValue;
    this.userService.updateMember(member.id, member).subscribe({
        next: (updatedMember) => {
            console.log('Cập nhật thành viên thành công:', updatedMember);       
            const index = this.members.findIndex(m => m.id === updatedMember.id);
            if (index !== -1) {
                this.members[index] = updatedMember; 
            }
            this.editingMemberId = null; 
        },
        error: (error) => {
            console.error('Cập nhật thành viên thất bại:', error);         
        }
    });
  }

  deleteMember(id: number) {
    this.userService.deleteMember(id).subscribe({
        next: () => {
            console.log('Thành viên đã được xóa:', id);
            this.members = this.members.filter(member => member.id !== id); // Cập nhật danh sách thành viên
        },
        error: (error) => {
            console.error('Xóa thành viên thất bại:', error);
        }
    });
  }

}
