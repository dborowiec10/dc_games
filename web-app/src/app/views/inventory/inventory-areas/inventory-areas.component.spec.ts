import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAreasComponent } from './inventory-areas.component';

describe('InventoryAreasComponent', () => {
  let component: InventoryAreasComponent;
  let fixture: ComponentFixture<InventoryAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
