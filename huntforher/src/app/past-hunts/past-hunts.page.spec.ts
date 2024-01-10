import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PastHuntsPage } from './past-hunts.page';

describe('PastHuntsPage', () => {
  let component: PastHuntsPage;
  let fixture: ComponentFixture<PastHuntsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PastHuntsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
