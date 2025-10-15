# Email Setup Instructions

## Current Status: Using mailto: (opens email client)

The contact form is currently set to open your default email client with the message pre-filled. This works immediately but requires users to have an email client set up.

## To Set Up Automatic Email Sending:

### Option 1: Formspree (Free - Recommended)
1. Go to https://formspree.io/
2. Sign up with any email
3. Create a new form
4. You'll get a form endpoint like: `https://formspree.io/f/xayzabc123`
5. Replace the handleSubmit function with:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      subject: formData.subject,
      message: formData.message,
      _replyto: formData.email,
    }),
  });
  
  if (response.ok) {
    alert('Message sent!');
    // Reset form
  }
};
```

### Option 2: EmailJS (Free)
1. Go to https://www.emailjs.com/
2. Connect your Gmail account
3. Get your Service ID, Template ID, and Public Key
4. The form is already set up for EmailJS - just replace the placeholder IDs

### Option 3: Web3Forms (Free)
1. Go to https://web3forms.com/
2. Enter efansav@gmail.com to get an access key
3. Replace the current handleSubmit with Web3Forms API call

## Current Method (mailto:)
- ✅ Works immediately
- ✅ No setup required
- ❌ Requires user to have email client
- ❌ Less professional experience

Choose the option that works best for your needs!