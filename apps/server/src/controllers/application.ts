import { Request, Response } from "express";

export const submitApplication = async (
    req: Request,
    res: Response
): Promise<any> => {
    // Validate body
    if (!req.body) {
        return res.status(400).json({ error: "Missing request body" });
    }
    try {
        const newForm = req.body;
        // call service method here
        res.status(201).json({ message: "Application submitted successfully" });
        return;
    } catch (error) {
        res.status(500).json({ error: "Failed to submit application" });
        return;
    }
};

export const getApplication = async (
    req: Request,
    res: Response
): Promise<any> => {
    // Validate body
    if (!req.body) {
        return res.status(400).json({ error: "Missing request body" });
    }
    try {
        // call db method here
        res.status(201).json({ message: "Application retrieved successfully" });
        return;
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve application" });
        return;
    }
};

export const reviewApplication = async (
    req: Request,
    res: Response
): Promise<any> => {
    // Validate body
    if (!req.body) {
        return res.status(400).json({ error: "Missing request body" });
    }
    try {
        const newForm = req.body;
        // call db method here
        res.status(201).json({ message: "Application reviewed successfully" });
        return;
    } catch (error) {
        res.status(500).json({ error: "Failed to review application" });
        return;
    }
};
