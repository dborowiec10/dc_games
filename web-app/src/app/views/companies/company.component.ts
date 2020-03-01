import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ApiService } from '../../api.service';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(
    private state: StateService,
    private _activRoute: ActivatedRoute
  ){}

  currentUser: any;
  currentCompany: any;
  companyUser: any;

  ngOnInit() {
    this.currentUser = this.state.user;
    this._activRoute.params.subscribe((params: any) => {
      this.state.getCompany(params["id"]).subscribe(res => {
        this.currentCompany = res;
        this.state.getUser(this.currentCompany["manager_id"]).subscribe((res) => {
          this.companyUser = res;
        });
      });
    });
  }

}
