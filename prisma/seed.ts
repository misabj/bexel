import { PrismaClient } from "@prisma/client";
import { calculateRoi } from "@/lib/calculations";
import { scoreLead } from "@/lib/lead-scoring";
import { DEFAULT_ROI_SETTINGS } from "@/config/assumptions";
import type {
  BimMaturity,
  Challenge,
  CompanySize,
  Currency,
  LeadStatus,
  ProjectType,
} from "@/types";

const prisma = new PrismaClient();

interface SeedLead {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone?: string;
  country: string;
  companySize: CompanySize;
  status: LeadStatus;
  monthsAgo: number;
  projectName: string;
  projectType: ProjectType;
  projectValue: number;
  currency: Currency;
  durationMonths: number;
  teamSize: number;
  activeProjects: number;
  bimMaturity: BimMaturity;
  reportingHours: number;
  informationSearchHours: number;
  weeklyDelayCost: number;
  expectedDelayWeeks: number;
  annualChangeRequests: number;
  averageChangeRequestCost: number;
  duplicatedWorkPercentage: number;
  selectedChallenges: Challenge[];
}

const LEADS: SeedLead[] = [
  {
    firstName: "Amela", lastName: "Kovač", email: "amela.kovac@skylinebuild.com", company: "Skyline Build Group",
    jobTitle: "BIM Manager", phone: "+387 33 555 120", country: "Bosnia and Herzegovina", companySize: "SIZE_201_500",
    status: "QUALIFIED", monthsAgo: 0, projectName: "Sarajevo Tower Complex", projectType: "COMMERCIAL",
    projectValue: 78_000_000, currency: "EUR", durationMonths: 30, teamSize: 60, activeProjects: 8, bimMaturity: "PLANNING_4D",
    reportingHours: 90, informationSearchHours: 70, weeklyDelayCost: 45_000, expectedDelayWeeks: 8, annualChangeRequests: 140,
    averageChangeRequestCost: 5200, duplicatedWorkPercentage: 18,
    selectedChallenges: ["DISCONNECTED_DATA", "MANUAL_REPORTING", "SCHEDULE_DELAYS", "LATE_RISK_DETECTION", "TOO_MANY_EXCEL"],
  },
  {
    firstName: "James", lastName: "Whitfield", email: "j.whitfield@meridiancontractors.co.uk", company: "Meridian Contractors",
    jobTitle: "Project Director", phone: "+44 20 7946 0102", country: "United Kingdom", companySize: "SIZE_500_PLUS",
    status: "DEMO_SCHEDULED", monthsAgo: 1, projectName: "Thames Riverside Development", projectType: "INFRASTRUCTURE",
    projectValue: 240_000_000, currency: "GBP", durationMonths: 42, teamSize: 120, activeProjects: 12, bimMaturity: "COST_5D",
    reportingHours: 160, informationSearchHours: 110, weeklyDelayCost: 90_000, expectedDelayWeeks: 10, annualChangeRequests: 220,
    averageChangeRequestCost: 7800, duplicatedWorkPercentage: 22,
    selectedChallenges: ["POOR_COST_VISIBILITY", "SCHEDULE_DELAYS", "DIFFICULT_COLLABORATION", "LATE_RISK_DETECTION"],
  },
  {
    firstName: "Fatima", lastName: "Al-Rashid", email: "f.alrashid@gulfmega.ae", company: "Gulf Mega Projects",
    jobTitle: "Cost Manager", phone: "+971 4 555 8890", country: "United Arab Emirates", companySize: "SIZE_500_PLUS",
    status: "WON", monthsAgo: 2, projectName: "Dubai Marina Residences", projectType: "RESIDENTIAL",
    projectValue: 310_000_000, currency: "AED", durationMonths: 36, teamSize: 95, activeProjects: 10, bimMaturity: "INTEGRATED",
    reportingHours: 140, informationSearchHours: 95, weeklyDelayCost: 120_000, expectedDelayWeeks: 6, annualChangeRequests: 180,
    averageChangeRequestCost: 9000, duplicatedWorkPercentage: 15,
    selectedChallenges: ["POOR_COST_VISIBILITY", "MANUAL_REPORTING", "LATE_RISK_DETECTION", "LIMITED_FIELD_COMMS"],
  },
  {
    firstName: "Lukas", lastName: "Meyer", email: "lukas.meyer@bauwerk-gmbh.de", company: "Bauwerk GmbH",
    jobTitle: "Head of VDC", phone: "+49 30 123456", country: "Germany", companySize: "SIZE_201_500",
    status: "CONTACTED", monthsAgo: 3, projectName: "Munich Logistics Hub", projectType: "INDUSTRIAL",
    projectValue: 64_000_000, currency: "EUR", durationMonths: 24, teamSize: 45, activeProjects: 6, bimMaturity: "COORDINATED",
    reportingHours: 80, informationSearchHours: 60, weeklyDelayCost: 38_000, expectedDelayWeeks: 5, annualChangeRequests: 110,
    averageChangeRequestCost: 4800, duplicatedWorkPercentage: 16,
    selectedChallenges: ["DISCONNECTED_DATA", "MANUAL_REPORTING", "TOO_MANY_EXCEL"],
  },
  {
    firstName: "Sophie", lastName: "Laurent", email: "sophie.laurent@constructis.fr", company: "Constructis",
    jobTitle: "Project Manager", phone: "+33 1 40 20 30", country: "France", companySize: "SIZE_51_200",
    status: "NEW", monthsAgo: 0, projectName: "Lyon Hospital Wing", projectType: "HEALTHCARE",
    projectValue: 52_000_000, currency: "EUR", durationMonths: 28, teamSize: 38, activeProjects: 4, bimMaturity: "PLANNING_4D",
    reportingHours: 70, informationSearchHours: 55, weeklyDelayCost: 30_000, expectedDelayWeeks: 6, annualChangeRequests: 95,
    averageChangeRequestCost: 4200, duplicatedWorkPercentage: 14,
    selectedChallenges: ["SCHEDULE_DELAYS", "POOR_COST_VISIBILITY", "LATE_RISK_DETECTION", "DIFFICULT_COLLABORATION"],
  },
  {
    firstName: "Marco", lastName: "Rossi", email: "marco.rossi@edilprogetti.it", company: "EdilProgetti",
    jobTitle: "BIM Coordinator", country: "Italy", companySize: "SIZE_51_200",
    status: "NEW", monthsAgo: 1, projectName: "Milan Office Refurbishment", projectType: "COMMERCIAL",
    projectValue: 18_000_000, currency: "EUR", durationMonths: 14, teamSize: 20, activeProjects: 3, bimMaturity: "BASIC_3D",
    reportingHours: 45, informationSearchHours: 40, weeklyDelayCost: 15_000, expectedDelayWeeks: 3, annualChangeRequests: 50,
    averageChangeRequestCost: 2600, duplicatedWorkPercentage: 12,
    selectedChallenges: ["MANUAL_REPORTING", "TOO_MANY_EXCEL"],
  },
  {
    firstName: "Nadia", lastName: "Hassan", email: "nadia.hassan@riyadhdev.sa", company: "Riyadh Development Co.",
    jobTitle: "Investor Relations", phone: "+966 11 555 220", country: "Saudi Arabia", companySize: "SIZE_500_PLUS",
    status: "DEMO_SCHEDULED", monthsAgo: 2, projectName: "NEOM Support Facilities", projectType: "INFRASTRUCTURE",
    projectValue: 520_000_000, currency: "SAR", durationMonths: 48, teamSize: 150, activeProjects: 15, bimMaturity: "COST_5D",
    reportingHours: 190, informationSearchHours: 130, weeklyDelayCost: 150_000, expectedDelayWeeks: 12, annualChangeRequests: 260,
    averageChangeRequestCost: 11000, duplicatedWorkPercentage: 20,
    selectedChallenges: ["DISCONNECTED_DATA", "POOR_COST_VISIBILITY", "SCHEDULE_DELAYS", "LATE_RISK_DETECTION", "LIMITED_FIELD_COMMS", "MANUAL_REPORTING"],
  },
  {
    firstName: "Erik", lastName: "Johansson", email: "erik.johansson@nordbygg.se", company: "Nordbygg AB",
    jobTitle: "Planner", phone: "+46 8 555 010", country: "Sweden", companySize: "SIZE_51_200",
    status: "QUALIFIED", monthsAgo: 4, projectName: "Stockholm Transit Station", projectType: "INFRASTRUCTURE",
    projectValue: 88_000_000, currency: "EUR", durationMonths: 34, teamSize: 42, activeProjects: 5, bimMaturity: "PLANNING_4D",
    reportingHours: 85, informationSearchHours: 65, weeklyDelayCost: 40_000, expectedDelayWeeks: 7, annualChangeRequests: 120,
    averageChangeRequestCost: 5000, duplicatedWorkPercentage: 17,
    selectedChallenges: ["SCHEDULE_DELAYS", "LATE_RISK_DETECTION", "DISCONNECTED_DATA", "DIFFICULT_COLLABORATION"],
  },
  {
    firstName: "Petra", lastName: "Novak", email: "petra.novak@gradnjaplus.hr", company: "Gradnja Plus",
    jobTitle: "Field Engineer", country: "Croatia", companySize: "SIZE_11_50",
    status: "LOST", monthsAgo: 5, projectName: "Zagreb Retail Park", projectType: "COMMERCIAL",
    projectValue: 12_000_000, currency: "EUR", durationMonths: 12, teamSize: 12, activeProjects: 2, bimMaturity: "NONE",
    reportingHours: 30, informationSearchHours: 28, weeklyDelayCost: 9_000, expectedDelayWeeks: 2, annualChangeRequests: 30,
    averageChangeRequestCost: 1800, duplicatedWorkPercentage: 10,
    selectedChallenges: ["TOO_MANY_EXCEL"],
  },
  {
    firstName: "David", lastName: "Chen", email: "david.chen@pacificstructures.com", company: "Pacific Structures",
    jobTitle: "VDC Director", phone: "+1 415 555 0175", country: "United States", companySize: "SIZE_500_PLUS",
    status: "WON", monthsAgo: 6, projectName: "San Diego Biotech Campus", projectType: "HEALTHCARE",
    projectValue: 195_000_000, currency: "USD", durationMonths: 40, teamSize: 110, activeProjects: 11, bimMaturity: "INTEGRATED",
    reportingHours: 150, informationSearchHours: 100, weeklyDelayCost: 85_000, expectedDelayWeeks: 9, annualChangeRequests: 200,
    averageChangeRequestCost: 8500, duplicatedWorkPercentage: 19,
    selectedChallenges: ["POOR_COST_VISIBILITY", "SCHEDULE_DELAYS", "MANUAL_REPORTING", "LATE_RISK_DETECTION"],
  },
  {
    firstName: "Ana", lastName: "Ilić", email: "ana.ilic@beogradgradnja.rs", company: "Beograd Gradnja",
    jobTitle: "Project Manager", phone: "+381 11 555 300", country: "Serbia", companySize: "SIZE_51_200",
    status: "CONTACTED", monthsAgo: 1, projectName: "Belgrade Waterfront Block", projectType: "RESIDENTIAL",
    projectValue: 46_000_000, currency: "EUR", durationMonths: 26, teamSize: 34, activeProjects: 4, bimMaturity: "COORDINATED",
    reportingHours: 65, informationSearchHours: 52, weeklyDelayCost: 26_000, expectedDelayWeeks: 5, annualChangeRequests: 88,
    averageChangeRequestCost: 3900, duplicatedWorkPercentage: 15,
    selectedChallenges: ["MANUAL_REPORTING", "DISCONNECTED_DATA", "SCHEDULE_DELAYS", "TOO_MANY_EXCEL"],
  },
  {
    firstName: "Thomas", lastName: "Berg", email: "thomas.berg@fjordbygg.no", company: "Fjord Bygg",
    jobTitle: "Cost Estimator", country: "Norway", companySize: "SIZE_201_500",
    status: "NEW", monthsAgo: 0, projectName: "Bergen Tunnel Extension", projectType: "INFRASTRUCTURE",
    projectValue: 130_000_000, currency: "EUR", durationMonths: 38, teamSize: 55, activeProjects: 7, bimMaturity: "COST_5D",
    reportingHours: 100, informationSearchHours: 75, weeklyDelayCost: 55_000, expectedDelayWeeks: 8, annualChangeRequests: 150,
    averageChangeRequestCost: 6200, duplicatedWorkPercentage: 18,
    selectedChallenges: ["POOR_COST_VISIBILITY", "LATE_RISK_DETECTION", "SCHEDULE_DELAYS"],
  },
  {
    firstName: "Isabella", lastName: "Santos", email: "isabella.santos@construtoraforte.com.br", company: "Construtora Forte",
    jobTitle: "BIM Manager", phone: "+55 11 5555 4040", country: "Brazil", companySize: "SIZE_201_500",
    status: "TRIAL_STARTED", monthsAgo: 3, projectName: "São Paulo Mixed-Use Tower", projectType: "COMMERCIAL",
    projectValue: 72_000_000, currency: "USD", durationMonths: 32, teamSize: 48, activeProjects: 6, bimMaturity: "PLANNING_4D",
    reportingHours: 95, informationSearchHours: 70, weeklyDelayCost: 42_000, expectedDelayWeeks: 7, annualChangeRequests: 130,
    averageChangeRequestCost: 5400, duplicatedWorkPercentage: 17,
    selectedChallenges: ["DISCONNECTED_DATA", "MANUAL_REPORTING", "DIFFICULT_COLLABORATION", "LATE_RISK_DETECTION"],
  },
  {
    firstName: "Omar", lastName: "Farouk", email: "omar.farouk@cairobuilders.eg", company: "Cairo Builders",
    jobTitle: "Site Director", country: "Egypt", companySize: "SIZE_51_200",
    status: "NEW", monthsAgo: 2, projectName: "New Cairo University Block", projectType: "EDUCATION",
    projectValue: 34_000_000, currency: "USD", durationMonths: 22, teamSize: 28, activeProjects: 3, bimMaturity: "BASIC_3D",
    reportingHours: 55, informationSearchHours: 48, weeklyDelayCost: 20_000, expectedDelayWeeks: 4, annualChangeRequests: 70,
    averageChangeRequestCost: 3100, duplicatedWorkPercentage: 13,
    selectedChallenges: ["MANUAL_REPORTING", "SCHEDULE_DELAYS"],
  },
  {
    firstName: "Katarina", lastName: "Horvat", email: "katarina.horvat@alpineinfra.at", company: "Alpine Infra",
    jobTitle: "Design Manager", phone: "+43 1 555 700", country: "Austria", companySize: "SIZE_201_500",
    status: "QUALIFIED", monthsAgo: 4, projectName: "Innsbruck Cable Infrastructure", projectType: "INFRASTRUCTURE",
    projectValue: 96_000_000, currency: "EUR", durationMonths: 30, teamSize: 50, activeProjects: 6, bimMaturity: "COORDINATED",
    reportingHours: 88, informationSearchHours: 66, weeklyDelayCost: 44_000, expectedDelayWeeks: 6, annualChangeRequests: 115,
    averageChangeRequestCost: 4900, duplicatedWorkPercentage: 16,
    selectedChallenges: ["DISCONNECTED_DATA", "POOR_COST_VISIBILITY", "SCHEDULE_DELAYS", "LATE_RISK_DETECTION"],
  },
  {
    firstName: "Robert", lastName: "Kowalski", email: "robert.kowalski@polbud.pl", company: "PolBud",
    jobTitle: "Quantity Surveyor", country: "Poland", companySize: "SIZE_11_50",
    status: "NEW", monthsAgo: 7, projectName: "Warsaw Warehouse Complex", projectType: "INDUSTRIAL",
    projectValue: 21_000_000, currency: "EUR", durationMonths: 16, teamSize: 15, activeProjects: 2, bimMaturity: "BASIC_3D",
    reportingHours: 35, informationSearchHours: 32, weeklyDelayCost: 12_000, expectedDelayWeeks: 3, annualChangeRequests: 40,
    averageChangeRequestCost: 2200, duplicatedWorkPercentage: 11,
    selectedChallenges: ["TOO_MANY_EXCEL", "MANUAL_REPORTING"],
  },
];

async function main() {
  console.info("Seeding BEXEL Growth Platform…");

  // Reset (respecting FK order via cascade on Lead delete).
  await prisma.leadActivity.deleteMany();
  await prisma.roiResult.deleteMany();
  await prisma.projectAssessment.deleteMany();
  await prisma.lead.deleteMany();

  await prisma.calculatorSettings.upsert({
    where: { id: "default" },
    update: DEFAULT_ROI_SETTINGS,
    create: { id: "default", ...DEFAULT_ROI_SETTINGS },
  });

  for (const seed of LEADS) {
    const result = calculateRoi(seed, DEFAULT_ROI_SETTINGS);
    const score = scoreLead({
      email: seed.email,
      phone: seed.phone,
      companySize: seed.companySize,
      currency: seed.currency,
      projectValue: seed.projectValue,
      durationMonths: seed.durationMonths,
      activeProjects: seed.activeProjects,
      bimMaturity: seed.bimMaturity,
      selectedChallenges: seed.selectedChallenges,
    });

    const createdAt = new Date();
    createdAt.setMonth(createdAt.getMonth() - seed.monthsAgo);
    createdAt.setDate(Math.min(createdAt.getDate(), 27));

    await prisma.lead.create({
      data: {
        firstName: seed.firstName,
        lastName: seed.lastName,
        email: seed.email,
        company: seed.company,
        jobTitle: seed.jobTitle,
        phone: seed.phone ?? null,
        country: seed.country,
        companySize: seed.companySize,
        leadScore: score.score,
        leadTemperature: score.temperature,
        status: seed.status,
        source: "roi_calculator",
        createdAt,
        assessment: {
          create: {
            projectName: seed.projectName,
            projectType: seed.projectType,
            projectValue: seed.projectValue,
            currency: seed.currency,
            durationMonths: seed.durationMonths,
            teamSize: seed.teamSize,
            activeProjects: seed.activeProjects,
            bimMaturity: seed.bimMaturity,
            reportingHours: seed.reportingHours,
            informationSearchHours: seed.informationSearchHours,
            weeklyDelayCost: seed.weeklyDelayCost,
            expectedDelayWeeks: seed.expectedDelayWeeks,
            annualChangeRequests: seed.annualChangeRequests,
            averageChangeRequestCost: seed.averageChangeRequestCost,
            duplicatedWorkPercentage: seed.duplicatedWorkPercentage,
            selectedChallenges: seed.selectedChallenges,
          },
        },
        roiResult: {
          create: {
            timeSavings: result.timeSavings,
            reportingSavings: result.reportingSavings,
            delaySavings: result.delaySavings,
            reworkSavings: result.reworkSavings,
            totalSavings: result.totalSavings,
            estimatedInvestment: result.estimatedInvestment,
            netBenefit: result.netBenefit,
            roiPercentage: result.roiPercentage,
            paybackMonths: result.paybackMonths,
            calculationVersion: result.calculationVersion,
          },
        },
        activities: {
          create: {
            type: "LEAD_CREATED",
            title: "Lead created from ROI calculator",
            description: `Score ${score.score} (${score.temperature}).`,
            createdAt,
          },
        },
      },
    });
  }

  const count = await prisma.lead.count();
  console.info(`Seed complete — ${count} leads created.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
