import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRacksComponent } from './inventory-racks.component';

describe('InventoryRacksComponent', () => {
  let component: InventoryRacksComponent;
  let fixture: ComponentFixture<InventoryRacksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryRacksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
