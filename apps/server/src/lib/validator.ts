// Using Ajv for JSON schema validation
import Ajv from "ajv";
import addFormats from "ajv-formats";
import applicationDataSchema from "../schema/applicationData.json" assert { type: "json" };
import formDataSchema from "../schema/formData.json" assert { type: "json" };

// @ts-ignore
const ajv = new Ajv({ allErrors: true });
// @ts-ignore
addFormats(ajv);

// Add referenced schemas
ajv.addSchema(formDataSchema, "formData.json");
ajv.addSchema(applicationDataSchema, "applicationData.json");

// Compile main schemas
export const validateFormData =
    ajv.compile<typeof formDataSchema>(formDataSchema);
export const validateApplicationData = ajv.compile<
    typeof applicationDataSchema
>(applicationDataSchema);
