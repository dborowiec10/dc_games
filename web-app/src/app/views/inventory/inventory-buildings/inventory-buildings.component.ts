import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-buildings',
  templateUrl: './inventory-buildings.component.html',
  styleUrls: ['./inventory-buildings.component.css']
})
export class InventoryBuildingsComponent implements OnInit, OnDestroy {

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
