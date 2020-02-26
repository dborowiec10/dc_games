import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-racks',
  templateUrl: './inventory-racks.component.html',
  styleUrls: ['./inventory-racks.component.css']
})
export class InventoryRacksComponent implements OnInit, OnDestroy {

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
