import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'primeng/datepicker';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'candidate-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    RadioButtonModule,
    DatePickerModule,
    PanelModule,
    FormsModule,
    SelectModule,
    Toast,
    Ripple,
  ],
  providers: [MessageService],
})
export class FormComponent {
  model = {
    personalInformation: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '', // Expected format: "YYYY-MM-DD"
      legalStatus: '',
      otherCitizenships: '',
      hasValidDriversLicense: null,
      driversLicenseType: '',
      totalInPersonHours: 0,
      meetsCriteriaForCanadianPracticeExperience: null,
    },
    previousAndCurrentPraAttempts: {
      writtenTdm: null,
      resultTdm: '', // Expected value: "Pass" or "Fail"
      currentPraParticipationInOtherJurisdiction: null,
    },
    medicalEducation: {
      medicalSchoolUniversityAttended: '',
      medDegreeProgramName: '',
      yearGraduation: 0, // Or null if 0 is not appropriate placeholder
      languageOfEducation: '',
    },
    englishProficiency: {
      proofOfEnglishLanguageProficiency: {
        name: '',
        score: 0,
      },
      recentPracticeInEnglishSpeakingCountry: '',
      activeUseOfEnglish: null,
    },
    examinations: {
      nacDate: '', // Expected format: "YYYY-MM-DD"
      mccqe2Date: '', // Expected format: "YYYY-MM-DD"
      mccqe1Date: '', // Expected format: "YYYY-MM-DD"
    },
    postgradTraining: {
      noOfMonthsPostGradTraining: 0,
      noOfMonthsIndependentPractice: 0,
      completionOf2YearPostGrad: null,
    },
    rotations: {
      completed7Rotations: null,
    },
    impairmentToAbilityToPractice: null,
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {}

  private formatDate(date: Date | string | null): string | null {
    if (!date) return null;
    if (typeof date === 'string') return date; // already formatted
    // Format as YYYY-MM-DD
    return date.toISOString().split('T')[0];
  }

  private formatAllDates() {
    const pi = this.model.personalInformation;
    const ex = this.model.examinations;

    // Formate the dates
    if (pi?.dateOfBirth) pi.dateOfBirth = this.formatDate(pi.dateOfBirth) ?? '';
    if (ex?.nacDate) ex.nacDate = this.formatDate(ex.nacDate) ?? '';
    if (ex?.mccqe1Date) ex.mccqe1Date = this.formatDate(ex.mccqe1Date) ?? '';
    if (ex?.mccqe2Date) ex.mccqe2Date = this.formatDate(ex.mccqe2Date) ?? '';
  }

  onSubmit() {
    this.formatAllDates();
    const url = 'http://localhost:5000/application/evaluate';
    const payload = { formData: this.model };

    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        // Optionally update status/UI here
        // Show success toast message
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Application submitted successfully',
          life: 3000,
        });
      },
      error: (error: any) => {
        console.error('Error evaluating application:', error);
        // Show error toast message
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please fill all required fields',
          life: 3000,
        });
      },
    });
  }
}
