import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-server-coolings',
  templateUrl: './inventory-server-coolings.component.html',
  styleUrls: ['./inventory-server-coolings.component.css']
})
export class InventoryServerCoolingsComponent implements OnInit, OnDestroy {

  private sub: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe((params) => {
      console.log(params);
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
