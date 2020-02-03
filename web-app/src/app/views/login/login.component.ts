import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  public previousUrl: string = '';

  public loggedIn: boolean = false;
  public loggedInMessage: string = '';

  public error: boolean = false;
  public errorMessage: string = '';

  constructor(
    private router: Router,
    private auth_service: AuthService,
    private ac_route: ActivatedRoute
  ) {}

  public username;
  public password;

  ngOnInit() {
    this.ac_route.queryParams.subscribe(
      (res) => {
        this.previousUrl = res['pr'];
      }
    );
  }

  login() {
    this.auth_service.login(this.username, this.password).subscribe(res => {
      this.loggedIn = true;
      this.loggedInMessage = res['status'];
      (async () => {
        await new Promise( resolve => setTimeout(resolve, 2000) );
        if(this.previousUrl){
          this.router.navigate([this.previousUrl]);
        } else {
          this.router.navigate(['']);
        }
      })();
    }, err => {
      this.error = true;
      this.errorMessage = err['error'];
    });
  }



}
