import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryServerCoolingsComponent } from './inventory-server-coolings.component';

describe('InventoryServerCoolingsComponent', () => {
  let component: InventoryServerCoolingsComponent;
  let fixture: ComponentFixture<InventoryServerCoolingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryServerCoolingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryServerCoolingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
