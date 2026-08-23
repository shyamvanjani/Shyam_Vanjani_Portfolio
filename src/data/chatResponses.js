// AI Chat Response Data — mixed paragraph + bullet format, like a real assistant reply

export const chatResponses = {
  about: {
    question: "Tell me about yourself",
    title: "About Me",
    response: `Hey! I'm Shyam Vanjani, a Full Stack Software Engineer based in Gujarat, India. Most of my day-to-day lives in enterprise Java backend work, but I'm just as comfortable jumping into React.js when a project needs frontend attention.

**Education:**
- B.E. in Computer Engineering — LDRP-ITR (Sep 2022 – May 2025)
- Diploma in Computer Engineering — Government Polytechnic Gandhinagar (Aug 2019 – Jun 2022)

Along the way, I also picked up a couple of virtual internships — one in web development, one in data analytics and ML — which gave me a decent feel for both sides of software before I settled firmly into backend engineering.

What actually gets me excited about this work isn't the flashy stuff, it's the boring-but-important parts: systems that don't fall over under load, APIs that are secure by default rather than as an afterthought, and architecture decisions that don't turn into regret six months later. That same care is what I try to bring whether I'm designing a REST endpoint or shaping a frontend flow.`,
    short: `I'm Shyam — a Full Stack Software Engineer who leans mostly toward enterprise Java backend work, with React.js in the mix when the frontend needs it too.

- **Education:** B.E. in Computer Engineering, LDRP-ITR (2022–2025); Diploma from Government Polytechnic Gandhinagar (2019–2022)
- **Focus:** Spring Boot, Kotlin, microservices on the backend
- **What I care about:** reliable systems and clean architecture over flashy features`,
  },

  experience: {
    question: "What's your work experience?",
    title: "Experience",
    response: `My professional journey so far has mostly unfolded at one place — Cygnet.One — across two roles that took me deeper into backend engineering each time.

**Associate Software Engineer** — *July 2025 – Present*
These days I split my time across two platforms. On Nobilex, I architect and maintain backend microservices in Spring Boot, Kotlin, and MongoDB, integrating a handful of third-party services along the way. On the Solumina Admin Portal, I've been building out microservices on Java 21, Spring Boot, PostgreSQL, Docker, and Kubernetes. A couple of things I'm particularly proud of from this stretch:
- A Kubernetes monitoring module built on the Fabric8 client
- A log streaming module that pushes to Elasticsearch, Graylog, and Splunk simultaneously
- Keycloak-based authentication with JWT and RBAC baked into everything I ship
- CI/CD pipelines driven by Docker, Kubernetes, Gradle, and GitHub Actions

**Software Engineer Trainee** — *January 2025 – June 2025*
I cut my teeth here on the Cluster-Deck platform, a MongoDB Atlas monitoring product. I worked on Atlas API integration, RBAC, and multi-tenant architecture support, and built a scheduler-based system that kept Atlas metrics in sync automatically — which eventually grew into business-hours auto-scaling and cost analytics features.

Before all of that, I did two virtual internships: web development at Octanet Services (June 2024) and data analytics/ML at Infolabz IT Services (August 2023) — both gave me an early taste of the field.`,
    short: `I'm currently an **Associate Software Engineer at Cygnet.One** (since July 2025).

- Building backend microservices for **Nobilex** (Spring Boot, Kotlin, MongoDB) and the **Solumina Admin Portal** (Java 21, Spring Boot, PostgreSQL, Kubernetes)
- Shipped a Kubernetes monitoring module and a multi-destination log streaming pipeline (Elasticsearch, Graylog, Splunk)
- Before this role, I was a Software Engineer Trainee here, working on the **Cluster-Deck** MongoDB Atlas monitoring platform
- Two earlier virtual internships in web dev and data analytics/ML rounded out my early experience`,
  },

  skills: {
    question: "What are your technical skills?",
    title: "Skills",
    response: `My skill set is built around one core strength — enterprise microservices in Java and Spring Boot — with everything else layered around that.
  
  **Backend:** Java, Kotlin, Spring Boot, Spring Security, REST APIs, Microservices, JWT, RBAC, Keycloak, Logstash, Node.js, Express.js
  **Frontend:** React.js, Next.js, Bootstrap
  **Databases:** PostgreSQL, MongoDB (incl. Atlas), MySQL, MSSQL, Oracle, Elasticsearch
  **Cloud & DevOps:** Docker, Kubernetes, GitHub Actions, CI/CD pipelines
  **Tools:** Git, GitHub, IntelliJ IDEA, VS Code, Postman, Graylog, Splunk, Gradle, Maven
  
  Authentication and authorization is a space I've spent a lot of time in — Keycloak, JWT-based auth, and RBAC show up in pretty much everything I ship. For data, I move between relational and document stores depending on the problem: PostgreSQL when I need strong consistency, MongoDB when the data shape is more flexible, Elasticsearch when search or audit-log querying is the priority. And since everything I build eventually needs to ship, Docker, Kubernetes, and GitHub Actions are part of my everyday workflow, not an afterthought.
  
  Beyond the technical side, a few things I'd say define how I actually work day to day:
  **Teamwork:** Most of what I build touches other people's work eventually, so I try to keep interfaces and changes easy for teammates to reason about, and I'm just as comfortable picking up someone else's code as handing off mine.
  **Problem-solving:** I default to breaking a messy problem down into smaller, testable pieces rather than guessing at a fix.
  **Ownership:** If something I built breaks in production, I'd rather be the one debugging it than waiting to be told.
  **Adaptability:** Enterprise codebases rarely stay still — priorities shift, integrations change — and I've gotten comfortable re-planning mid-sprint when that happens.
  **Time management:** Juggling multiple modules or deadlines at once is normal in this kind of work, so I try to stay realistic about what fits where instead of overcommitting.
  **Attention to detail:** Especially with auth, RBAC, and infra-adjacent code — small oversights there tend to become big problems later, so I try to catch them early.`,
    short: `My core stack is **Java/Kotlin + Spring Boot** on the backend, **React.js/Next.js** on the frontend.
  
  - **Auth & security:** Keycloak, JWT, RBAC, Spring Security — a recurring theme in most things I build
  - **Data:** PostgreSQL, MongoDB (incl. Atlas), MySQL, MSSQL, Oracle, Elasticsearch — picked based on the problem
  - **Ops:** Docker, Kubernetes, GitHub Actions, CI/CD
  - **Other:** Logstash, Node.js/Express.js, Postman, Splunk, Graylog
  - **Soft skills:** teamwork, structured problem-solving, ownership of what I ship, adaptability under shifting priorities, and attention to detail`,
  },
  
  projects: {
    question: "Show me your projects",
    title: "Projects",
    response: `Here are the ones I'm most invested in.

**Solumina Admin Portal** is probably the most substantial thing I've worked on — an enterprise manufacturing administration platform. I've built out user management, audit logging, monitoring, and log streaming, plus a Kubernetes monitoring module covering clusters, nodes, pods, namespaces, ConfigMaps, PV/PVCs, and TLS certificates, all backed by Keycloak auth, Spring Security, RBAC, and Elasticsearch-powered audit search.
*Java 21, Spring Boot, PostgreSQL, Elasticsearch, Keycloak, Docker, Kubernetes*

**Cluster-Deck** was my introduction to production backend work — a MongoDB Atlas monitoring platform. I handled authentication, RBAC, and tenant data segregation for a multi-tenant setup, plus a scheduler that keeps Atlas metrics in sync automatically, feeding into business-hours auto-scaling and cost analytics.
*Java, Spring Boot, Kotlin, PostgreSQL, TypeScript, Angular, Docker*

**Nobilex** takes me a bit further afield — a digital workflow platform for Dutch notarial offices. I hardened the tenant signup flow, built the PEC popup workflow, integrated BRP data mapping, and worked on secure drafting, signing, submission, and archiving of legal deeds, including Kadaster SYVAS integration.
*Java, Spring Boot, Kotlin, Angular, MongoDB*

Outside of work, I've also built a few things on my own:
- **Job Recruitment Portal** — a full-stack MERN app with separate flows for Admins, Companies, and Job Seekers, covering job search, applications, resume management, and interview scheduling
- **iNoteBook** — a cloud-based note-taking app
- **NewsMonkey** — a news aggregator with personalized feeds and real-time updates`,
    short: `Main highlights:

- **Solumina Admin Portal** — enterprise manufacturing admin platform, Kubernetes monitoring, log streaming, Keycloak/RBAC (Java 21, Spring Boot, Kubernetes)
- **Cluster-Deck** — MongoDB Atlas monitoring platform, multi-tenant RBAC, auto-scaling and cost analytics (Java, Spring Boot, Kotlin)
- **Nobilex** — Dutch notarial workflow platform, secure deed drafting/signing with Kadaster SYVAS integration (Kotlin, MongoDB)
- A few personal MERN projects too — a job recruitment portal, a note-taking app, and a news aggregator`,
  },

  certificates: {
    question: "What certifications do you have?",
    title: "Certifications",
    response: `Nothing groundbreaking here, honestly — just steady learning alongside the day-to-day engineering work.

**Certifications:**
📜 Database Management System — NPTEL
📜 Machine Learning — Coursera
📜 Introduction to Cloud Development with HTML, CSS and JavaScript — IBM
📜 Oracle Cloud Infrastructure Generative AI Professional — Oracle

That last one was mostly me trying to stay current as gen AI started showing up more in real engineering workflows.

**Hackathons:**
🏆 SSIP Hackathon Participation — 2023
🏆 Cygnet Build-A-Thon 2025 — Cygnet.One Internal Hackathon

Those tend to be some of the more fun, high-pressure learning experiences — a lot gets figured out in a short window.`,
    short: `A handful of certifications and a couple of hackathons:

- 📜 Database Management System (NPTEL), Machine Learning (Coursera)
- 📜 Cloud Development with HTML/CSS/JS (IBM), Generative AI Professional (Oracle)
- 🏆 SSIP Hackathon (2023), Cygnet Build-A-Thon (2025)`,
  },
};