
import { Week, Assignment, DemocracyDimension, Flashcard, QuizLevel } from './types';

export const INSTRUCTOR = "Ahmet Ergurum";
export const SEMESTER = "Spring 2026";

export const SCHEDULE: Week[] = [
  { id: 1, dates: "Jan 20-24", title: "Introduction", topics: ["Comparative Method", "Course Overview"], readings: ["Lijphart Ch 1"] },
  { id: 2, dates: "Jan 27-31", title: "Models of Democracy I", topics: ["Westminster Model", "Majoritarian Democracy"], readings: ["Lijphart Ch 2"] },
  { id: 3, dates: "Feb 3-7", title: "Models of Democracy II", topics: ["Consensus Model", "Comparing Models"], readings: ["Lijphart Ch 3"], due: ["Quiz 1"] },
  { id: 4, dates: "Feb 10-14", title: "Party Systems", topics: ["Two-party vs Multiparty", "Effective # of parties"], readings: ["Lijphart Ch 4-5"], due: ["Project Part 1: Proposal"] },
  { id: 5, dates: "Feb 17-21", title: "Electoral Systems I", topics: ["Majoritarian vs PR", "Electoral Formulas"], readings: ["Lijphart Ch 8"] },
  { id: 6, dates: "Feb 24-28", title: "Electoral Systems II", topics: ["Disproportionality", "Thresholds"], readings: ["Lijphart Ch 9 (Electoral Systems cont.)"], due: ["Quiz 2"] },
  { id: 7, dates: "Mar 3-7", title: "Exec-Leg Relations I", topics: ["Presidential vs Parliamentary"], readings: ["Lijphart Ch 6-7"], due: ["Essay 1"] },
  { id: 8, dates: "Mar 10-14", title: "Exec-Leg Relations II", topics: ["Cabinet Formation", "Executive Dominance"], readings: ["Lijphart Ch 6-7"], due: ["MIDTERM EXAM"] },
  { id: 9, dates: "Mar 17-21", title: "SPRING BREAK", topics: ["No Class"], readings: [] },
  { id: 10, dates: "Mar 24-28", title: "Legislative Institutions", topics: ["Bicameralism", "Interest Groups"], readings: ["Lijphart Ch 10-11"], due: ["Project Part 2: Bibliography"] },
  { id: 11, dates: "Mar 31-Apr 4", title: "Constitutions & Courts", topics: ["Judicial Review", "Rigidity"], readings: ["Lijphart Ch 12"], due: ["Quiz 3"] },
  { id: 12, dates: "Apr 7-11", title: "Federalism", topics: ["Unitary vs Federal", "Decentralization"], readings: ["Lijphart Ch 13 (Federalism)"] },
  { id: 13, dates: "Apr 14-18", title: "Central Banks", topics: ["Independence", "Economic Governance"], readings: ["Lijphart Ch 13 (Central Banks)"], due: ["Essay 2", "Quiz 4"] },
  { id: 14, dates: "Apr 21-25", title: "Democratic Performance", topics: ["Measuring Quality", "Policy Outcomes"], readings: ["Lijphart Ch 14-16"], due: ["Project Presentations Begin"] },
  { id: 15, dates: "Apr 28-May 2", title: "Challenges to Democracy", topics: ["Backsliding", "Populism"], readings: ["Lijphart Ch 17"], due: ["Presentations Conclude", "Quiz 5"] },
  { id: 16, dates: "May 5-9", title: "Finals Week", topics: ["No Final Exam"], readings: [], due: ["Project Part 4: Final Paper"] }
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 'att', name: 'Attendance', weight: 10, category: 'Participation' },
  { id: 'part', name: 'Participation', weight: 10, category: 'Participation' },
  { id: 'quiz', name: '5 Quizzes', weight: 25, category: 'Quiz' },
  { id: 'essay', name: '2 Essays', weight: 30, category: 'Essay' },
  { id: 'mid', name: 'Midterm', weight: 10, category: 'Exam' },
  { id: 'proj', name: 'Country Project', weight: 15, category: 'Project' },
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

export const APPROVED_COUNTRIES = [
  "Germany",
  "France",
  "Japan",
  "India",
  "Brazil",
  "South Africa",
  "Switzerland",
  "Belgium",
  "Netherlands",
  "Italy",
  "Spain",
  "Canada",
  "Australia",
  "New Zealand",
  "Israel"
];
