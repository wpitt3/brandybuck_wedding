# 💍 Sarah & James — Wedding Invite Website

A beautiful, modern wedding invitation website built with React, ready to deploy to GitHub Pages.

## ✨ Features

- **Hero section** with live countdown timer to the wedding day
- **Details section** — date, location, dress code, accommodation
- **Running order** — timeline of the day's events
- **RSVP form** — name, attendance, guest count, dietary requirements, message
- Smooth scroll navigation, scroll-triggered animations, mobile responsive

## 🛠 Getting Started

```bash
npm install
npm start
```

## 🚀 Deploy to GitHub Pages

### 1. Create a GitHub repo
Create a new repo, e.g. `wedding-invite`.

### 2. Update homepage in package.json
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/wedding-invite"
```

### 3. Push your code
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wedding-invite.git
git push -u origin main
```

### 4. Deploy
```bash
npm run deploy
```

This builds the app and pushes to a `gh-pages` branch automatically.

### 5. Enable GitHub Pages
- Go to your repo → **Settings → Pages**
- Set source to **Deploy from a branch** → `gh-pages` → `/ (root)`
- Your site will be live at `https://YOUR_USERNAME.github.io/wedding-invite` in ~60 seconds

## ✏️ Customising

All the key details to change are in `src/App.js`:

| Variable | What to change |
|---|---|
| `COUPLE` | Bride and groom names |
| `WEDDING_DATE` | The wedding date/time |
| `SCHEDULE` | Running order of the day |
| `DIETARY_OPTIONS` | Dietary choices in the form |
| Detail cards | Location, dress code, accommodation info |

## 📬 RSVP Responses

Currently the RSVP form shows a confirmation message but doesn't store data. To collect real responses, integrate one of:

- **[Formspree](https://formspree.io)** — free, just change the form action
- **[EmailJS](https://www.emailjs.com)** — sends responses to your email
- **Google Forms embed** — simplest option
- A backend API of your choice

## 🎨 Fonts & Styling

- Display: *Cormorant Garamond* (Google Fonts)
- Body: *Jost* (Google Fonts)
- All colours defined as CSS variables in `App.css`
