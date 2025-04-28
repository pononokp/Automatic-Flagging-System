import {
    saveApplicationDB,
    getApplicationsDB,
    updateApplicationDB,
} from "../models/index.js";

export async function flagApplicationService(formData: any) {
    const flags = new Map();
    const englishHealthcareCountries: string[] = [
        "United States",
        "Canada",
        "United Kingdom",
        "Australia",
        "New Zealand",
        "Ireland",
        "Singapore",
        "Kenya",
        "South Africa",
        "Nigeria",
        "Philippines",
        "India",
    ];

    // Personal Information Checks
    if (
        formData.personalInformation.legalStatus === "Permanent Resident" ||
        formData.personalInformation.legalStatus === "Canadian Citizen"
    ) {
        flags.set("legalStatus", true);
    } else {
        flags.set("legalStatus", false);
    }

    if (formData.personalInformation.hasValidDriversLicense) {
        flags.set("driversLicense", true);
    }

    if (formData.personalInformation.driversLicenseType === "Canadian") {
        flags.set("driversLicenseType", true);
    }

    if (formData.personalInformation.totalInPersonHours >= 720) {
        flags.set("totalInPersonHours", true);
    }

    if (
        formData.personalInformation.meetsCriteriaForCanadianPracticeExperience
    ) {
        flags.set("meetsCriteriaForCanadianPracticeExperience", true);
    } else {
        flags.set("meetsCriteriaForCanadianPracticeExperience", false);
    }

    // Previous and Current Pra Attempts Checks
    if (formData.previousAndCurrentPraAttempts.writtenTdm) {
        flags.set("writtenTdm", true);
    } else {
        flags.set("writtenTdm", false);
    }

    if (formData.previousAndCurrentPraAttempts.resultTdm === "Pass") {
        flags.set("resultTdm", true);
    } else {
        flags.set("resultTdm", false);
    }

    if (
        formData.previousAndCurrentPraAttempts
            .currentPraParticipationInOtherJurisdiction
    ) {
        flags.set("currentPraParticipationInOtherJurisdiction", false);
    } else {
        flags.set("currentPraParticipationInOtherJurisdiction", true);
    }

    // English Proficiency Checks
    if (
        formData.englishProficiency.proofOfEnglishLanguageProficiency.name ===
            "IELTS" &&
        formData.englishProficiency.proofOfEnglishLanguageProficiency.score >= 7
    ) {
        flags.set("proofOfEnglishLanguageProficiency", true);
    } else if (
        formData.englishProficiency.proofOfEnglishLanguageProficiency.name ===
            "OET" &&
        formData.englishProficiency.proofOfEnglishLanguageProficiency.score >= 8
    ) {
        flags.set("proofOfEnglishLanguageProficiency", true);
    } else if (
        formData.englishProficiency.proofOfEnglishLanguageProficiency.name ===
            "CELPIP" &&
        formData.englishProficiency.proofOfEnglishLanguageProficiency.score >= 9
    ) {
        flags.set("proofOfEnglishLanguageProficiency", true);
    } else if (
        englishHealthcareCountries.includes(
            formData.englishProficiency.recentPracticeInEnglishSpeakingCountry
        )
    ) {
        flags.set("proofOfEnglishLanguageProficiency", true);
    }

    if (formData.englishProficiency.activeUseOfEnglish) {
        flags.set("activeUseOfEnglish", true);
    }

    // Postgraduate Training Checks
    if (
        formData.postgradTraining.noOfMonthsPostGradTraining === 24 &&
        formData.postgradTraining.noOfMonthsIndependentPractice === 24
    ) {
        flags.set("postgradTraining", true);
    } else if (
        formData.postgradTraining.noOfMonthsPostGradTraining === 12 &&
        formData.postgradTraining.noOfMonthsIndependentPractice === 36
    ) {
        flags.set("postgradTraining", true);
    }

    if (formData.completionOf2YearPostGrad) {
        flags.set("completionOf2YearPostGrad", true);
    }

    // Rotations Checks
    if (formData.rotations.completed7Rotations) {
        flags.set("completed7Rotations", true);
    }

    // Impairment To Ability To Practice Checks
    if (!formData.impairmentToAbilityToPractice) {
        flags.set("impairmentToAbilityToPractice", true);
    }

    // call model method here
    const applicationData = {
        id:
            formData.personalInformation.firstName +
            "_" +
            formData.personalInformation.lastName,
        applicantInformation: formData,
        flags: [...flags.entries()].map(([key, value]) => ({
            name: key,
            eligibility: value,
        })),
        status: "Pending",
    };

    // save application info to db
    await saveApplicationDB(applicationData);
    return applicationData;
}

export async function getApplicationsService() {
    // call model method here
    return await getApplicationsDB();
}

export async function updateApplicationService(applicationData: any) {
    // call model method here
    return await updateApplicationDB(applicationData);
}
