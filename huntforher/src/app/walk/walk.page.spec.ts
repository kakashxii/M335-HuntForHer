import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalkPage } from './walk.page';

describe('WalkPage', () => {
  let component: WalkPage;
  let fixture: ComponentFixture<WalkPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WalkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
