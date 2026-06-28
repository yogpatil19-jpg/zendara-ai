/**
 * Zendara AI — Secure API Route
 * Vercel Serverless Function — CommonJS format
 * Path: /api/generate
 */

module.exports = async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── API key check ─────────────────────────────────────────
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: 'API key not configured. Please add ANTHROPIC_API_KEY in Vercel environment variables.' });
  }

  // ── Parse body ────────────────────────────────────────────
  const { type, data } = req.body || {};
  if (!type || !data) return res.status(400).json({ error: 'Missing type or data' });
  if (!['google', 'meta', 'strategy'].includes(type)) return res.status(400).json({ error: 'Invalid type' });

  // ── Build prompt ──────────────────────────────────────────
  let prompt = '';

  if (type === 'google') {
    const { profession, city, budget, target, service, years, usp, competitor } = data;
    prompt = `You are a Google Ads specialist for professional services in New Zealand and Australia.

Create a complete Google Ads Search Campaign for:
- Profession: ${profession}
- City: ${city}
- Monthly Budget: NZD $${budget}
- Target Clients: ${target || 'general target market'}
- Main Service: ${service || 'professional consultation'}
- Years in Business: ${years || '3-10 years'}
- USP: ${usp || 'experienced, professional'}
- Competitor: ${competitor || 'none'}

Return ONLY valid JSON, no markdown, no backticks, no explanation. Just the JSON object:
{
  "campaign_name": "string",
  "quality_score": 8,
  "quality_reasons": ["reason 1", "reason 2", "reason 3"],
  "campaign_type": "Search Campaign",
  "daily_budget_nzd": "$XX/day",
  "monthly_budget_nzd": "$XXX/month",
  "bidding_strategy": "Maximise Conversions",
  "bidding_explanation": "explanation string",
  "keywords": [
    {"keyword": "family lawyer auckland", "match_type": "Exact", "intent": "High", "estimated_cpc_nzd": "$8-12", "ad_group": "Core Services"}
  ],
  "negative_keywords": ["free", "diy", "template", "online", "cheap", "forum", "reddit", "salary", "jobs", "study", "course"],
  "headlines": [
    {"text": "Auckland Family Lawyer", "type": "Location"},
    {"text": "Free 30-Min Consultation", "type": "CTA"},
    {"text": "Experienced Family Law Team", "type": "USP"},
    {"text": "Call Us Today", "type": "CTA"},
    {"text": "Trusted by 500+ Clients", "type": "Social Proof"},
    {"text": "No Win No Fee Available", "type": "USP"},
    {"text": "Same Day Appointments", "type": "Service"},
    {"text": "Family Law Specialists", "type": "Service"},
    {"text": "Protect Your Rights Now", "type": "CTA"},
    {"text": "Award-Winning Law Firm", "type": "Brand"},
    {"text": "Speak to a Lawyer Today", "type": "CTA"},
    {"text": "Affordable Legal Advice", "type": "USP"},
    {"text": "30 Years of Experience", "type": "USP"},
    {"text": "Confidential Consultation", "type": "Service"},
    {"text": "Results-Focused Legal Team", "type": "Brand"}
  ],
  "descriptions": [
    {"text": "Expert family lawyers in Auckland. Free initial consultation. Call now for confidential legal advice tailored to your situation."},
    {"text": "Protect your family and assets with experienced legal support. Trusted by hundreds of Auckland families. Book today."},
    {"text": "Compassionate family law advice from Auckland's leading specialists. Fixed-fee options available. Call for free consultation."},
    {"text": "Get expert legal guidance from our experienced family law team. Confidential, professional, results-focused. Call us now."}
  ],
  "sitelinks": [
    {"title": "Book Free Consultation", "desc1": "Speak to a lawyer today", "desc2": "No obligation consultation", "url_path": "/contact"},
    {"title": "Our Services", "desc1": "Divorce, custody & more", "desc2": "Full family law services", "url_path": "/services"},
    {"title": "Meet Our Team", "desc1": "Experienced family lawyers", "desc2": "Award-winning legal team", "url_path": "/team"},
    {"title": "Client Reviews", "desc1": "500+ satisfied clients", "desc2": "See what clients say", "url_path": "/reviews"}
  ],
  "callouts": ["Free Consultation", "Same Day Response", "Fixed Fee Options", "30 Years Experience", "Confidential Service", "NZ Licensed"],
  "call_extension": "Call now for free 30-minute consultation",
  "location_targeting": "Auckland CBD + 20km radius, targeting people IN the area",
  "ad_schedule": "Monday-Friday 7am-7pm, Saturday 8am-2pm NZST",
  "device_targeting": "All devices, mobile bid adjustment +20%",
  "conversion_actions": ["Phone calls from ads", "Contact form submissions", "Consultation bookings"],
  "budget_breakdown": {
    "estimated_clicks_monthly": "180-240",
    "estimated_cpl_nzd": "$45-75",
    "estimated_leads_monthly": "12-18",
    "estimated_roas": "8:1 to 15:1"
  },
  "launch_checklist": [
    "Create Google Ads account at ads.google.com and switch to Expert Mode",
    "Create new Search campaign with Leads objective",
    "Set daily budget and Maximise Conversions bidding",
    "Add location targeting for your city with radius",
    "Create ad group and paste all keywords with correct match types",
    "Create Responsive Search Ad with all 15 headlines and 4 descriptions",
    "Add negative keywords at campaign level",
    "Add all 4 sitelinks with descriptions",
    "Add 6 callout extensions",
    "Set up conversion tracking for calls and form submissions"
  ],
  "tips": [
    "Start with Exact Match keywords only for the first 2 weeks to control spend",
    "Enable call tracking to measure which keywords drive phone calls",
    "Check Search Terms report weekly to find new negative keywords",
    "Add location extensions to show your office address in ads"
  ]
}

IMPORTANT RULES:
- Every headline MUST be 30 characters or fewer — count carefully
- Every description MUST be 90 characters or fewer — count carefully  
- Generate exactly 15 headlines
- Generate exactly 4 descriptions
- Generate 15-20 keywords across Exact, Phrase, and Broad match types
- Make all content specific to ${profession} in ${city} New Zealand
- Follow Google Ads policies — no guarantees, no unverifiable superlatives`;
  }

  if (type === 'meta') {
    const { profession, city, platform, objective, budget, age, offer, problem } = data;
    prompt = `You are a Meta Ads specialist for professional services in New Zealand.

Create a complete ${platform} campaign for:
- Profession: ${profession}
- City: ${city}
- Platform: ${platform}
- Objective: ${objective}
- Monthly Budget: NZD $${budget || '800'}
- Target Age: ${age}
- Offer: ${offer || 'free consultation'}
- Problem solved: ${problem || 'professional services'}

Return ONLY valid JSON, no markdown, no backticks:
{
  "campaign_name": "string",
  "quality_score": 8,
  "quality_reasons": ["reason 1", "reason 2"],
  "objective": "string",
  "daily_budget_nzd": "$XX/day",
  "budget_recommendation": "NZD $XXX/month total",
  "audience": {
    "age_range": "35-55",
    "gender": "All genders",
    "locations": "Auckland City",
    "radius_km": 25,
    "detailed_targeting": ["Legal services", "Family matters", "Home ownership", "Small business owners", "High income households", "Property investment"],
    "excluded_audiences": ["Current clients", "Legal professionals", "Law students"],
    "custom_audiences": ["Website visitors last 60 days", "Email list upload"],
    "lookalike_source": "Existing client email list",
    "lookalike_percentage": "1-3% lookalike"
  },
  "ad_sets": [
    {
      "name": "Cold Traffic — Auckland Professionals",
      "targeting_focus": "New audience who have never heard of you",
      "budget_allocation_percent": 70,
      "audience_size_estimate": "45,000 - 120,000 people",
      "optimization_event": "Lead form submission"
    },
    {
      "name": "Retargeting — Warm Visitors",
      "targeting_focus": "People who visited your website or engaged with your content",
      "budget_allocation_percent": 30,
      "audience_size_estimate": "500 - 5,000 people",
      "optimization_event": "Lead form submission"
    }
  ],
  "ads": [
    {
      "ad_name": "Pain Point — Overwhelm",
      "format": "Single Image",
      "placement": "Feed",
      "hook": "Feeling overwhelmed by your legal situation?",
      "primary_text": "Navigating a family law matter alone is stressful and costly. Our Auckland team has helped over 500 families protect what matters most — with a free 30-minute consultation to start.",
      "headline": "Free Consultation Today",
      "description": "Auckland's trusted family lawyers",
      "cta_button": "Learn More",
      "image_brief": "Professional photo of a calm, modern legal office in Auckland. Warm lighting, no people. Conveys safety and professionalism.",
      "copy_angle": "Pain"
    },
    {
      "ad_name": "Social Proof — Results",
      "format": "Single Image",
      "placement": "Feed",
      "hook": "500+ Auckland families protected their future with us.",
      "primary_text": "When life gets complicated, you need a legal team who understands. Our family law specialists have helped hundreds of Aucklanders navigate separation, custody, and property matters — with real results.",
      "headline": "See Our Client Stories",
      "description": "Trusted by 500+ NZ families",
      "cta_button": "Get Started",
      "image_brief": "Clean, professional graphic showing 5-star review icons and the number 500+ in gold. Dark background with white text.",
      "copy_angle": "Social Proof"
    },
    {
      "ad_name": "Authority — Urgency",
      "format": "Single Image",
      "placement": "Reel",
      "hook": "Don't make these 3 legal mistakes during separation.",
      "primary_text": "Most people wait too long to get legal advice — and it costs them dearly. Our Auckland family lawyers offer a free 30-minute consultation so you can understand your rights before making any decisions.",
      "headline": "Book Free 30-Min Call",
      "description": "Limited slots this week",
      "cta_button": "Book Now",
      "image_brief": "Split-screen: stressed person on left, confident person in professional setting on right. Text overlay: 'Get advice before it's too late'",
      "copy_angle": "Urgency"
    }
  ],
  "retargeting": {
    "audience_definition": "Website visitors in last 60 days who did not submit a contact form",
    "window_days": 60,
    "message_shift": "Switch from awareness to urgency — remind them you offer a free consultation and limited availability",
    "budget_percent": 30
  },
  "lead_form": {
    "headline": "Book Your Free Legal Consultation",
    "description": "Speak to an Auckland family lawyer today. Free 30-minute confidential consultation — no obligation.",
    "questions": ["What type of legal matter do you need help with?", "What is your preferred contact time?", "How soon do you need legal advice?"],
    "thank_you_message": "Thank you! One of our lawyers will contact you within 2 hours during business hours."
  },
  "pixel_events": ["Lead (form submission)", "Contact (phone click)", "Schedule (booking page visit)"],
  "ab_test_suggestion": "Test Pain angle (Ad 1) vs Social Proof angle (Ad 2) first. Run for 7 days minimum before judging results.",
  "placements": ["Facebook Feed", "Instagram Feed", "Facebook Stories", "Instagram Reels"],
  "compliance_notes": [
    "Do not make specific outcome guarantees — Meta prohibits claims like 'we will win your case'",
    "Avoid before/after claims about legal outcomes",
    "Include 'Sponsored' disclosure is automatic — no action needed",
    "Do not target by sensitive categories like relationship status without checking Meta policies"
  ],
  "meta_ads_manager_steps": [
    "Go to adsmanager.facebook.com and click + Create",
    "Select Leads as your campaign objective and name your campaign",
    "Set Campaign Budget Optimisation ON and enter your monthly budget",
    "Set up Ad Set 1 with cold audience targeting as specified above",
    "Create all 3 ad variations with different copy angles",
    "Duplicate Ad Set 1 and change audience to website retargeting for Ad Set 2",
    "Create native Lead Form using the questions and messaging above",
    "Install Facebook Pixel on your website via Events Manager",
    "Publish campaign and monitor for first 72 hours without making changes"
  ],
  "tips": [
    "Let Meta's algorithm run for at least 7 days before optimising — it needs 50 conversions to exit the learning phase",
    "The Pain angle ad almost always wins in professional services — lead with that one",
    "Use the Lead Form objective rather than website clicks — it converts 3-5x better on mobile",
    "Respond to every lead within 5 minutes — Meta tracks lead response time and rewards fast responders with cheaper leads"
  ]
}

RULES:
- Primary text max 125 characters for best mobile display
- Headline max 40 characters — count carefully
- All content must be specific to ${profession} in ${city} New Zealand
- Follow Meta advertising policies for professional services`;
  }

  if (type === 'strategy') {
    const { profession, city, budget, goals } = data;
    prompt = `You are a senior digital marketing strategist for professional services in NZ/AUS.

Create a 90-day advertising strategy for:
- Profession: ${profession}
- City: ${city}
- Monthly Budget: NZD $${budget}
- Goals: ${goals || 'increase leads and revenue'}

Return ONLY valid JSON, no markdown, no backticks:
{
  "strategy_name": "90-Day Growth Strategy — ${profession}, ${city}",
  "executive_summary": "2-3 sentence summary of the strategy approach and expected outcomes",
  "budget_split": {
    "google_ads_percent": 60,
    "meta_ads_percent": 40,
    "google_ads_nzd": 1200,
    "meta_ads_nzd": 800,
    "rationale": "Why this split works for this profession and city"
  },
  "month_1": {
    "theme": "Foundation & Testing",
    "google_focus": "Launch exact match keywords, establish baseline CPL",
    "meta_focus": "Test 3 ad angles, identify best performing creative",
    "kpis": ["Cost per lead below $120", "10+ leads from Google", "5+ leads from Meta"],
    "tasks": ["Set up Google Ads account and conversion tracking", "Launch Google Search campaign", "Create and publish 3 Meta ad variations", "Install Facebook Pixel on website"]
  },
  "month_2": {
    "theme": "Optimise & Scale",
    "google_focus": "Expand winning keywords, pause underperformers, add phrase match",
    "meta_focus": "Scale winning ad angle, launch lookalike audiences",
    "kpis": ["CPL reduced by 20%", "20+ leads total", "ROAS above 5:1"],
    "tasks": ["Review search terms report and add negatives", "Increase budget on top keywords", "Launch lookalike audience campaign", "A/B test new ad headline"]
  },
  "month_3": {
    "theme": "Accelerate & Diversify",
    "google_focus": "Launch display retargeting, test new ad groups",
    "meta_focus": "Launch video ads, expand to Instagram Reels",
    "kpis": ["30+ leads per month", "CPL below $80", "Pipeline value 10x ad spend"],
    "tasks": ["Launch retargeting display campaign", "Create short video testimonial ad", "Expand to Instagram Reels placement", "Review and plan Q2 strategy"]
  },
  "success_metrics": {
    "target_cpl_nzd": "$60-90",
    "target_leads_monthly": "25-40",
    "target_roas": "8:1 to 15:1",
    "break_even_point": "Month 1-2"
  },
  "quick_wins": [
    "Set up call tracking immediately — most leads call rather than fill forms",
    "Add your Google Business Profile and get 5 reviews before launching ads",
    "Create a dedicated landing page for ads rather than sending to homepage"
  ],
  "risks": [
    "Professional services CPCs can spike during busy periods — monitor daily spend",
    "Meta may restrict professional services ads if copy is too outcome-focused"
  ],
  "recommended_tools": ["Google Ads conversion tracking", "Meta Pixel", "Google Analytics 4", "Calendly for appointment booking"]
}`;
  }

  // ── Call Anthropic ────────────────────────────────────────
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return res.status(502).json({ error: 'AI service error — please try again in a moment.' });
    }

    const aiData = await response.json();
    const rawText = aiData.content.map(i => i.text || '').join('');

    // Strip any markdown fences if present
    const clean = rawText.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (parseErr) {
      console.error('JSON parse failed. Raw output:', clean.slice(0, 800));
      return res.status(500).json({ error: 'AI returned unexpected format — please try again.' });
    }

    return res.status(200).json({ success: true, data: parsed });

  } catch (networkErr) {
    console.error('Network/fetch error:', networkErr);
    return res.status(500).json({ error: 'Server error — please try again.' });
  }
};
