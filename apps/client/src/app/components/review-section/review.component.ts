import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlagTable } from '../table/flagtable.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'review-section',
  templateUrl: 'review.component.html',
  standalone: true,
  imports: [
    CardModule,
    FlagTable,
    CommonModule,
    PanelModule,
    ButtonModule,
    Toast,
    Ripple,
  ],
  providers: [MessageService],
})
export class ReviewComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  applications: any[] = [];
  applicationInfo: any = {};
  flags: any[] = [];
  status: string = '';

  ngOnInit() {
    this.getApplications();
  }

  getApplications() {
    this.http
      .get('http://localhost:5000/application/getApplications')
      .subscribe((response: any) => {
        this.applications = response.data;
      });

    // Show Refreshed Toast message
    this.messageService.add({
      severity: 'success',
      summary: 'Retrieved',
      detail: 'Applications refreshed successfully',
      life: 3000,
    });
  }

  onReview(application: any) {
    this.applicationInfo = application;
    this.status = application.status;
    this.flags = application.flags;
  }
}
