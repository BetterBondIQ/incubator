export const DEMO_USER_ID = 'demo-user-001'

export const MOCK_SESSION = {
  user: { id: DEMO_USER_ID, email: 'sarah.joubert@betterbond.co.za' },
  access_token: 'demo-token',
}

export const MOCK_USERS = [
  { id: 'user-001', full_name: 'T. van der Berg',  total_points: 2340, monthly_points: 1020, streak_current: 14, streak_best: 21, team_id: 'team-001', email: 't.vandenberg@betterbond.co.za',  role: 'consultant' },
  { id: 'user-002', full_name: 'N. Mokoena',       total_points: 1890, monthly_points: 890,  streak_current: 8,  streak_best: 14, team_id: 'team-002', email: 'n.mokoena@betterbond.co.za',    role: 'consultant' },
  { id: 'user-003', full_name: 'P. Sithole',       total_points: 1650, monthly_points: 720,  streak_current: 3,  streak_best: 11, team_id: 'team-001', email: 'p.sithole@betterbond.co.za',    role: 'consultant' },
  { id: 'user-004', full_name: 'A. Botha',         total_points: 1450, monthly_points: 680,  streak_current: 6,  streak_best: 9,  team_id: 'team-002', email: 'a.botha@betterbond.co.za',      role: 'consultant' },
  { id: 'user-005', full_name: 'M. Williams',      total_points: 1320, monthly_points: 560,  streak_current: 2,  streak_best: 8,  team_id: 'team-003', email: 'm.williams@betterbond.co.za',   role: 'consultant' },
  {
    id: DEMO_USER_ID,
    full_name: 'Sarah Joubert',
    email: 'sarah.joubert@betterbond.co.za',
    total_points: 940,
    monthly_points: 590,
    streak_current: 5,
    streak_best: 12,
    role: 'consultant',
    team_id: 'team-001',
  },
  { id: 'user-007', full_name: 'K. Dlamini',    total_points: 880,  monthly_points: 450, streak_current: 1, streak_best: 7,  team_id: 'team-003', email: 'k.dlamini@betterbond.co.za',    role: 'consultant' },
  { id: 'user-008', full_name: 'R. Pretorius',  total_points: 760,  monthly_points: 320, streak_current: 4, streak_best: 6,  team_id: 'team-001', email: 'r.pretorius@betterbond.co.za',  role: 'consultant' },
  { id: 'user-009', full_name: 'L. Naidoo',     total_points: 620,  monthly_points: 280, streak_current: 2, streak_best: 5,  team_id: 'team-002', email: 'l.naidoo@betterbond.co.za',     role: 'consultant' },
  { id: 'user-010', full_name: 'C. du Plessis', total_points: 445,  monthly_points: 210, streak_current: 0, streak_best: 4,  team_id: 'team-003', email: 'c.duplessis@betterbond.co.za',  role: 'consultant' },
]

export const MOCK_MODULES = [
  {
    id: 'mod-001', title: 'Bond Origination', icon: '🏠',
    description: 'Multi-bank applications, rate negotiation & objection handling',
    is_active: true, sort_order: 1, points_completion: 50, category: 'core', lesson_count: 4,
    agent_benefits: ['Submit to up to 6 banks simultaneously', 'Negotiate better rates on behalf of buyers', 'No cost to the buyer — banks pay us', 'Pre-qualification in 24 hours'],
    buyer_benefits: ['One application, multiple bank offers', 'Expert negotiates your rate for you', 'Free service — the bank pays BetterBond', 'Know your buying power before you shop'],
  },
  {
    id: 'mod-002', title: 'Pre-Approval Certificate', icon: '📋',
    description: 'What it is, 90-day validity, and how to position it with agents',
    is_active: true, sort_order: 2, points_completion: 50, category: 'core', lesson_count: 4,
    agent_benefits: ['Qualify serious buyers before viewings', 'Reduce deal fallthrough risk', 'Speed up offer-to-registration timeline', 'Build credibility with listing agents'],
    buyer_benefits: ['Shop with confidence — know your budget', 'Sellers take your offer seriously', 'Valid for 90 days across all banks', 'No obligation to proceed'],
  },
  {
    id: 'mod-003', title: 'First Home Finance', icon: '💰',
    description: 'Subsidy-linked loans for the R3,501–R22,000 income band',
    is_active: true, sort_order: 3, points_completion: 50, category: 'core', lesson_count: 4,
    agent_benefits: ['Open a new buyer segment you may have ignored', 'Government-backed subsidies reduce deposit need', 'FLISP subsidy up to R130,505 available', 'Pair with any participating bank bond'],
    buyer_benefits: ['Government subsidy reduces what you borrow', 'Purpose-built for first-time buyers', 'Qualifying income: R3,501 to R22,000/month', 'Can be combined with 100% bond applications'],
  },
  {
    id: 'mod-004', title: 'Direct Competitors', icon: '⚔️',
    description: 'ooba, Roost, MortgageMax & MortgageMarket — know your edges',
    is_active: true, sort_order: 4, points_completion: 50, category: 'core', lesson_count: 4,
    agent_benefits: ['Articulate BetterBond\'s edge confidently', 'Handle "I\'ll just use ooba" objections', 'Understand what competitors promise vs deliver', 'Win the conversation before it starts'],
    buyer_benefits: ['Understand what makes BetterBond different', 'Compare originator models side by side', 'Know what to ask any originator', 'Make an informed choice'],
  },
  {
    id: 'mod-005', title: 'Market Alternatives', icon: '🏦',
    description: 'Going direct to bank, SA Home Loans, and informal lenders',
    is_active: true, sort_order: 5, points_completion: 50, category: 'core', lesson_count: 4,
    agent_benefits: ['Counter "I\'ll go direct to my bank" confidently', 'Explain the multi-bank submission advantage', 'Position BetterBond against SA Home Loans', 'Handle the informal lender conversation'],
    buyer_benefits: ['Understand your full range of options', 'Why going direct limits your negotiating power', 'How BetterBond compares to going direct', 'The true cost of convenience'],
  },
]

export const MOCK_LESSONS = [
  // ── Module 1: Bond Origination ──────────────────────────────────────
  {
    id: 'l1-1', module_id: 'mod-001', sort_order: 1, points_value: 20,
    title: 'What Is Bond Origination?',
    content_agent: `Bond origination is the process of sourcing, packaging and submitting home loan applications to multiple banks simultaneously on behalf of a buyer — and then negotiating the best rate on their behalf.\n\nAs a BetterBond consultant, you are not just a middleman. You are a licensed credit intermediary who understands the lending appetite of each bank and can match a buyer's profile to the bank most likely to approve them at the best rate.\n\nBetterBond is the largest bond originator in South Africa, submitting to ABSA, FNB, Nedbank, Standard Bank, Investec and RMB Private Bank from a single application. That breadth is your first competitive advantage.`,
    content_buyer: `When you apply for a home loan through BetterBond, your single application goes to up to six different banks at once. Each bank competes for your business, which means you get their best offer — not just whatever rate your existing bank gives you.\n\nBetterBond's service is completely free to you. The bank that grants your bond pays BetterBond a fee. You lose nothing; you gain negotiating power you could never have alone.\n\nOver 800,000 South African families have bought their homes through BetterBond. The process typically takes 24 hours to get your first pre-qualification, and our consultants guide you every step of the way.`,
    key_points: ['BetterBond submits to up to 6 banks simultaneously', 'Service is free — the approving bank pays the fee', 'Consultants are licensed credit intermediaries', 'Largest bond originator in South Africa'],
  },
  {
    id: 'l1-2', module_id: 'mod-001', sort_order: 2, points_value: 20,
    title: 'The Multi-Bank Advantage',
    content_agent: `The single most powerful thing you can say to a property practitioner is this: "When my buyer applies, they get six banks competing for their business on the same day."\n\nMost buyers who go direct apply to one bank — their own. That bank has zero incentive to offer a competitive rate. When six banks submit offers simultaneously, the dynamics change entirely.\n\nIn practice, BetterBond sees an average rate improvement of 0.25% to 0.5% versus going direct. On a R1.5 million bond over 20 years, a 0.25% rate improvement saves the buyer approximately R47,000 over the life of the loan. That is a number worth quoting in every conversation.`,
    content_buyer: `Here is a real example of how the multi-bank advantage works for you.\n\nImagine you apply for a R1.5 million bond. Your own bank offers you 11.25%. Because BetterBond submitted to five other banks at the same time, Standard Bank counters with 11.0% and FNB comes in at 10.75%.\n\nThat 0.5% difference saves you approximately R94,000 over the 20-year life of your loan — just from having BetterBond in your corner.\n\nWe negotiate on your behalf every single day. It is what we do. And because we are the largest originator in the country, the banks give us their best rates to maintain the relationship.`,
    key_points: ['6 banks competing creates genuine rate negotiation', '0.25%–0.5% average rate improvement vs going direct', 'R1.5m bond: 0.5% saving ≈ R94,000 over 20 years', 'Bank relationships at scale = better outcomes for buyers'],
  },
  {
    id: 'l1-3', module_id: 'mod-001', sort_order: 3, points_value: 20,
    title: 'Rate Negotiation & the Approval Process',
    content_agent: `Once applications are submitted, your role shifts to managing expectations and communication. Banks typically respond within 24–48 hours with conditional approvals. Your job is to present the best offer to the buyer, explain the conditions, and where possible, negotiate further.\n\nKey negotiation levers: deposit size (a 10% deposit almost always unlocks better rates), clean credit history (pull a free credit report before submitting), and employment type (salaried employees get better rates than self-employed; know your buyer before submitting).\n\nAlways submit to all banks simultaneously. Selective submission weakens your negotiating position. The more competing offers you have, the stronger your hand.`,
    content_buyer: `After BetterBond submits your application, most banks respond within 24 to 48 hours. You will typically receive multiple conditional approval letters, each with a rate and conditions attached.\n\nYour BetterBond consultant will explain each offer in plain language — no jargon. They will also negotiate on your behalf if a bank's initial offer has room to improve.\n\nCommon conditions attached to approvals: proof of income, 3 months' bank statements, copy of the sale agreement, and life cover. BetterBond guides you through gathering every document so nothing delays your registration.`,
    key_points: ['Banks respond within 24–48 hours of submission', 'Deposit size is the single biggest rate lever', 'Clean credit history before submitting = better rates', 'Simultaneous submission maximises competitive pressure'],
  },
  {
    id: 'l1-4', module_id: 'mod-001', sort_order: 4, points_value: 20,
    title: 'Objection Handling',
    content_agent: `You will hear the same objections repeatedly. Master these responses and you will close more introductions.\n\n"I already have a relationship with my bank." — Great. They will be one of the six banks we submit to. If they offer the best rate, your buyer takes it. If they don't, your buyer saves money. Either way, your buyer wins.\n\n"I don't want my credit checked multiple times." — All six bank checks happen within a 14-day window and are treated as a single inquiry by the credit bureaux under the NCA. There is no credit score penalty.\n\n"It sounds too good to be true — what's the catch?" — There is no catch. The bank that approves the bond pays BetterBond a referral fee. Your buyer pays nothing, ever.`,
    content_buyer: `It is natural to have questions. Here are the ones we hear most often.\n\n"Will applying through BetterBond hurt my credit score?" No. All six bank credit checks happen within a 14-day window and are treated as a single inquiry under South African law. Your score is protected.\n\n"I already bank with FNB — won't they give me a loyalty discount?" They might. And they will also be one of the banks we submit to. If FNB offers the best rate, you take it. If another bank beats them, you save money. You have nothing to lose by letting BetterBond submit on your behalf.\n\n"How do I know you're working for me and not the bank?" Our fee is paid by the approving bank, not by you. We have no incentive to push you toward any specific bank — only toward the best rate.`,
    key_points: ['Multiple credit checks in 14 days = single NCA inquiry', '"Your bank is one of six" — not a replacement', 'Bank pays BetterBond — zero cost to the buyer', 'Respond to objections with confidence, not defensiveness'],
  },

  // ── Module 2: Pre-Approval Certificate ────────────────────────────
  {
    id: 'l2-1', module_id: 'mod-002', sort_order: 1, points_value: 20,
    title: 'What Is a Pre-Approval Certificate?',
    content_agent: `A BetterBond Pre-Approval Certificate is a formal letter confirming that a buyer has been assessed and pre-qualified for a home loan up to a specific amount. It is not a guarantee of final approval, but it is a bank-backed indication of buying power.\n\nFor property practitioners, a pre-approved buyer is gold. It means the offer they bring will not fall through due to bond decline. It reduces the risk of wasted viewings, failed sales and collapsed deals — the pain points that cost agents time and commission.\n\nPositioning: "Before I send buyers to you, I make sure they are pre-approved. It protects your time and your deal."`,
    content_buyer: `A Pre-Approval Certificate from BetterBond tells you exactly how much home you can afford — before you start looking. It is based on a real assessment of your income, expenses and credit profile.\n\nArmed with a pre-approval, you can make an offer with confidence. Sellers take pre-approved buyers seriously. In a competitive market, it can be the difference between winning and losing a property.\n\nThe certificate is valid for 90 days. If you have not found a property in that time, we can reissue it quickly. The process takes as little as 24 hours and costs you nothing.`,
    key_points: ['Bank-assessed confirmation of buying power', 'Valid for 90 days across all major banks', 'Free to obtain — no obligation to proceed', 'Sellers and agents treat pre-approved buyers as serious'],
  },
  {
    id: 'l2-2', module_id: 'mod-002', sort_order: 2, points_value: 20,
    title: 'The 90-Day Validity Window',
    content_agent: `The 90-day window is both a feature and a natural re-engagement trigger. When a buyer's pre-approval is about to expire, you have a legitimate reason to call them, check in, update their information, and reissue — keeping you front of mind throughout their property search.\n\nBuild this into your follow-up system: set a reminder at day 60 to check in. Ask how the search is going. If they have not found a property, offer to reissue. If they have gone quiet, the check-in call reactivates the conversation.\n\nThe 90-day rule also creates urgency: "Your pre-approval expires in 3 weeks — have you found something you like?"`,
    content_buyer: `Your Pre-Approval Certificate is valid for 90 days from the date of issue. Within that window, every offer you make is backed by evidence of your buying power.\n\nIf your circumstances change during those 90 days — a salary increase, a new job, or a change in your credit position — let your BetterBond consultant know. We can reassess and potentially increase your pre-approved amount.\n\nIf your 90 days expire without finding a property, do not worry. Reissuing is quick and free. Your consultant will update your information and you will have a fresh certificate within 24 hours.`,
    key_points: ['90-day validity creates natural follow-up touchpoints', 'Day 60: re-engagement call + reissue offer', 'Expiry creates urgency without being pushy', 'Circumstance changes can increase the pre-approved amount'],
  },
  {
    id: 'l2-3', module_id: 'mod-002', sort_order: 3, points_value: 20,
    title: 'Positioning Pre-Approval with Agents',
    content_agent: `Property practitioners have one core fear: a deal that collapses after they have invested weeks of time. A pre-approved buyer directly addresses that fear.\n\nYour positioning script: "Every buyer I introduce to you will have a BetterBond Pre-Approval Certificate before they walk through the door. You will know their exact budget, their credit status has been checked, and their income has been verified. You are not wasting a single viewing on a tyre-kicker."\n\nThis is how you differentiate yourself from every other consultant who just sends unqualified leads. Pre-approval is a service promise, not just a product.`,
    content_buyer: `When you have your BetterBond Pre-Approval Certificate, property practitioners treat you differently. You are not a browser — you are a buyer.\n\nAgents will prioritise showing you properties in your exact price range. Sellers will take your offer seriously. In multiple-offer situations, a pre-approved buyer often wins even when their offer is not the highest, simply because there is less risk of the deal falling through.\n\nAsk your BetterBond consultant for your certificate before you attend your first show house. It changes every conversation.`,
    key_points: ['Pre-approval eliminates tyre-kicker risk for agents', '"Every buyer I introduce is pre-approved" — your service promise', 'In multiple offers, pre-approval often beats a higher price', 'Differentiate yourself from consultants who send unqualified leads'],
  },
  {
    id: 'l2-4', module_id: 'mod-002', sort_order: 4, points_value: 20,
    title: 'Getting Your Client Pre-Approved Fast',
    content_agent: `Speed is the biggest value you can offer in this step. A buyer who calls you on a Monday morning should have their certificate by Tuesday. That speed is a competitive advantage.\n\nWhat you need from the buyer to turn around a pre-approval in 24 hours: latest 3 months' payslips, latest 3 months' bank statements, copy of ID, and a completed BetterBond application form. For self-employed buyers: 2 years' financials and 6 months' bank statements.\n\nPro tip: Send buyers a WhatsApp checklist the moment they agree to pre-apply. Faster documents = faster certificate = faster sale for the agent = more referrals for you.`,
    content_buyer: `Getting your BetterBond Pre-Approval Certificate is simple and fast. Here is exactly what you will need to provide:\n\n- Your latest 3 months' payslips\n- Your latest 3 months' bank statements\n- A copy of your ID\n- A completed BetterBond application form (your consultant sends this to you)\n\nIf you are self-employed, you will also need 2 years' financial statements and 6 months' business bank statements.\n\nOnce your consultant has everything, your certificate is typically ready within 24 hours. The entire process is done digitally — no need to visit a branch.`,
    key_points: ['24-hour turnaround is achievable with complete documents', '3x payslips + 3x bank statements + ID = salaried buyers', 'Self-employed needs 2yr financials + 6mo bank statements', 'WhatsApp document checklist speeds up every application'],
  },

  // ── Module 3: First Home Finance ───────────────────────────────────
  {
    id: 'l3-1', module_id: 'mod-003', sort_order: 1, points_value: 20,
    title: 'Who Qualifies for First Home Finance?',
    content_agent: `First Home Finance (formerly FLISP — Finance Linked Individual Subsidy Programme) is a government subsidy for first-time home buyers earning between R3,501 and R22,000 per month. It is one of the most underutilised tools in the South African property market.\n\nThe subsidy is a once-off government grant paid directly to the bank to reduce the loan amount. This means the buyer's monthly repayment drops, and their approval chances increase significantly.\n\nKey qualifying criteria: South African citizen or permanent resident, first-time homebuyer, married or habitually cohabiting (or single with financial dependants), and income within the R3,501–R22,000 band.`,
    content_buyer: `If you are buying your first home and you earn between R3,501 and R22,000 per month, you may qualify for a government subsidy that reduces the amount you need to borrow.\n\nThis is called First Home Finance (previously known as FLISP). The government pays a lump sum directly to the bank on your behalf — meaning you borrow less, your monthly payments are lower, and your chances of approval improve.\n\nYou must be a South African citizen or permanent resident, and this must be your first home purchase. You also need to be married, living with a partner, or a single parent with dependants.`,
    key_points: ['Income band: R3,501–R22,000 per month', 'Government subsidy paid directly to the bank', 'Must be first-time homebuyer + SA citizen/PR', 'Subsidy reduces loan amount AND monthly repayment'],
  },
  {
    id: 'l3-2', module_id: 'mod-003', sort_order: 2, points_value: 20,
    title: 'Subsidy Structure & How Much Buyers Get',
    content_agent: `The subsidy is inversely scaled to income: lower income earners receive a higher subsidy. At R3,501/month, the maximum subsidy is approximately R130,505. At R22,000/month, the subsidy is approximately R27,960.\n\nImportant: the subsidy applies to properties valued up to R1,000,000. This is the sweet spot of the affordable housing market — and a segment that many originators and agents ignore.\n\nPositioning tip: "There are thousands of qualified buyers in your area who don't know they qualify for a government subsidy. I help them understand their options. If you list properties under R800k, I can send you pre-approved FLISP buyers."`,
    content_buyer: `The subsidy amount depends on your income. Here are some examples:\n\n- Earning R5,000/month: subsidy of approximately R121,626\n- Earning R10,000/month: subsidy of approximately R83,000\n- Earning R15,000/month: subsidy of approximately R55,000\n- Earning R22,000/month: subsidy of approximately R27,960\n\nThe subsidy goes directly to the bank, reducing the amount you borrow. This means lower monthly repayments and a higher chance of being approved.\n\nProperties must be valued at R1,000,000 or less to qualify. Your BetterBond consultant will calculate your exact subsidy amount and show you what it means for your monthly repayment.`,
    key_points: ['Max subsidy ~R130,505 at lowest income band', 'Subsidy scales inversely with income', 'Qualifying property value: up to R1,000,000', 'Subsidy goes to the bank — not cash in hand'],
  },
  {
    id: 'l3-3', module_id: 'mod-003', sort_order: 3, points_value: 20,
    title: 'The Application Process',
    content_agent: `FLISP applications run parallel to the bond application — they are not separate. BetterBond handles both simultaneously. The buyer applies for their bond, and BetterBond simultaneously submits the FLISP application to the National Housing Finance Corporation (NHFC).\n\nTimeline: NHFC approval typically takes 3–5 business days alongside the bank's bond approval. Both must be finalised before registration can proceed.\n\nDocuments required for FLISP (in addition to standard bond docs): marriage certificate or affidavit of cohabitation (if applicable), birth certificates of dependants (if single parent), and proof of first-time buyer status.`,
    content_buyer: `The good news: BetterBond handles the entire FLISP application for you, at the same time as your bond application. You do not need to visit a government office or navigate the process yourself.\n\nIn addition to your standard bond documents, you will need to provide: your marriage certificate (if married), or an affidavit confirming you live with your partner (if cohabiting), or birth certificates for your children (if you are a single parent).\n\nThe NHFC typically approves FLISP applications within 3–5 business days. BetterBond coordinates everything so your bond and your subsidy are approved together.`,
    key_points: ['FLISP runs parallel to the bond application — not separate', 'BetterBond submits to both bank and NHFC simultaneously', 'NHFC approval: 3–5 business days', 'Additional docs: marriage certificate or cohabitation affidavit'],
  },
  {
    id: 'l3-4', module_id: 'mod-003', sort_order: 4, points_value: 20,
    title: 'Handling Objections & Common Misconceptions',
    content_agent: `"I earn too much to qualify." — Check the band first. Many buyers assume they earn too much when they are well within range. R22,000/month gross is higher than most people think.\n\n"I don't have a deposit." — FLISP can function as a deposit. Some banks will accept the FLISP subsidy in place of a cash deposit, enabling 100% financing on the remaining balance.\n\n"The process sounds complicated." — BetterBond handles it. The buyer's job is to provide documents. Everything else is managed by the consultant and submitted digitally. Simplify the message: "You apply once. We handle the rest."`,
    content_buyer: `A few common misconceptions about First Home Finance:\n\n"I earn too much." Check with your consultant first. Many people are surprised to find they qualify — the upper limit of R22,000/month is higher than most assume.\n\n"I don't have a deposit." The FLISP subsidy can be used as your deposit in many cases. This means you may be able to buy your first home without any cash deposit at all.\n\n"Government processes take forever." BetterBond coordinates directly with the NHFC and your bank. Most buyers are approved within the same timeframe as their standard bond — approximately 5 to 7 business days total.`,
    key_points: ['R22,000/month gross is the upper limit — many buyers qualify', 'FLISP subsidy can substitute for a cash deposit', 'BetterBond handles all NHFC coordination', 'Total turnaround: 5–7 business days alongside bond approval'],
  },

  // ── Module 4: Direct Competitors ───────────────────────────────────
  {
    id: 'l4-1', module_id: 'mod-004', sort_order: 1, points_value: 20,
    title: 'The Originator Landscape in South Africa',
    content_agent: `South Africa has four significant bond originators: BetterBond, ooba, Roost, and MortgageMax/MortgageMarket. Each competes for the same pool of home loan applications.\n\nUnderstanding their positioning is not about badmouthing competitors — it is about knowing precisely where BetterBond wins, so you can articulate your value confidently and without hesitation.\n\nThe market facts: BetterBond is the largest originator by volume, submitting the most applications annually and processing the most bonds. Scale matters — it means deeper bank relationships, better rate outcomes, and a larger support infrastructure behind every consultant.`,
    content_buyer: `When you decide to use a bond originator instead of going directly to your bank, you have a choice of service providers. The major originators in South Africa are BetterBond, ooba, Roost, and MortgageMax.\n\nAll of them will submit to multiple banks and negotiate on your behalf. The differences come down to bank relationships, approval rates, the quality of consultant support, and the technology behind the process.\n\nBetterBond is the largest originator in South Africa. Our scale means the banks compete harder for our clients' business — which translates into better rates for you.`,
    key_points: ['Four major originators: BetterBond, ooba, Roost, MortgageMax', 'BetterBond is #1 by application volume in South Africa', 'Scale = stronger bank relationships = better rate outcomes', 'Know the landscape — never guess when asked about competitors'],
  },
  {
    id: 'l4-2', module_id: 'mod-004', sort_order: 2, points_value: 20,
    title: 'ooba & Roost — Positioning Against Them',
    content_agent: `ooba is BetterBond's closest competitor in size and brand recognition. They submit to the same banks and offer similar services. When a property practitioner or buyer mentions ooba, your response is never to dismiss them.\n\nWhere BetterBond consistently wins: faster turnaround times (BetterBond's average conditional approval is 24–48 hours), a larger consultant network for face-to-face support, and BetterBond's proprietary technology stack which gives consultants real-time application tracking.\n\nRoost is smaller and focuses on digital-first, tech-savvy buyers. Their weakness is consultant depth — when a deal gets complicated, buyers want a human. That human is you.`,
    content_buyer: `ooba is a well-known originator with strong brand recognition. Like BetterBond, they submit to multiple banks. The key difference buyers experience is in speed, personalised service, and outcome.\n\nBetterBond's average conditional approval time is 24–48 hours. Our consultant network is the largest in the country, meaning you can always reach a real person who knows your file.\n\nRoost takes a more digital approach. If you are comfortable managing everything online without much human guidance, they are a reasonable option. If you want expert support through what is often the largest financial transaction of your life, BetterBond's consultant model is built for you.`,
    key_points: ['ooba: similar service, BetterBond wins on speed & scale', '24–48hr conditional approval is a BetterBond advantage', 'Roost is digital-first — weak on human consultant support', 'Never dismiss competitors; articulate your edge confidently'],
  },
  {
    id: 'l4-3', module_id: 'mod-004', sort_order: 3, points_value: 20,
    title: 'MortgageMax & MortgageMarket',
    content_agent: `MortgageMax and MortgageMarket operate as franchise-based originator networks. Their quality is highly variable — it depends entirely on the individual franchisee. This variability is a weakness you can position against.\n\nYour counter: "With BetterBond, you are always dealing with a consultant backed by the full BetterBond infrastructure — technology, compliance, training, and bank relationships. With a franchise model, you are dependent on the individual franchise owner. We are not."\n\nMortgageMarket also operates an online comparison model. Their strength is price transparency; their weakness is the absence of expert negotiation. A digital form cannot negotiate a rate reduction on a complex application.`,
    content_buyer: `MortgageMax and MortgageMarket are smaller originator networks. MortgageMax operates through independent franchises — meaning service quality varies by location and consultant.\n\nMortgageMarket takes a more digital approach, allowing you to compare bank offers online. While this creates transparency, it removes the expert negotiation that often results in a lower rate than what banks initially offer.\n\nBetterBond's consultants are trained, salaried and backed by the full national infrastructure. You get the consistency of a national brand with the personalisation of a dedicated consultant.`,
    key_points: ['MortgageMax: franchise model — quality varies by operator', 'MortgageMarket: digital comparison, lacks expert negotiation', 'BetterBond: national infrastructure + consistent training', 'Digital tools don\'t negotiate — people do'],
  },
  {
    id: 'l4-4', module_id: 'mod-004', sort_order: 4, points_value: 20,
    title: 'Your Winning Edge — The BetterBond Difference',
    content_agent: `Pull the competitive positioning together into a single, memorisable statement you can use with any property practitioner:\n\n"BetterBond is the largest bond originator in South Africa. We submit to six banks simultaneously, we have the fastest approval turnaround in the industry, and every buyer I work with pays nothing for our service. My job is to make sure your deals don't fall through."\n\nThat single paragraph addresses scale, speed, cost, and the property practitioner's core fear — collapsed deals. Practice it until it is effortless.`,
    content_buyer: `Here is the BetterBond difference in one paragraph:\n\nBetterBond is the largest bond originator in South Africa. We submit your single application to up to six banks simultaneously, negotiate your rate on your behalf, and our service costs you nothing — the approving bank pays our fee. Our consultants are trained professionals backed by national infrastructure, available to guide you every step of the way.\n\nOver 800,000 South African families have bought their home with BetterBond. We would like to help you be next.`,
    key_points: ['One memorisable positioning statement — practice it daily', 'Scale + speed + no-cost = the three BetterBond pillars', 'Address the practitioner\'s fear: deals that don\'t fall through', '800,000+ families helped — use the social proof'],
  },

  // ── Module 5: Market Alternatives ──────────────────────────────────
  {
    id: 'l5-1', module_id: 'mod-005', sort_order: 1, points_value: 20,
    title: 'Why Buyers Consider Going Direct',
    content_agent: `"I'll just go to my bank" is the most common objection you will face. It is not irrational — buyers have existing relationships, trust their bank, and believe loyalty will be rewarded. Your job is not to attack that relationship but to reframe it.\n\nThe reframe: "Your bank will definitely be one of the six we submit to. If they offer the best rate, you take it and you lose nothing. But in the 60% of cases where another bank beats them, you save potentially tens of thousands of rands. Why wouldn't you let us check?"\n\nThe question "Why wouldn't you?" is your strongest tool. It shifts the burden of proof to the buyer to justify why they wouldn't want a free service that might save them money.`,
    content_buyer: `Going directly to your bank for a home loan is the most common choice — and the one that usually leaves money on the table.\n\nYour bank has no incentive to offer you a competitive rate if you only apply to them. They know you have not compared them to anyone else, so their opening offer is rarely their best offer.\n\nBetterBond creates competition. When six banks know they are all competing for your business on the same day, their first offer is much closer to their best. And unlike going direct, BetterBond's service costs you nothing.`,
    key_points: ['"Your bank is one of six" — the key reframe', '"Why wouldn\'t you?" shifts the burden of proof', '60% of cases: another bank beats the buyer\'s own bank', 'Going direct = no competition = higher rate'],
  },
  {
    id: 'l5-2', module_id: 'mod-005', sort_order: 2, points_value: 20,
    title: 'The Bank-Direct Myth',
    content_agent: `Three myths you will hear from buyers who want to go direct:\n\nMyth 1: "My bank will give me a loyalty discount." Banks occasionally offer relationship discounts, but these are typically 0.05–0.1% — far less than the 0.25–0.5% improvement BetterBond achieves through competitive submission.\n\nMyth 2: "It will be faster if I go directly." A single bank application has one set of conditions and one decision. BetterBond's parallel submission often results in a conditional approval from the fastest bank within 24 hours — equal to or faster than going direct.\n\nMyth 3: "I don't want to deal with more people." One consultant. One point of contact. BetterBond handles all bank communication so the buyer only speaks to one person.`,
    content_buyer: `Here are the three most common myths about going directly to your bank:\n\nMyth 1: "My bank will reward my loyalty." Bank loyalty discounts are typically tiny — often 0.05% or less. BetterBond's competitive process regularly achieves 0.25–0.5% improvements. The maths strongly favours the multi-bank approach.\n\nMyth 2: "Going direct will be faster." BetterBond typically delivers a conditional approval within 24–48 hours — the same as a direct application. The difference is you also have five other offers in hand.\n\nMyth 3: "More banks means more hassle." You deal with one person: your BetterBond consultant. They handle every bank. You sign one set of documents.`,
    key_points: ['Loyalty discounts: 0.05% — BetterBond achieves 0.25–0.5%', '24–48hr turnaround matches direct application speed', 'One consultant = one point of contact for all banks', 'More options, same effort — the BetterBond model'],
  },
  {
    id: 'l5-3', module_id: 'mod-005', sort_order: 3, points_value: 20,
    title: 'SA Home Loans & Alternative Lenders',
    content_agent: `SA Home Loans is a specialist mortgage lender — not a retail bank. They offer a single product (home loans) and have historically competed on rate and product features like the Access Bond.\n\nWhere SA Home Loans can win: buyers with complex income structures sometimes find specialist lenders more accommodating. Their Access Bond product, which allows buyers to redraw paid-in capital, is a genuine differentiator.\n\nWhere BetterBond wins: SA Home Loans is one lender. BetterBond submits to SA Home Loans alongside the major banks, giving the buyer the best of all worlds — SA Home Loans' specialist products plus bank competition.`,
    content_buyer: `SA Home Loans is a specialist home loan lender known for competitive rates and their flexible Access Bond product, which allows you to redraw any extra payments you have made.\n\nThe good news: BetterBond includes SA Home Loans in their submissions. So if you go through BetterBond, you still get access to SA Home Loans' products alongside all the major banks — without having to apply separately.\n\nInformal lenders — cash loan companies or individual lenders — should be avoided for home purchases. Their rates are significantly higher, their terms are unfavourable, and property transactions require registered mortgages that informal lenders cannot provide.`,
    key_points: ['SA Home Loans is a specialist lender — BetterBond includes them', 'Access Bond: redraw extra payments — genuine differentiator', 'Informal lenders: never appropriate for property purchases', 'Multi-bank submission already includes the best specialists'],
  },
  {
    id: 'l5-4', module_id: 'mod-005', sort_order: 4, points_value: 20,
    title: 'Positioning BetterBond\'s Full Value',
    content_agent: `Close every market alternatives conversation with the same question: "What would you need to see to feel comfortable using BetterBond instead of going direct?"\n\nThis question surfaces the real objection. Often it is not about the banks at all — it is about trust, familiarity, or a previous bad experience. Once you know the actual objection, you can address it directly.\n\nYour final positioning: BetterBond is not an alternative to the banks — it is how you access the banks at their best. "Think of us as your mortgage broker, your rate negotiator, and your paperwork handler — all in one, at no cost to you."`,
    content_buyer: `The clearest way to think about BetterBond: we are not an alternative to the banks. We are how you access the banks at their best.\n\nEvery tool in the South African home-buying process — bank bonds, FLISP subsidies, attorney coordination, life cover — BetterBond has a specialist who handles it. You do not need to become an expert in any of it. That is what your consultant is for.\n\nThe question is never "should I use BetterBond or go direct?" The question is "how much could I save by having six banks compete for my business?" In most cases, the answer is tens of thousands of rands.`,
    key_points: ['"What would you need to see?" — surfaces the real objection', 'BetterBond is how you access banks at their best', 'Address trust/familiarity, not just process', 'End with the savings question — make the value tangible'],
  },
]

export const MOCK_QUIZ_QUESTIONS = [
  // ── Module 1: Bond Origination ──────────────────────────────────────
  {
    id: 'qq1-1', module_id: 'mod-001', sort_order: 1, correct_option_id: 'b',
    question: 'What does BetterBond typically cost the home buyer?',
    explanation: 'BetterBond is completely free to home buyers. The bank that approves the bond pays BetterBond a referral fee. Buyers pay nothing, ever.',
    options: [{ id: 'a', text: 'R1,500 once-off fee' }, { id: 'b', text: 'Nothing — the service is free to buyers' }, { id: 'c', text: '1% of the bond value' }, { id: 'd', text: 'R500 per bank application' }],
  },
  {
    id: 'qq1-2', module_id: 'mod-001', sort_order: 2, correct_option_id: 'c',
    question: 'How many banks does BetterBond submit a single application to?',
    explanation: 'BetterBond submits to up to 6 major banks simultaneously: ABSA, FNB, Nedbank, Standard Bank, Investec, and RMB Private Bank.',
    options: [{ id: 'a', text: '2 banks' }, { id: 'b', text: '3 banks' }, { id: 'c', text: 'Up to 6 banks' }, { id: 'd', text: 'All registered banks in South Africa' }],
  },
  {
    id: 'qq1-3', module_id: 'mod-001', sort_order: 3, correct_option_id: 'a',
    question: 'On a R1.5 million bond, approximately how much does a 0.5% rate improvement save over 20 years?',
    explanation: 'A 0.5% rate improvement on a R1.5m bond saves approximately R94,000 over 20 years. This is a powerful number to use in every conversation.',
    options: [{ id: 'a', text: 'Approximately R94,000' }, { id: 'b', text: 'Approximately R15,000' }, { id: 'c', text: 'Approximately R7,500' }, { id: 'd', text: 'Approximately R200,000' }],
  },
  {
    id: 'qq1-4', module_id: 'mod-001', sort_order: 4, correct_option_id: 'd',
    question: 'A buyer is worried about multiple credit checks hurting their score. What is the correct response?',
    explanation: 'Under the NCA, all credit checks within a 14-day window are treated as a single inquiry. There is no credit score penalty from BetterBond\'s multi-bank submission.',
    options: [{ id: 'a', text: 'Admit it will affect their score slightly but it\'s worth it' }, { id: 'b', text: 'Only submit to 2 banks to reduce the number of checks' }, { id: 'c', text: 'Ask the buyer to check their own score first' }, { id: 'd', text: 'All checks happen within 14 days and count as one inquiry under the NCA' }],
  },
  {
    id: 'qq1-5', module_id: 'mod-001', sort_order: 5, correct_option_id: 'b',
    question: 'What is the single biggest factor that improves a buyer\'s bond approval rate and reduces their interest rate?',
    explanation: 'A deposit — even 10% — significantly improves both the approval probability and the rate offered. It is the single biggest lever in a bond application.',
    options: [{ id: 'a', text: 'Having a perfect credit score' }, { id: 'b', text: 'Putting down a deposit' }, { id: 'c', text: 'Being a salaried employee rather than self-employed' }, { id: 'd', text: 'Applying mid-month rather than end of month' }],
  },

  // ── Module 2: Pre-Approval Certificate ─────────────────────────────
  {
    id: 'qq2-1', module_id: 'mod-002', sort_order: 1, correct_option_id: 'c',
    question: 'How long is a BetterBond Pre-Approval Certificate valid for?',
    explanation: 'The Pre-Approval Certificate is valid for 90 days from the date of issue. This window also creates a natural follow-up opportunity at day 60.',
    options: [{ id: 'a', text: '30 days' }, { id: 'b', text: '60 days' }, { id: 'c', text: '90 days' }, { id: 'd', text: '180 days' }],
  },
  {
    id: 'qq2-2', module_id: 'mod-002', sort_order: 2, correct_option_id: 'a',
    question: 'What is the primary benefit of a Pre-Approval Certificate for a property practitioner?',
    explanation: 'Pre-approved buyers dramatically reduce the risk of a deal falling through after bond decline — which is the property practitioner\'s biggest fear and biggest time waster.',
    options: [{ id: 'a', text: 'Reduces deal collapse risk from bond decline' }, { id: 'b', text: 'Gets the buyer a better interest rate' }, { id: 'c', text: 'Speeds up the transfer attorney process' }, { id: 'd', text: 'Allows the buyer to skip the bond application' }],
  },
  {
    id: 'qq2-3', module_id: 'mod-002', sort_order: 3, correct_option_id: 'd',
    question: 'What should a salaried buyer provide to get their Pre-Approval Certificate within 24 hours?',
    explanation: '3 months\' payslips, 3 months\' bank statements, and a copy of their ID — plus the completed BetterBond application form. These four items enable same-day processing.',
    options: [{ id: 'a', text: 'Only their ID and a completed application form' }, { id: 'b', text: '6 months\' payslips and a credit report' }, { id: 'c', text: '2 years\' tax returns and bank statements' }, { id: 'd', text: '3 months\' payslips, 3 months\' bank statements, and ID' }],
  },
  {
    id: 'qq2-4', module_id: 'mod-002', sort_order: 4, correct_option_id: 'b',
    question: 'At what point should you reach out to a buyer whose pre-approval is about to expire?',
    explanation: 'Day 60 is the ideal re-engagement point — the buyer has 30 days left, which is enough time to reissue if needed, and it keeps you front of mind during their active search.',
    options: [{ id: 'a', text: 'On day 89 — one day before expiry' }, { id: 'b', text: 'On day 60 — 30 days before expiry' }, { id: 'c', text: 'On day 45 — halfway through' }, { id: 'd', text: 'Only when the buyer contacts you' }],
  },
  {
    id: 'qq2-5', module_id: 'mod-002', sort_order: 5, correct_option_id: 'c',
    question: 'What is the correct positioning of Pre-Approval when introducing yourself to a new property practitioner?',
    explanation: '"Every buyer I introduce to you will be pre-approved" is a service promise that directly addresses the practitioner\'s fear of wasted time and collapsed deals.',
    options: [{ id: 'a', text: '"I can get your buyers a better interest rate than their bank"' }, { id: 'b', text: '"BetterBond is the largest originator in South Africa"' }, { id: 'c', text: '"Every buyer I introduce to you will be pre-approved before they view a property"' }, { id: 'd', text: '"Pre-approvals are free and take 24 hours"' }],
  },

  // ── Module 3: First Home Finance ────────────────────────────────────
  {
    id: 'qq3-1', module_id: 'mod-003', sort_order: 1, correct_option_id: 'b',
    question: 'What is the monthly income range for First Home Finance (FLISP) eligibility?',
    explanation: 'First Home Finance is available to buyers earning between R3,501 and R22,000 per month gross. Many buyers are unaware they qualify — especially those near the upper limit.',
    options: [{ id: 'a', text: 'R1,500 to R15,000 per month' }, { id: 'b', text: 'R3,501 to R22,000 per month' }, { id: 'c', text: 'R5,000 to R30,000 per month' }, { id: 'd', text: 'Up to R10,000 per month only' }],
  },
  {
    id: 'qq3-2', module_id: 'mod-003', sort_order: 2, correct_option_id: 'a',
    question: 'What is the maximum property value that qualifies for First Home Finance?',
    explanation: 'Properties must be valued at R1,000,000 or less to qualify for the FLISP subsidy. This covers a significant portion of the affordable housing market.',
    options: [{ id: 'a', text: 'R1,000,000' }, { id: 'b', text: 'R750,000' }, { id: 'c', text: 'R500,000' }, { id: 'd', text: 'R1,500,000' }],
  },
  {
    id: 'qq3-3', module_id: 'mod-003', sort_order: 3, correct_option_id: 'd',
    question: 'Where does the FLISP subsidy go when it is approved?',
    explanation: 'The subsidy is paid directly to the bank, reducing the loan amount. It is not a cash payment to the buyer — it goes straight to reduce what they owe.',
    options: [{ id: 'a', text: 'To the buyer as a cash payment' }, { id: 'b', text: 'To the seller to reduce the purchase price' }, { id: 'c', text: 'To the transfer attorney' }, { id: 'd', text: 'Directly to the bank to reduce the loan amount' }],
  },
  {
    id: 'qq3-4', module_id: 'mod-003', sort_order: 4, correct_option_id: 'c',
    question: 'A buyer earning R5,000/month says they don\'t have a deposit. What is the correct response?',
    explanation: 'The FLISP subsidy (approximately R121,626 at R5,000/month) can serve as a deposit, often enabling 100% financing on the remaining balance — a powerful counter to the no-deposit objection.',
    options: [{ id: 'a', text: 'They will need to save a deposit before applying' }, { id: 'b', text: 'Refer them to a personal loan provider' }, { id: 'c', text: 'The FLISP subsidy can be used as their deposit' }, { id: 'd', text: 'Only banks with 0% deposit products can help them' }],
  },
  {
    id: 'qq3-5', module_id: 'mod-003', sort_order: 5, correct_option_id: 'b',
    question: 'Who handles the FLISP application submission to the NHFC?',
    explanation: 'BetterBond manages the entire FLISP application process on behalf of the buyer, submitting to both the banks and the NHFC simultaneously. The buyer does not navigate this themselves.',
    options: [{ id: 'a', text: 'The buyer applies directly on the NHFC website' }, { id: 'b', text: 'BetterBond submits to both the bank and NHFC simultaneously' }, { id: 'c', text: 'The transfer attorney handles NHFC submissions' }, { id: 'd', text: 'The bank submits on behalf of the buyer' }],
  },

  // ── Module 4: Direct Competitors ────────────────────────────────────
  {
    id: 'qq4-1', module_id: 'mod-004', sort_order: 1, correct_option_id: 'a',
    question: 'What is BetterBond\'s position in the South African bond originator market?',
    explanation: 'BetterBond is the largest bond originator in South Africa by application volume. This scale matters because it means stronger bank relationships and better rate outcomes for clients.',
    options: [{ id: 'a', text: 'Largest originator by application volume' }, { id: 'b', text: 'Newest originator with the most technology' }, { id: 'c', text: 'Specialist in first-time buyer applications only' }, { id: 'd', text: 'Equal in size to ooba' }],
  },
  {
    id: 'qq4-2', module_id: 'mod-004', sort_order: 2, correct_option_id: 'c',
    question: 'A buyer says "I\'ve already spoken to ooba." What is the best response?',
    explanation: 'Never dismiss a competitor. Acknowledge the conversation, then differentiate on specifics — BetterBond\'s scale, turnaround time, and consultant support. Ask what the buyer\'s experience was like to find their real concern.',
    options: [{ id: 'a', text: 'Tell them ooba has a poor approval rate' }, { id: 'b', text: 'Ask them to cancel the ooba application immediately' }, { id: 'c', text: 'Acknowledge ooba and explain where BetterBond\'s approach differs' }, { id: 'd', text: 'Explain that ooba and BetterBond are the same' }],
  },
  {
    id: 'qq4-3', module_id: 'mod-004', sort_order: 3, correct_option_id: 'd',
    question: 'What is the key weakness of MortgageMax as a competitor?',
    explanation: 'MortgageMax operates as a franchise network. Service quality varies significantly by franchisee — this variability is a direct contrast to BetterBond\'s consistent national standards.',
    options: [{ id: 'a', text: 'They only submit to two banks' }, { id: 'b', text: 'They charge buyers a fee' }, { id: 'c', text: 'They only work in Gauteng' }, { id: 'd', text: 'Variable quality as an independent franchise network' }],
  },
  {
    id: 'qq4-4', module_id: 'mod-004', sort_order: 4, correct_option_id: 'b',
    question: 'What is BetterBond\'s average conditional approval turnaround time?',
    explanation: 'BetterBond\'s average conditional approval is 24–48 hours. This is a key competitive differentiator — equal to going direct, but with the benefit of multiple bank offers.',
    options: [{ id: 'a', text: '1 hour' }, { id: 'b', text: '24–48 hours' }, { id: 'c', text: '3–5 business days' }, { id: 'd', text: '7–10 business days' }],
  },
  {
    id: 'qq4-5', module_id: 'mod-004', sort_order: 5, correct_option_id: 'a',
    question: 'Complete the BetterBond positioning statement: "BetterBond is the largest bond originator in South Africa. We submit to six banks simultaneously, we have the fastest approval turnaround in the industry, and every buyer I work with..."',
    explanation: '"...pays nothing for our service." The no-cost element is always the third pillar: scale, speed, and zero cost to the buyer. This order builds trust before addressing money.',
    options: [{ id: 'a', text: '...pays nothing for our service.' }, { id: 'b', text: '...gets a guaranteed approval.' }, { id: 'c', text: '...receives the prime lending rate.' }, { id: 'd', text: '...is pre-qualified in 1 hour.' }],
  },

  // ── Module 5: Market Alternatives ───────────────────────────────────
  {
    id: 'qq5-1', module_id: 'mod-005', sort_order: 1, correct_option_id: 'c',
    question: 'A buyer says "I\'ll just go to my bank." What is the most effective single reframe?',
    explanation: '"Your bank is one of the six we submit to" is the most powerful reframe — it removes the either/or choice entirely. The buyer doesn\'t have to choose between BetterBond and their bank. They get both.',
    options: [{ id: 'a', text: '"Your bank has bad rates — we can do better"' }, { id: 'b', text: '"Going direct is slow and difficult"' }, { id: 'c', text: '"Your bank will be one of the six we submit to — you can still take their offer if it\'s best"' }, { id: 'd', text: '"Banks don\'t reward loyalty anymore"' }],
  },
  {
    id: 'qq5-2', module_id: 'mod-005', sort_order: 2, correct_option_id: 'b',
    question: 'What is a typical bank loyalty discount, and how does it compare to BetterBond\'s multi-bank improvement?',
    explanation: 'Bank loyalty discounts are typically 0.05–0.1%. BetterBond\'s competitive submission process regularly achieves 0.25–0.5% improvements. The difference over a 20-year bond is tens of thousands of rands.',
    options: [{ id: 'a', text: 'Banks offer 1% loyalty; BetterBond achieves 0.5%' }, { id: 'b', text: 'Banks offer 0.05–0.1%; BetterBond achieves 0.25–0.5%' }, { id: 'c', text: 'Banks and BetterBond achieve the same rate' }, { id: 'd', text: 'Banks offer 0.5% loyalty; BetterBond achieves 0.25%' }],
  },
  {
    id: 'qq5-3', module_id: 'mod-005', sort_order: 3, correct_option_id: 'd',
    question: 'Does BetterBond include SA Home Loans in their bank submissions?',
    explanation: 'Yes — BetterBond includes SA Home Loans in their submissions. Buyers who want access to SA Home Loans\' specialist products (including the Access Bond) can get them through BetterBond without applying separately.',
    options: [{ id: 'a', text: 'No — SA Home Loans is a competitor, not a partner' }, { id: 'b', text: 'Only for properties under R500,000' }, { id: 'c', text: 'Only for self-employed buyers' }, { id: 'd', text: 'Yes — SA Home Loans is included in BetterBond\'s submissions' }],
  },
  {
    id: 'qq5-4', module_id: 'mod-005', sort_order: 4, correct_option_id: 'a',
    question: 'What question should you ask to surface the real objection when a buyer wants to go direct?',
    explanation: '"What would you need to see to feel comfortable using BetterBond?" is the most powerful question — it surfaces the actual objection, which is often about trust rather than process.',
    options: [{ id: 'a', text: '"What would you need to see to feel comfortable using BetterBond instead?"' }, { id: 'b', text: '"Do you know what interest rate your bank offered last year?"' }, { id: 'c', text: '"Have you heard of BetterBond before?"' }, { id: 'd', text: '"Would you like me to send you our brochure?"' }],
  },
  {
    id: 'qq5-5', module_id: 'mod-005', sort_order: 5, correct_option_id: 'c',
    question: 'What percentage of BetterBond applications result in the buyer\'s own bank NOT offering the best rate?',
    explanation: 'In approximately 60% of cases, another bank beats the buyer\'s own bank. This statistic makes the "I\'ll go direct" objection very easy to counter with data.',
    options: [{ id: 'a', text: '20% of cases' }, { id: 'b', text: '40% of cases' }, { id: 'c', text: '60% of cases' }, { id: 'd', text: '80% of cases' }],
  },

  // ── Daily quiz (home screen rotation — module_id: null) ──────────────
  {
    id: 'dq-001', module_id: null, sort_order: 1, correct_option_id: 'b',
    question: 'What does BetterBond typically cost the home buyer?',
    explanation: 'BetterBond is free to buyers. The approving bank pays the origination fee.',
    options: [{ id: 'a', text: 'R1,500 once-off' }, { id: 'b', text: 'Nothing — the service is free' }, { id: 'c', text: '1% of the bond value' }, { id: 'd', text: 'R500 per application' }],
  },
  {
    id: 'dq-002', module_id: null, sort_order: 2, correct_option_id: 'c',
    question: 'How many banks does BetterBond submit a single application to?',
    explanation: 'BetterBond submits to up to 6 banks simultaneously — creating competition for the buyer\'s business.',
    options: [{ id: 'a', text: '2 banks' }, { id: 'b', text: '4 banks' }, { id: 'c', text: 'Up to 6 banks' }, { id: 'd', text: '10 banks' }],
  },
  {
    id: 'dq-003', module_id: null, sort_order: 3, correct_option_id: 'a',
    question: 'How long is a BetterBond Pre-Approval Certificate valid?',
    explanation: 'The Pre-Approval Certificate is valid for 90 days. This also creates a natural follow-up at day 60.',
    options: [{ id: 'a', text: '90 days' }, { id: 'b', text: '30 days' }, { id: 'c', text: '60 days' }, { id: 'd', text: '12 months' }],
  },
  {
    id: 'dq-004', module_id: null, sort_order: 4, correct_option_id: 'd',
    question: 'What is the maximum monthly income to qualify for First Home Finance (FLISP)?',
    explanation: 'The FLISP income band is R3,501 to R22,000/month gross. Many buyers near the upper limit don\'t realise they qualify.',
    options: [{ id: 'a', text: 'R10,000/month' }, { id: 'b', text: 'R15,000/month' }, { id: 'c', text: 'R18,000/month' }, { id: 'd', text: 'R22,000/month' }],
  },
  {
    id: 'dq-005', module_id: null, sort_order: 5, correct_option_id: 'b',
    question: 'A buyer says their credit was checked 6 times. Should they be concerned?',
    explanation: 'No. Under the NCA, all credit checks within a 14-day window count as a single inquiry. There is no credit score penalty from BetterBond\'s multi-bank submission.',
    options: [{ id: 'a', text: 'Yes — each check reduces their score by 10 points' }, { id: 'b', text: 'No — checks within 14 days count as one inquiry under the NCA' }, { id: 'c', text: 'Only if all 6 banks declined' }, { id: 'd', text: 'Yes — they should dispute the inquiries with the credit bureau' }],
  },
  {
    id: 'dq-006', module_id: null, sort_order: 6, correct_option_id: 'c',
    question: 'BetterBond is the largest bond originator in South Africa. How many families have bought their home through BetterBond?',
    explanation: 'Over 800,000 South African families have bought their homes through BetterBond. This is a powerful social proof number worth using in every conversation.',
    options: [{ id: 'a', text: 'Over 50,000 families' }, { id: 'b', text: 'Over 200,000 families' }, { id: 'c', text: 'Over 800,000 families' }, { id: 'd', text: 'Over 2 million families' }],
  },
  {
    id: 'dq-007', module_id: null, sort_order: 7, correct_option_id: 'a',
    question: 'What is the average rate improvement BetterBond achieves versus a buyer going directly to their bank?',
    explanation: 'BetterBond typically achieves a 0.25%–0.5% rate improvement over going direct. On a R1.5m bond over 20 years, that is up to R94,000 saved.',
    options: [{ id: 'a', text: '0.25%–0.5% improvement' }, { id: 'b', text: '2%–3% improvement' }, { id: 'c', text: '0.01%–0.05% improvement' }, { id: 'd', text: '1%–1.5% improvement' }],
  },
]

export const MOCK_PROGRESS = [
  // Bond Origination — 3 of 4 lessons done
  { module_id: 'mod-001', lesson_id: 'l1-1', type: 'lesson_complete', user_id: DEMO_USER_ID },
  { module_id: 'mod-001', lesson_id: 'l1-2', type: 'lesson_complete', user_id: DEMO_USER_ID },
  { module_id: 'mod-001', lesson_id: 'l1-3', type: 'lesson_complete', user_id: DEMO_USER_ID },
  // Pre-Approval Certificate — fully complete + quiz passed
  { module_id: 'mod-002', lesson_id: 'l2-1', type: 'lesson_complete', user_id: DEMO_USER_ID },
  { module_id: 'mod-002', lesson_id: 'l2-2', type: 'lesson_complete', user_id: DEMO_USER_ID },
  { module_id: 'mod-002', lesson_id: 'l2-3', type: 'lesson_complete', user_id: DEMO_USER_ID },
  { module_id: 'mod-002', lesson_id: 'l2-4', type: 'lesson_complete', user_id: DEMO_USER_ID },
  { module_id: 'mod-002', lesson_id: null, type: 'module_complete', user_id: DEMO_USER_ID },
  { module_id: 'mod-002', lesson_id: null, type: 'quiz_pass', user_id: DEMO_USER_ID },
  // First Home Finance — 1 of 4 lessons done
  { module_id: 'mod-003', lesson_id: 'l3-1', type: 'lesson_complete', user_id: DEMO_USER_ID },
]
