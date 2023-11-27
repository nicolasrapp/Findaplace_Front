// star.component.ts
import { Component, Input } from '@angular/core';

/* composant qui gere l'affichage des tags. Feature que nous n'avons pas eu le temps d'implementer. */

@Component({
  selector: 'app-tag',
  template: `
    <div [style.backgroundColor]="tagColor" class="tag">
      <p>{{tagName}}</p>
    </div>
  `,
  styles: [
    `.tag {
        padding: 4px 12px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        align-content: center;
        margin-right: 5px;
        p {
            color: white;
            margin: 0;
            font-size: 12px;
            font-weight: 300;
        }
    }`
  ]
})
export class TagComponent {
  @Input() tagName: string = "";
  @Input() tagColor: string = "";

}
