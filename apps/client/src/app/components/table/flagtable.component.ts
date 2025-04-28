import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

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
    Toast,
    Ripple,
  ],
  providers: [MessageService],
})
export class FlagTable implements OnInit {
  @Input() application: any = {};
  @Input() flags: any[] = [];
  @Input() status: string = '';

  private eligibilityChangedFlags = new Set<string>(); // To keep track of flags first time changed

  stateOptions = [
    { label: 'Approve', value: true },
    { label: 'Override', value: false },
  ];
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}
  ngOnInit() {}

  onEligibilityChange(flag: any, value: any) {
    if (!this.eligibilityChangedFlags.has(flag.name)) {
      // If first selected value is false(Override), invert the eligibility
      if (value === false) {
        flag.eligibility = !flag.eligibility;
      }
      // If first selected value is true(Approve), keep eligibility as is (no action needed)
      this.eligibilityChangedFlags.add(flag.name);
    } else {
      // If the flag has already been changed, do the opposites
      flag.eligibility = !flag.eligibility;
    }
  }

  getSeverity(status: boolean) {
    return status ? 'success' : 'danger';
  }

  onApproved() {
    // Updating  status for UI
    this.status = 'Reviewed';

    // Updating application flags and status to send
    this.application.flags = this.flags;
    this.application.status = 'Reviewed';

    const url = 'http://localhost:5000/application/review';
    const payload = { applicationData: this.application };

    this.http.post(url, payload).subscribe({
      next: (response) => {
        // Optionally update status/UI here
      },
      error: (error) => {
        console.error('Error approving:', error);
      },
    });

    // Show success toast message
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Application approved successfully',
      life: 3000,
    });
  }
}
