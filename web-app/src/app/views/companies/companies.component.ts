import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(
    private state: StateService,
  ){}

  currentUser: any;
  companies: any;
  users: any;

  user(man_id){
    for(let u of this.users) {
      if(u['id'] === man_id) {
        return u;
      }
    }
    return {'name': ''};
  }

  ngOnInit() {

    this.currentUser = this.state.user;

    this.state.getCompanies(false).subscribe(res => {
      this.companies = res;
    });

    this.state.getUsers(false).subscribe(res => {
      this.users = res;
    });
  }

}
