-- ═══════════════════════════════════════════
-- BetterBond IQ — Seed: Module 1 (Bond Origination)
-- ═══════════════════════════════════════════

INSERT INTO modules (id, title, slug, description, icon, category, sort_order, is_active, points_completion, agent_benefits, buyer_benefits)
VALUES (
  'a1b2c3d4-0001-0001-0001-000000000001',
  'Bond Origination',
  'bond-origination',
  'Multi-bank simultaneous application. Rate negotiation. No cost to the buyer. The core BetterBond service — underpins everything.',
  '🏠',
  'core',
  1,
  true,
  50,
  ARRAY[
    'Multi-bank simultaneous submission protects your deal',
    'Pre-Approval Certificate accepted by all major agencies',
    'Free service — zero cost to you or your buyer',
    'Average rate saving of 0.65% vs. going direct'
  ],
  ARRAY[
    'One application submitted to all major SA banks',
    'BetterBond negotiates the best rate on your behalf',
    'Completely free — no hidden fees',
    'Average monthly saving of R800 on a R1m bond'
  ]
);

-- ── LESSONS ──

INSERT INTO lessons (id, module_id, title, content_agent, content_buyer, key_points, sort_order, points_value)
VALUES (
  'b1c2d3e4-0001-0001-0001-000000000001',
  'a1b2c3d4-0001-0001-0001-000000000001',
  'What Is Bond Origination?',
  '"BetterBond submits a buyer''s bond application to all major SA banks simultaneously — for free. We do the admin, negotiate the rate, and report back. Your buyer gets the best deal. Your deal is more likely to go through."',
  '"Applying for a home loan is stressful and time-consuming. BetterBond takes over the entire process — at no charge to you. We apply to ABSA, FNB, Nedbank, Standard Bank and more all at once, then negotiate the best interest rate on your behalf."',
  ARRAY[
    'Free to the buyer — no commitment required',
    'Average rate saving of 0.65% vs. going direct to a bank',
    '25 years in the South African market',
    'One application, multiple bank offers'
  ],
  1,
  20
);

INSERT INTO lessons (id, module_id, title, content_agent, content_buyer, key_points, sort_order, points_value)
VALUES (
  'b1c2d3e4-0001-0001-0001-000000000002',
  'a1b2c3d4-0001-0001-0001-000000000001',
  'The Pre-Approval Certificate',
  '"A BetterBond Pre-Approval Certificate tells you exactly what your buyer can afford before they make an offer. This protects your deal — no wasted offers on properties the buyer can''t finance, no last-minute bank declines. Agents who use pre-approvals close more deals."',
  '"Before you fall in love with a home, know exactly what you can afford. Our Pre-Approval Certificate is accepted by all major estate agencies and gives you negotiating power — sellers take pre-approved buyers seriously."',
  ARRAY[
    'Accepted by all major SA estate agencies',
    'Takes approximately 24 hours to issue',
    'Valid for 90 days from date of issue',
    'Shows sellers you are a serious, qualified buyer'
  ],
  2,
  20
);

INSERT INTO lessons (id, module_id, title, content_agent, content_buyer, key_points, sort_order, points_value)
VALUES (
  'b1c2d3e4-0001-0001-0001-000000000003',
  'a1b2c3d4-0001-0001-0001-000000000001',
  'The Rate Negotiation Advantage',
  '"This is BetterBond''s biggest differentiator. When a buyer goes directly to one bank, that bank has no incentive to offer their best rate. BetterBond creates competition between all banks — and the buyer wins."',
  '"On a R1 million bond over 20 years, a 0.65% rate saving equals approximately R800/month less in repayments — that''s nearly R200,000 over the life of the bond. This is why BetterBond is always worth it."',
  ARRAY[
    'Average saving 0.65% below prime interest rate',
    'Multiple banks competing for the same application',
    'Consultant presents all offers; buyer chooses',
    'Rate saving compounds over the full 20-year bond term'
  ],
  3,
  20
);

INSERT INTO lessons (id, module_id, title, content_agent, content_buyer, key_points, sort_order, points_value)
VALUES (
  'b1c2d3e4-0001-0001-0001-000000000004',
  'a1b2c3d4-0001-0001-0001-000000000001',
  'Objection Handling',
  '"My buyer already banks with FNB — they''ll just go direct." Response: Even loyal bank customers consistently get better rates through BetterBond because we create competition. FNB will offer a better rate when they know ABSA is also on the table.',
  '"I don''t want to give my information to multiple banks." Response: You submit once to us. We handle all communication with all banks. Your information is protected and you stay in control — you only accept the offer you choose.',
  ARRAY[
    'One application, one set of documents, one point of contact',
    'Your bank will still compete — loyalty does not equal best rate',
    'No obligation to accept any offer made',
    'BetterBond is on your side, not the bank''s'
  ],
  4,
  20
);

-- ── QUIZ QUESTIONS ──

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES (
  'a1b2c3d4-0001-0001-0001-000000000001',
  'What is the average interest rate saving BetterBond achieves for buyers compared to going directly to a bank?',
  '[{"id":"a","text":"0.25% below prime"},{"id":"b","text":"0.65% below prime"},{"id":"c","text":"1.0% below prime"},{"id":"d","text":"0.5% below prime"}]',
  'b',
  'BetterBond''s average rate saving is 0.65% below prime. On a R1 million bond over 20 years this equals approximately R800/month in savings — nearly R200,000 over the bond term.',
  1
);

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES (
  'a1b2c3d4-0001-0001-0001-000000000001',
  'How long is a BetterBond Pre-Approval Certificate valid?',
  '[{"id":"a","text":"30 days"},{"id":"b","text":"6 months"},{"id":"c","text":"90 days"},{"id":"d","text":"1 year"}]',
  'c',
  'A BetterBond Pre-Approval Certificate is valid for 90 days. It is accepted by all major SA estate agencies and signals to sellers that the buyer is serious and pre-qualified.',
  2
);

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES (
  'a1b2c3d4-0001-0001-0001-000000000001',
  'What does BetterBond''s bond origination service cost the buyer?',
  '[{"id":"a","text":"R1,500 admin fee"},{"id":"b","text":"1% of bond value"},{"id":"c","text":"Nothing — it is completely free"},{"id":"d","text":"R500 application fee"}]',
  'c',
  'BetterBond''s service is completely free to the buyer. BetterBond is compensated by the banks when a bond is successfully registered — there are no fees passed on to the applicant.',
  3
);

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES (
  'a1b2c3d4-0001-0001-0001-000000000001',
  'When a buyer submits through BetterBond, how many banks typically receive the application simultaneously?',
  '[{"id":"a","text":"1-2 banks"},{"id":"b","text":"Up to 7 major banks"},{"id":"c","text":"Only the buyer''s current bank"},{"id":"d","text":"3 banks maximum"}]',
  'b',
  'BetterBond submits to up to 7 major SA banks simultaneously — including ABSA, FNB, Nedbank, Standard Bank, Investec, RMB, and SA Home Loans. This creates real competition and drives the best possible rate for the buyer.',
  4
);

INSERT INTO quiz_questions (module_id, question, options, correct_option_id, explanation, sort_order)
VALUES (
  'a1b2c3d4-0001-0001-0001-000000000001',
  'On a R1m bond over 20 years, the BetterBond 0.65% rate saving equals approximately how much per month?',
  '[{"id":"a","text":"±R200/month"},{"id":"b","text":"±R500/month"},{"id":"c","text":"±R800/month"},{"id":"d","text":"±R1,200/month"}]',
  'c',
  'A 0.65% saving on a R1 million bond over 20 years equals approximately R800/month less in repayments — totalling nearly R200,000 saved over the full bond term. This is a compelling number to share with buyers.',
  5
);

-- ── SEED MODULES 2-5 (Phase 1 content) ──

INSERT INTO modules (title, slug, description, icon, category, sort_order, is_active, points_completion)
VALUES
  ('Pre-Approval Certificate', 'pre-approval', 'What it is, why agents need it, why buyers want it. 90-day validity. Accepted by all major agencies.', '📋', 'core', 2, true, 50),
  ('First Home Finance', 'first-home-finance', 'Subsidy-linked loans. Qualifying income R3,501–R22,000/month. Max subsidy R130,505.', '💰', 'core', 3, true, 50),
  ('Direct Competitors', 'direct-competitors', 'How to position BetterBond against ooba, Roost, MortgageMax, and MortgageMarket.', '⚔️', 'competitive', 4, true, 50),
  ('Market Alternatives', 'market-alternatives', 'How to position vs. going direct to a bank, SA Home Loans, and informal lenders.', '🏦', 'competitive', 5, true, 50);
