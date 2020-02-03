import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private auth_svc: AuthService,
    private api_svc: ApiService,
    private _router: Router,
    private _activRoute: ActivatedRoute
  ){}

  currentUser: any;
  company: any;
  user: any;

  ngOnInit() {
    this.auth_svc.getUser().subscribe(res => {
      this.currentUser = res['user'];
      this._activRoute.params.subscribe(
        (params: any) => {
          this.api_svc.user(params['id']).subscribe(res => {
            this.user = res['user'];
            this.api_svc.company(this.user['company_id']).subscribe(res_c => {
              this.company = res_c['company'];
            });
          });            ;
        }
      );
    });
  }

}
