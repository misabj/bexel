import type { Locale } from "./config";

/**
 * Central translation catalog. `en` is the source of truth; every other
 * locale mirrors its shape (enforced by the `Dictionary` type below).
 */
const en = {
  nav: {
    benefits: "Benefits",
    how: "How it works",
    audience: "Who it's for",
    demo: "Request a Demo",
    calculate: "Calculate Your ROI",
  },
  theme: { light: "Light", dark: "Dark", toggle: "Toggle theme" },
  language: "Language",
  hero: {
    badge: "BIM ROI Calculator",
    titleA: "Calculate the ROI of",
    titleB: "better BIM project control",
    subtitle:
      "Estimate how much time, money and project risk your organization could reduce through integrated BIM planning, cost control and collaboration.",
    ctaPrimary: "Calculate Your ROI",
    ctaSecondary: "Request a Demo",
    stats: {
      time: "Time",
      timeV: "Less manual reporting",
      cost: "Cost",
      costV: "Better budget control",
      risk: "Risk",
      riskV: "Earlier detection",
    },
    trusted: "Trusted approach used across commercial, infrastructure & industrial projects",
  },
  intro: {
    title: "Understand your numbers, in plain language",
    subtitle:
      "A short guide to what this tool measures and how to read your results — no BIM jargon required.",
    roi: {
      title: "What does ROI mean?",
      term: "ROI = Return on Investment",
      text:
        "ROI shows how much value you get back for every euro you invest. A 200% ROI means that for each €1 you spend you gain €2 in return — the higher the number, the faster the investment pays for itself.",
    },
    app: {
      title: "What does this app do?",
      text:
        "The BEXEL ROI Calculator estimates how much time, money and project risk your organization could save by working with connected BIM instead of scattered spreadsheets and disconnected tools.",
    },
    usage: {
      title: "How to use it",
      text:
        "Answer a few short questions about your company, a typical project and your current challenges. In under two minutes you get a clear, personalized estimate of your potential savings, payback period and return on investment.",
    },
  },
  benefits: {
    title: "Turn connected BIM into measurable outcomes",
    subtitle:
      "Four areas where integrated BIM planning, cost control and collaboration create tangible value on every project.",
    items: {
      delays: {
        title: "Reduce project delays",
        description:
          "Simulate schedules with 4D planning and catch bottlenecks before they hit the critical path.",
      },
      cost: {
        title: "Improve cost visibility",
        description:
          "Connect 5D cost data to the model so every change is priced the moment it happens.",
      },
      reporting: {
        title: "Automate project reporting",
        description:
          "Replace manual spreadsheets with live, model-derived KPIs and one-click reports.",
      },
      risk: {
        title: "Detect risks earlier",
        description:
          "Surface clashes, data gaps and schedule risk automatically, long before they escalate.",
      },
    },
  },
  how: {
    title: "From questions to a clear ROI in minutes",
    subtitle: "Three simple steps to a transparent, personalized estimate.",
    steps: {
      s1: {
        title: "Enter project information",
        description:
          "Tell us about your organization, a representative project and your current challenges.",
      },
      s2: {
        title: "Receive a personalized ROI estimate",
        description:
          "Get an instant, transparent breakdown of potential savings, net benefit and payback period.",
      },
      s3: {
        title: "Discuss the results with a BIM specialist",
        description:
          "Book a demo to validate the numbers against your real processes and project portfolio.",
      },
    },
  },
  audience: {
    title: "Built for every project role",
    subtitle:
      "Select your role to see how the ROI calculator speaks to your priorities.",
    startAs: "Start the calculator as",
    roles: {
      INVESTORS: "Investors",
      CONTRACTORS: "Contractors",
      BIM_MANAGERS: "BIM Managers",
      PROJECT_MANAGERS: "Project Managers",
      COST_MANAGERS: "Cost Managers",
    },
    helpers: {
      INVESTORS:
        "Quantify how tighter cost control and fewer delays protect your return on capital.",
      CONTRACTORS:
        "See how connected 4D/5D planning reduces rework and keeps sites on schedule.",
      BIM_MANAGERS:
        "Estimate the productivity gained from a single, coordinated BIM environment.",
      PROJECT_MANAGERS:
        "Understand the time reclaimed from manual reporting and information hunting.",
      COST_MANAGERS:
        "Model the impact of early risk detection and change-request reduction on the budget.",
    },
  },
  demo: {
    title: "See your numbers, then see the platform",
    subtitle:
      "Run the ROI calculator to get a personalized estimate, then book a demo with a BIM specialist to validate it against your real projects.",
    ctaPrimary: "Calculate Your ROI",
    ctaSecondary: "Request a Demo",
  },
  footer: {
    tagline:
      "BIM ROI Calculator & Lead Automation. Estimate the value of integrated BIM planning, cost control and collaboration for your organization.",
    product: "Product",
    company: "Company",
    roiCalculator: "ROI Calculator",
    benefits: "Benefits",
    how: "How it works",
    requestDemo: "Request a Demo",
    salesAdmin: "Sales Admin",
    rights: "© 2026 BEXEL Growth Platform — MVP concept.",
    note: "An independent lead-automation concept for a BIM software company.",
  },
  calc: {
    title: "BIM ROI Calculator",
    subtitle:
      "Answer a few questions about your organization and a representative project to receive an instant, personalized ROI estimate.",
    steps: {
      contact: "Contact",
      project: "Project",
      challenges: "Challenges",
      results: "Results",
    },
    optional: "Optional",
    contact: {
      title: "Contact information",
      subtitle: "Tell us who you are so we can share your personalized results.",
      firstName: "First name",
      lastName: "Last name",
      email: "Work email",
      company: "Company",
      jobTitle: "Job title",
      phone: "Phone",
      country: "Country",
      companySize: "Company size",
      employees: "employees",
    },
    project: {
      title: "Project information",
      subtitle: "Describe a representative project. This drives the ROI estimate.",
      projectName: "Project name",
      projectType: "Project type",
      projectValue: "Estimated project value",
      currency: "Currency",
      duration: "Expected duration (months)",
      teamSize: "Project team members",
      activeProjects: "Number of active projects",
      bimMaturity: "Current BIM maturity",
      fxNote: "Exchange rates are static demonstration values and are not live market rates.",
    },
    challenges: {
      title: "Current challenges",
      subtitle: "Quantify today's pain so we can estimate the improvement.",
      reportingHours: "Monthly hours on manual reporting",
      searchHours: "Monthly hours searching for information",
      weeklyDelay: "Cost of one week of delay",
      delayWeeks: "Expected number of delay weeks",
      changeReqs: "Annual number of change requests",
      changeCost: "Average cost per change request",
      duplicated: "Duplicated / unnecessary work",
      problems: "Which problems do you experience today?",
    },
    buttons: {
      back: "Back",
      continue: "Continue",
      calculate: "Calculate my ROI",
      calculating: "Calculating…",
    },
    toast: {
      fix: "Please complete the highlighted fields.",
      ready: "Your ROI estimate is ready.",
      network: "Network error. Please try again.",
      error: "Something went wrong. Please try again.",
    },
    results: {
      badge: "Assessment complete",
      title: "Your estimated BIM ROI",
      forCompany: "Indicative results for",
      totalSavings: "Total potential savings",
      perYear: "Per year",
      roi: "ROI",
      roiSub: "Return on investment",
      payback: "Payback period",
      paybackSub: "Time to break even",
      netBenefit: "Net benefit",
      netSub: "After software investment",
      timeSavings: "Time savings",
      hoursYear: "h / year",
      months: "months",
      leadScore: "Lead qualification score",
      summary:
        "Based on the information provided, your organization could save the amounts below by reducing manual reporting, project delays and rework.",
      reporting: "Reporting savings",
      delay: "Avoided delay costs",
      rework: "Rework reduction",
      byCategory: "Savings by category",
      distribution: "Distribution of savings",
      howCalculated: "How the numbers are calculated",
      saving: "Saving",
      basis: "Basis",
      amountYear: "Amount / year",
      investment: "Estimated annual software investment",
      requestDemo: "Request a Personalized Demo",
      viewReport: "View printable report",
      disclaimer:
        "This calculator provides an indicative estimate only. Actual results depend on project scope, implementation quality, user adoption and existing processes. Exchange rates used are static demonstration values.",
    },
  },
  enums: {
    companySize: {
      SIZE_1_10: "1–10",
      SIZE_11_50: "11–50",
      SIZE_51_200: "51–200",
      SIZE_201_500: "201–500",
      SIZE_500_PLUS: "500+",
    } as Record<string, string>,
    projectType: {
      RESIDENTIAL: "Residential",
      COMMERCIAL: "Commercial",
      INFRASTRUCTURE: "Infrastructure",
      INDUSTRIAL: "Industrial",
      HEALTHCARE: "Healthcare",
      EDUCATION: "Education",
      OTHER: "Other",
    } as Record<string, string>,
    bimMaturity: {
      NONE: "No formal BIM process",
      BASIC_3D: "Basic 3D BIM",
      COORDINATED: "Coordinated BIM",
      PLANNING_4D: "4D planning",
      COST_5D: "5D cost management",
      INTEGRATED: "Integrated BIM environment",
    } as Record<string, string>,
    challenge: {
      DISCONNECTED_DATA: "Disconnected project data",
      MANUAL_REPORTING: "Manual reporting",
      POOR_COST_VISIBILITY: "Poor cost visibility",
      SCHEDULE_DELAYS: "Schedule delays",
      DIFFICULT_COLLABORATION: "Difficult stakeholder collaboration",
      LATE_RISK_DETECTION: "Late risk detection",
      TOO_MANY_EXCEL: "Too many Excel files",
      LIMITED_FIELD_COMMS: "Limited field-to-office communication",
    } as Record<string, string>,
  },
};

export type Dictionary = typeof en;

const sr: Dictionary = {
  nav: {
    benefits: "Prednosti",
    how: "Kako funkcioniše",
    audience: "Za koga je",
    demo: "Zatraži demo",
    calculate: "Izračunaj ROI",
  },
  theme: { light: "Svetla", dark: "Tamna", toggle: "Promeni temu" },
  language: "Jezik",
  hero: {
    badge: "BIM ROI Kalkulator",
    titleA: "Izračunaj ROI",
    titleB: "bolje kontrole BIM projekata",
    subtitle:
      "Proceni koliko vremena, novca i projektnog rizika tvoja organizacija može da smanji kroz integrisano BIM planiranje, kontrolu troškova i saradnju.",
    ctaPrimary: "Izračunaj ROI",
    ctaSecondary: "Zatraži demo",
    stats: {
      time: "Vreme",
      timeV: "Manje ručnog izveštavanja",
      cost: "Troškovi",
      costV: "Bolja kontrola budžeta",
      risk: "Rizik",
      riskV: "Ranije otkrivanje",
    },
    trusted: "Pouzdan pristup primenjen na komercijalnim, infrastrukturnim i industrijskim projektima",
  },
  intro: {
    title: "Razumi svoje brojke, jednostavnim jezikom",
    subtitle:
      "Kratak vodič kroz to šta ovaj alat meri i kako da pročitaš svoje rezultate — bez BIM žargona.",
    roi: {
      title: "Šta znači ROI?",
      term: "ROI = povraćaj investicije",
      text:
        "ROI pokazuje koliko vrednosti dobiješ za svaki uloženi evro. ROI od 200% znači da za svaki uloženi 1€ dobijaš 2€ nazad — što je broj veći, investicija se brže isplati.",
    },
    app: {
      title: "Šta radi ova aplikacija?",
      text:
        "BEXEL ROI Kalkulator procenjuje koliko vremena, novca i projektnog rizika tvoja organizacija može da uštedi radeći sa povezanim BIM-om umesto sa razbacanim tabelama i nepovezanim alatima.",
    },
    usage: {
      title: "Kako se koristi",
      text:
        "Odgovori na par kratkih pitanja o svojoj kompaniji, tipičnom projektu i trenutnim izazovima. Za manje od dva minuta dobijaš jasnu, personalizovanu procenu mogućih ušteda, perioda povraćaja i povraćaja investicije.",
    },
  },
  benefits: {
    title: "Pretvori povezan BIM u merljive rezultate",
    subtitle:
      "Četiri oblasti u kojima integrisano BIM planiranje, kontrola troškova i saradnja stvaraju opipljivu vrednost na svakom projektu.",
    items: {
      delays: {
        title: "Smanji kašnjenja projekta",
        description:
          "Simuliraj rasporede uz 4D planiranje i uhvati uska grla pre nego što ugroze kritičnu putanju.",
      },
      cost: {
        title: "Poboljšaj vidljivost troškova",
        description:
          "Poveži 5D troškovne podatke sa modelom tako da se svaka izmena obračuna čim se dogodi.",
      },
      reporting: {
        title: "Automatizuj izveštavanje",
        description:
          "Zameni ručne tabele živim KPI-jevima iz modela i izveštajima na jedan klik.",
      },
      risk: {
        title: "Otkrij rizike ranije",
        description:
          "Automatski otkrij kolizije, praznine u podacima i rizik od kašnjenja, mnogo pre nego što eskaliraju.",
      },
    },
  },
  how: {
    title: "Od pitanja do jasnog ROI-a za par minuta",
    subtitle: "Tri jednostavna koraka do transparentne, personalizovane procene.",
    steps: {
      s1: {
        title: "Unesi podatke o projektu",
        description:
          "Reci nam o svojoj organizaciji, reprezentativnom projektu i trenutnim izazovima.",
      },
      s2: {
        title: "Dobij personalizovanu ROI procenu",
        description:
          "Trenutni, transparentan pregled potencijalnih ušteda, neto koristi i perioda povraćaja.",
      },
      s3: {
        title: "Razgovaraj o rezultatima sa BIM stručnjakom",
        description:
          "Zakaži demo da potvrdiš brojke u odnosu na svoje realne procese i portfolio projekata.",
      },
    },
  },
  audience: {
    title: "Napravljeno za svaku ulogu na projektu",
    subtitle:
      "Izaberi svoju ulogu da vidiš kako ROI kalkulator odgovara tvojim prioritetima.",
    startAs: "Pokreni kalkulator kao",
    roles: {
      INVESTORS: "Investitori",
      CONTRACTORS: "Izvođači",
      BIM_MANAGERS: "BIM menadžeri",
      PROJECT_MANAGERS: "Projektni menadžeri",
      COST_MANAGERS: "Menadžeri troškova",
    },
    helpers: {
      INVESTORS:
        "Kvantifikuj kako čvršća kontrola troškova i manje kašnjenja štite tvoj povraćaj kapitala.",
      CONTRACTORS:
        "Vidi kako povezano 4D/5D planiranje smanjuje doradu i drži gradilišta u roku.",
      BIM_MANAGERS:
        "Proceni produktivnost dobijenu iz jedinstvenog, koordinisanog BIM okruženja.",
      PROJECT_MANAGERS:
        "Razumi koliko se vremena povrati od ručnog izveštavanja i traženja informacija.",
      COST_MANAGERS:
        "Modeluj uticaj ranog otkrivanja rizika i smanjenja izmena na budžet.",
    },
  },
  demo: {
    title: "Vidi svoje brojke, pa vidi platformu",
    subtitle:
      "Pokreni ROI kalkulator za personalizovanu procenu, pa zakaži demo sa BIM stručnjakom da je potvrdiš na svojim realnim projektima.",
    ctaPrimary: "Izračunaj ROI",
    ctaSecondary: "Zatraži demo",
  },
  footer: {
    tagline:
      "BIM ROI Kalkulator i automatizacija leadova. Proceni vrednost integrisanog BIM planiranja, kontrole troškova i saradnje za tvoju organizaciju.",
    product: "Proizvod",
    company: "Kompanija",
    roiCalculator: "ROI Kalkulator",
    benefits: "Prednosti",
    how: "Kako funkcioniše",
    requestDemo: "Zatraži demo",
    salesAdmin: "Admin prodaje",
    rights: "© 2026 BEXEL Growth Platform — MVP koncept.",
    note: "Nezavisan koncept automatizacije leadova za BIM softversku kompaniju.",
  },
  calc: {
    title: "BIM ROI Kalkulator",
    subtitle:
      "Odgovori na par pitanja o svojoj organizaciji i reprezentativnom projektu da dobiješ trenutnu, personalizovanu ROI procenu.",
    steps: {
      contact: "Kontakt",
      project: "Projekat",
      challenges: "Izazovi",
      results: "Rezultati",
    },
    optional: "Opciono",
    contact: {
      title: "Kontakt podaci",
      subtitle: "Reci nam ko si da bismo podelili tvoje personalizovane rezultate.",
      firstName: "Ime",
      lastName: "Prezime",
      email: "Poslovni email",
      company: "Kompanija",
      jobTitle: "Pozicija",
      phone: "Telefon",
      country: "Država",
      companySize: "Veličina kompanije",
      employees: "zaposlenih",
    },
    project: {
      title: "Podaci o projektu",
      subtitle: "Opiši reprezentativan projekat. To pokreće ROI procenu.",
      projectName: "Naziv projekta",
      projectType: "Tip projekta",
      projectValue: "Procenjena vrednost projekta",
      currency: "Valuta",
      duration: "Očekivano trajanje (meseci)",
      teamSize: "Članovi projektnog tima",
      activeProjects: "Broj aktivnih projekata",
      bimMaturity: "Trenutna BIM zrelost",
      fxNote: "Kursevi su statične demonstracione vrednosti, a ne aktuelni tržišni kursevi.",
    },
    challenges: {
      title: "Trenutni izazovi",
      subtitle: "Kvantifikuj današnje probleme da procenimo poboljšanje.",
      reportingHours: "Mesečni sati na ručno izveštavanje",
      searchHours: "Mesečni sati na traženje informacija",
      weeklyDelay: "Cena jedne nedelje kašnjenja",
      delayWeeks: "Očekivani broj nedelja kašnjenja",
      changeReqs: "Godišnji broj zahteva za izmenu",
      changeCost: "Prosečna cena po zahtevu za izmenu",
      duplicated: "Dupliran / nepotreban rad",
      problems: "Koje probleme danas imaš?",
    },
    buttons: {
      back: "Nazad",
      continue: "Nastavi",
      calculate: "Izračunaj moj ROI",
      calculating: "Računam…",
    },
    toast: {
      fix: "Molimo popuni označena polja.",
      ready: "Tvoja ROI procena je spremna.",
      network: "Greška u mreži. Pokušaj ponovo.",
      error: "Nešto je pošlo naopako. Pokušaj ponovo.",
    },
    results: {
      badge: "Procena završena",
      title: "Tvoj procenjeni BIM ROI",
      forCompany: "Okvirni rezultati za",
      totalSavings: "Ukupne potencijalne uštede",
      perYear: "Godišnje",
      roi: "ROI",
      roiSub: "Povraćaj investicije",
      payback: "Period povraćaja",
      paybackSub: "Vreme do isplativosti",
      netBenefit: "Neto korist",
      netSub: "Nakon ulaganja u softver",
      timeSavings: "Uštede vremena",
      hoursYear: "h / godišnje",
      months: "meseci",
      leadScore: "Skor kvalifikacije leada",
      summary:
        "Na osnovu unetih podataka, tvoja organizacija može da uštedi niže prikazane iznose smanjenjem ručnog izveštavanja, kašnjenja i dorade.",
      reporting: "Uštede na izveštavanju",
      delay: "Izbegnuti troškovi kašnjenja",
      rework: "Smanjenje dorade",
      byCategory: "Uštede po kategoriji",
      distribution: "Raspodela ušteda",
      howCalculated: "Kako se brojke računaju",
      saving: "Ušteda",
      basis: "Osnova",
      amountYear: "Iznos / godišnje",
      investment: "Procenjeno godišnje ulaganje u softver",
      requestDemo: "Zatraži personalizovani demo",
      viewReport: "Pogledaj izveštaj za štampu",
      disclaimer:
        "Ovaj kalkulator daje samo okvirnu procenu. Stvarni rezultati zavise od obima projekta, kvaliteta implementacije, prihvatanja korisnika i postojećih procesa. Korišćeni kursevi su statične demonstracione vrednosti.",
    },
  },
  enums: {
    companySize: {
      SIZE_1_10: "1–10",
      SIZE_11_50: "11–50",
      SIZE_51_200: "51–200",
      SIZE_201_500: "201–500",
      SIZE_500_PLUS: "500+",
    },
    projectType: {
      RESIDENTIAL: "Stambeni",
      COMMERCIAL: "Komercijalni",
      INFRASTRUCTURE: "Infrastruktura",
      INDUSTRIAL: "Industrijski",
      HEALTHCARE: "Zdravstvo",
      EDUCATION: "Obrazovanje",
      OTHER: "Ostalo",
    },
    bimMaturity: {
      NONE: "Bez formalnog BIM procesa",
      BASIC_3D: "Osnovni 3D BIM",
      COORDINATED: "Koordinisani BIM",
      PLANNING_4D: "4D planiranje",
      COST_5D: "5D upravljanje troškovima",
      INTEGRATED: "Integrisano BIM okruženje",
    },
    challenge: {
      DISCONNECTED_DATA: "Nepovezani projektni podaci",
      MANUAL_REPORTING: "Ručno izveštavanje",
      POOR_COST_VISIBILITY: "Loša vidljivost troškova",
      SCHEDULE_DELAYS: "Kašnjenja u rasporedu",
      DIFFICULT_COLLABORATION: "Otežana saradnja učesnika",
      LATE_RISK_DETECTION: "Kasno otkrivanje rizika",
      TOO_MANY_EXCEL: "Previše Excel fajlova",
      LIMITED_FIELD_COMMS: "Slaba komunikacija teren–kancelarija",
    },
  },
};

const de: Dictionary = {
  nav: {
    benefits: "Vorteile",
    how: "So funktioniert's",
    audience: "Für wen",
    demo: "Demo anfragen",
    calculate: "ROI berechnen",
  },
  theme: { light: "Hell", dark: "Dunkel", toggle: "Thema wechseln" },
  language: "Sprache",
  hero: {
    badge: "BIM ROI Rechner",
    titleA: "Berechnen Sie den ROI",
    titleB: "besserer BIM-Projektsteuerung",
    subtitle:
      "Schätzen Sie, wie viel Zeit, Geld und Projektrisiko Ihr Unternehmen durch integrierte BIM-Planung, Kostenkontrolle und Zusammenarbeit reduzieren kann.",
    ctaPrimary: "ROI berechnen",
    ctaSecondary: "Demo anfragen",
    stats: {
      time: "Zeit",
      timeV: "Weniger manuelle Berichte",
      cost: "Kosten",
      costV: "Bessere Budgetkontrolle",
      risk: "Risiko",
      riskV: "Früheres Erkennen",
    },
    trusted: "Bewährter Ansatz für Gewerbe-, Infrastruktur- und Industrieprojekte",
  },
  intro: {
    title: "Verstehen Sie Ihre Zahlen — in einfacher Sprache",
    subtitle:
      "Ein kurzer Leitfaden dazu, was dieses Tool misst und wie Sie Ihre Ergebnisse lesen — ohne BIM-Fachjargon.",
    roi: {
      title: "Was bedeutet ROI?",
      term: "ROI = Return on Investment (Kapitalrendite)",
      text:
        "Der ROI zeigt, wie viel Wert Sie für jeden investierten Euro zurückerhalten. Ein ROI von 200 % bedeutet, dass Sie für jeden ausgegebenen 1 € 2 € zurückbekommen — je höher die Zahl, desto schneller amortisiert sich die Investition.",
    },
    app: {
      title: "Was macht diese App?",
      text:
        "Der BEXEL ROI-Rechner schätzt, wie viel Zeit, Geld und Projektrisiko Ihr Unternehmen durch vernetztes BIM einsparen kann — statt durch verstreute Tabellen und getrennte Werkzeuge.",
    },
    usage: {
      title: "So verwenden Sie es",
      text:
        "Beantworten Sie einige kurze Fragen zu Ihrem Unternehmen, einem typischen Projekt und Ihren aktuellen Herausforderungen. In weniger als zwei Minuten erhalten Sie eine klare, personalisierte Schätzung Ihrer möglichen Einsparungen, Amortisationszeit und Kapitalrendite.",
    },
  },
  benefits: {
    title: "Machen Sie vernetztes BIM messbar",
    subtitle:
      "Vier Bereiche, in denen integrierte BIM-Planung, Kostenkontrolle und Zusammenarbeit in jedem Projekt greifbaren Wert schaffen.",
    items: {
      delays: {
        title: "Projektverzögerungen reduzieren",
        description:
          "Simulieren Sie Zeitpläne mit 4D-Planung und erkennen Sie Engpässe, bevor sie den kritischen Pfad treffen.",
      },
      cost: {
        title: "Kostentransparenz verbessern",
        description:
          "Verbinden Sie 5D-Kostendaten mit dem Modell, sodass jede Änderung sofort bepreist wird.",
      },
      reporting: {
        title: "Berichte automatisieren",
        description:
          "Ersetzen Sie manuelle Tabellen durch live aus dem Modell abgeleitete KPIs und Ein-Klick-Berichte.",
      },
      risk: {
        title: "Risiken früher erkennen",
        description:
          "Erkennen Sie Kollisionen, Datenlücken und Terminrisiken automatisch, lange bevor sie eskalieren.",
      },
    },
  },
  how: {
    title: "Von Fragen zu klarem ROI in Minuten",
    subtitle: "Drei einfache Schritte zu einer transparenten, personalisierten Schätzung.",
    steps: {
      s1: {
        title: "Projektinformationen eingeben",
        description:
          "Erzählen Sie uns von Ihrem Unternehmen, einem repräsentativen Projekt und Ihren aktuellen Herausforderungen.",
      },
      s2: {
        title: "Personalisierte ROI-Schätzung erhalten",
        description:
          "Erhalten Sie sofort eine transparente Aufschlüsselung von Einsparungen, Nettonutzen und Amortisationszeit.",
      },
      s3: {
        title: "Ergebnisse mit einem BIM-Experten besprechen",
        description:
          "Buchen Sie eine Demo, um die Zahlen an Ihren realen Prozessen und Projekten zu prüfen.",
      },
    },
  },
  audience: {
    title: "Für jede Projektrolle gemacht",
    subtitle:
      "Wählen Sie Ihre Rolle, um zu sehen, wie der ROI-Rechner Ihre Prioritäten adressiert.",
    startAs: "Rechner starten als",
    roles: {
      INVESTORS: "Investoren",
      CONTRACTORS: "Auftragnehmer",
      BIM_MANAGERS: "BIM-Manager",
      PROJECT_MANAGERS: "Projektmanager",
      COST_MANAGERS: "Kostenmanager",
    },
    helpers: {
      INVESTORS:
        "Quantifizieren Sie, wie strengere Kostenkontrolle und weniger Verzögerungen Ihre Kapitalrendite schützen.",
      CONTRACTORS:
        "Sehen Sie, wie vernetzte 4D/5D-Planung Nacharbeit reduziert und Baustellen im Zeitplan hält.",
      BIM_MANAGERS:
        "Schätzen Sie den Produktivitätsgewinn aus einer einzigen, koordinierten BIM-Umgebung.",
      PROJECT_MANAGERS:
        "Verstehen Sie, wie viel Zeit Sie durch weniger manuelle Berichte und Informationssuche zurückgewinnen.",
      COST_MANAGERS:
        "Modellieren Sie die Wirkung früher Risikoerkennung und weniger Änderungsanträge auf das Budget.",
    },
  },
  demo: {
    title: "Erst Ihre Zahlen, dann die Plattform",
    subtitle:
      "Nutzen Sie den ROI-Rechner für eine personalisierte Schätzung und buchen Sie dann eine Demo mit einem BIM-Experten zur Validierung an Ihren realen Projekten.",
    ctaPrimary: "ROI berechnen",
    ctaSecondary: "Demo anfragen",
  },
  footer: {
    tagline:
      "BIM ROI Rechner & Lead-Automatisierung. Schätzen Sie den Wert integrierter BIM-Planung, Kostenkontrolle und Zusammenarbeit für Ihr Unternehmen.",
    product: "Produkt",
    company: "Unternehmen",
    roiCalculator: "ROI Rechner",
    benefits: "Vorteile",
    how: "So funktioniert's",
    requestDemo: "Demo anfragen",
    salesAdmin: "Vertriebs-Admin",
    rights: "© 2026 BEXEL Growth Platform — MVP-Konzept.",
    note: "Ein unabhängiges Lead-Automatisierungskonzept für ein BIM-Softwareunternehmen.",
  },
  calc: {
    title: "BIM ROI Rechner",
    subtitle:
      "Beantworten Sie einige Fragen zu Ihrem Unternehmen und einem repräsentativen Projekt für eine sofortige, personalisierte ROI-Schätzung.",
    steps: {
      contact: "Kontakt",
      project: "Projekt",
      challenges: "Herausforderungen",
      results: "Ergebnisse",
    },
    optional: "Optional",
    contact: {
      title: "Kontaktinformationen",
      subtitle: "Sagen Sie uns, wer Sie sind, damit wir Ihre Ergebnisse teilen können.",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "Geschäftliche E-Mail",
      company: "Unternehmen",
      jobTitle: "Position",
      phone: "Telefon",
      country: "Land",
      companySize: "Unternehmensgröße",
      employees: "Mitarbeiter",
    },
    project: {
      title: "Projektinformationen",
      subtitle: "Beschreiben Sie ein repräsentatives Projekt. Das steuert die ROI-Schätzung.",
      projectName: "Projektname",
      projectType: "Projekttyp",
      projectValue: "Geschätzter Projektwert",
      currency: "Währung",
      duration: "Erwartete Dauer (Monate)",
      teamSize: "Projektteam-Mitglieder",
      activeProjects: "Anzahl aktiver Projekte",
      bimMaturity: "Aktuelle BIM-Reife",
      fxNote: "Wechselkurse sind statische Demonstrationswerte und keine aktuellen Marktkurse.",
    },
    challenges: {
      title: "Aktuelle Herausforderungen",
      subtitle: "Quantifizieren Sie die heutigen Probleme, damit wir die Verbesserung schätzen können.",
      reportingHours: "Monatliche Stunden für manuelle Berichte",
      searchHours: "Monatliche Stunden für die Informationssuche",
      weeklyDelay: "Kosten einer Woche Verzögerung",
      delayWeeks: "Erwartete Anzahl Verzögerungswochen",
      changeReqs: "Jährliche Anzahl Änderungsanträge",
      changeCost: "Durchschnittliche Kosten pro Änderungsantrag",
      duplicated: "Doppelte / unnötige Arbeit",
      problems: "Welche Probleme haben Sie heute?",
    },
    buttons: {
      back: "Zurück",
      continue: "Weiter",
      calculate: "Meinen ROI berechnen",
      calculating: "Berechne…",
    },
    toast: {
      fix: "Bitte füllen Sie die markierten Felder aus.",
      ready: "Ihre ROI-Schätzung ist bereit.",
      network: "Netzwerkfehler. Bitte erneut versuchen.",
      error: "Etwas ist schiefgelaufen. Bitte erneut versuchen.",
    },
    results: {
      badge: "Bewertung abgeschlossen",
      title: "Ihr geschätzter BIM ROI",
      forCompany: "Indikative Ergebnisse für",
      totalSavings: "Gesamte potenzielle Einsparungen",
      perYear: "Pro Jahr",
      roi: "ROI",
      roiSub: "Kapitalrendite",
      payback: "Amortisationszeit",
      paybackSub: "Zeit bis zum Break-even",
      netBenefit: "Nettonutzen",
      netSub: "Nach Softwareinvestition",
      timeSavings: "Zeitersparnis",
      hoursYear: "Std / Jahr",
      months: "Monate",
      leadScore: "Lead-Qualifizierungs-Score",
      summary:
        "Basierend auf Ihren Angaben könnte Ihr Unternehmen die untenstehenden Beträge durch weniger manuelle Berichte, Verzögerungen und Nacharbeit einsparen.",
      reporting: "Berichtseinsparungen",
      delay: "Vermiedene Verzögerungskosten",
      rework: "Reduzierte Nacharbeit",
      byCategory: "Einsparungen nach Kategorie",
      distribution: "Verteilung der Einsparungen",
      howCalculated: "Wie die Zahlen berechnet werden",
      saving: "Einsparung",
      basis: "Basis",
      amountYear: "Betrag / Jahr",
      investment: "Geschätzte jährliche Softwareinvestition",
      requestDemo: "Personalisierte Demo anfragen",
      viewReport: "Druckbaren Bericht ansehen",
      disclaimer:
        "Dieser Rechner liefert nur eine indikative Schätzung. Die tatsächlichen Ergebnisse hängen von Projektumfang, Implementierungsqualität, Nutzerakzeptanz und bestehenden Prozessen ab. Verwendete Wechselkurse sind statische Demonstrationswerte.",
    },
  },
  enums: {
    companySize: {
      SIZE_1_10: "1–10",
      SIZE_11_50: "11–50",
      SIZE_51_200: "51–200",
      SIZE_201_500: "201–500",
      SIZE_500_PLUS: "500+",
    },
    projectType: {
      RESIDENTIAL: "Wohnbau",
      COMMERCIAL: "Gewerbe",
      INFRASTRUCTURE: "Infrastruktur",
      INDUSTRIAL: "Industrie",
      HEALTHCARE: "Gesundheitswesen",
      EDUCATION: "Bildung",
      OTHER: "Sonstiges",
    },
    bimMaturity: {
      NONE: "Kein formaler BIM-Prozess",
      BASIC_3D: "Einfaches 3D-BIM",
      COORDINATED: "Koordiniertes BIM",
      PLANNING_4D: "4D-Planung",
      COST_5D: "5D-Kostenmanagement",
      INTEGRATED: "Integrierte BIM-Umgebung",
    },
    challenge: {
      DISCONNECTED_DATA: "Getrennte Projektdaten",
      MANUAL_REPORTING: "Manuelle Berichte",
      POOR_COST_VISIBILITY: "Schlechte Kostentransparenz",
      SCHEDULE_DELAYS: "Terminverzögerungen",
      DIFFICULT_COLLABORATION: "Schwierige Zusammenarbeit",
      LATE_RISK_DETECTION: "Späte Risikoerkennung",
      TOO_MANY_EXCEL: "Zu viele Excel-Dateien",
      LIMITED_FIELD_COMMS: "Geringe Kommunikation Baustelle–Büro",
    },
  },
};

const fr: Dictionary = {
  nav: {
    benefits: "Avantages",
    how: "Comment ça marche",
    audience: "Pour qui",
    demo: "Demander une démo",
    calculate: "Calculer le ROI",
  },
  theme: { light: "Clair", dark: "Sombre", toggle: "Changer de thème" },
  language: "Langue",
  hero: {
    badge: "Calculateur ROI BIM",
    titleA: "Calculez le ROI",
    titleB: "d'un meilleur pilotage BIM",
    subtitle:
      "Estimez le temps, l'argent et le risque projet que votre organisation pourrait réduire grâce à la planification BIM intégrée, au contrôle des coûts et à la collaboration.",
    ctaPrimary: "Calculer le ROI",
    ctaSecondary: "Demander une démo",
    stats: {
      time: "Temps",
      timeV: "Moins de reporting manuel",
      cost: "Coûts",
      costV: "Meilleur contrôle budgétaire",
      risk: "Risque",
      riskV: "Détection plus précoce",
    },
    trusted: "Approche éprouvée sur des projets commerciaux, d'infrastructure et industriels",
  },
  intro: {
    title: "Comprenez vos chiffres, en langage simple",
    subtitle:
      "Un petit guide de ce que cet outil mesure et de la façon de lire vos résultats — sans jargon BIM.",
    roi: {
      title: "Que signifie ROI ?",
      term: "ROI = retour sur investissement",
      text:
        "Le ROI indique la valeur que vous récupérez pour chaque euro investi. Un ROI de 200 % signifie que pour chaque 1 € dépensé vous gagnez 2 € en retour — plus le chiffre est élevé, plus l'investissement se rentabilise vite.",
    },
    app: {
      title: "Que fait cette application ?",
      text:
        "Le calculateur ROI BEXEL estime le temps, l'argent et le risque projet que votre organisation pourrait économiser en travaillant avec un BIM connecté, plutôt qu'avec des tableurs dispersés et des outils déconnectés.",
    },
    usage: {
      title: "Comment l'utiliser",
      text:
        "Répondez à quelques questions courtes sur votre entreprise, un projet type et vos défis actuels. En moins de deux minutes, vous obtenez une estimation claire et personnalisée de vos économies potentielles, de votre délai de rentabilité et de votre retour sur investissement.",
    },
  },
  benefits: {
    title: "Transformez le BIM connecté en résultats mesurables",
    subtitle:
      "Quatre domaines où la planification BIM intégrée, le contrôle des coûts et la collaboration créent de la valeur tangible sur chaque projet.",
    items: {
      delays: {
        title: "Réduire les retards de projet",
        description:
          "Simulez les plannings avec la planification 4D et repérez les goulots avant qu'ils n'atteignent le chemin critique.",
      },
      cost: {
        title: "Améliorer la visibilité des coûts",
        description:
          "Reliez les données de coûts 5D au modèle pour chiffrer chaque changement dès qu'il se produit.",
      },
      reporting: {
        title: "Automatiser le reporting",
        description:
          "Remplacez les tableurs manuels par des KPI en direct issus du modèle et des rapports en un clic.",
      },
      risk: {
        title: "Détecter les risques plus tôt",
        description:
          "Révélez automatiquement les conflits, lacunes de données et risques de planning bien avant qu'ils ne s'aggravent.",
      },
    },
  },
  how: {
    title: "Des questions à un ROI clair en quelques minutes",
    subtitle: "Trois étapes simples vers une estimation transparente et personnalisée.",
    steps: {
      s1: {
        title: "Saisir les informations du projet",
        description:
          "Parlez-nous de votre organisation, d'un projet représentatif et de vos défis actuels.",
      },
      s2: {
        title: "Recevoir une estimation ROI personnalisée",
        description:
          "Obtenez une répartition instantanée et transparente des économies, du bénéfice net et du délai de rentabilité.",
      },
      s3: {
        title: "Discuter des résultats avec un spécialiste BIM",
        description:
          "Réservez une démo pour valider les chiffres par rapport à vos processus et projets réels.",
      },
    },
  },
  audience: {
    title: "Conçu pour chaque rôle projet",
    subtitle:
      "Sélectionnez votre rôle pour voir comment le calculateur ROI répond à vos priorités.",
    startAs: "Démarrer le calculateur en tant que",
    roles: {
      INVESTORS: "Investisseurs",
      CONTRACTORS: "Entrepreneurs",
      BIM_MANAGERS: "BIM Managers",
      PROJECT_MANAGERS: "Chefs de projet",
      COST_MANAGERS: "Économistes",
    },
    helpers: {
      INVESTORS:
        "Quantifiez comment un contrôle des coûts plus strict et moins de retards protègent votre rendement du capital.",
      CONTRACTORS:
        "Voyez comment la planification 4D/5D connectée réduit les reprises et tient les chantiers à l'heure.",
      BIM_MANAGERS:
        "Estimez la productivité gagnée grâce à un environnement BIM unique et coordonné.",
      PROJECT_MANAGERS:
        "Comprenez le temps récupéré sur le reporting manuel et la recherche d'informations.",
      COST_MANAGERS:
        "Modélisez l'impact de la détection précoce des risques et de la réduction des changements sur le budget.",
    },
  },
  demo: {
    title: "Vos chiffres d'abord, la plateforme ensuite",
    subtitle:
      "Utilisez le calculateur ROI pour une estimation personnalisée, puis réservez une démo avec un spécialiste BIM pour la valider sur vos projets réels.",
    ctaPrimary: "Calculer le ROI",
    ctaSecondary: "Demander une démo",
  },
  footer: {
    tagline:
      "Calculateur ROI BIM & automatisation des leads. Estimez la valeur de la planification BIM intégrée, du contrôle des coûts et de la collaboration pour votre organisation.",
    product: "Produit",
    company: "Entreprise",
    roiCalculator: "Calculateur ROI",
    benefits: "Avantages",
    how: "Comment ça marche",
    requestDemo: "Demander une démo",
    salesAdmin: "Admin ventes",
    rights: "© 2026 BEXEL Growth Platform — concept MVP.",
    note: "Un concept indépendant d'automatisation des leads pour un éditeur de logiciels BIM.",
  },
  calc: {
    title: "Calculateur ROI BIM",
    subtitle:
      "Répondez à quelques questions sur votre organisation et un projet représentatif pour recevoir une estimation ROI instantanée et personnalisée.",
    steps: {
      contact: "Contact",
      project: "Projet",
      challenges: "Défis",
      results: "Résultats",
    },
    optional: "Optionnel",
    contact: {
      title: "Coordonnées",
      subtitle: "Dites-nous qui vous êtes pour partager vos résultats personnalisés.",
      firstName: "Prénom",
      lastName: "Nom",
      email: "E-mail professionnel",
      company: "Entreprise",
      jobTitle: "Fonction",
      phone: "Téléphone",
      country: "Pays",
      companySize: "Taille de l'entreprise",
      employees: "employés",
    },
    project: {
      title: "Informations du projet",
      subtitle: "Décrivez un projet représentatif. Cela alimente l'estimation ROI.",
      projectName: "Nom du projet",
      projectType: "Type de projet",
      projectValue: "Valeur estimée du projet",
      currency: "Devise",
      duration: "Durée prévue (mois)",
      teamSize: "Membres de l'équipe projet",
      activeProjects: "Nombre de projets actifs",
      bimMaturity: "Maturité BIM actuelle",
      fxNote: "Les taux de change sont des valeurs de démonstration statiques et non des taux de marché en temps réel.",
    },
    challenges: {
      title: "Défis actuels",
      subtitle: "Quantifiez les difficultés actuelles pour estimer l'amélioration.",
      reportingHours: "Heures mensuelles de reporting manuel",
      searchHours: "Heures mensuelles de recherche d'informations",
      weeklyDelay: "Coût d'une semaine de retard",
      delayWeeks: "Nombre prévu de semaines de retard",
      changeReqs: "Nombre annuel de demandes de changement",
      changeCost: "Coût moyen par demande de changement",
      duplicated: "Travail dupliqué / inutile",
      problems: "Quels problèmes rencontrez-vous aujourd'hui ?",
    },
    buttons: {
      back: "Retour",
      continue: "Continuer",
      calculate: "Calculer mon ROI",
      calculating: "Calcul…",
    },
    toast: {
      fix: "Veuillez compléter les champs en surbrillance.",
      ready: "Votre estimation ROI est prête.",
      network: "Erreur réseau. Veuillez réessayer.",
      error: "Une erreur s'est produite. Veuillez réessayer.",
    },
    results: {
      badge: "Évaluation terminée",
      title: "Votre ROI BIM estimé",
      forCompany: "Résultats indicatifs pour",
      totalSavings: "Économies potentielles totales",
      perYear: "Par an",
      roi: "ROI",
      roiSub: "Retour sur investissement",
      payback: "Délai de rentabilité",
      paybackSub: "Temps pour atteindre l'équilibre",
      netBenefit: "Bénéfice net",
      netSub: "Après investissement logiciel",
      timeSavings: "Gains de temps",
      hoursYear: "h / an",
      months: "mois",
      leadScore: "Score de qualification du lead",
      summary:
        "D'après les informations fournies, votre organisation pourrait économiser les montants ci-dessous en réduisant le reporting manuel, les retards et les reprises.",
      reporting: "Économies de reporting",
      delay: "Coûts de retard évités",
      rework: "Réduction des reprises",
      byCategory: "Économies par catégorie",
      distribution: "Répartition des économies",
      howCalculated: "Comment les chiffres sont calculés",
      saving: "Économie",
      basis: "Base",
      amountYear: "Montant / an",
      investment: "Investissement logiciel annuel estimé",
      requestDemo: "Demander une démo personnalisée",
      viewReport: "Voir le rapport imprimable",
      disclaimer:
        "Ce calculateur ne fournit qu'une estimation indicative. Les résultats réels dépendent de la portée du projet, de la qualité de mise en œuvre, de l'adoption par les utilisateurs et des processus existants. Les taux de change utilisés sont des valeurs de démonstration statiques.",
    },
  },
  enums: {
    companySize: {
      SIZE_1_10: "1–10",
      SIZE_11_50: "11–50",
      SIZE_51_200: "51–200",
      SIZE_201_500: "201–500",
      SIZE_500_PLUS: "500+",
    },
    projectType: {
      RESIDENTIAL: "Résidentiel",
      COMMERCIAL: "Commercial",
      INFRASTRUCTURE: "Infrastructure",
      INDUSTRIAL: "Industriel",
      HEALTHCARE: "Santé",
      EDUCATION: "Éducation",
      OTHER: "Autre",
    },
    bimMaturity: {
      NONE: "Aucun processus BIM formel",
      BASIC_3D: "BIM 3D de base",
      COORDINATED: "BIM coordonné",
      PLANNING_4D: "Planification 4D",
      COST_5D: "Gestion des coûts 5D",
      INTEGRATED: "Environnement BIM intégré",
    },
    challenge: {
      DISCONNECTED_DATA: "Données de projet déconnectées",
      MANUAL_REPORTING: "Reporting manuel",
      POOR_COST_VISIBILITY: "Faible visibilité des coûts",
      SCHEDULE_DELAYS: "Retards de planning",
      DIFFICULT_COLLABORATION: "Collaboration difficile",
      LATE_RISK_DETECTION: "Détection tardive des risques",
      TOO_MANY_EXCEL: "Trop de fichiers Excel",
      LIMITED_FIELD_COMMS: "Communication chantier–bureau limitée",
    },
  },
};

const sl: Dictionary = {
  nav: {
    benefits: "Prednosti",
    how: "Kako deluje",
    audience: "Za koga je",
    demo: "Zahtevaj demo",
    calculate: "Izračunaj ROI",
  },
  theme: { light: "Svetla", dark: "Temna", toggle: "Zamenjaj temo" },
  language: "Jezik",
  hero: {
    badge: "BIM ROI Kalkulator",
    titleA: "Izračunaj ROI",
    titleB: "boljšega vodenja BIM projektov",
    subtitle:
      "Oceni, koliko časa, denarja in projektnega tveganja lahko tvoja organizacija zmanjša z integriranim BIM načrtovanjem, nadzorom stroškov in sodelovanjem.",
    ctaPrimary: "Izračunaj ROI",
    ctaSecondary: "Zahtevaj demo",
    stats: {
      time: "Čas",
      timeV: "Manj ročnega poročanja",
      cost: "Stroški",
      costV: "Boljši nadzor proračuna",
      risk: "Tveganje",
      riskV: "Zgodnejše odkrivanje",
    },
    trusted: "Zanesljiv pristop, uporabljen pri komercialnih, infrastrukturnih in industrijskih projektih",
  },
  intro: {
    title: "Razumi svoje številke, v preprostem jeziku",
    subtitle:
      "Kratek vodnik po tem, kaj to orodje meri in kako brati rezultate — brez BIM žargona.",
    roi: {
      title: "Kaj pomeni ROI?",
      term: "ROI = donos naložbe",
      text:
        "ROI pokaže, koliko vrednosti dobiš za vsak vloženi evro. ROI 200 % pomeni, da za vsak vloženi 1 € dobiš 2 € nazaj — višja kot je številka, hitreje se naložba povrne.",
    },
    app: {
      title: "Kaj počne ta aplikacija?",
      text:
        "BEXEL ROI Kalkulator oceni, koliko časa, denarja in projektnega tveganja lahko tvoja organizacija prihrani z delom s povezanim BIM-om namesto z razpršenimi tabelami in nepovezanimi orodji.",
    },
    usage: {
      title: "Kako ga uporabljati",
      text:
        "Odgovori na nekaj kratkih vprašanj o svojem podjetju, tipičnem projektu in trenutnih izzivih. V manj kot dveh minutah dobiš jasno, prilagojeno oceno možnih prihrankov, dobe povračila in donosa naložbe.",
    },
  },
  benefits: {
    title: "Povezan BIM spremeni v merljive rezultate",
    subtitle:
      "Štiri področja, kjer integrirano BIM načrtovanje, nadzor stroškov in sodelovanje ustvarjajo oprijemljivo vrednost na vsakem projektu.",
    items: {
      delays: {
        title: "Zmanjšaj zamude projekta",
        description:
          "Simuliraj urnike s 4D načrtovanjem in ujemi ozka grla, preden zadenejo kritično pot.",
      },
      cost: {
        title: "Izboljšaj preglednost stroškov",
        description:
          "Poveži 5D stroškovne podatke z modelom, tako da se vsaka sprememba ovrednoti takoj, ko se zgodi.",
      },
      reporting: {
        title: "Avtomatiziraj poročanje",
        description:
          "Zamenjaj ročne tabele z živimi KPI-ji iz modela in poročili z enim klikom.",
      },
      risk: {
        title: "Odkrij tveganja prej",
        description:
          "Samodejno razkrij kolizije, vrzeli v podatkih in tveganja urnika, dolgo preden se stopnjujejo.",
      },
    },
  },
  how: {
    title: "Od vprašanj do jasnega ROI v nekaj minutah",
    subtitle: "Trije preprosti koraki do pregledne, prilagojene ocene.",
    steps: {
      s1: {
        title: "Vnesi podatke o projektu",
        description:
          "Povej nam o svoji organizaciji, reprezentativnem projektu in trenutnih izzivih.",
      },
      s2: {
        title: "Prejmi prilagojeno ROI oceno",
        description:
          "Pridobi takojšen, pregleden razčlenjen prikaz prihrankov, neto koristi in dobe povračila.",
      },
      s3: {
        title: "Preglej rezultate s strokovnjakom za BIM",
        description:
          "Rezerviraj demo, da preveriš številke glede na svoje resnične procese in portfelj projektov.",
      },
    },
  },
  audience: {
    title: "Ustvarjeno za vsako vlogo na projektu",
    subtitle:
      "Izberi svojo vlogo in poglej, kako ROI kalkulator nagovarja tvoje prioritete.",
    startAs: "Zaženi kalkulator kot",
    roles: {
      INVESTORS: "Investitorji",
      CONTRACTORS: "Izvajalci",
      BIM_MANAGERS: "BIM vodje",
      PROJECT_MANAGERS: "Vodje projektov",
      COST_MANAGERS: "Vodje stroškov",
    },
    helpers: {
      INVESTORS:
        "Ovrednoti, kako tesnejši nadzor stroškov in manj zamud ščitita tvoj donos kapitala.",
      CONTRACTORS:
        "Poglej, kako povezano 4D/5D načrtovanje zmanjša predelave in ohranja gradbišča v roku.",
      BIM_MANAGERS:
        "Oceni produktivnost, pridobljeno iz enotnega, usklajenega BIM okolja.",
      PROJECT_MANAGERS:
        "Razumi, koliko časa se povrne od ročnega poročanja in iskanja informacij.",
      COST_MANAGERS:
        "Modeliraj vpliv zgodnjega odkrivanja tveganj in zmanjšanja zahtev za spremembe na proračun.",
    },
  },
  demo: {
    title: "Najprej svoje številke, nato platforma",
    subtitle:
      "Zaženi ROI kalkulator za prilagojeno oceno, nato rezerviraj demo s strokovnjakom za BIM, da jo preveriš na svojih resničnih projektih.",
    ctaPrimary: "Izračunaj ROI",
    ctaSecondary: "Zahtevaj demo",
  },
  footer: {
    tagline:
      "BIM ROI Kalkulator in avtomatizacija potencialnih strank. Oceni vrednost integriranega BIM načrtovanja, nadzora stroškov in sodelovanja za tvojo organizacijo.",
    product: "Izdelek",
    company: "Podjetje",
    roiCalculator: "ROI Kalkulator",
    benefits: "Prednosti",
    how: "Kako deluje",
    requestDemo: "Zahtevaj demo",
    salesAdmin: "Prodajni admin",
    rights: "© 2026 BEXEL Growth Platform — MVP koncept.",
    note: "Neodvisen koncept avtomatizacije potencialnih strank za podjetje z BIM programsko opremo.",
  },
  calc: {
    title: "BIM ROI Kalkulator",
    subtitle:
      "Odgovori na nekaj vprašanj o svoji organizaciji in reprezentativnem projektu ter prejmi takojšnjo, prilagojeno ROI oceno.",
    steps: {
      contact: "Stik",
      project: "Projekt",
      challenges: "Izzivi",
      results: "Rezultati",
    },
    optional: "Neobvezno",
    contact: {
      title: "Kontaktni podatki",
      subtitle: "Povej nam, kdo si, da lahko delimo tvoje prilagojene rezultate.",
      firstName: "Ime",
      lastName: "Priimek",
      email: "Poslovni e-poštni naslov",
      company: "Podjetje",
      jobTitle: "Delovno mesto",
      phone: "Telefon",
      country: "Država",
      companySize: "Velikost podjetja",
      employees: "zaposlenih",
    },
    project: {
      title: "Podatki o projektu",
      subtitle: "Opiši reprezentativen projekt. To poganja ROI oceno.",
      projectName: "Ime projekta",
      projectType: "Vrsta projekta",
      projectValue: "Ocenjena vrednost projekta",
      currency: "Valuta",
      duration: "Pričakovano trajanje (meseci)",
      teamSize: "Člani projektne ekipe",
      activeProjects: "Število aktivnih projektov",
      bimMaturity: "Trenutna BIM zrelost",
      fxNote: "Menjalni tečaji so statične predstavitvene vrednosti in ne aktualni tržni tečaji.",
    },
    challenges: {
      title: "Trenutni izzivi",
      subtitle: "Ovrednoti današnje težave, da ocenimo izboljšave.",
      reportingHours: "Mesečne ure za ročno poročanje",
      searchHours: "Mesečne ure za iskanje informacij",
      weeklyDelay: "Strošek enega tedna zamude",
      delayWeeks: "Pričakovano število tednov zamude",
      changeReqs: "Letno število zahtev za spremembe",
      changeCost: "Povprečni strošek na zahtevo za spremembo",
      duplicated: "Podvojeno / nepotrebno delo",
      problems: "Katere težave imaš danes?",
    },
    buttons: {
      back: "Nazaj",
      continue: "Naprej",
      calculate: "Izračunaj moj ROI",
      calculating: "Računam…",
    },
    toast: {
      fix: "Prosimo, izpolni označena polja.",
      ready: "Tvoja ROI ocena je pripravljena.",
      network: "Napaka omrežja. Poskusi znova.",
      error: "Nekaj je šlo narobe. Poskusi znova.",
    },
    results: {
      badge: "Ocena zaključena",
      title: "Tvoj ocenjeni BIM ROI",
      forCompany: "Okvirni rezultati za",
      totalSavings: "Skupni potencialni prihranki",
      perYear: "Letno",
      roi: "ROI",
      roiSub: "Donos naložbe",
      payback: "Doba povračila",
      paybackSub: "Čas do povračila",
      netBenefit: "Neto korist",
      netSub: "Po naložbi v programsko opremo",
      timeSavings: "Prihranek časa",
      hoursYear: "h / leto",
      months: "mesecev",
      leadScore: "Ocena kvalifikacije stranke",
      summary:
        "Na podlagi vnesenih podatkov lahko tvoja organizacija prihrani spodaj prikazane zneske z zmanjšanjem ročnega poročanja, zamud in predelav.",
      reporting: "Prihranki pri poročanju",
      delay: "Preprečeni stroški zamud",
      rework: "Zmanjšanje predelav",
      byCategory: "Prihranki po kategorijah",
      distribution: "Porazdelitev prihrankov",
      howCalculated: "Kako so izračunane številke",
      saving: "Prihranek",
      basis: "Osnova",
      amountYear: "Znesek / leto",
      investment: "Ocenjena letna naložba v programsko opremo",
      requestDemo: "Zahtevaj prilagojen demo",
      viewReport: "Poglej poročilo za tisk",
      disclaimer:
        "Ta kalkulator daje le okvirno oceno. Dejanski rezultati so odvisni od obsega projekta, kakovosti izvedbe, sprejemanja uporabnikov in obstoječih procesov. Uporabljeni menjalni tečaji so statične predstavitvene vrednosti.",
    },
  },
  enums: {
    companySize: {
      SIZE_1_10: "1–10",
      SIZE_11_50: "11–50",
      SIZE_51_200: "51–200",
      SIZE_201_500: "201–500",
      SIZE_500_PLUS: "500+",
    },
    projectType: {
      RESIDENTIAL: "Stanovanjski",
      COMMERCIAL: "Komercialni",
      INFRASTRUCTURE: "Infrastruktura",
      INDUSTRIAL: "Industrijski",
      HEALTHCARE: "Zdravstvo",
      EDUCATION: "Izobraževanje",
      OTHER: "Drugo",
    },
    bimMaturity: {
      NONE: "Brez formalnega BIM procesa",
      BASIC_3D: "Osnovni 3D BIM",
      COORDINATED: "Usklajen BIM",
      PLANNING_4D: "4D načrtovanje",
      COST_5D: "5D upravljanje stroškov",
      INTEGRATED: "Integrirano BIM okolje",
    },
    challenge: {
      DISCONNECTED_DATA: "Nepovezani podatki projekta",
      MANUAL_REPORTING: "Ročno poročanje",
      POOR_COST_VISIBILITY: "Slaba preglednost stroškov",
      SCHEDULE_DELAYS: "Zamude urnika",
      DIFFICULT_COLLABORATION: "Oteženo sodelovanje deležnikov",
      LATE_RISK_DETECTION: "Pozno odkrivanje tveganj",
      TOO_MANY_EXCEL: "Preveč Excel datotek",
      LIMITED_FIELD_COMMS: "Omejena komunikacija teren–pisarna",
    },
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = { en, sr, sl, de, fr };
