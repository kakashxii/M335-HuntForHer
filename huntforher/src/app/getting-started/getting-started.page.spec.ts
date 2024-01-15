import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GettingStartedPage } from './getting-started.page';

describe('GettingStartedPage', () => {
  let component: GettingStartedPage;
  let fixture: ComponentFixture<GettingStartedPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GettingStartedPage],
    }).compileComponents();

    fixture = TestBed.createComponent(GettingStartedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
