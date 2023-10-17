import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

/** @title Simple form field */
@Component({
  selector: 'app-review-popup',
  templateUrl: './review-popup.component.html',
  styleUrls: ['./review-popup.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule],
})
export class ReviewPopupComponent {

}