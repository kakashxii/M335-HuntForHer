import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PinpongExercisePage } from './pinpong-exercise.page';

describe('PinpongExercisePage', () => {
  let component: PinpongExercisePage;
  let fixture: ComponentFixture<PinpongExercisePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PinpongExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
