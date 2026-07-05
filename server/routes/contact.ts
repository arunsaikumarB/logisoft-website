import { RequestHandler } from 'express';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  company: z.string().max(100).optional().or(z.literal('')),
  phone: z.string().max(20).optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const validated = contactSchema.parse(req.body);

    // Here you would typically:
    // 1. Save to database
    // 2. Send email to your sales team
    // 3. Add to CRM system
    // For now, just log and return success
    console.log('Contact form submission:', validated);

    res.json({
      success: true,
      message: 'Thank you for your inquiry. We will contact you shortly.',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'An error occurred processing your request',
      });
    }
  }
};
