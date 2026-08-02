/**
 * Google Apps Script for Early Access Form
 * 
 * Instructions:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Create a Google Sheet and note the Sheet ID from the URL
 * 5. Update the SHEET_ID variable below with your Sheet ID
 * 6. Deploy as a web app:
 *    - Click "Deploy" > "New deployment"
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click "Deploy"
 *    - Copy the Web App URL
 * 7. Add the URL to your .env file as VITE_GOOGLE_SCRIPT_URL
 */

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Sheet ID
const RECIPIENT_EMAIL = 'support@uselisah.com';

// Handle GET requests (when someone visits the URL in a browser)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Early Access Form Handler is ready. Use POST to submit data.'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle POST requests (form submissions)
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Handle both JSON and form-encoded data
    let data;
    if (e.postData && e.postData.contents) {
      // JSON format
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        // If not JSON, try form parameters
        data = e.parameter;
      }
    } else {
      // Form-encoded format
      data = e.parameter;
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
    }
    
    // Append the data
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.longTermOutlook || '',
      data.marketingConsent || ''
    ]);
    
    // Send email notification
    const firstName = data.firstName || '';
    const lastName = data.lastName || '';
    const emailBody = `
      New Early Access Signup:
      
      Name: ${firstName} ${lastName}
      Email: ${data.email || ''}
      Long-term Outlook: ${data.longTermOutlook || ''}
      Marketing Consent: ${data.marketingConsent || ''}
      Timestamp: ${timestamp}
    `;
    
    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: 'New Early Access Signup - ' + firstName + ' ' + lastName,
      body: emailBody
    });
    
    // Return HTML redirect to avoid CORS issues
    return HtmlService.createHtmlOutput(`
      <script>
        window.top.location = '${ScriptApp.getService().getUrl()}?success=true';
      </script>
      <p>Success! Redirecting...</p>
    `);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

