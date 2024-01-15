import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { StepsExercisePage } from './steps-exercise.page';

describe('StepsExercisePage', () => {
  let component: StepsExercisePage;
  let fixture: ComponentFixture<StepsExercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepsExercisePage],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(StepsExercisePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
