# Zendara AI — Complete Deployment Guide
# Follow every step exactly. No coding knowledge required.

## WHAT YOU HAVE (3 files to deploy)
```
zendara-v2/
├── index.html          ← Your full app (landing + dashboard)
├── vercel.json         ← Tells Vercel how to run your API
└── api/
    └── generate.js     ← Secure AI backend (hides your API key)
```

---

## STEP 1 — Get Your Anthropic API Key (5 min)

1. Go to: https://console.anthropic.com
2. Sign in or create a free account
3. Click **"API Keys"** in the left menu
4. Click **"Create Key"**
5. Name it: `zendara-production`
6. Copy the key — it starts with `sk-ant-...`
7. **Save it somewhere safe** — you only see it once

---

## STEP 2 — Create a GitHub Account & Repository (5 min)

GitHub stores your code so Vercel can deploy it.

1. Go to: https://github.com
2. Click **"Sign up"** — create a free account
3. After signing in, click the **"+"** button (top right)
4. Click **"New repository"**
5. Repository name: `zendara-ai`
6. Set to **Public**
7. Click **"Create repository"**

---

## STEP 3 — Upload Your Files to GitHub (5 min)

1. On your new repository page, click **"uploading an existing file"**
2. Upload these files IN THIS ORDER:

   **First:** Drag `index.html` into the upload area

   **Then click:** "Add files" again and upload `vercel.json`

   **Then:** You need to create the `api` folder:
   - Click **"Add file"** → **"Create new file"**
   - In the filename box, type: `api/generate.js`
   - Copy and paste the ENTIRE contents of your `generate.js` file
   - Click **"Commit new file"**

3. After all uploads, your repository should show:
   ```
   api/
     generate.js
   index.html
   vercel.json
   ```

---

## STEP 4 — Deploy to Vercel (5 min)

1. Go to: https://vercel.com
2. Click **"Sign up"** → Choose **"Continue with GitHub"**
3. Authorise Vercel to access GitHub
4. Click **"Add New Project"**
5. Find your `zendara-ai` repository → Click **"Import"**
6. On the Configure Project screen:
   - Framework Preset: **Other**
   - Root Directory: leave as `/`
   - Leave all other settings as default
7. Click **"Deploy"**
8. Wait ~60 seconds — Vercel builds your site
9. You'll see a **green tick** and a URL like: `zendara-ai.vercel.app`

---

## STEP 5 — Add Your API Key (CRITICAL — 3 min)

Your API key must be added as a secret environment variable.
**Never put it directly in your code.**

1. In Vercel dashboard, click your `zendara-ai` project
2. Click **"Settings"** (top menu)
3. Click **"Environment Variables"** (left menu)
4. Add this variable:

   | Field | Value |
   |-------|-------|
   | Name  | `ANTHROPIC_API_KEY` |
   | Value | `sk-ant-...` (your key from Step 1) |
   | Environment | Production, Preview, Development (tick all 3) |

5. Click **"Save"**
6. Go back to **"Deployments"** tab
7. Click the **three dots (...)** next to your latest deployment
8. Click **"Redeploy"** → Click **"Redeploy"** again to confirm

Your app is now live with a secure API key. ✓

---

## STEP 6 — Update Your App's API URL (2 min)

Because your app and API are on the same Vercel domain, the
current `/api/generate` path works automatically.

**No change needed** — Vercel routes `/api/generate` to your
serverless function automatically.

To verify it's working:
1. Visit: `https://your-app.vercel.app/api/generate`
2. You should see: `{"error":"Method not allowed"}`
3. That means the API is live and protected ✓

---

## STEP 7 — Add Your Custom Domain (Optional, 10 min)

1. Buy a domain at: https://namecheap.com
   - Search: `zendara.ai` or `zendaraai.com`
   - Recommended: `.ai` domain (~$70 NZD/year) or `.com` (~$20)

2. In Vercel → Your project → **Settings** → **Domains**
3. Click **"Add Domain"**
4. Type your domain: `zendara.ai`
5. Vercel shows you DNS records to add
6. Log into Namecheap → **Advanced DNS**
7. Add the records Vercel shows you
8. Wait 10–30 minutes for DNS to propagate
9. Vercel automatically adds SSL (https) — free ✓

---

## STEP 8 — Test Everything (5 min)

Visit your live URL and test each feature:

**Landing page**
- [ ] Page loads and looks correct
- [ ] "Start Free Trial" button opens signup modal
- [ ] Pricing section visible
- [ ] FAQ opens and closes

**App (sign up first)**
- [ ] Sign up with a test email
- [ ] Dashboard loads with checklist
- [ ] Google Ads tab → fill form → click Generate
   - Should show loading animation
   - Should return campaign with quality score
   - All "Copy" buttons work
- [ ] Meta Ads tab → fill form → click Generate
   - Should show Facebook ad preview
   - Should show 3 ad variations
- [ ] Strategy tab → fill form → click Generate
- [ ] Launch Guides → Google and Meta tabs show steps
- [ ] Save a campaign → appears in Saved Campaigns
- [ ] Settings → save preferences

---

## STEP 9 — Set Up Stripe Payments (15 min)

To charge your first customer:

1. Go to: https://stripe.com → Create account
2. Verify your NZ business details
3. Go to **Products** → **Add Product**
4. Create 3 products:
   - Starter: $197 NZD/month (recurring)
   - Growth: $397 NZD/month (recurring)
   - Agency: $797 NZD/month (recurring)
5. For each product, click **"Create payment link"**
6. Share the payment link with customers to collect payment

**For now:** Stripe Payment Links require NO coding.
You send the link, they pay, you give them access manually.

**Later (Phase 2):** Connect Stripe webhooks to auto-provision accounts.

---

## STEP 10 — Your Monthly Running Costs

| Service | Cost/month |
|---------|-----------|
| Vercel (Hobby plan) | FREE |
| Anthropic API (Claude) | ~$50–80 NZD (per usage) |
| Domain (.ai or .com) | ~$6–8 NZD |
| Stripe | 2.9% + 30c per transaction |
| **Total** | **~$60–90 NZD/month** |

**Break even:** Just 1 Starter customer covers all costs.

---

## GETTING YOUR FIRST CUSTOMER

### Who to target first:
- Lawyers or law firms in your city (search Google for "family lawyer Auckland")
- Dental practices with no Google Ads (search for gaps)
- Real estate agents spending on ads (check Facebook Ad Library)

### How to pitch:
1. Go to their website
2. Run their profession + city through Zendara
3. Generate a Google Ads campaign for THEIR business
4. Email or call them: "I built a complete Google Ads campaign for you — want me to send it?"
5. Show them the campaign → offer a free trial → convert to paying

### Email template:
```
Subject: Your Google Ads campaign is ready — free to review

Hi [Name],

I'm the founder of Zendara AI — an AI platform that builds
Google and Meta ad campaigns for [profession]s in [city].

I built a complete campaign for your practice and it
scored 8.4/10 on our AI quality check.

It includes:
- 15 ad headlines tailored to your clients
- 20 keywords including high-intent searches
- Budget forecast: ~[X] leads/month on $[budget] spend

Can I send it over? No cost, no obligation.

[Your name]
```

---

## TROUBLESHOOTING

**"Generation failed" error in app**
→ Your API key is missing or wrong in Vercel env vars
→ Check: Vercel → Settings → Environment Variables
→ Redeploy after saving the key

**Page shows blank / styling broken**
→ Make sure index.html is in the ROOT of your repository
→ Not inside a subfolder

**API returning 405 error**
→ That is correct! It means the route is live
→ It only accepts POST requests (the app sends POST)

**Can't find generate.js**
→ Make sure it is at path: `api/generate.js`
→ The `api` folder must be at the root level

---

## WHAT TO BUILD NEXT (Phase 2)

Once you have 5+ paying customers:

1. **Supabase database** — real user accounts, cloud campaign storage
2. **Stripe webhooks** — auto-create accounts on payment
3. **Email automation** — onboarding sequence via Resend or Postmark
4. **Google Ads API** — read live campaign data into dashboard
5. **Analytics** — track signups, conversions with Plausible or PostHog

---

## SUPPORT

Questions? Email: hello@zendara.ai
Vercel docs: https://vercel.com/docs
Anthropic docs: https://docs.anthropic.com
