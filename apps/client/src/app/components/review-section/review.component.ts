import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlagTable } from '../table/flagtable.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'review-section',
  templateUrl: 'review.component.html',
  standalone: true,
  imports: [CardModule, FlagTable, CommonModule, PanelModule, ButtonModule],
})
export class ReviewComponent implements OnInit {
  constructor(private http: HttpClient) {}

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
        console.log(response.data);
        this.applications = response.data;
      });
  }

  onReview(application: any) {
    this.applicationInfo = application;
    this.status = application.status;
    this.flags = application.flags;
  }
}
