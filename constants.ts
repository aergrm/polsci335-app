
import { Week, Assignment, DemocracyDimension, Flashcard, QuizLevel, LiveQuizSession } from './types';

export const INSTRUCTOR = "Ahmet Ergurum";
export const SEMESTER = "Spring 2026";

export const SCHEDULE: Week[] = [
  { id: 1, dates: "Jan 27 & 29", title: "Introduction", topics: ["Comparative Method", "Course Overview"], readings: ["Lijphart Ch 1", "Syllabus"] },
  { id: 2, dates: "Feb 3-5", title: "Models of Democracy I", topics: ["Westminster Model", "Majoritarian Democracy", "Group 1 Presentation"], readings: ["Lijphart Ch 2"] },
  { id: 3, dates: "Feb 10-12", title: "Models of Democracy II", topics: ["Consensus Model", "Group 2 Presentation"], readings: ["Lijphart Ch 3"], due: ["Quiz 1 (Feb 10)"] },
  { id: 4, dates: "Feb 17-19", title: "Party Systems", topics: ["Two-party vs Multiparty", "Effective # of parties"], readings: ["Lijphart Ch 4-5"], due: ["Project Part 1: Proposal (Feb 17)"] },
  { id: 5, dates: "Feb 24-26", title: "Electoral Systems I", topics: ["Majoritarian vs PR", "Electoral Formulas", "Group 3 Presentation"], readings: ["Lijphart Ch 8"] },
  { id: 6, dates: "Mar 3-5", title: "Electoral Systems II", topics: ["Disproportionality", "Thresholds", "Group 4 Presentation"], readings: ["Lijphart Ch 8 (cont)", "Lijphart Ch 9"], due: ["Quiz 2 (Mar 3)"] },
  { id: 7, dates: "Mar 10-12", title: "Exec-Leg Relations I", topics: ["Cabinets", "Group 5 Presentation"], readings: ["Lijphart Ch 6-7"], due: ["In-Class Essay 1 (Mar 10)"] },
  { id: 8, dates: "Mar 17-19", title: "Exec-Leg Relations II", topics: ["Cabinet Formation", "Executive Dominance"], readings: ["Lijphart Ch 6-7 (cont)"], due: ["MIDTERM EXAM (Mar 19)"] },
  { id: 9, dates: "Mar 22-29", title: "SPRING BREAK", topics: ["NO CLASS"], readings: [] },
  { id: 10, dates: "Mar 31-Apr 2", title: "Legislative Institutions", topics: ["Bicameralism", "Interest Groups"], readings: ["Lijphart Ch 11"], due: ["Project Part 2: Annotated Bibliography (Mar 31)"] },
  { id: 11, dates: "Apr 7-9", title: "Constitutions & Courts", topics: ["Judicial Review", "Constitutional Rigidity", "Group 6 Presentation"], readings: ["Lijphart Ch 12"], due: ["Quiz 3 (Apr 7)"] },
  { 
    id: 12, 
    dates: "Apr 14-16", 
    title: "Federalism & Economic Governance", 
    topics: [
      "Federal vs. Unitary",
      "Central Bank Independence",
      "Group 7 Presentation"
    ], 
    readings: [
      "Lijphart Ch 10",
      "Lijphart Ch 13",
      "Rodden (2004)"
    ] 
  },
  { 
    id: 13, 
    dates: "Apr 21-23", 
    title: "Institutions & Foreign Policy", 
    topics: [
      "Domestic Institutions & FP",
      "Two-level games",
      "Group 8 Presentation"
    ], 
    readings: [
      "Lijphart Ch 14",
      "Putnam (1988)",
      "Bueno de Mesquita & Smith (2012)"
    ], 
    due: ["In-Class Essay 2 (Apr 21)"] 
  },
  { id: 14, dates: "Apr 28-30", title: "Democratic Performance", topics: ["Measuring Democratic Quality", "Project Presentations Begin"], readings: ["Lijphart Ch 15-16"], due: ["Project Presentations (Apr 30)"] },
  { id: 15, dates: "May 5-7", title: "Challenges to Democracy", topics: ["Backsliding", "Populism", "Course Conclusion"], readings: ["Lijphart Ch 17"], due: ["Quiz 4 (May 5)", "Presentations Conclude (May 7)"] },
  { id: 16, dates: "May 15", title: "Finals Week", topics: ["NO FINAL EXAM", "Final Paper Due"], readings: [], due: ["Project Part 3: Final Paper Due (May 15)"] }
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 'att', name: 'Participation & Attendance', weight: 15, category: 'Participation' },
  { id: 'pres', name: 'Country Presentation', weight: 10, category: 'Presentation' },
  { id: 'quiz', name: '4 Quizzes (5% each)', weight: 20, category: 'Quiz' },
  { id: 'essay', name: '2 In-Class Essays (10% each)', weight: 20, category: 'Essay' },
  { id: 'mid', name: 'Midterm Exam', weight: 15, category: 'Exam' },
  { id: 'proj', name: 'Country Analysis Project', weight: 20, category: 'Project' },
];

export const DEMOCRACY_DIMENSIONS: DemocracyDimension[] = [
  // Dimension I: Executives-Parties
  {
    id: 'cabinets',
    name: 'Cabinets',
    category: 'executives-parties',
    chapter: 6,
    westminster: 'Concentration of executive power in single-party majority cabinets',
    consensus: 'Executive power-sharing in broad multiparty coalitions',
    description: 'Whether the government represents a bare majority (or plurality) or seeks broad consensus through coalitions.'
  },
  {
    id: 'exec_leg',
    name: 'Executive-Legislative Relations',
    category: 'executives-parties',
    chapter: 7,
    westminster: 'Executive is dominant',
    consensus: 'Balance of power',
    description: 'The relative power of the executive versus the legislature (dominance vs. balance).'
  },
  {
    id: 'party_system',
    name: 'Party System',
    category: 'executives-parties',
    chapter: 5,
    westminster: 'Two-party system',
    consensus: 'Multiparty system',
    description: 'The effective number of political parties competing for power.'
  },
  {
    id: 'electoral',
    name: 'Electoral System',
    category: 'executives-parties',
    chapter: 8,
    westminster: 'Majoritarian and disproportional',
    consensus: 'Proportional Representation (PR)',
    description: 'How votes are translated into seats (Winner-take-all vs. Proportional).'
  },
  {
    id: 'interest_groups',
    name: 'Interest Groups',
    category: 'executives-parties',
    chapter: 9,
    westminster: 'Pluralist interest groups',
    consensus: 'Corporatist interest groups',
    description: 'Free-for-all competition vs. organized concertation (social partnership) between government, labor, and business.'
  },
  
  // Dimension II: Federal-Unitary
  {
    id: 'govt_structure',
    name: 'Federalism',
    category: 'federal-unitary',
    chapter: 10,
    westminster: 'Unitary and centralized',
    consensus: 'Federal and decentralized',
    description: 'Territorial division of power between central and regional governments.'
  },
  {
    id: 'legislature',
    name: 'Legislature',
    category: 'federal-unitary',
    chapter: 11,
    westminster: 'Concentration of legislative power in unicameral legislature',
    consensus: 'Division of power in strong bicameral legislature',
    description: 'One chamber vs. two equally strong but differently constituted chambers.'
  },
  {
    id: 'constitution',
    name: 'Constitution',
    category: 'federal-unitary',
    chapter: 12,
    westminster: 'Flexible / Unwritten',
    consensus: 'Rigid / Written',
    description: 'Ease of amending the fundamental laws of the state.'
  },
  {
    id: 'judicial',
    name: 'Judicial Review',
    category: 'federal-unitary',
    chapter: 12,
    westminster: 'Legislature has final word (No judicial review)',
    consensus: 'Laws subject to judicial review',
    description: 'Authority of supreme/constitutional courts to invalidate legislation.'
  },
  {
    id: 'central_bank',
    name: 'Central Bank',
    category: 'federal-unitary',
    chapter: 13,
    westminster: 'Dependent on Executive',
    consensus: 'Independent Central Bank',
    description: 'Autonomy of the central bank to determine monetary policy.'
  }
];

export const CONCEPT_FLASHCARDS: Flashcard[] = [
  { id: 'c1', category: 'Concept', front: 'Manufactured Majority', back: 'A parliamentary majority created by the electoral system (usually plurality) even when the party won less than 50% of the vote.' },
  { id: 'c2', category: 'Concept', front: 'Constructive Vote of No Confidence', back: 'A rule where parliament can only dismiss a cabinet if it simultaneously elects a new one (e.g., Germany, Spain).' },
  { id: 'c3', category: 'Concept', front: 'Corporatism', back: 'Interest group system with tripartite concertation between government, labor, and business to shape policy.' },
  { id: 'c4', category: 'Concept', front: 'Symmetric Bicameralism', back: 'Two legislative chambers with equal constitutional powers and democratic legitimacy.' },
  { id: 'c5', category: 'Concept', front: 'Congruent Federalism', back: 'Federal units have similar social/cultural character to the whole nation (e.g., USA, Australia).' },
  { id: 'c6', category: 'Concept', front: 'Incongruent Federalism', back: 'Federal units differ in social/cultural character (e.g., language, religion) from the whole (e.g., Belgium, Switzerland).' },
  { id: 'c7', category: 'Concept', front: 'Effective Number of Parties', back: 'A mathematical index (Laakso/Taagepera) that counts parties weighted by their relative size (seats or votes).' },
  { id: 'c8', category: 'Concept', front: 'Consociationalism', back: 'A form of power-sharing democracy for deeply divided societies, emphasizing grand coalitions and mutual vetoes.' },
  { id: 'c9', category: 'Concept', front: 'District Magnitude', back: 'The number of representatives elected from a single district. Higher magnitude = Higher proportionality.' },
  { id: 'c10', category: 'Concept', front: 'Hung Parliament', back: 'A situation in a Westminster system where no single party has an absolute majority.' },
  { id: 'c11', category: 'Concept', front: 'Executive Dominance', back: 'When the cabinet is much stronger than the legislature, typical of Westminster systems (e.g., UK).' },
  { id: 'c12', category: 'Concept', front: 'Magic Formula', back: 'The 2:2:2:1 party distribution in the Swiss Federal Council used from 1959 to 2003.' },
  { id: 'c13', category: 'Concept', front: 'Plural Society', back: 'A society divided by segmental cleavages (religious, ideological, linguistic, cultural) with distinct subsocieties.' },
  { id: 'c14', category: 'Concept', front: 'Gallagher Index', back: 'A measure of the disproportionality between votes received and seats allocated in an election.' },
  { id: 'c15', category: 'Concept', front: 'Parliamentary Sovereignty', back: 'The doctrine that the legislature (Parliament) has absolute supremacy and is not subject to judicial review (UK).' },
  { id: 'c16', category: 'Concept', front: 'Grand Coalition', back: 'A governing coalition that includes the major parties, often used in times of crisis or in consociational democracies.' },
];

export const QUIZ_LEVELS: QuizLevel[] = [
  {
    level: 1,
    title: "Novice: Model Identification",
    description: "Identify whether a trait belongs to the Westminster or Consensus model.",
    minScoreToUnlock: 70,
    questions: [
      {
        id: 'q1-1',
        question: "Which model features a 'Two-party system'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Westminster Model",
        explanation: "The Westminster model creates a competitive two-party system versus the multiparty system of Consensus democracy."
      },
      {
        id: 'q1-2',
        question: "Which model features 'Proportional Representation'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Consensus Model",
        explanation: "Consensus democracy uses PR to ensure fair representation of minorities."
      },
      {
        id: 'q1-3',
        question: "Which model features a 'Unicameral Legislature'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Westminster Model",
        explanation: "Concentration of power in a single chamber is a hallmark of the Majoritarian/Westminster model."
      },
      {
        id: 'q1-4',
        question: "Which model features 'Federalism and Decentralization'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Consensus Model",
        explanation: "Divided power through federalism is a key trait of the Consensus model."
      },
      {
        id: 'q1-5',
        question: "Which model features 'Constitutional Rigidity'?",
        options: ["Westminster Model", "Consensus Model"],
        correctAnswer: "Consensus Model",
        explanation: "Consensus models protect minority rights through rigid constitutions that are hard to amend."
      }
    ]
  },
  {
    level: 2,
    title: "Scholar: Concepts & Definitions",
    description: "Match specific political science terms to their definitions.",
    minScoreToUnlock: 70,
    questions: [
      {
        id: 'q2-1',
        question: "What is a 'Manufactured Majority'?",
        options: [
          "A coalition government formed by multiple parties.",
          "A parliamentary majority won with less than 50% of the popular vote.",
          "A majority created by banning opposition parties.",
          "A majority achieved through fraud."
        ],
        correctAnswer: "A parliamentary majority won with less than 50% of the popular vote.",
        explanation: "Common in Westminster systems (e.g., UK), where plurality rules award a seat majority to a party with only a plurality of votes."
      },
      {
        id: 'q2-2',
        question: "Which country is the best example of 'Incongruent Federalism'?",
        options: ["USA", "Australia", "Belgium", "Germany"],
        correctAnswer: "Belgium",
        explanation: "Incongruent federalism creates units with distinct social/cultural characters (e.g., language in Belgium) unlike the congruent units of the US/Australia."
      },
      {
        id: 'q2-3',
        question: "Corporatism involves cooperation between which groups?",
        options: [
          "Government, Military, and Church",
          "Government, Labor Unions, and Business Associations",
          "Executive, Legislature, and Judiciary",
          "Federal, State, and Local Governments"
        ],
        correctAnswer: "Government, Labor Unions, and Business Associations",
        explanation: "Democratic corporatism is the tripartite concertation of social partners to shape economic policy."
      },
      {
        id: 'q2-4',
        question: "What does 'District Magnitude' refer to?",
        options: [
          "The geographic size of a district in square miles.",
          "The number of voters in a district.",
          "The number of seats elected from a district.",
          "The amount of money spent in a district election."
        ],
        correctAnswer: "The number of seats elected from a district.",
        explanation: "District magnitude (M) is the crucial variable: higher M leads to higher proportionality."
      }
    ]
  },
  {
    level: 3,
    title: "Expert: Country Application",
    description: "Apply the framework to specific country cases and history.",
    minScoreToUnlock: 0, // Final level
    questions: [
      {
        id: 'q3-1',
        question: "New Zealand shifted from a pure Westminster model to a more Consensus model in the 1990s by changing which variable?",
        options: [
          "Adopting Federalism",
          "Switching to Proportional Representation (MMP)",
          "Abolishing the Monarchy",
          "Creating a Constitutional Court"
        ],
        correctAnswer: "Switching to Proportional Representation (MMP)",
        explanation: "The 1996 switch to MMP ended single-party dominance and ushered in multiparty coalitions."
      },
      {
        id: 'q3-2',
        question: "Switzerland is the prototype of Consensus democracy, but it has one Majoritarian trait. What is it?",
        options: [
          "Unwritten Constitution",
          "Lack of Judicial Review",
          "Two-Party System",
          "Unitary Government"
        ],
        correctAnswer: "Lack of Judicial Review",
        explanation: "While highly consensual, the Swiss Supreme Court traditionally cannot strike down federal laws."
      },
      {
        id: 'q3-3',
        question: "Which country represents the 'Consensus' model on the Executives-Parties dimension but 'Majoritarian' on Federal-Unitary?",
        options: ["USA", "Israel", "Canada", "Germany"],
        correctAnswer: "Israel",
        explanation: "Israel has extreme multipartyism (Consensus) but is a unitary state with no written constitution (Majoritarian)."
      },
      {
        id: 'q3-4',
        question: "In the UK, the House of Lords has only delaying power. This is an example of:",
        options: [
          "Symmetric Bicameralism",
          "Asymmetric Bicameralism",
          "Perfect Unicameralism",
          "Federalism"
        ],
        correctAnswer: "Asymmetric Bicameralism",
        explanation: "Power is concentrated in the House of Commons, making the bicameralism unequal (asymmetric)."
      }
    ]
  }
];

export const LIVE_QUIZZES: LiveQuizSession[] = [
  {
    weekId: 1,
    title: "Week 1: Introduction",
    isLocked: true,
    questions: [
      {
        id: 'lq1-1',
        text: "What is the 'Fundamental Problem' of Comparative Politics?",
        timeLimit: 20,
        explanation: "Comparative politics struggles with having a small number of countries (N) but a huge number of potential variables (culture, history, economy) that explain differences.",
        options: [
          { id: '1a', text: "Too many countries", color: 'red', isCorrect: false },
          { id: '1b', text: "Many variables, Small N", color: 'blue', isCorrect: true },
          { id: '1c', text: "Fake News", color: 'yellow', isCorrect: false },
          { id: '1d', text: "Lack of Theory", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-2',
        text: "Who is the author of our main textbook?",
        timeLimit: 20,
        explanation: "Lijphart, duh?",
        options: [
          { id: '2a', text: "Karl Marx", color: 'red', isCorrect: false },
          { id: '2b', text: "Arend Lijphart", color: 'blue', isCorrect: true },
          { id: '2c', text: "Emmanuel Macron", color: 'yellow', isCorrect: false },
          { id: '2d', text: "Ahmet Ergurum", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-3',
        text: "Which two dimensions does Lijphart use to classify democracies?",
        timeLimit: 20,
        explanation: "Lijphart argues that democratic institutions cluster into two dimensions: Executives-Parties (Joint Power) and Federal-Unitary (Divided Power).",
        options: [
          { id: '3a', text: "Executives-Parties & Federal-Unitary", color: 'red', isCorrect: true },
          { id: '3b', text: "Good & Bad", color: 'blue', isCorrect: false },
          { id: '3c', text: "East & West", color: 'yellow', isCorrect: false },
          { id: '3d', text: "Rich & Poor", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-4',
        text: "Which statement is 'Normative'?",
        timeLimit: 20,
        explanation: "Normative statements make value judgments ('better', 'worse', 'should') about what ought to be. Empirical statements describe facts that can be tested.",
        options: [
          { id: '4a', text: "Democracies are better than dictatorships.", color: 'red', isCorrect: true },
          { id: '4b', text: "Democracies have higher GDP per capita.", color: 'blue', isCorrect: false },
          { id: '4c', text: "Dictatorships have fewer parties.", color: 'yellow', isCorrect: false },
          { id: '4d', text: "Voter turnout is 60%.", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-5',
        text: "MSSD (Most Similar Systems Design) is also known as...",
        timeLimit: 20,
        explanation: "MSSD compares countries that are very similar (controlling for variables) but differ in one key outcome, isolating the cause. This is Mill's Method of Difference.",
        options: [
          { id: '5a', text: "Method of Difference", color: 'red', isCorrect: true },
          { id: '5b', text: "Method of Agreement", color: 'blue', isCorrect: false },
          { id: '5c', text: "Statistical Method", color: 'yellow', isCorrect: false },
          { id: '5d', text: "Case Study", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq1-6',
        text: "Which reasoning moves from Specific Observations to General Theory?",
        timeLimit: 20,
        explanation: "Inductive reasoning starts with specific observations/data and builds toward a general theory. Deductive starts with theory/hypothesis and tests it with data.",
        options: [
          { id: '6a', text: "Deductive", color: 'red', isCorrect: false },
          { id: '6b', text: "Inductive", color: 'blue', isCorrect: true },
          { id: '6c', text: "Reductive", color: 'yellow', isCorrect: false },
          { id: '6d', text: "Productive", color: 'green', isCorrect: false }
        ]
      }
    ]
  },
  {
    weekId: 2,
    title: "Week 2: Westminster Model",
    isLocked: true,
    questions: [
      {
        id: 'lq1',
        text: "Which of these is NOT a characteristic of the Westminster Model?",
        timeLimit: 20,
        explanation: "The Westminster model is characterized by single-party majority cabinets and executive dominance. Multiparty coalitions are a hallmark of the Consensus model.",
        options: [
          { id: '1a', text: "Executive Dominance", color: 'red', isCorrect: false },
          { id: '1b', text: "Multiparty Coalitions", color: 'blue', isCorrect: true },
          { id: '1c', text: "Unitary Government", color: 'yellow', isCorrect: false },
          { id: '1d', text: "Plurality Elections", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq2',
        text: "What does 'Fusion of Power' mean in the UK context?",
        timeLimit: 20,
        explanation: "In parliamentary systems like the UK, the Executive (PM and Cabinet) is drawn directly from and is responsible to the Legislature, 'fusing' the branches rather than separating them.",
        options: [
          { id: '2a', text: "PM is part of Legislature", color: 'red', isCorrect: true },
          { id: '2b', text: "Separation of Church & State", color: 'blue', isCorrect: false },
          { id: '2c', text: "Nuclear Energy", color: 'yellow', isCorrect: false },
          { id: '2d', text: "Local & Central Gov Work Together", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq3',
        text: "Which electoral system tends to manufacture majorities?",
        timeLimit: 20,
        explanation: "First-Past-The-Post (Plurality) rules often give a party with less than 50% of the vote a majority of the seats, 'manufacturing' a governing majority.",
        options: [
          { id: '3a', text: "PR-STV", color: 'red', isCorrect: false },
          { id: '3b', text: "MMP", color: 'blue', isCorrect: false },
          { id: '3c', text: "First-Past-The-Post", color: 'yellow', isCorrect: true },
          { id: '3d', text: "List PR", color: 'green', isCorrect: false }
        ]
      }
    ]
  },
  {
    weekId: 3,
    title: "Week 3: Consensus Model",
    isLocked: true,
    questions: [
      {
        id: 'lq4',
        text: "The Consensus Model aims to...",
        timeLimit: 20,
        explanation: "The Consensus model is designed to include as many groups as possible in decision-making, rather than letting a bare majority rule.",
        options: [
          { id: '4a', text: "Maximize Efficiency", color: 'red', isCorrect: false },
          { id: '4b', text: "Concentrate Power", color: 'blue', isCorrect: false },
          { id: '4c', text: "Share Power / Include Minorities", color: 'yellow', isCorrect: true },
          { id: '4d', text: "Speed up decision making", color: 'green', isCorrect: false }
        ]
      },
      {
        id: 'lq5',
        text: "Which country is Lijphart's primary example of Consensus Democracy?",
        timeLimit: 20,
        explanation: "Switzerland is the archetypal consensus democracy with its grand coalition executive (Federal Council), multiparty system, and strong federalism.",
        options: [
          { id: '5a', text: "United Kingdom", color: 'red', isCorrect: false },
          { id: '5b', text: "USA", color: 'blue', isCorrect: false },
          { id: '5c', text: "Switzerland", color: 'yellow', isCorrect: true },
          { id: '5d', text: "New Zealand", color: 'green', isCorrect: false }
        ]
      }
    ]
  }
];

export const APPROVED_COUNTRIES = [
  "United Kingdom",
  "New Zealand",
  "Australia",
  "Switzerland",
  "Belgium",
  "Netherlands",
  "Spain",
  "Sweden",
  "Germany",
  "Ireland",
  "Japan",
  "France",
  "Finland",
  "Austria",
  "Canada",
  "India",
  "Brazil"
];
