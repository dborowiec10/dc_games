import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-servers',
  templateUrl: './inventory-servers.component.html',
  styleUrls: ['./inventory-servers.component.css']
})
export class InventoryServersComponent implements OnInit, OnDestroy {

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
