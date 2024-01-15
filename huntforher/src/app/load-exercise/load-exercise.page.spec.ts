import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadExercisePage } from './load-exercise.page';

describe('LoadExercisePage', () => {
  let component: LoadExercisePage;
  let fixture: ComponentFixture<LoadExercisePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoadExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
