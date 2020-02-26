import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAcceleratorsComponent } from './inventory-accelerators.component';

describe('InventoryAcceleratorsComponent', () => {
  let component: InventoryAcceleratorsComponent;
  let fixture: ComponentFixture<InventoryAcceleratorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAcceleratorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAcceleratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
