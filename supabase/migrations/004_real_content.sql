-- ═══════════════════════════════════════════════════════════════
-- BetterBond IQ — Migration 004
-- Replace placeholder product-knowledge modules with the real
-- 12-module Consultant Coaching Series by Shawn Mackrell.
-- Module 1 (The Consultant Mindset) is fully populated with
-- lessons and quiz questions from the source PDF.
-- Modules 2–12 are seeded as stubs pending their PDFs.
-- ═══════════════════════════════════════════════════════════════

-- ── CLEAR PLACEHOLDER DATA ───────────────────────────────────
-- Remove placeholder lessons, quiz questions, and modules
-- from seed 002 so we start clean with real content.

DELETE FROM quiz_questions WHERE module_id = 'a1b2c3d4-0001-0001-0001-000000000001';
DELETE FROM lessons       WHERE module_id = 'a1b2c3d4-0001-0001-0001-000000000001';
DELETE FROM modules       WHERE id        = 'a1b2c3d4-0001-0001-0001-000000000001';

-- Remove stubs seeded without explicit IDs (by slug)
DELETE FROM modules WHERE slug IN (
  'pre-approval', 'first-home-finance', 'direct-competitors', 'market-alternatives'
);

-- ── MODULE 1: THE CONSULTANT MINDSET (fully seeded) ──────────

INSERT INTO modules (
  id, title, slug, description, icon, category,
  sort_order, is_active, points_completion,
  agent_benefits, buyer_benefits
) VALUES (
  '00000000-0000-4000-8000-000000000001',
  'The Consultant Mindset',
  'consultant-mindset',
  'Moving from transactional to relational thinking. The mindset shift that turns good consultants into trusted, referable partners.',
  '🧠',
  'core',
  1, true, 50,
  ARRAY[
    'Understand why relationships drive long-term business growth',
    'Learn the 3 Identities every high-trust consultant operates from',
    'Build daily habits that generate referrals without asking',
    'Master the 7 attributes that set top consultants apart'
  ],
  ARRAY[
    'Work with consultants who communicate clearly and proactively',
    'Experience a buying process that feels supported, not stressful',
    'Understand what great bond consultant service looks like',
    'Know what questions to ask and what to expect at each stage'
  ]
);

-- ── LESSONS — MODULE 1 ───────────────────────────────────────

INSERT INTO lessons (
  id, module_id, title,
  content_agent, content_buyer,
  key_points, sort_order, points_value
) VALUES (
  '00000000-0000-4000-8001-000000000001',
  '00000000-0000-4000-8000-000000000001',
  'Thinking Beyond the Bond',

  'For many years, bond consultants built their role around rates, paperwork, and process. That was enough. The market has shifted — and so have the expectations of the practitioners and buyers you serve.

Technical knowledge still matters. But it no longer sets you apart. What sets you apart today is how you show up. Whether you are a steady, proactive presence or someone waiting in the background for a file to move. Whether you add momentum to a deal or add to the admin burden.

The mindset shift that changes everything: relationships drive business.

Buyers may forget the interest rate you secured for them. They will not forget that you called before they had to ask, that you explained something clearly when they were confused, that you made one of the most stressful financial decisions of their life feel manageable.

Consultants who build trust, communicate with clarity, and think ahead become more than service providers. They become indispensable.

WHO ARE YOU REALLY SERVING?

There is a quiet but critical distinction between getting a deal approved and truly driving value. Most consultants fall into the habit of thinking of themselves as loan processors: ticking boxes, chasing documents, pushing applications through the system. It is an easy habit to form. And it is one that caps both your impact and your income.

Ask yourself honestly — are you processing transactions, or are you building relationships? The answer to that question determines your ceiling.',

  'When you work with a great bond consultant, you are not just getting help with paperwork. You are working with someone who is actively invested in your outcome — someone who communicates proactively, explains the process clearly, and makes what can feel like an overwhelming financial decision feel manageable.

A relationship-first consultant does not wait for you to call. They reach out before you have to ask. They explain things in plain language. They remember that behind every application is a person making one of the biggest financial decisions of their life.

Ask your consultant: "How will you keep me updated throughout the process?" Their answer will tell you everything about their approach.',

  ARRAY[
    'Technical knowledge is the entry ticket — relationships are the differentiator',
    'Buyers remember how you made them feel, not just the rate you got',
    'Proactive communication turns service providers into trusted partners',
    'The shift: from loan processor to relationship builder'
  ],
  1, 20
);

INSERT INTO lessons (
  id, module_id, title,
  content_agent, content_buyer,
  key_points, sort_order, points_value
) VALUES (
  '00000000-0000-4000-8001-000000000002',
  '00000000-0000-4000-8000-000000000001',
  'The 3 Identities of a High-Trust Consultant',

  'Trust is not built through forms and finance alone. It grows through clear communication, steady presence, and a genuine understanding of what both the buyer and practitioner need most.

High-performing consultants move naturally between three identities, and each one unlocks a different kind of value in the relationship.

THE EDUCATOR
Many buyers feel overwhelmed by the bond process and practitioners rarely have time to explain every detail. The Educator steps in to simplify and guide, easing anxiety and building confidence. When you explain what a bond means, how a pre-approval works, or what happens between offer and registration — in plain language, without jargon — you become the person people trust and recommend.

THE BRIDGE BUILDER
Property transactions involve multiple moving parts: buyers, sellers, attorneys, banks, and practitioners all with different timelines and communication styles. The Bridge Builder keeps everyone aligned. You are not just moving a file — you are managing a relationship web. When you proactively update all parties, solve miscommunications before they escalate, and keep the deal progressing smoothly, you become indispensable to the practitioner.

THE BUSINESS PARTNER
The highest-level consultants are not just helpful — they think about the practitioner''s business, not just the current deal. A Business Partner shares useful market insights, suggests ideas that help the practitioner grow, and positions themselves as a strategic resource. This is the identity that transforms a transactional relationship into a long-term partnership.

Which identity do you default to? Which one do you use least? Your growth as a consultant lives in the gap.',

  'A great bond consultant operates from three positions depending on what you need at any given moment.

As your EDUCATOR, they explain every step of the bond process in plain language — no jargon, no assumptions. They make sure you understand what is happening, why it is happening, and what comes next.

As your BRIDGE BUILDER, they keep all the moving parts of your transaction aligned — coordinating with banks, attorneys, and the estate agent so nothing falls through the cracks.

As your BUSINESS PARTNER, they think about your long-term financial wellbeing, not just this deal. They share insights that help you make better decisions.

The best consultants move fluidly between all three depending on what you need most at any moment.',

  ARRAY[
    'The Educator: simplifies complexity, eases buyer anxiety, builds trust',
    'The Bridge Builder: keeps all parties aligned, prevents deal collapse',
    'The Business Partner: thinks beyond the deal, creates long-term value',
    'Your growth lives in whichever identity you use least'
  ],
  2, 20
);

INSERT INTO lessons (
  id, module_id, title,
  content_agent, content_buyer,
  key_points, sort_order, points_value
) VALUES (
  '00000000-0000-4000-8001-000000000003',
  '00000000-0000-4000-8000-000000000001',
  'Habits That Make You Referable',

  'Being good at your job is the entry ticket. Being remembered, recommended, and referred is what builds a business. The consultants who become trusted, go-to names are not just technically strong — they are intentional about how they think, how they show up, and how they make people feel.

That intentionality lives in their daily habits.

THE MORNING QUESTION
Start each morning by asking yourself one question: "What can I do today that would make a practitioner think, ''They genuinely care about my business''?"

That question helps you spot the extra call worth making, the thoughtful update worth sending, the moment of follow-through that makes someone''s day easier.

TWO PRACTICAL HABITS TO BUILD THIS WEEK:

1. Send one genuine message of appreciation to a buyer or practitioner every morning — whether that is a voice note, a word of encouragement, or an acknowledgement of progress. Do not make it transactional. Make it human.

2. Keep a simple wins journal. A short daily list of moments when something went well, or a deal moved forward because of your input. On tough days, that journal will remind you of your impact and keep you moving.

THE VOICE NOTE SHIFT
Five emails replaced with five voice notes this week. A follow-up, an explanation, an update — delivered as a voice note feels personal in a way that text never quite does. Practitioners and buyers notice. The responses are different. The relationship deepens faster.

Remember: referrals are not asked for — they are earned. They come when someone trusts you enough to put their name behind yours.',

  'The best bond consultants do not wait for you to call. They have built habits around staying ahead of your needs.

What to watch for in a great consultant:
- They reach out before you have to chase them
- They communicate in ways that feel personal, not automated
- They celebrate your progress with you, not just the paperwork milestones
- They remember small details about your situation from previous conversations

These are not accidental behaviours. They are intentional habits built by consultants who take the relationship seriously.

If your consultant is doing these things, they are in it for the long game — and you will feel the difference.',

  ARRAY[
    'Ask every morning: "What can I do today to show a practitioner I genuinely care?"',
    'Send one voice note or appreciation message daily — make it human, not transactional',
    'Keep a wins journal: small wins logged consistently compound into confidence',
    'Referrals are earned through habit, not requested in the moment'
  ],
  3, 20
);

INSERT INTO lessons (
  id, module_id, title,
  content_agent, content_buyer,
  key_points, sort_order, points_value
) VALUES (
  '00000000-0000-4000-8001-000000000004',
  '00000000-0000-4000-8000-000000000001',
  '7 Attributes of a Top Consultant',

  '"The best consultants are not just technically strong. They are intentional about how they show up." — Shawn Mackrell

Rate yourself honestly (1–10) on each of the following:

1. RELIABILITY
When you say you will do something, people know it will happen without a reminder. Returning a call, sending feedback, following up on a document. Consistent follow-through builds confidence and strengthens every working relationship. Your word becomes a promise people can plan around.

2. PROACTIVITY
Instead of waiting for someone to follow up, you reach out first. You spot delays before they cause frustration. You guide the process forward without being asked. A proactive consultant is always a step ahead, bringing solutions before problems surface.

3. DIGITAL FLUENCY
Consultants who guide clients confidently through digital pre-qualification platforms, e-signature tools, and WhatsApp-first communication are adding visible, modern value. The technology is already there — the consultant who owns it stands apart.

4. SPEED
Buyers are anxious to move forward. Practitioners are juggling multiple deals and deadlines. When you respond quickly, you create momentum and reduce stress. Being fast does not mean being rushed — it means being available and aware that time lost can often mean trust lost.

5. PROFESSIONALISM
Whether you are speaking with a first-time buyer or an experienced practitioner, your tone, clarity, and conduct should reflect calm authority. Stay composed when others become reactive. Solve problems without assigning blame.

6. WARMTH
This is a human business. Buyers are vulnerable when navigating unfamiliar financial terms and emotionally charged decisions. Practitioners need support from someone who makes their clients feel at ease. Warmth is not softness — it is a competitive advantage.

7. CURIOSITY
Great consultants ask great questions. They want to understand the practitioner''s business model, the buyer''s full financial picture, the backstory of a deal. Curiosity leads to insights that improve outcomes and deepen relationships.

After rating yourself: choose the two lowest scores. Those are your 30-day focus areas.',

  'When choosing a bond consultant, these are the seven qualities that separate average from exceptional:

Reliability — Do they do what they say they will do, without needing a follow-up?
Proactivity — Do they reach out before you have to chase them?
Digital Fluency — Can they walk you through platforms and tools confidently?
Speed — Do they respond in a way that creates momentum, not anxiety?
Professionalism — Do they stay calm and clear under pressure?
Warmth — Do they make you feel like a person, not just a file?
Curiosity — Do they ask enough questions to truly understand your situation?

A consultant who scores highly across all seven will be someone you refer without hesitation.',

  ARRAY[
    'Reliability: your word is a promise people plan around',
    'Proactivity: be a step ahead, not a step behind',
    'Speed: time lost is often trust lost',
    'Curiosity: great questions lead to better outcomes for everyone'
  ],
  4, 20
);

-- ── QUIZ QUESTIONS — MODULE 1 ────────────────────────────────

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  'What is the core mindset shift that separates top BetterBond consultants from average ones?',
  '[{"id":"a","text":"Focusing on getting the lowest possible interest rate"},{"id":"b","text":"Processing applications faster than competitors"},{"id":"c","text":"Moving from transactional thinking to relationship-first thinking"},{"id":"d","text":"Specialising in first-time buyer applications only"}]',
  'c',
  'The foundational mindset shift is from transactional to relational thinking. Technical knowledge is the entry ticket — relationships are the differentiator. Buyers may forget the rate, but they remember how you made them feel.',
  1
);

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  'Which of the following is NOT one of the 3 Identities of a High-Trust Consultant?',
  '[{"id":"a","text":"The Educator"},{"id":"b","text":"The Bridge Builder"},{"id":"c","text":"The Deal Closer"},{"id":"d","text":"The Business Partner"}]',
  'c',
  'The 3 Identities are: The Educator (simplifies complexity for buyers), The Bridge Builder (keeps all parties aligned), and The Business Partner (thinks beyond the deal). "Deal Closer" is a transactional mindset — the opposite of what this module teaches.',
  2
);

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  'What is the morning question Shawn Mackrell recommends every consultant ask themselves daily?',
  '[{"id":"a","text":"How many deals can I close this week?"},{"id":"b","text":"What can I do today that would make a practitioner think I genuinely care about their business?"},{"id":"c","text":"Which bank is offering the best rate today?"},{"id":"d","text":"How many calls do I need to make to hit my target?"}]',
  'b',
  'The morning question is: "What can I do today that would make a practitioner think, ''They genuinely care about my business''?" This question shifts your focus from output to relationship — and the referrals follow naturally.',
  3
);

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  'How many attributes of a top consultant does the module outline?',
  '[{"id":"a","text":"5"},{"id":"b","text":"6"},{"id":"c","text":"7"},{"id":"d","text":"10"}]',
  'c',
  'The module outlines 7 attributes: Reliability, Proactivity, Digital Fluency, Speed, Professionalism, Warmth, and Curiosity. Each is rated on a 1–10 scale and the two lowest scores become your 30-day focus areas.',
  4
);

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES (
  '00000000-0000-4000-8000-000000000001',
  'Which attribute means "spotting delays before they cause frustration and guiding the process forward without being asked"?',
  '[{"id":"a","text":"Reliability"},{"id":"b","text":"Speed"},{"id":"c","text":"Proactivity"},{"id":"d","text":"Curiosity"}]',
  'c',
  'Proactivity means being a step ahead — reaching out before someone has to chase you, spotting problems before they surface, and bringing solutions rather than waiting to be asked. It is one of the most valued attributes by property practitioners.',
  5
);

-- ── MODULES 2–12 (stubs — content pending PDFs) ──────────────

INSERT INTO modules (title, slug, description, icon, category, sort_order, is_active, points_completion)
VALUES
  ('Understanding the Property Practitioner', 'property-practitioner',
   'What property practitioners actually need from consultants. Pain points in deals, communication, and clients. Becoming easy to work with.',
   '🤝', 'core', 2, true, 50),

  ('Building a Powerful Personal Brand', 'personal-brand',
   '"A brand called you" in the lending space. Professional presence online and offline. Consistency, credibility, and becoming memorable.',
   '⭐', 'core', 3, true, 50),

  ('Communication Mastery', 'communication-mastery',
   'Speed vs quality of communication. Structuring updates to property practitioners. Managing expectations and difficult conversations.',
   '💬', 'core', 4, true, 50),

  ('Creating Value Beyond the Bond', 'value-beyond-bond',
   'Educating property practitioners and clients. Market insights and guidance. Being a problem solver. Value-add conversations.',
   '💡', 'core', 5, true, 50),

  ('Referral Growth Systems', 'referral-growth',
   'How referrals actually work. Building a referral pipeline. Asking without asking. Turning one deal into five.',
   '🔄', 'core', 6, true, 50),

  ('Leveraging BetterBond''s Ecosystem', 'bb-ecosystem',
   'Using Private Property effectively. Using Loom for communication. Positioning Nurture and other services. Cross-selling without being pushy.',
   '🏗️', 'core', 7, true, 50),

  ('Client Experience Excellence', 'client-experience',
   'Creating memorable client journeys. Managing buyers emotionally. Turning clients into advocates. Post-bond follow-up strategies.',
   '✨', 'core', 8, true, 50),

  ('Time, Energy & Pipeline Management', 'pipeline-management',
   'Structuring a high-performance week. Managing multiple deals. Avoiding burnout. Consistent activity vs reactive work.',
   '⏱️', 'core', 9, true, 50),

  ('Handling Objections & Resistance', 'objection-handling',
   'Handling objections from property practitioners and buyers. Confidence and clarity in responses. Reframing objections.',
   '🛡️', 'core', 10, true, 50),

  ('Long-Term Relationship Building', 'relationship-building',
   'Staying relevant after the deal. CRM habits and touches. Becoming the go-to consultant. Building a network, not a database.',
   '🌱', 'core', 11, true, 50),

  ('Becoming a Market Leader', 'market-leader',
   'Thought leadership. Community presence. Strategic partnerships. Scaling your business sustainably.',
   '👑', 'core', 12, true, 50);
