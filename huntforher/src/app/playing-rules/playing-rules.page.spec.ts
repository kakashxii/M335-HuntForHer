import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayingRulesPage } from './playing-rules.page';

describe('PlayingRulesPage', () => {
  let component: PlayingRulesPage;
  let fixture: ComponentFixture<PlayingRulesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PlayingRulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
