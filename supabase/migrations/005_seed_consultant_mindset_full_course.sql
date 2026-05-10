-- BetterBond IQ - full course seed
-- Module 1: The Consultant Mindset
-- Mirrors assets/courses/the-consultant-mindset.json for the app-supported
-- module, lesson, and quiz tables.

DELETE FROM quiz_questions
WHERE module_id IN (
  SELECT id FROM modules WHERE slug IN ('consultant-mindset', 'the-consultant-mindset')
);

DELETE FROM lessons
WHERE module_id IN (
  SELECT id FROM modules WHERE slug IN ('consultant-mindset', 'the-consultant-mindset')
);

DELETE FROM modules
WHERE slug IN ('consultant-mindset', 'the-consultant-mindset');

INSERT INTO modules (
  id, title, slug, description, icon, category, sort_order, is_active,
  points_completion, agent_benefits, buyer_benefits
) VALUES (
  '00000000-0000-4000-8000-000000000001',
  'The Consultant Mindset',
  'the-consultant-mindset',
  'Move from transactional bond processing to meaningful partnership - the mindset, identities, attributes, and habits that distinguish top-performing consultants.',
  '🧭',
  'core',
  1,
  true,
  50,
  ARRAY[
    'Move from processor to trusted partner',
    'Understand the three identities of high-trust consultants',
    'Build the six attributes that create repeat referrals',
    'Create daily habits that make practitioners remember you'
  ],
  ARRAY[
    'Work with a consultant who communicates clearly',
    'Feel supported through a stressful financial decision',
    'Understand what excellent bond consultant service looks like',
    'Know what kind of partnership builds confidence'
  ]
);

INSERT INTO lessons (id, module_id, title, content_agent, content_buyer, key_points, sort_order, points_value)
VALUES
(
  '00000000-0000-4000-8001-000000000001',
  '00000000-0000-4000-8000-000000000001',
  'From Consultant to Partner',
  to_jsonb($$For years, the bond consultant's role was largely transactional. Gather the documents, submit the application, wait for the outcome. For a long time, that approach was enough. The landscape has shifted.

The market today has access to similar products, similar rates, and similar systems. What cannot be easily replicated is the quality of the relationship, the depth of trust, and the genuine value that a consultant brings beyond the paperwork.

Top-performing consultants have repositioned themselves. They are no longer administrative support or rate providers. They are true partners to property practitioners and trusted guides for buyers navigating one of life's biggest financial decisions.

Consultants who build trust, communicate with clarity, and think ahead become strategic allies: people who make the practitioner's job easier, the buyer's journey smoother, and the entire transaction stronger.$$::text),
  to_jsonb($$A great bond consultant does more than submit an application. They help make a stressful financial decision feel clearer, calmer, and more manageable.

The best consultants communicate before you have to ask, explain the process in plain language, and stay present when the deal becomes uncertain. That is the difference between being processed and being properly supported.$$::text),
  ARRAY[
    'Technical knowledge no longer differentiates consultants on its own',
    'Buyers remember how you made them feel; practitioners notice your presence and reliability',
    'Top consultants are strategic allies, not service providers',
    'Trust earned over time is what gets you called early in deals'
  ],
  1,
  20
),
(
  '00000000-0000-4000-8001-000000000002',
  '00000000-0000-4000-8000-000000000001',
  'Who You''re Really Serving',
  to_jsonb($$There is a quiet but critical distinction between getting a deal approved and truly driving value within a transaction. Many consultants fall into the habit of thinking of themselves only as loan processors: ticking boxes, chasing documents, and pushing applications through the system.

The most effective consultants reframe the question entirely. Instead of asking "How can I get this deal approved?", they ask "How can I make this practitioner's and this buyer's lives easier?"

You are not in the bond business alone. You are in the relationship and opportunity business. The bond is the tool. Your real work is to help people move forward with confidence and clarity.

Serving well also means being honest. The consultants who are trusted most tell the truth with care, set realistic expectations, and focus on long-term outcomes rather than short-term wins.$$::text),
  to_jsonb($$A strong consultant does not treat the bond as a piece of admin. They understand that there is a person, a family, a practitioner, and a deal depending on clear guidance.

Their job is to reduce stress, improve clarity, and help everyone move forward with better information.$$::text),
  ARRAY[
    'Reframe the question from approval to ease and value',
    'You are in the relationship and opportunity business',
    'Buyer anxiety and practitioner overload are opportunities to add value',
    'Measure success by experience quality, not application volume',
    'Telling the truth with care builds longer-term trust'
  ],
  2,
  20
),
(
  '00000000-0000-4000-8001-000000000003',
  '00000000-0000-4000-8000-000000000001',
  'The Three Identities of a High-Trust Consultant',
  to_jsonb($$Trust is not built through forms and finance alone. It grows through clear communication, consistent presence, and a genuine understanding of what both the buyer and the practitioner need at every stage.

The Educator simplifies and guides. A voice note explaining interest rate trends, a message preparing a buyer for what comes next, or a plain-language explanation of a bank requirement can ease anxiety and create confidence.

The Bridge Builder is the calm presence who holds deals together when emotions threaten momentum. If a buyer loses confidence, your reassurance and clarity can bring the conversation back to centre.

The Business Partner understands the practitioner's goals and actively supports them beyond a single deal. When you make it easier for a practitioner to succeed, you build the foundation for many more deals.$$::text),
  to_jsonb($$A great consultant moves between three roles depending on what the moment needs. Sometimes they educate, explaining what is happening in plain language. Sometimes they bridge, keeping everyone calm and aligned. And sometimes they partner, thinking beyond the immediate application to the broader relationship.$$::text),
  ARRAY[
    'The Educator simplifies and empowers',
    'The Bridge Builder holds deals together under pressure',
    'The Business Partner supports the practitioner beyond one transaction',
    'Knowing which identity to step into is the skill'
  ],
  3,
  25
),
(
  '00000000-0000-4000-8001-000000000004',
  '00000000-0000-4000-8000-000000000001',
  'The Six Attributes of a Top Consultant',
  to_jsonb($$Top consultants are not defined by titles or years of experience. What sets them apart is how they show up, day after day, deal after deal.

Reliability is the foundation. When you say you will do something, people know they can count on it.

Speed shows respect. Buyers are anxious, practitioners are busy, and silence breeds uncertainty.

Professionalism brings order to pressure. Stay composed, clear, and discreet.

Warmth helps people feel seen and safe in a deeply human business.

Curiosity keeps your advice relevant and turns box-ticking into problem-solving.

Proactivity separates good consultants from exceptional ones. You reach out first, spot delays early, and surface solutions before frustration builds.$$::text),
  to_jsonb($$The best consultants are reliable, fast, professional, warm, curious, and proactive. They do what they say, respond before anxiety grows, explain clearly, ask thoughtful questions, and stay ahead of the process.$$::text),
  ARRAY[
    'Reliability: your word becomes a promise',
    'Speed: responsiveness shows respect',
    'Professionalism: calm authority under pressure',
    'Warmth and curiosity make the service personal',
    'Proactivity means surfacing solutions before problems appear'
  ],
  4,
  30
),
(
  '00000000-0000-4000-8001-000000000005',
  '00000000-0000-4000-8000-000000000001',
  'Habits That Make You Referable',
  to_jsonb($$Being great at your job matters. Being remembered, recommended, and referred is what keeps your business growing over time.

Start each morning with one question: "What can I do today that would make a practitioner say, They really care about my business? Who can I follow up with to show I do not forget?"

Notice small details: the follow-up after approval, the check-in when a deal goes quiet, the message that acknowledges a milestone.

One habit has disproportionate impact: the voice note. Where email can feel transactional, a voice note creates presence. It communicates warmth, sincerity, and effort.

Finally, keep a wins journal: a simple record of moments when something went well because of how you showed up. What gets noticed gets repeated. What gets repeated becomes your reputation.$$::text),
  to_jsonb($$Referable consultants are intentional. They follow up, remember details, communicate personally, and make people feel like more than a file. Those small habits are what make clients and practitioners remember them.$$::text),
  ARRAY[
    'Start each morning with the daily value question',
    'Small details build trust',
    'Voice notes create presence in a way text cannot',
    'A wins journal identifies behaviours that produce your best results'
  ],
  5,
  20
),
(
  '00000000-0000-4000-8001-000000000006',
  '00000000-0000-4000-8000-000000000001',
  'Mindset Under Pressure',
  to_jsonb($$Any consultant can perform well when conditions are favourable. The real test comes when they are not: when a bank declines a prepared application, when a client goes quiet, or when a practitioner is frustrated.

Pressure exposes the gap between who we intend to be and how we actually behave. Under stress, many consultants communicate less, avoid difficult conversations, or focus on protecting themselves instead of solving the problem.

The strongest consultants stay consistent. They communicate clearly even when the news is hard, remain calm when conversations become heated, and focus on a path forward rather than blame.

The useful reframe is this: the difficulty is not happening to you. You are navigating it on behalf of the practitioner and buyer. Your role is to be the calm, reliable presence holding the process together while a solution is found.$$::text),
  to_jsonb($$A consultant's real quality often shows when something goes wrong. The best ones do not disappear under pressure. They communicate clearly, stay calm, and keep helping you move forward even when the answer is not easy.$$::text),
  ARRAY[
    'Pressure exposes the gap between intention and behaviour',
    'Withdrawal under stress erodes trust',
    'Self-awareness helps you name your stress patterns',
    'Reframe problems as something you navigate on behalf of others'
  ],
  6,
  25
),
(
  '00000000-0000-4000-8001-000000000007',
  '00000000-0000-4000-8000-000000000001',
  'Building the Business That Reflects You',
  to_jsonb($$The quality of your business is a direct reflection of the quality of your mindset. The way you think about your role, the standards you hold yourself to, and the consistency with which you show up determine the kind of business you build.

Volume goals are not wrong, but they are incomplete. Sustainable consultants set goals around reputation and experience as well as production.

Every conversation either strengthens or weakens your reputation, whether it leads to a deal or not. Over time, these decisions compound.

Growth is rarely dramatic. It is usually the accumulation of small, consistent improvements: a better follow-up, a more proactive update, a more thoughtful question. The consultants who keep growing are the ones willing to return to the fundamentals even on hard days.$$::text),
  to_jsonb($$A consultant's business is shaped by their habits and standards. The people who build lasting trust are not perfect; they are consistent, honest, and committed to improving the experience they create.$$::text),
  ARRAY[
    'The quality of your business reflects the quality of your mindset',
    'Volume goals are incomplete without reputation goals',
    'Every conversation strengthens or weakens your reputation',
    'Growth is the accumulation of small consistent improvements'
  ],
  7,
  20
);

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES
(
  '00000000-0000-4000-8000-000000000001',
  'What is the central mindset shift described in this module?',
  '[{"id":"a","text":"From offering competitive rates to offering competitive turnaround times"},{"id":"b","text":"From transactional bond processing to true partnership with practitioners and buyers"},{"id":"c","text":"From in-person meetings to digital communication"},{"id":"d","text":"From individual deals to building a team"}]'::jsonb,
  'b',
  'The module centres on moving from administrative loan processing to true partnership with practitioners and buyers. The shift is about orientation, trust, and value beyond paperwork.',
  1
),
(
  '00000000-0000-4000-8000-000000000001',
  'Top consultants reframe a single core question. Which is it?',
  '[{"id":"a","text":"How can I close more deals this month?"},{"id":"b","text":"How can I beat my competitors on rate?"},{"id":"c","text":"How can I make this practitioner''s and this buyer''s lives easier?"},{"id":"d","text":"How can I get more referrals?"}]'::jsonb,
  'c',
  'Asking how to make the practitioner and buyer lives easier reorients every interaction around the experience you create, not merely around the transaction.',
  2
),
(
  '00000000-0000-4000-8000-000000000001',
  'A buyer is panicking the night before signing. Which identity does this moment most directly call for?',
  '[{"id":"a","text":"The Educator"},{"id":"b","text":"The Bridge Builder"},{"id":"c","text":"The Business Partner"},{"id":"d","text":"The Negotiator"}]'::jsonb,
  'b',
  'The Bridge Builder is the calm, steady presence who holds the deal together when emotions threaten momentum.',
  3
),
(
  '00000000-0000-4000-8000-000000000001',
  'A practitioner asks for an urgent update, but the bank is still verifying documents. Which response best reflects the six attributes?',
  '[{"id":"a","text":"Wait until you have the full answer, then send a complete update."},{"id":"b","text":"Reply within an hour, explain the bank is still verifying, and commit to a specific update time."},{"id":"c","text":"Send a quick \"Will revert\" and circle back when ready."},{"id":"d","text":"Forward the message to the bank and copy the practitioner in."}]'::jsonb,
  'b',
  'A prompt acknowledgement, clear explanation, and specific follow-up time shows speed, professionalism, reliability, and proactivity.',
  4
),
(
  '00000000-0000-4000-8000-000000000001',
  'Which follow-up best reflects the voice note habit from this module?',
  '[{"id":"a","text":"Send a templated email: \"Just checking in.\""},{"id":"b","text":"Send a brief WhatsApp text asking for updates."},{"id":"c","text":"Record a 30-second voice note acknowledging the silence and offering to walk through anything that came up."},{"id":"d","text":"Wait another week because following up may feel pushy."}]'::jsonb,
  'c',
  'A short voice note creates presence in a way text and email cannot, communicating warmth, sincerity, and genuine effort.',
  5
),
(
  '00000000-0000-4000-8000-000000000001',
  'What pressure reframe helps consultants stay consistent?',
  '[{"id":"a","text":"Every problem is temporary."},{"id":"b","text":"The difficulty is happening to you."},{"id":"c","text":"You are navigating the difficulty on behalf of the practitioner and buyer."},{"id":"d","text":"Detach emotionally from the deal."}]'::jsonb,
  'c',
  'The module distinguishes between experiencing a complication as happening to you and seeing it as something you are navigating on behalf of others.',
  6
);
