import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesInfo } from './courses-info';

describe('CoursesInfo', () => {
  let component: CoursesInfo;
  let fixture: ComponentFixture<CoursesInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
