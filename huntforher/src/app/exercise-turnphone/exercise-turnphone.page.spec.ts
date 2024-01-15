import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseTurnphonePage } from './exercise-turnphone.page';

describe('ExerciseTurnphonePage', () => {
  let component: ExerciseTurnphonePage;
  let fixture: ComponentFixture<ExerciseTurnphonePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExerciseTurnphonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
