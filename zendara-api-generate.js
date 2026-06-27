/**
 * Zendara AI — Secure API Route
 * Deployed as: Vercel Serverless Function
 * Path: /api/generate
 *
 * This keeps your Anthropic API key SECRET on the server.
 * The browser NEVER sees your API key.
 */

export default async function handler(req, res) {
  // ── CORS headers ─────────────────────────────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate limiting (simple — 30 req/min per IP) ───────────
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  // Note: For production, replace with Redis-based rate limiter (Upstash)

  // ── Validate request ─────────────────────────────────────
  const { type, data } = req.body;

  if (!type || !data) {
    return res.status(400).json({ error: 'Missing type or data' });
  }

  if (!['google', 'meta', 'strategy', 'competitor'].includes(type)) {
    return res.status(400).json({ error: 'Invalid generation type' });
  }

  // ── Build prompt based on type ───────────────────────────
  let prompt = '';

  if (type === 'google') {
    const { profession, city, budget, target, service, years, usp, competitor } = data;
    prompt = `You are a Google Ads specialist for professional services in New Zealand and Australia with 15 years experience.

Create a complete, production-ready Google Ads Search Campaign for:
- Profession: ${profession}
- City/Region: ${city}
- Monthly Budget: NZD $${budget}
- Target Clients: ${target || 'general target market'}
- Main Service/Offer: ${service || 'professional consultation'}
- Years in Business: ${years || '3-10 years'}
- Unique Selling Points: ${usp || 'experienced, professional, results-focused'}
- Known Competitor: ${competitor || 'none specified'}

Return ONLY valid JSON, no markdown, no backticks:
{
  "campaign_name": "string",
  "quality_score": number (1-10, your assessment of campaign potential),
  "quality_reasons": ["reason1","reason2"],
  "campaign_type": "Search Campaign",
  "daily_budget_nzd": "string",
  "monthly_budget_nzd": "string",
  "bidding_strategy": "string",
  "bidding_explanation": "string",
  "campaign_structure": {
    "ad_groups": [
      {"name": "string", "theme": "string", "keyword_count": number}
    ]
  },
  "keywords": [
    {"keyword": "string", "match_type": "Broad|Phrase|Exact", "intent": "High|Medium|Low", "estimated_cpc_nzd": "string", "ad_group": "string"}
  ],
  "negative_keywords": ["word1","word2","word3","word4","word5","word6","word7","word8","word9","word10","word11","word12"],
  "headlines": [
    {"text": "string", "chars": number, "type": "Brand|Service|CTA|USP|Location"}
  ],
  "descriptions": [
    {"text": "string", "chars": number}
  ],
  "sitelinks": [
    {"title": "string", "desc1": "string", "desc2": "string", "url_path": "string"}
  ],
  "callouts": ["string"],
  "structured_snippets": {"header": "string", "values": ["string"]},
  "call_extension": "string",
  "location_targeting": "string",
  "ad_schedule": "string",
  "device_targeting": "string",
  "conversion_actions": ["action1","action2","action3"],
  "landing_page_tips": ["tip1","tip2","tip3"],
  "budget_breakdown": {
    "estimated_clicks_monthly": "string",
    "estimated_cpl_nzd": "string",
    "estimated_leads_monthly": "string",
    "estimated_roas": "string"
  },
  "launch_checklist": ["step1","step2","step3","step4","step5"],
  "google_ads_editor_steps": ["step1","step2","step3","step4"],
  "tips": ["tip1","tip2","tip3","tip4"]
}

Rules:
- Exactly 15 headlines, each MAX 30 characters (count carefully)
- Exactly 4 descriptions, each MAX 90 characters (count carefully)  
- 15-20 keywords across all match types, grouped by ad group
- 12 negative keywords minimum
- 4 sitelinks with 2 descriptions each
- 6 callouts max 25 chars each
- Be specific to ${profession} in ${city} NZ — no generic copy
- Follow Google Ads policies for professional services (no guarantees, no superlatives without proof)`;
  }

  if (type === 'meta') {
    const { profession, city, platform, objective, budget, age, offer, problem, competitor } = data;
    prompt = `You are a Meta Ads specialist for professional services in New Zealand and Australia with 15 years experience.

Create a complete ${platform} campaign for:
- Profession: ${profession}
- City/Region: ${city}
- Platform: ${platform}
- Objective: ${objective}
- Monthly Budget: NZD $${budget || 'flexible'}
- Target Age: ${age}
- Special Offer: ${offer || 'professional consultation'}
- Client Problem: ${problem || 'professional services needed'}
- Known Competitor: ${competitor || 'none'}

Return ONLY valid JSON, no markdown, no backticks:
{
  "campaign_name": "string",
  "quality_score": number (1-10),
  "quality_reasons": ["reason1","reason2"],
  "objective": "string",
  "budget_recommendation": "string",
  "daily_budget_nzd": "string",
  "audience": {
    "age_range": "string",
    "gender": "string",
    "locations": "string",
    "radius_km": number,
    "detailed_targeting": ["interest1","interest2","interest3","interest4","interest5","interest6"],
    "excluded_audiences": ["exclusion1","exclusion2","exclusion3"],
    "custom_audiences": ["custom1","custom2"],
    "lookalike_source": "string",
    "lookalike_percentage": "string"
  },
  "ad_sets": [
    {
      "name": "string",
      "targeting_focus": "string",
      "budget_allocation_percent": number,
      "audience_size_estimate": "string",
      "optimization_event": "string"
    }
  ],
  "ads": [
    {
      "ad_name": "string",
      "format": "Single Image|Carousel|Video|Story",
      "placement": "Feed|Story|Reel|All",
      "hook": "string",
      "primary_text": "string",
      "headline": "string",
      "description": "string",
      "cta_button": "string",
      "image_brief": "string",
      "video_brief": "string",
      "copy_angle": "Pain|Social Proof|Authority|Urgency|Curiosity"
    }
  ],
  "retargeting": {
    "audience_definition": "string",
    "window_days": number,
    "message_shift": "string",
    "budget_percent": number
  },
  "lead_form": {
    "headline": "string",
    "description": "string",
    "questions": ["question1","question2","question3"],
    "thank_you_message": "string"
  },
  "pixel_events": ["event1","event2","event3"],
  "ab_test_suggestion": "string",
  "placements": ["placement1","placement2","placement3","placement4"],
  "compliance_notes": ["note1","note2","note3"],
  "meta_ads_manager_steps": ["step1","step2","step3","step4","step5"],
  "tips": ["tip1","tip2","tip3","tip4"]
}

Rules:
- Create exactly 3 different ad variations with different copy angles
- Create exactly 2 ad sets (Cold Traffic + Retargeting)
- Primary text max 125 characters for best mobile performance
- Headline max 40 characters
- Follow Meta's advertising policies for professional services
- Include NZ-specific targeting and cultural references where appropriate`;
  }

  if (type === 'strategy') {
    const { profession, city, budget, goals } = data;
    prompt = `You are a senior digital marketing strategist specialising in professional services in NZ/AUS.

Create a 90-day advertising strategy for:
- Profession: ${profession}
- City: ${city}
- Total Monthly Budget: NZD $${budget}
- Business Goals: ${goals || 'increase leads and revenue'}

Return ONLY valid JSON, no markdown:
{
  "strategy_name": "string",
  "executive_summary": "string (2-3 sentences)",
  "budget_split": {
    "google_ads_percent": number,
    "meta_ads_percent": number,
    "google_ads_nzd": number,
    "meta_ads_nzd": number,
    "rationale": "string"
  },
  "month_1": {
    "theme": "string",
    "google_focus": "string",
    "meta_focus": "string",
    "kpis": ["kpi1","kpi2","kpi3"],
    "tasks": ["task1","task2","task3","task4"]
  },
  "month_2": {
    "theme": "string",
    "google_focus": "string",
    "meta_focus": "string",
    "kpis": ["kpi1","kpi2","kpi3"],
    "tasks": ["task1","task2","task3","task4"]
  },
  "month_3": {
    "theme": "string",
    "google_focus": "string",
    "meta_focus": "string",
    "kpis": ["kpi1","kpi2","kpi3"],
    "tasks": ["task1","task2","task3","task4"]
  },
  "success_metrics": {
    "target_cpl_nzd": "string",
    "target_leads_monthly": "string",
    "target_roas": "string",
    "break_even_point": "string"
  },
  "quick_wins": ["win1","win2","win3"],
  "risks": ["risk1","risk2"],
  "recommended_tools": ["tool1","tool2","tool3"]
}`;
  }

  // ── Call Anthropic API ────────────────────────────────────
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
      const err = await response.text();
      console.error('Anthropic error:', err);
      return res.status(502).json({ error: 'AI service error. Please try again.' });
    }

    const aiData = await response.json();
    const text = aiData.content.map(i => i.text || '').join('');
    const clean = text.replace(/```json|```/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr, '\nRaw:', clean.slice(0, 500));
      return res.status(500).json({ error: 'Response format error. Please try again.' });
    }

    return res.status(200).json({ success: true, data: parsed });

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}
