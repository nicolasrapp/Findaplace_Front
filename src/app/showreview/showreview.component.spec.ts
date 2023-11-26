import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowreviewComponent } from './showreview.component';

describe('ShowreviewComponent', () => {
  let component: ShowreviewComponent;
  let fixture: ComponentFixture<ShowreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowreviewComponent]
    });
    fixture = TestBed.createComponent(ShowreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
