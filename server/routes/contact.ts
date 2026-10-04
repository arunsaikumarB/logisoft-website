import { RequestHandler } from "express";
import { z } from "zod";
import { contactRequestId, logContact } from "../security";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100).optional().or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

export const handleContact: RequestHandler = async (req, res) => {
  contactRequestId(req, res);

  try {
    contactSchema.parse(req.body);
    logContact(res, "accepted");

    res.json({
      success: true,
      message: "Thank you for your inquiry. We will contact you shortly.",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      logContact(res, "invalid");
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
      return;
    }

    logContact(res, "error");
    res.status(500).json({
      success: false,
      message: "An error occurred processing your request",
    });
  }
};
