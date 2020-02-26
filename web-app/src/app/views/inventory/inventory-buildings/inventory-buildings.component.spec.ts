import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryBuildingsComponent } from './inventory-buildings.component';

describe('InventoryBuildingsComponent', () => {
  let component: InventoryBuildingsComponent;
  let fixture: ComponentFixture<InventoryBuildingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryBuildingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryBuildingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
