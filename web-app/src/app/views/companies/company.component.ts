import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(
    private auth_svc: AuthService,
    private api_svc: ApiService,
    private _router: Router,
    private _activRoute: ActivatedRoute
  ){}

  currentUser: any;
  currentCompany: any;
  companyUser: any;

  ngOnInit() {

    this.auth_svc.getUser().subscribe(res => {
      this.currentUser = res['user'];
      this._activRoute.params.subscribe(
        (params: any) => {
          this.api_svc.company(params['id']).subscribe(res => {
            this.currentCompany = res['company'];
            this.api_svc.user(this.currentCompany['manager_id']).subscribe(res => {
              this.companyUser = res['user'];
            });
          });
        }
      );
    });
  }

}
