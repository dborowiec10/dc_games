import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(
    private auth_svc: AuthService,
    private api_svc: ApiService,
    private _router: Router
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
    this.auth_svc.getUser().subscribe(res => {
      this.currentUser = res['user'];
      this.api_svc.companies().subscribe(res => {
        this.companies = res['companies'];
        this.api_svc.users().subscribe(res => {
          this.users = res['users'];
        });
      });
    });
  }

}
