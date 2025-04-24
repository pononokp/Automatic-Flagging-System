import { Request, Response } from "express";
import { httpResponse } from "../lib/index.js";
import { validateApplicationData } from "../lib/validator.js";
import { validateFormData } from "../lib/validator.js";
import {
    flagApplicationService,
    getApplicationsService,
    updateApplicationService,
} from "../services/index.js";

export const submitApplication = async (
    req: Request,
    res: Response
): Promise<any> => {
    // Validate form data
    if (!validateFormData(req.body.formData)) {
        return httpResponse(res, 400, "Invalid request body");
    }

    try {
        const formData = req.body.formData;

        // call service method here
        const applicationData = await flagApplicationService(formData);
        return httpResponse(
            res,
            201,
            "Application submitted successfully",
            applicationData
        );
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500, "Failed to submit application");
    }
};

export const getApplications = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        // call service method here
        const applications = await getApplicationsService();
        return httpResponse(
            res,
            201,
            "Application retrieved successfully",
            applications
        );
    } catch (error) {
        return httpResponse(res, 500, "Failed to retrieve application");
    }
};

export const reviewApplication = async (
    req: Request,
    res: Response
): Promise<any> => {
    // Validate application data
    if (!validateApplicationData(req.body.applicationData)) {
        return httpResponse(res, 400, "Invalid request body");
    }
    try {
        const applicationData = req.body.applicationData;

        // call service method here
        const updatedApplicationData =
            await updateApplicationService(applicationData);
        return httpResponse(
            res,
            201,
            "Application reviewed successfully",
            updatedApplicationData
        );
    } catch (error) {
        return httpResponse(res, 500, "Failed to review application");
    }
};
