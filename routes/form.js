import express from 'express';
const router = express.Router();
import Response from '../models/response.js';

// Submit form response
router.post('/api/form/submit', async (req, res) => {
  try {
    const { 
      email,
      lastPackageIssue, 
      issueDescription, 
      giftCardChoice,
      currentSetup, 
      otherSetupDescription, 
      lookedForProducts, 
      productConsiderations 
    } = req.body;
    
    // Validate required fields
    if (!email || !lastPackageIssue || !issueDescription || !currentSetup || !lookedForProducts) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Check for unique email
    const existingResponse = await Response.findOne({ email });
    if (existingResponse) {
      return res.status(409).json({ error: 'Email has already been used' });
    }

    // Validate enum values
    const validSetups = [
      'I\'m usually home',
      'Porch/doorstep with no security',
      'I use a lockbox or other device',
      'I leave instructions for the courier',
      'Other'
    ];
    
    if (!validSetups.includes(currentSetup)) {
      return res.status(400).json({ error: 'Invalid value for current setup' });
    }

    const newResponse = new Response({
      email,
      lastPackageIssue,
      issueDescription,
      currentSetup,
      giftCardChoice,
      otherSetupDescription: currentSetup === 'Other' ? otherSetupDescription : undefined,
      lookedForProducts,
      productConsiderations: lookedForProducts === 'Yes' ? productConsiderations : undefined
    });
console.log(newResponse.giftCardChoice);
    await newResponse.save();
    res.status(201).json({ message: 'Response submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router