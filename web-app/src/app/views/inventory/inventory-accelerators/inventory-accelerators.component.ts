import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-accelerators',
  templateUrl: './inventory-accelerators.component.html',
  styleUrls: ['./inventory-accelerators.component.css']
})
export class InventoryAcceleratorsComponent implements OnInit, OnDestroy {

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
