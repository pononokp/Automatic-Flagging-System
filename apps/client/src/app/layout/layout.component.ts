import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { FormComponent } from '../components/form/form.component';
import { ReviewComponent } from '../components/review-section/review.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  standalone: true,
  imports: [TabsModule, FormComponent, ReviewComponent],
})
export class LayoutComponent {
  constructor() {}
}
