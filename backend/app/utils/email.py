import os
import requests
from email.message import EmailMessage


def build_contact_email_message(contact) -> EmailMessage:
    sender_email = os.getenv("SMTP_FROM_EMAIL") or os.getenv("SMTP_USERNAME") or ""

    recipient_email = (
        os.getenv("CONTACT_RECEIVER_EMAIL")
        or os.getenv("SMTP_USERNAME")
        or ""
    )

    message = EmailMessage()
    message["Subject"] = f"📩 New Portfolio Contact: {contact.subject}"
    message["From"] = sender_email
    message["To"] = recipient_email

    message.set_content(
        f"""
You have received a new message from your portfolio website.

Name: {contact.name}
Email: {contact.email}
Subject: {contact.subject}

Message:
{contact.message}
"""
    )

    return message


def build_auto_reply_message(contact) -> EmailMessage:
    sender_email = os.getenv("SMTP_FROM_EMAIL") or os.getenv("SMTP_USERNAME") or ""

    message = EmailMessage()
    message["Subject"] = "Thank you for contacting Girish R"
    message["From"] = sender_email
    message["To"] = contact.email

    message.set_content(
        f"""
Hi {contact.name},

Thank you for contacting me through my portfolio website.

I've received your message and will get back to you within 24–48 hours.

Best regards,

Girish R
Software Engineer

Portfolio:
https://girishgowda-portfolio.vercel.app/

GitHub:
https://github.com/Girishg0wda

LinkedIn:
https://www.linkedin.com/in/girisha-s-r
"""
    )

    message.add_alternative(
        f"""
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="40" cellspacing="0">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:14px;overflow:hidden;
box-shadow:0 8px 25px rgba(0,0,0,.08);">

<tr>
<td align="center"
style="padding:45px;background:linear-gradient(135deg,#2563eb,#1d4ed8);">

<h1 style="color:#ffffff;margin:0;font-size:34px;">
👋 Thank You!
</h1>

<p style="margin-top:15px;color:#dbeafe;font-size:18px;">
Your message has been received successfully.
</p>

</td>
</tr>

<tr>
<td style="padding:45px;">

<h2 style="margin-top:0;color:#111827;">
Hi {contact.name},
</h2>

<p style="font-size:16px;line-height:1.8;color:#4b5563;">
Thank you for reaching out through my portfolio website.
I appreciate your interest.
</p>

<p style="font-size:16px;line-height:1.8;color:#4b5563;">
I've received your message and will review it personally.
You can expect a response within
<strong>24–48 hours.</strong>
</p>

<div style="
background:#f8fafc;
padding:20px;
border-left:5px solid #2563eb;
border-radius:10px;
margin:30px 0;">

<p style="
margin:0;
font-size:13px;
color:#2563eb;
font-weight:bold;
text-transform:uppercase;">
Subject
</p>

<p style="
margin-top:10px;
font-size:18px;
color:#111827;">
{contact.subject}
</p>

</div>

<p style="font-size:16px;color:#4b5563;">
While you're waiting, feel free to explore my work and connect with me.
</p>

<table align="center" cellpadding="8">

<tr>

<td>
<a href="https://girishgowda-portfolio.vercel.app/"
style="
background:#2563eb;
color:#ffffff;
padding:14px 26px;
text-decoration:none;
border-radius:8px;
font-weight:bold;">
🌐 Portfolio
</a>
</td>

<td>
<a href="https://github.com/Girishg0wda"
style="
background:#111827;
color:#ffffff;
padding:14px 26px;
text-decoration:none;
border-radius:8px;
font-weight:bold;">
💻 GitHub
</a>
</td>

<td>
<a href="https://www.linkedin.com/in/girisha-s-r"
style="
background:#0077B5;
color:#ffffff;
padding:14px 26px;
text-decoration:none;
border-radius:8px;
font-weight:bold;">
LinkedIn
</a>
</td>

</tr>

</table>

<hr style="margin:40px 0;border:none;border-top:1px solid #e5e7eb;">

<h3 style="margin-bottom:5px;color:#111827;">
Girish R
</h3>

<p style="margin-top:0;color:#6b7280;">
Software Engineer • Full Stack Developer • AI Enthusiast
</p>

</td>
</tr>

<tr>
<td align="center"
style="background:#111827;padding:30px;">

<p style="margin:0;color:#d1d5db;">
Thank you for visiting my portfolio.
</p>

<p style="margin-top:10px;color:#9ca3af;font-size:13px;">
This is an automated confirmation email.
Please do not reply to this message.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
""",
        subtype="html",
    )

    return message


def send_email(message: EmailMessage) -> None:
    api_key = os.getenv("BREVO_API_KEY")

    if not api_key:
        raise RuntimeError("BREVO_API_KEY is not configured")

    sender_email = (
        os.getenv("SMTP_FROM_EMAIL")
        or os.getenv("SMTP_USERNAME")
        or "girishgowda0239@gmail.com"
    )

    to_email = message["To"]
    subject = message["Subject"]

    html_content = None
    text_content = None

    if message.is_multipart():
        for part in message.walk():
            content_type = part.get_content_type()

            if content_type == "text/html":
                html_content = part.get_content()

            elif content_type == "text/plain":
                text_content = part.get_content()
    else:
        text_content = message.get_content()

    payload = {
        "sender": {
            "name": "Girish Gowda",
            "email": sender_email,
        },
        "to": [
            {
                "email": to_email,
            }
        ],
        "subject": subject,
    }

    if html_content:
        payload["htmlContent"] = html_content
    else:
        payload["textContent"] = text_content

    response = requests.post(
        "https://api.brevo.com/v3/smtp/email",
        headers={
            "accept": "application/json",
            "api-key": api_key,
            "content-type": "application/json",
        },
        json=payload,
        timeout=20,
    )

    if response.status_code not in (200, 201, 202):
        print(response.text)
        response.raise_for_status()

    print("Brevo email sent successfully.")


def send_contact_notification(contact):
    send_email(build_contact_email_message(contact))


def send_auto_reply(contact):
    send_email(build_auto_reply_message(contact))