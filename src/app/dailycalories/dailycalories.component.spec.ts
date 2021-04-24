import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailycaloriesComponent } from './dailycalories.component';

describe('DailycaloriesComponent', () => {
  let component: DailycaloriesComponent;
  let fixture: ComponentFixture<DailycaloriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailycaloriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailycaloriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
