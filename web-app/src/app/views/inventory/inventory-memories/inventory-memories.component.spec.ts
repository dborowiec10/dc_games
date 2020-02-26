import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMemoriesComponent } from './inventory-memories.component';

describe('InventoryMemoriesComponent', () => {
  let component: InventoryMemoriesComponent;
  let fixture: ComponentFixture<InventoryMemoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryMemoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMemoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
