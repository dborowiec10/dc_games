import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryCpusComponent } from './inventory-cpus.component';

describe('InventoryCpusComponent', () => {
  let component: InventoryCpusComponent;
  let fixture: ComponentFixture<InventoryCpusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryCpusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryCpusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
