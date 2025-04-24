import { connectToDB } from "../config/database.js";
import path from "path";
import fs from "fs";

export async function saveApplicationDB(applicationData: any) {
    // if it was mongoDB no need to run connectToDB() multiple times
    const db = await connectToDB();

    const fileName =
        applicationData.applicantInformation.personalInformation.firstName +
        "_" +
        applicationData.applicantInformation.personalInformation.lastName +
        ".json";
    const filePath = path.join(db, fileName);

    // save application to db
    fs.writeFileSync(filePath, JSON.stringify(applicationData, null, 4));
}

export async function getApplicationsDB() {
    // if it was mongoDB no need to run connectToDB() multiple times
    const db = await connectToDB();

    // get applications from db
    const files = fs.readdirSync(db);
    const applications = [];
    for (const file of files) {
        const filePath = path.join(db, file);
        const applicationData = JSON.parse(fs.readFileSync(filePath, "utf8"));
        applications.push(applicationData);
    }
    return applications;
}

export async function updateApplicationDB(applicationData: any) {
    // if it was mongoDB no need to run connectToDB() multiple times
    const db = await connectToDB();

    const fileName = applicationData.id + ".json";
    const filePath = path.join(db, fileName);

    // update application in db
    fs.writeFileSync(filePath, JSON.stringify(applicationData, null, 4));
    return applicationData;
}
