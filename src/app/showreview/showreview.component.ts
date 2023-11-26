import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showreview',
  templateUrl: './showreview.component.html',
  styleUrls: ['./showreview.component.scss']
})
export class ShowreviewComponent {
  @Input() review: any;

}
