export const CONSULTANT_MINDSET_MODULE = {
  id: 'mod-001',
  title: 'The Consultant Mindset',
  icon: '\u{1F9ED}',
  description: 'Move from transactional bond processing to meaningful partnership',
  is_active: true,
  sort_order: 1,
  points_completion: 50,
  category: 'core',
  lesson_count: 7,
  agent_benefits: [
    'Move from processor to trusted partner',
    'Understand the three identities of high-trust consultants',
    'Build the six attributes that create repeat referrals',
    'Create daily habits that make practitioners remember you',
  ],
  buyer_benefits: [
    'Work with a consultant who communicates clearly',
    'Feel supported through a stressful financial decision',
    'Understand what excellent bond consultant service looks like',
    'Know what kind of partnership builds confidence',
  ],
}

export const CONSULTANT_MINDSET_LESSONS = [
  {
    id: 'l1-1',
    module_id: 'mod-001',
    sort_order: 1,
    points_value: 20,
    title: 'From Consultant to Partner',
    content_agent: `For years, the bond consultant's role was largely transactional. Gather the documents, submit the application, wait for the outcome. For a long time, that approach was enough. The landscape has shifted.

The market today has access to similar products, similar rates, and similar systems. What cannot be easily replicated is the quality of the relationship, the depth of trust, and the genuine value that a consultant brings beyond the paperwork.

Top-performing consultants have repositioned themselves. They are no longer administrative support or rate providers. They are true partners to property practitioners and trusted guides for buyers navigating one of life's biggest financial decisions.

Consultants who build trust, communicate with clarity, and think ahead become strategic allies: people who make the practitioner's job easier, the buyer's journey smoother, and the entire transaction stronger. That kind of value is remembered. And it is referred.`,
    content_buyer: `A great bond consultant does more than submit an application. They help make a stressful financial decision feel clearer, calmer, and more manageable.

The best consultants communicate before you have to ask, explain the process in plain language, and stay present when the deal becomes uncertain. That is the difference between being processed and being properly supported.`,
    key_points: [
      'Technical knowledge no longer differentiates consultants on its own',
      'Buyers remember how you made them feel; practitioners notice your presence and reliability',
      'Top consultants are strategic allies, not service providers',
      'Trust earned over time is what gets you called early in deals',
    ],
  },
  {
    id: 'l1-2',
    module_id: 'mod-001',
    sort_order: 2,
    points_value: 20,
    title: "Who You're Really Serving",
    content_agent: `There is a quiet but critical distinction between getting a deal approved and truly driving value within a transaction. Many consultants fall into the habit of thinking of themselves only as loan processors: ticking boxes, chasing documents, and pushing applications through the system.

The most effective consultants reframe the question entirely. Instead of asking "How can I get this deal approved?", they ask "How can I make this practitioner's and this buyer's lives easier?"

You are not in the bond business alone. You are in the relationship and opportunity business. The bond is the tool. Your real work is to help people move forward with confidence and clarity.

Serving well also means being honest. The consultants who are trusted most tell the truth with care, set realistic expectations, and focus on long-term outcomes rather than short-term wins.`,
    content_buyer: `A strong consultant does not treat the bond as a piece of admin. They understand that there is a person, a family, a practitioner, and a deal depending on clear guidance.

Their job is to reduce stress, improve clarity, and help everyone move forward with better information.`,
    key_points: [
      'Reframe the question from approval to ease and value',
      'You are in the relationship and opportunity business',
      'Buyer anxiety and practitioner overload are opportunities to add value',
      'Measure success by experience quality, not application volume',
      'Telling the truth with care builds longer-term trust',
    ],
  },
  {
    id: 'l1-3',
    module_id: 'mod-001',
    sort_order: 3,
    points_value: 25,
    title: 'The Three Identities of a High-Trust Consultant',
    content_agent: `Trust is not built through forms and finance alone. It grows through clear communication, consistent presence, and a genuine understanding of what both the buyer and the practitioner need at every stage.

The Educator simplifies and guides. A voice note explaining interest rate trends, a message preparing a buyer for what comes next, or a plain-language explanation of a bank requirement can ease anxiety and create confidence.

The Bridge Builder is the calm presence who holds deals together when emotions threaten momentum. If a buyer loses confidence, your reassurance and clarity can bring the conversation back to centre.

The Business Partner understands the practitioner's goals and actively supports them beyond a single deal. When you make it easier for a practitioner to succeed, you build the foundation for many more deals.`,
    content_buyer: `A great consultant moves between three roles depending on what the moment needs. Sometimes they educate, explaining what is happening in plain language. Sometimes they bridge, keeping everyone calm and aligned. And sometimes they partner, thinking beyond the immediate application to the broader relationship.`,
    key_points: [
      'The Educator simplifies and empowers',
      'The Bridge Builder holds deals together under pressure',
      'The Business Partner supports the practitioner beyond one transaction',
      'Knowing which identity to step into is the skill',
    ],
  },
  {
    id: 'l1-4',
    module_id: 'mod-001',
    sort_order: 4,
    points_value: 30,
    title: 'The Six Attributes of a Top Consultant',
    content_agent: `Top consultants are not defined by titles or years of experience. What sets them apart is how they show up, day after day, deal after deal.

Reliability is the foundation. When you say you will do something, people know they can count on it.

Speed shows respect. Buyers are anxious, practitioners are busy, and silence breeds uncertainty.

Professionalism brings order to pressure. Stay composed, clear, and discreet.

Warmth helps people feel seen and safe in a deeply human business.

Curiosity keeps your advice relevant and turns box-ticking into problem-solving.

Proactivity separates good consultants from exceptional ones. You reach out first, spot delays early, and surface solutions before frustration builds.`,
    content_buyer: `The best consultants are reliable, fast, professional, warm, curious, and proactive. They do what they say, respond before anxiety grows, explain clearly, ask thoughtful questions, and stay ahead of the process.`,
    key_points: [
      'Reliability: your word becomes a promise',
      'Speed: responsiveness shows respect',
      'Professionalism: calm authority under pressure',
      'Warmth and curiosity make the service personal',
      'Proactivity means surfacing solutions before problems appear',
    ],
  },
  {
    id: 'l1-5',
    module_id: 'mod-001',
    sort_order: 5,
    points_value: 20,
    title: 'Habits That Make You Referable',
    content_agent: `Being great at your job matters. Being remembered, recommended, and referred is what keeps your business growing over time.

Start each morning with one question: "What can I do today that would make a practitioner say, They really care about my business? Who can I follow up with to show I do not forget?"

Notice small details: the follow-up after approval, the check-in when a deal goes quiet, the message that acknowledges a milestone.

One habit has disproportionate impact: the voice note. Where email can feel transactional, a voice note creates presence. It communicates warmth, sincerity, and effort.

Finally, keep a wins journal: a simple record of moments when something went well because of how you showed up. What gets noticed gets repeated. What gets repeated becomes your reputation.`,
    content_buyer: `Referable consultants are intentional. They follow up, remember details, communicate personally, and make people feel like more than a file. Those small habits are what make clients and practitioners remember them.`,
    key_points: [
      'Start each morning with the daily value question',
      'Small details build trust',
      'Voice notes create presence in a way text cannot',
      'A wins journal identifies behaviours that produce your best results',
    ],
  },
  {
    id: 'l1-6',
    module_id: 'mod-001',
    sort_order: 6,
    points_value: 25,
    title: 'Mindset Under Pressure',
    content_agent: `Any consultant can perform well when conditions are favourable. The real test comes when they are not: when a bank declines a prepared application, when a client goes quiet, or when a practitioner is frustrated.

Pressure exposes the gap between who we intend to be and how we actually behave. Under stress, many consultants communicate less, avoid difficult conversations, or focus on protecting themselves instead of solving the problem.

The strongest consultants stay consistent. They communicate clearly even when the news is hard, remain calm when conversations become heated, and focus on a path forward rather than blame.

The useful reframe is this: the difficulty is not happening to you. You are navigating it on behalf of the practitioner and buyer. Your role is to be the calm, reliable presence holding the process together while a solution is found.`,
    content_buyer: `A consultant's real quality often shows when something goes wrong. The best ones do not disappear under pressure. They communicate clearly, stay calm, and keep helping you move forward even when the answer is not easy.`,
    key_points: [
      'Pressure exposes the gap between intention and behaviour',
      'Withdrawal under stress erodes trust',
      'Self-awareness helps you name your stress patterns',
      'Reframe problems as something you navigate on behalf of others',
    ],
  },
  {
    id: 'l1-7',
    module_id: 'mod-001',
    sort_order: 7,
    points_value: 20,
    title: 'Building the Business That Reflects You',
    content_agent: `The quality of your business is a direct reflection of the quality of your mindset. The way you think about your role, the standards you hold yourself to, and the consistency with which you show up determine the kind of business you build.

Volume goals are not wrong, but they are incomplete. Sustainable consultants set goals around reputation and experience as well as production.

Every conversation either strengthens or weakens your reputation, whether it leads to a deal or not. Over time, these decisions compound.

Growth is rarely dramatic. It is usually the accumulation of small, consistent improvements: a better follow-up, a more proactive update, a more thoughtful question. The consultants who keep growing are the ones willing to return to the fundamentals even on hard days.`,
    content_buyer: `A consultant's business is shaped by their habits and standards. The people who build lasting trust are not perfect; they are consistent, honest, and committed to improving the experience they create.`,
    key_points: [
      'The quality of your business reflects the quality of your mindset',
      'Volume goals are incomplete without reputation goals',
      'Every conversation strengthens or weakens your reputation',
      'Growth is the accumulation of small consistent improvements',
    ],
  },
]

export const CONSULTANT_MINDSET_QUIZ_QUESTIONS = [
  {
    id: 'qq1-1',
    module_id: 'mod-001',
    sort_order: 1,
    question_type: 'mcq',
    correct_option_id: 'b',
    question: 'What is the central mindset shift described in this module?',
    explanation: 'The module centres on moving from administrative loan processing to true partnership with practitioners and buyers. The shift is about orientation, trust, and value beyond paperwork.',
    options: [
      { id: 'a', text: 'From offering competitive rates to offering competitive turnaround times' },
      { id: 'b', text: 'From transactional bond processing to true partnership with practitioners and buyers' },
      { id: 'c', text: 'From in-person meetings to digital communication' },
      { id: 'd', text: 'From individual deals to building a team' },
    ],
  },
  {
    id: 'qq1-2',
    module_id: 'mod-001',
    sort_order: 2,
    question_type: 'mcq',
    correct_option_id: 'c',
    question: 'Top consultants reframe a single core question. Which is it?',
    explanation: 'Asking how to make the practitioner and buyer lives easier reorients every interaction around the experience you create, not merely around the transaction.',
    options: [
      { id: 'a', text: 'How can I close more deals this month?' },
      { id: 'b', text: 'How can I beat my competitors on rate?' },
      { id: 'c', text: "How can I make this practitioner's and this buyer's lives easier?" },
      { id: 'd', text: 'How can I get more referrals?' },
    ],
  },
  {
    id: 'qq1-3',
    module_id: 'mod-001',
    sort_order: 3,
    question_type: 'mcq',
    correct_option_id: 'b',
    question: 'A buyer is panicking the night before signing. Which identity does this moment most directly call for?',
    explanation: 'The Bridge Builder is the calm, steady presence who holds the deal together when emotions threaten momentum.',
    options: [
      { id: 'a', text: 'The Educator' },
      { id: 'b', text: 'The Bridge Builder' },
      { id: 'c', text: 'The Business Partner' },
      { id: 'd', text: 'The Negotiator' },
    ],
  },
  {
    id: 'qq1-4',
    module_id: 'mod-001',
    sort_order: 4,
    question_type: 'scenario',
    correct_option_id: 'b',
    question: "A practitioner asks for an urgent update, but the bank is still verifying documents. Which response best reflects the six attributes?",
    explanation: 'A prompt acknowledgement, clear explanation, and specific follow-up time shows speed, professionalism, reliability, and proactivity.',
    options: [
      { id: 'a', text: 'Wait until you have the full answer, then send a complete update.' },
      { id: 'b', text: "Reply within an hour, explain the bank is still verifying, and commit to a specific update time." },
      { id: 'c', text: 'Send a quick "Will revert" and circle back when ready.' },
      { id: 'd', text: 'Forward the message to the bank and copy the practitioner in.' },
    ],
  },
  {
    id: 'qq1-5',
    module_id: 'mod-001',
    sort_order: 5,
    question_type: 'scenario',
    correct_option_id: 'c',
    question: 'Which follow-up best reflects the voice note habit from this module?',
    explanation: 'A short voice note creates presence in a way text and email cannot, communicating warmth, sincerity, and genuine effort.',
    options: [
      { id: 'a', text: 'Send a templated email: "Just checking in."' },
      { id: 'b', text: 'Send a brief WhatsApp text asking for updates.' },
      { id: 'c', text: "Record a 30-second voice note acknowledging the silence and offering to walk through anything that came up." },
      { id: 'd', text: 'Wait another week because following up may feel pushy.' },
    ],
  },
  {
    id: 'qq1-6',
    module_id: 'mod-001',
    sort_order: 6,
    question_type: 'mcq',
    correct_option_id: 'c',
    question: 'What pressure reframe helps consultants stay consistent?',
    explanation: 'The module distinguishes between experiencing a complication as happening to you and seeing it as something you are navigating on behalf of others.',
    options: [
      { id: 'a', text: 'Every problem is temporary.' },
      { id: 'b', text: 'The difficulty is happening to you.' },
      { id: 'c', text: 'You are navigating the difficulty on behalf of the practitioner and buyer.' },
      { id: 'd', text: 'Detach emotionally from the deal.' },
    ],
  },
]
