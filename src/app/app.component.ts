import { Component, OnInit } from '@angular/core';
import UserService from './user.service';
import { Member } from './model/member.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  [x: string]: any;
  demo: String = '';
  member: Member = new Member(''); // Khởi tạo đối tượng Member
  members: Member[] = []; // Mảng để lưu các thành viên
  

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    
  }


}
