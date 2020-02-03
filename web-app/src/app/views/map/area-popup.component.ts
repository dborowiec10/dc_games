import {Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'area-popup',
  templateUrl: './area-popup.component.html',
  styleUrls: ['./area-popup.component.css']
})
export class AreaPopupComponent implements OnInit {

  constructor(
    private _router: Router
  ){}

  @Input() id: string;
  @Input() name: string;
  @Input() sqmt: string;
  @Input() owner: string;
  @Input() average_temperature: string;
  @Input() price: string;
  @Input() status: string;

  showInMarketplace(){
    this._router.navigate(['marketplace/categories/', 'areas', this.id]);
  }

  ngOnInit() {

  }

}
