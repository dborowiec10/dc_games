import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private state: StateService,
    private _activRoute: ActivatedRoute
  ){}

  currentUser: any;
  company: any;
  user: any;

  ngOnInit() {
    this.currentUser = this.state.user;

    this._activRoute.params.subscribe(
      (params: any) => {
        this.state.getUser(params['id']).subscribe(res => {
          this.user = res;
          this.state.getCompany(this.user['company_id']).subscribe(res_c => {
            this.company = res_c;
          });
        });            ;
      }
    );
  }

}
