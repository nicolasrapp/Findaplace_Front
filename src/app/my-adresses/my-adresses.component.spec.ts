import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdressesComponent } from './my-adresses.component';

describe('MyAdressesComponent', () => {
  let component: MyAdressesComponent;
  let fixture: ComponentFixture<MyAdressesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAdressesComponent]
    });
    fixture = TestBed.createComponent(MyAdressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
