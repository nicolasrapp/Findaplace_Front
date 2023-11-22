import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRatingPopupComponent } from './review-rating-popup.component';

describe('ReviewRatingPopupComponent', () => {
  let component: ReviewRatingPopupComponent;
  let fixture: ComponentFixture<ReviewRatingPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewRatingPopupComponent]
    });
    fixture = TestBed.createComponent(ReviewRatingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
