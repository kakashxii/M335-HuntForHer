import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrcodeExercisePage } from './qrcode-exercise.page';

describe('QrcodeExercisePage', () => {
  let component: QrcodeExercisePage;
  let fixture: ComponentFixture<QrcodeExercisePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QrcodeExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
