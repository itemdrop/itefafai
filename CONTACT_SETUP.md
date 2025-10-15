# Contact Form Email Setup Guide

## ✅ CONFIGURED: Emails will be sent to efansav@gmail.com

## Option 1: Using Formspree (Currently Active)

### Current Setup:
- **Target Email**: efansav@gmail.com
- **Service**: Formspree.io
- **Status**: Ready to use (no additional setup required)

### How it works:
1. **User fills out the contact form**
2. **Formspree processes the submission**
3. **Email is sent to efansav@gmail.com**
4. **You can reply directly to the sender**

### Pros:
- ✅ Free for up to 50 submissions/month
- ✅ No server setup required
- ✅ Handles spam protection
- ✅ Works immediately after deployment

---

## Option 2: Using Custom API Route with Gmail SMTP

### Prerequisites:
1. **Install nodemailer**: `npm install nodemailer @types/nodemailer`
2. **Set up Gmail App Password**:
   - Go to Google Account settings
   - Enable 2-factor authentication
   - Generate an App Password for "Mail"

### Environment Variables:
Create a `.env.local` file in your project root:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

### Steps:
1. **Uncomment the API route option** in the contact form
2. **Comment out the Formspree option**
3. **Add environment variables**
4. **Install nodemailer dependency**
5. **Deploy with environment variables**

### Pros:
- ✅ Full control over email content
- ✅ No third-party dependencies
- ✅ Unlimited emails
- ✅ Custom email templates

---

## Option 3: Using EmailJS (Client-side)

### Steps:
1. **Go to [EmailJS.com](https://www.emailjs.com/)**
2. **Connect your Gmail account**
3. **Get your service ID, template ID, and public key**
4. **Use EmailJS SDK in your React component**

### Example:
```javascript
import emailjs from '@emailjs/browser';

const handleSubmit = (e) => {
  e.preventDefault();
  
  emailjs.sendForm(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID', 
    e.target,
    'YOUR_PUBLIC_KEY'
  ).then(() => {
    alert('Message sent successfully!');
  });
};
```

---

## Recommendation

**For beginners**: Use **Formspree** (Option 1) - it's the easiest and most reliable.

**For advanced users**: Use **Custom API Route** (Option 2) for full control.

The contact form is already set up with Formspree integration. Just replace `YOUR_FORM_ID` with your actual Formspree form ID!