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
  ],
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
  legalStatusOptions = ['Canadian Citizen', 'Permanent Resident', 'Other'];
  driversLicenseTypeOptions = ['Canadian', 'International'];
  constructor(private http: HttpClient) {}
  onSubmit() {
    console.log('Form submitted:', this.model);
    const url = 'http://localhost:5000/application/evaluate';
    const payload = { formData: this.model };

    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        console.log('Application evaluated successfully:', response);
        // Optionally update status/UI here
      },
      error: (error: any) => {
        console.error('Error evaluating application:', error);
      },
    });
  }
}
