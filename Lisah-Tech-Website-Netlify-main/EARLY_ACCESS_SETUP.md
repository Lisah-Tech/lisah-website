# Early Access Form Setup Guide

This guide will help you set up the Early Access form with Google Sheets integration and email notifications.

## Features Implemented

✅ Early Access form page with all required fields
✅ Form validation (all fields required, email format validation)
✅ Success page after submission
✅ Conditional header logic (hides "GET EARLY ACCESS" button on form/success pages)
✅ Google Sheets integration
✅ Email notifications to support@uselisah.com

## Setup Instructions

### 1. Google Apps Script Setup

1. Go to [Google Apps Script](https://script.google.com/)
2. Create a new project
3. Copy the code from `google-apps-script-example.js` into the script editor
4. Create a new Google Sheet for storing form submissions
5. Get your Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
6. Update the `SHEET_ID` variable in the script with your Sheet ID
7. Update the `RECIPIENT_EMAIL` if needed (default is `support@uselisah.com`)

### 2. Deploy Google Apps Script

1. Click "Deploy" > "New deployment"
2. Click the gear icon (⚙️) next to "Select type"
3. Choose "Web app"
4. Set the following:
   - **Description**: Early Access Form Handler
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click "Deploy"
6. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/.../exec`)

### 3. Environment Variables

Create a `.env` file in the root of your project:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the actual ID from your deployed script URL.

### 4. Test the Form

1. Start your development server: `npm run dev` or `pnpm dev`
2. Navigate to `/early-access`
3. Fill out the form and submit
4. Check your Google Sheet for the new entry
5. Check support@uselisah.com for the email notification

## Form Fields

The form includes:
- **First Name** (required)
- **Last Name** (required)
- **Email Address** (required, validated format)
- **Long-term Outlook** (required, Yes/No radio buttons)
- **Marketing Consent** (required checkbox)

## Routes

- `/early-access` - Form page
- `/early-access/success` - Success page (redirected after submission)

## Styling

The form uses the same design system as the landing page:
- Primary green color: `#49E68A`
- Consistent spacing and typography
- Rounded buttons matching the landing page style

## Troubleshooting

### Form not submitting
- Check that `VITE_GOOGLE_SCRIPT_URL` is set correctly in your `.env` file
- Verify the Google Apps Script is deployed and accessible
- Check browser console for errors

### Email not sending
- Verify the `RECIPIENT_EMAIL` in the Google Apps Script
- Check Google Apps Script execution logs
- Ensure the script has permission to send emails

### Data not appearing in Google Sheet
- Verify the Sheet ID is correct in the script
- Check that the script has permission to access the sheet
- Review Google Apps Script execution logs for errors

