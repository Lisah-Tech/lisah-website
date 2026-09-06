/**
 * SIMPLIFIED Google Apps Script for Early Access Form
 * This version has better error handling and logging
 */

const SHEET_ID = '13pvtCLE41oSsXVAj6snRRZm7DxE5BBe-ybFuC5TQ0s0'; // Make sure this is correct!
const RECIPIENT_EMAIL = 'support@uselisah.com';

// Handle GET requests
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Early Access Form Handler is ready. Use POST to submit data.'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle POST requests
function doPost(e) {
  try {
    Logger.log('=== FORM SUBMISSION RECEIVED ===');
    Logger.log('PostData: ' + JSON.stringify(e.postData));
    Logger.log('Parameters: ' + JSON.stringify(e.parameter));
    
    // Get the sheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    Logger.log('Sheet opened successfully');
    
    // Parse the data - handle both JSON and form data
    let data = {};
    
    if (e.postData && e.postData.contents) {
      // Try JSON first
      try {
        data = JSON.parse(e.postData.contents);
        Logger.log('Parsed as JSON: ' + JSON.stringify(data));
      } catch (jsonError) {
        // If JSON fails, use form parameters
        data = e.parameter;
        Logger.log('Using form parameters: ' + JSON.stringify(data));
      }
    } else if (e.parameter) {
      // Form-encoded data
      data = e.parameter;
      Logger.log('Using parameters: ' + JSON.stringify(data));
    } else {
      throw new Error('No data received');
    }
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Long-term Outlook',
        'Marketing Consent'
      ]);
      Logger.log('Headers added');
    }
    
    // Prepare data with fallbacks
    const firstName = data.firstName || '';
    const lastName = data.lastName || '';
    const email = data.email || '';
    const longTermOutlook = data.longTermOutlook || '';
    const marketingConsent = data.marketingConsent || '';
    
    // Append the data
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      firstName,
      lastName,
      email,
      longTermOutlook,
      marketingConsent
    ]);
    Logger.log('Data appended to sheet');
    
    // Send email notification
    try {
      const emailBody = `
New Early Access Signup:

Name: ${firstName} ${lastName}
Email: ${email}
Long-term Outlook: ${longTermOutlook}
Marketing Consent: ${marketingConsent}
Timestamp: ${timestamp}
      `;
      
      MailApp.sendEmail({
        to: RECIPIENT_EMAIL,
        subject: 'New Early Access Signup - ' + firstName + ' ' + lastName,
        body: emailBody
      });
      Logger.log('Email sent successfully');
    } catch (emailError) {
      Logger.log('Email error: ' + emailError.toString());
      // Don't fail the whole request if email fails
    }
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Data saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: 'An error occurred. Check the execution logs.'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

