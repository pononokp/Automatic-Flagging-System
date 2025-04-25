import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'flag-table',
  templateUrl: 'flagtable.component.html',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    SelectButtonModule,
  ],
})
export class FlagTable implements OnInit {
  @Input() application: any = {};
  @Input() flags: any[] = [];
  @Input() status: string = '';

  stateOptions = [
    { label: 'Approved', value: true },
    { label: 'Override', value: false },
  ];
  constructor(private http: HttpClient) {}
  ngOnInit() {}

  onEligibilityChange(flag: any, value: any) {
    // If selectedValue is false, invert the eligibility
    if (value === false) {
      flag.eligibility = !flag.eligibility;
    }
    // If selectedValue is true, keep eligibility as is (no action needed)
  }

  getSeverity(status: boolean) {
    return status ? 'success' : 'danger';
  }

  onApproved() {
    this.application.flags = this.flags;
    this.application.status = 'Reviewed';
    const url = 'http://localhost:5000/application/review'; // Change to your backend endpoint
    const payload = { applicationData: this.application };

    this.http.post(url, payload).subscribe({
      next: (response) => {
        console.log('Approved successfully:', response);
        // Optionally update status/UI here
      },
      error: (error) => {
        console.error('Error approving:', error);
      },
    });
  }
}
