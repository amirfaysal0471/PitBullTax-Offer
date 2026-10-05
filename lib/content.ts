export const site = {
  logo: "/brand/pitbulltax-transcripts.svg",
  phone: "954-748-2855",
  phoneHref: "tel:+19547482855",
  privacyHref: "https://www.pitbulltax.com/page/privacy-policy.html",
  termsHref: "https://www.pitbulltax.com/page/terms-and-conditions.html",
};

export const meta = {
  title: "PitBullTax — Turn IRS transcripts into clear next steps",
  description:
    "Request client transcripts, understand important account activity, and keep watch for changes in one PitBullTax workflow.",
};

export const nav = [
  { label: "Platform", href: "#platform" },
  { label: "Live transcript", href: "#live-transcript" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export const headerCta = "Book a walkthrough";

// Same Wistia video as the live offer.pitbulltax.com page.
export const videos = {
  wistiaId: "5aswuak8kt",
  title: "PitBullTax transcript walkthrough",
  poster:
    "https://embed-ssl.wistia.com/deliveries/e4a5b24c9fa1ecb2b19c920fa04741e055c509a8.jpg?image_crop_resized=1280x720",
};

const walkthroughSuccess =
  "Thank you. We received your request and will contact you to arrange your walkthrough.";

export const hero = {
  eyebrow: "IRS transcript delivery and monitoring",
  title: "Turn IRS transcripts into clear next steps.",
  body: "Request client transcripts, understand important account activity, and keep watch for changes in one PitBullTax workflow. Spend less time decoding IRS records and more time advising clients.",
  primary: "Book a 30-minute walkthrough",
  secondary: "Explore an example transcript",
  visual: {
    // Standalone PitBullTax Transcripts screen (not the full software).
    src: "/live/admin-access-sharing.webp",
    width: 509,
    height: 305,
    alt: "PitBullTax Transcripts View Reports screen with the transcripts menu and a list of sample client transcript reports",
  },
  form: {
    title: "See it with your workflow",
    helper:
      "Tell us about your practice and we will follow up to arrange a personalized walkthrough.",
    submit: "Request my walkthrough",
    note: "By submitting, you agree that PitBullTax may contact you about this request.",
    success: walkthroughSuccess,
  },
};

export const proofStrip = {
  label: "A connected transcript workflow",
  items: [
    { title: "Bulk requests", body: "Select clients, types, and periods together." },
    { title: "Readable activity", body: "Review account events in context." },
    { title: "Monitoring", body: "Follow changes in authorized accounts." },
    { title: "Client reports", body: "Explain findings clearly." },
    { title: "Authorization", body: "Keep access requirements in view." },
  ],
};

type TimelineEvent = {
  code: string;
  pos: string;
  date: string;
  label: string;
  amount: string;
  tone: "act" | "review" | "payment" | "info";
  detail: string;
  action: string;
};

export const transcriptExample = {
  title: "See the story behind each tax period.",
  subtitle:
    "Explore an illustrative account transcript to see how events, dates, balances, and notices come together.",
  example: "Illustrative example. No real client information.",
  scale: ["2023", "Jul 2023", "Jan 2024", "Jul 2024", "Jan 2025"],
  legend: [
    { label: "Act now", tone: "act" },
    { label: "Review", tone: "review" },
    { label: "Payment", tone: "payment" },
    { label: "Information", tone: "info" },
  ],
  events: [
    {
      code: "TC 150",
      pos: "9%",
      date: "May 15, 2023",
      label: "Return filed and assessed",
      amount: "$18,420",
      tone: "payment",
      detail:
        "The original return posted and the tax was assessed for this period.",
      action: "Note the date",
    },
    {
      code: "TC 806",
      pos: "17%",
      date: "May 15, 2023",
      label: "Withholding credit applied",
      amount: "-$6,110",
      tone: "info",
      detail:
        "Credits from W-2 withholding reduced the assessed balance for the period.",
      action: "Information",
    },
    {
      code: "TC 196",
      pos: "36%",
      date: "Jul 24, 2023",
      label: "Interest assessed",
      amount: "$412",
      tone: "review",
      detail:
        "Interest was assessed on the unpaid balance for the period.",
      action: "Review",
    },
    {
      code: "TC 582",
      pos: "44%",
      date: "Jan 08, 2024",
      label: "Lien filed",
      amount: "$0.00",
      tone: "review",
      detail:
        "The account shows a notice of federal tax lien for the unpaid assessment.",
      action: "Review",
    },
    {
      code: "TC 670",
      pos: "58%",
      date: "Jun 03, 2024",
      label: "Subsequent payment received",
      amount: "-$1,500",
      tone: "payment",
      detail:
        "A payment posted to the period and reduced the outstanding balance.",
      action: "Payment",
    },
    {
      code: "TC 971",
      pos: "86%",
      date: "Jun 10, 2024",
      label: "Notice issued",
      amount: "$0.00",
      tone: "act",
      detail:
        "This example shows how a notice can appear alongside the account history. Review the underlying IRS record and the client’s circumstances before deciding what to do next.",
      action: "Act now",
    },
  ] satisfies TimelineEvent[],
};

export const audience = {
  label: "Built for the people who work with IRS transcripts every day",
  items: [
    "Enrolled Agents",
    "CPAs",
    "Tax Attorneys",
    "Resolution Firms",
    "Tax Teams",
  ],
};

export const comparison = {
  eyebrow: "Why teams switch",
  title: "Go from reading codes to seeing the whole account.",
  body: "When transcript work is spread across IRS records, PDFs, spreadsheets, and follow-up notes, it is harder to see the next step. PitBullTax brings that work together.",
  manual: {
    title: "The manual workflow",
    badge: "Manual",
    items: [
      "Request periods separately.",
      "Look up transaction codes one by one.",
      "Rebuild balances and dates outside the record.",
      "Track follow-up in separate notes.",
    ],
  },
  focused: {
    title: "With PitBullTax",
    badge: "Focused",
    items: [
      "Manage transcript requests in one queue.",
      "Review organized account activity.",
      "Watch authorized accounts for changes.",
      "Prepare a clearer summary for the client.",
    ],
  },
};

export const platform = {
  eyebrow: "The platform",
  title: "One workflow for every stage of transcript work.",
  body: "Move from request to interpretation, monitoring, and a client-ready explanation.",
  cards: [
    {
      title: "Request",
      body: "Select clients, transcript types, and tax periods, then manage results in one queue.",
      links: ["Bulk requests", "Scheduled requests"],
      image: {
        label: "Request Transcripts",
        src: "/screens/request-transcripts-standalone.webp",
        width: 1468,
        height: 857,
        alt: "PitBullTax Request Transcripts screen with taxpayer details and transcript types, including account, wage and income, and record of account, with selectable tax periods",
      },
    },
    {
      title: "Interpret",
      body: "Review transaction codes, account events, and balances in a structured view.",
      links: ["Transcript reports", "Account activity"],
      image: {
        label: "Account Transcript Summary",
        src: "/screens/account-transcript-summary-standalone.webp",
        width: 650,
        height: 460,
        alt: "PitBullTax Account Transcript Summary Report for a sample taxpayer, listing each period's transactions with codes, explanations, dates and amounts",
      },
    },
    {
      title: "Monitor",
      body: "Keep track of changes in enrolled, authorized accounts that need attention.",
      links: ["Alerts", "Monitoring"],
      image: {
        label: "View Alerts",
        src: "/screens/view-alerts-standalone.webp",
        width: 1395,
        height: 945,
        alt: "PitBullTax View Alerts screen listing account events such as tax return filed, notice issued CP 504 and offer in compromise accepted",
      },
    },
    {
      title: "Report",
      body: "Turn account activity into a summary your client can follow.",
      links: ["Client summary", "Reports"],
      image: {
        label: "Income Tax Liability Report",
        src: "/screens/income-tax-liability-report-standalone.webp",
        width: 650,
        height: 460,
        alt: "PitBullTax Income Tax Liability Report for a sample taxpayer with tax assessed, penalties, interest and balance due by period",
      },
    },
    {
      title: "Authorize",
      body: "Keep the authorization steps connected to the transcript workflow.",
      links: ["Forms 8821 and 2848"],
      // Form 8821 preview built from the IRS form's own sections (sample values only).
      form: {
        number: "8821",
        title: "Tax Information Authorization",
        rows: [
          { label: "1. Taxpayer", value: "John Doe" },
          { label: "2. Designee", value: "Your firm" },
          { label: "3. Tax matters", value: "1040 · 2019–2024" },
          // Only shown where the card has room (tablet widths).
          { label: "Signature", value: "Taxpayer e-sign", wide: true },
        ],
        status: "E-sign and submit online",
      },
    },
  ],
};

export const offerings = {
  title: "Two ways PitBullTax supports your practice",
  items: [
    {
      kicker: "01",
      title: "Transcript Delivery & Monitoring",
      body: "Request, review, and monitor IRS records across client engagements.",
      points: ["Bulk requests", "Account activity", "Monitoring", "Client reports"],
    },
    {
      kicker: "02",
      title: "Tax Resolution",
      body: "Carry transcript findings into a broader case workflow.",
      points: ["Client intake", "Case analysis", "IRS forms", "Follow-up"],
    },
  ],
};

export const product = {
  eyebrow: "Inside the software",
  title: "Watch the transcript workflow from request to report.",
  body: "See how a team requests transcripts, reviews account activity, and prepares a client-facing summary in PitBullTax.",
  videoLabel: "Watch the PitBullTax transcript walkthrough",
  videoCaption: "Follow a sample request through the platform.",
  shots: [
    // Standalone PitBullTax Transcripts screens (replacement images).
    {
      src: "/screens/request-transcripts-standalone.webp",
      alt: "PitBullTax Request Transcripts screen with taxpayer details, transcript types and selectable tax periods",
      title: "Transcript request queue",
      caption: "Manage client, type, period, and request status.",
    },
    {
      src: "/screens/account-transcript-summary-standalone.webp",
      alt: "PitBullTax Account Transcript Summary Report with each period's transactions, codes, dates and amounts",
      title: "Account activity and report",
      caption: "Review key information before sharing a summary.",
    },
  ],
};

export const csed = {
  eyebrow: "Try an example",
  title: "How long can the IRS generally collect?",
  body: "The Collection Statute Expiration Date can depend on assessments and events that suspend the collection period. Try this simple illustration, then review the full account record for a real client.",
  assessmentLabel: "Assessment date",
  tollingLabel: "Tolling days",
  resultDate: "Illustrative CSED",
  resultRemaining: "Time remaining",
  disclaimer:
    "Illustration only. This result is not a determination of the actual CSED. Confirm the full IRS record and applicable suspensions.",
};

export const steps = {
  eyebrow: "How it works",
  title: "From authorization to action in three steps.",
  items: [
    {
      n: "1",
      title: "Book your walkthrough",
      body: "Tell us how your team handles transcripts today. We will focus the session on your questions.",
      image: "/steps/step-1-walkthrough-call.webp",
      alt: "A PitBullTax walkthrough call on a laptop",
      video: true,
    },
    {
      n: "2",
      title: "See the workflow",
      body: "Follow a request through account activity, monitoring, and reporting.",
      image: "/screens/account-transcript-summary-standalone.webp",
      alt: "PitBullTax Account Transcript Summary Report with each period's transactions, codes, dates and amounts",
      video: false,
    },
    {
      n: "3",
      title: "Explore the fit",
      body: "Discuss access, training, and available next steps with the PitBullTax team.",
      image: "/screens/view-alerts-standalone.webp",
      alt: "PitBullTax View Alerts screen listing account events such as tax return filed and notices issued",
      video: false,
    },
  ],
};

// Values match the CRM (Keap) dropdown used by the existing offer.pitbulltax.com form.
export const professionalTypes = [
  "Accounting Professional",
  "Tax Professional",
  "Legal Professional",
];

// The 50 states offered by the CRM's State dropdown.
export const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

export const walkthrough = {
  eyebrow: "Personalized walkthrough",
  title: "See a clearer transcript workflow for your firm.",
  body: "In 30 minutes, we will show how PitBullTax handles transcript requests, account activity, monitoring, and client reports. Bring the workflow you would like to improve.",
  agenda: [
    { time: "01", title: "Manage requests", body: "Select clients, types, and periods in one place." },
    { time: "02", title: "Understand activity", body: "Review account events in context." },
    { time: "03", title: "Stay informed", body: "See how monitoring and alerts fit into your work." },
    { time: "04", title: "Explain findings", body: "Prepare a clearer client-facing summary." },
    { time: "05", title: "Ask your questions", body: "See the parts of the platform relevant to your practice." },
  ],
  form: {
    title: "Book your walkthrough",
    helper: "Submit your details and our team will follow up to arrange a time.",
    submit: "Request my walkthrough",
    note: "By submitting this form, you agree that PitBullTax may contact you about this request.",
    success: walkthroughSuccess,
  },
};

export const feedback = {
  eyebrow: "Practitioner feedback",
  title: "See how practitioners put transcript information to work.",
  body: "Teams use PitBullTax to organize transcript requests, review account activity, and communicate findings with clients. Explore the workflow in a walkthrough tailored to your practice.",
  cta: "See it for your firm",
  items: [
    { title: "Request", body: "Bring multiple transcript requests into one organized process." },
    { title: "Review", body: "See account information in a format your team can work through." },
    { title: "Explain", body: "Prepare a client-ready view of the activity and next steps." },
  ],
};

export const guidance = {
  title: "Guidance for your team as you get started",
  body: "A walkthrough gives your team a closer look at the transcript workflow and the training resources available through PitBullTax.",
  cta: "Book a walkthrough",
};

export const faq = {
  eyebrow: "Before you book",
  title: "Questions, answered.",
  items: [
    {
      q: "Which transcripts can I request?",
      a: "PitBullTax supports transcript request workflows for authorized client accounts. We will show the currently available transcript types and tax periods during your walkthrough.",
    },
    {
      q: "What authorization do I need?",
      a: "The authorization depends on the client and the work you perform. The walkthrough can show how the applicable authorization steps fit into the request process.",
    },
    {
      q: "How does monitoring work?",
      a: "Authorized accounts can be enrolled in monitoring. We will demonstrate the current check schedule, alerts, and notification options.",
    },
    {
      q: "Can I review account activity in a report?",
      a: "Yes. The platform organizes transcript information so your team can review the activity and prepare a clearer client summary.",
    },
    {
      q: "Does the calculator determine the final CSED?",
      a: "No. Its result is an illustration. A practitioner must review the full account record and applicable suspensions to confirm an actual CSED.",
    },
    {
      q: "What happens after I request a walkthrough?",
      a: "Our team will contact you to arrange a time and learn which part of the transcript workflow you want to see.",
    },
  ],
};

export const finalCta = {
  line1: "Read less.",
  line2: "Resolve more.",
  body: "See a clearer IRS transcript workflow built around your firm.",
  cta: "Book a transcript walkthrough",
};

export const footer = {
  copyright: "© 2026 PitBullTax Software. All rights reserved.",
  links: [
    { label: "Platform", href: "#platform" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Privacy Policy", href: site.privacyHref },
    { label: "Terms & Conditions", href: site.termsHref },
  ],
};
