import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExerciseWlanPage } from './exercise-wlan.page';

describe('ExerciseWlanPage', () => {
  let component: ExerciseWlanPage;
  let fixture: ComponentFixture<ExerciseWlanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExerciseWlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
