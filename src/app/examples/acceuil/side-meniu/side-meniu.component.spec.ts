import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMeniuComponent } from './side-meniu.component';

describe('SideMeniuComponent', () => {
  let component: SideMeniuComponent;
  let fixture: ComponentFixture<SideMeniuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMeniuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideMeniuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
