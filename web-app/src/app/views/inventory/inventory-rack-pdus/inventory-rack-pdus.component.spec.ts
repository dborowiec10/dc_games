import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRackPdusComponent } from './inventory-rack-pdus.component';

describe('InventoryRackPdusComponent', () => {
  let component: InventoryRackPdusComponent;
  let fixture: ComponentFixture<InventoryRackPdusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryRackPdusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRackPdusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
