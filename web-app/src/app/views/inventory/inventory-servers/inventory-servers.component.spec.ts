import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryServersComponent } from './inventory-servers.component';

describe('InventoryServersComponent', () => {
  let component: InventoryServersComponent;
  let fixture: ComponentFixture<InventoryServersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryServersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryServersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
