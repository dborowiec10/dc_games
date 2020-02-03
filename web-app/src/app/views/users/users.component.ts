import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private auth_svc: AuthService,
    private api_svc: ApiService,
    private _router: Router
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
    this.auth_svc.getUser().subscribe(res => {
      this.currentUser = res['user'];
      this.api_svc.users().subscribe(res => {
        this.users = res['users'];
        this.users = this.users.filter(obj => obj['username'] !== 'admin');
        this.api_svc.companies().subscribe(res => {
          this.companies = res['companies'];
        });
      });
    });
  }

}
