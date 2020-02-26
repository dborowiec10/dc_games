import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryRackSwitchesComponent } from './inventory-rack-switches.component';

describe('InventoryRackSwitchesComponent', () => {
  let component: InventoryRackSwitchesComponent;
  let fixture: ComponentFixture<InventoryRackSwitchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryRackSwitchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryRackSwitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
