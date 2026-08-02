/**
 * FIXED Google Apps Script for Early Access Form
 * This version has better error handling for Sheet access
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
    
    // Get form data
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
    
    // Try to open the spreadsheet with better error handling
    let spreadsheet;
    try {
      spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      Logger.log('Sheet opened successfully');
    } catch (sheetError) {
      Logger.log('ERROR opening sheet: ' + sheetError.toString());
      throw new Error('Cannot access Google Sheet. Please check the Sheet ID and permissions. Error: ' + sheetError.toString());
    }
    
    const sheet = spreadsheet.getActiveSheet();
    
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
    
    // Return success response as HTML to avoid CORS
    return HtmlService.createHtmlOutput('<html><body><p>Success! Data saved.</p></body></html>');
    
  } catch (error) {
    Logger.log('ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    return HtmlService.createHtmlOutput('<html><body><p>Error: ' + error.toString() + '</p></body></html>');
  }
}

