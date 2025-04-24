// General HTTP response method so I can create JSON objects on the fly in a clean way
import { Response } from "express";

export function httpResponse(
    res: Response,
    statusCode: number,
    message: string,
    data?: any
) {
    res.status(statusCode).json({
        message,
        data,
    });
}
