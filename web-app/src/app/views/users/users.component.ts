import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';
import { filter } from 'rxjs/operators';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private auth_svc: AuthService,
    private state: StateService
  ){}

  currentUser: any;
  users: any;
  companies: any;

  company(c_id){
    for(let c of this.companies) {
      if(c['id'] === c_id) {
        return c;
      }
    }
    return {'name': ''};
  }

  ngOnInit() {

    this.currentUser = this.state.user;

    this.state.getUsers(false).subscribe((res) => {
      this.users = res.filter(obj => obj['username'] !== 'admin');
      this.state.getCompanies(false).subscribe((res) => {
        this.companies = res;
      });
    });
  }

}
