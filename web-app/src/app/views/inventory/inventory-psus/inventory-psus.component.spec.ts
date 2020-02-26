import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryPsusComponent } from './inventory-psus.component';

describe('InventoryPsusComponent', () => {
  let component: InventoryPsusComponent;
  let fixture: ComponentFixture<InventoryPsusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryPsusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryPsusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
