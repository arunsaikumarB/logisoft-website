export type ServicePageSlug =
  | 'tech-services'
  | 'cyber-security'
  | 'cloud-services'
  | 'dynamics-crm'
  | 'salesforce-cpq-clm'
  | 'snowflake-services';

export type HeroVariant =
  | 'split-left'
  | 'split-shield'
  | 'center-cloud'
  | 'gradient-crm'
  | 'purple-enterprise'
  | 'data-viz';

export type IncludedLayout =
  | 'grid'
  | 'alternating'
  | 'bento'
  | 'cards-row'
  | 'mosaic'
  | 'timeline-cards';

export interface ServicePageTheme {
  accent: string;
  accentSecondary: string;
  glowColor: string;
  heroVariant: HeroVariant;
  includedLayout: IncludedLayout;
}

export interface ServicePageStat {
  value: string;
  label: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface WhyChooseItem {
  title: string;
  description: string;
}

export interface IndustryItem {
  name: string;
  description: string;
}

export interface SuccessStory {
  title: string;
  client: string;
  result: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServicePageConfig {
  slug: ServicePageSlug;
  path: string;
  title: string;
  tagline: string;
  description: string;
  theme: ServicePageTheme;
  stats: ServicePageStat[];
  benefits: string[];
  services: ServiceItem[];
  whyChoose: WhyChooseItem[];
  technologies: string[];
  industries: IndustryItem[];
  successStories: SuccessStory[];
  process: ProcessStep[];
  faqs: FaqItem[];
}

const servicePages: ServicePageConfig[] = [
  {
    slug: 'tech-services',
    path: '/services/tech-services',
    title: 'Technology Services',
    tagline: 'Build, modernize, and scale digital products with confidence.',
    description:
      'Logisoft delivers full-cycle technology services for organizations that need dependable engineering, faster releases, and measurable business impact across customer, operations, and data platforms.',
    theme: {
      accent: '#38BDF8',
      accentSecondary: '#0EA5E9',
      glowColor: 'rgba(56,189,248,0.35)',
      heroVariant: 'split-left',
      includedLayout: 'grid',
    },
    stats: [
      { value: '120+', label: 'Projects Delivered' },
      { value: '35%', label: 'Average Release Acceleration' },
      { value: '99.9%', label: 'Managed Platform Uptime' },
      { value: '24/7', label: 'Support Coverage Options' },
    ],
    benefits: [
      'Reduce time-to-market through product-aligned engineering squads.',
      'Improve platform reliability with automation-first delivery practices.',
      'Increase solution quality with architecture, QA, and DevSecOps integration.',
      'Scale delivery capacity without sacrificing governance or visibility.',
    ],
    services: [
      {
        title: 'Web & Mobile',
        description:
          'Design and build secure, high-performance web and mobile experiences aligned to business outcomes.',
      },
      {
        title: 'AI & ML',
        description:
          'Embed practical AI and machine learning capabilities into products, operations, and decision workflows.',
      },
      {
        title: 'Integrations',
        description:
          'Connect ERP, CRM, finance, and operational systems to streamline data exchange and process orchestration.',
      },
      {
        title: 'SMB',
        description:
          'Deliver right-sized technology roadmaps and managed delivery models for growing businesses.',
      },
      {
        title: 'Enterprise',
        description:
          'Modernize large-scale platforms with resilient architecture, governance controls, and phased transformation.',
      },
      {
        title: 'Support',
        description:
          'Provide proactive application and platform support with SLAs, monitoring, and incident management.',
      },
      {
        title: 'Managed',
        description:
          'Operate critical systems end-to-end with continuous optimization, capacity planning, and cost control.',
      },
      {
        title: 'Public Sector',
        description:
          'Implement compliant, secure digital services tailored to procurement, audit, and accessibility requirements.',
      },
      {
        title: 'Cyber Security',
        description:
          'Embed security engineering and risk mitigation into every phase of the technology lifecycle.',
      },
    ],
    whyChoose: [
      {
        title: 'Business-Driven Delivery',
        description:
          'Every engagement is tied to measurable KPIs such as cycle time, conversion, or operating efficiency.',
      },
      {
        title: 'Architecture Excellence',
        description:
          'Our architects define scalable foundations that support growth, integration, and long-term maintainability.',
      },
      {
        title: 'Transparent Governance',
        description:
          'Stakeholders get clear reporting, predictable sprint cadence, and risk visibility from day one.',
      },
      {
        title: 'Flexible Engagement Models',
        description:
          'Choose project-based, squad-based, or managed services models that fit your delivery maturity.',
      },
    ],
    technologies: [
      'React',
      'Node.js',
      '.NET',
      'TypeScript',
      'PostgreSQL',
      'Docker',
      'Azure DevOps',
      'GitHub Actions',
    ],
    industries: [
      {
        name: 'Financial Services',
        description:
          'Modernize customer platforms and internal systems with security, auditability, and uptime as core requirements.',
      },
      {
        name: 'Healthcare',
        description:
          'Enable compliant digital workflows, interoperability, and patient experience improvements across channels.',
      },
      {
        name: 'Manufacturing',
        description:
          'Unify production, supply chain, and service operations through connected applications and analytics.',
      },
      {
        name: 'Retail & E-commerce',
        description:
          'Improve conversion, fulfillment, and loyalty with scalable omnichannel digital platforms.',
      },
    ],
    successStories: [
      {
        title: 'Legacy Platform Modernization',
        client: 'Regional Banking Group',
        result:
          'Reduced release cycles from quarterly to biweekly and improved digital account opening completion by 28%.',
      },
      {
        title: 'Unified Customer Portal',
        client: 'Industrial Equipment Provider',
        result:
          'Consolidated five disconnected tools into one portal, cutting service response time by 41%.',
      },
      {
        title: 'Managed Delivery Transformation',
        client: 'Multi-Brand Retailer',
        result:
          'Stabilized core commerce systems and maintained 99.95% peak season availability across regions.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Discover',
        description:
          'Assess business priorities, technical constraints, and delivery goals through stakeholder workshops.',
      },
      {
        step: 2,
        title: 'Architect',
        description:
          'Define target-state architecture, integration approach, and implementation roadmap with measurable milestones.',
      },
      {
        step: 3,
        title: 'Build',
        description:
          'Execute iterative delivery with engineering, QA, and DevSecOps practices embedded across sprint cycles.',
      },
      {
        step: 4,
        title: 'Launch',
        description:
          'Coordinate release planning, performance validation, and change enablement for smooth production rollout.',
      },
      {
        step: 5,
        title: 'Optimize',
        description:
          'Continuously improve reliability, cost, and user outcomes through observability and feedback loops.',
      },
    ],
    faqs: [
      {
        question: 'How quickly can Logisoft start a technology services engagement?',
        answer:
          'Most engagements begin within two to four weeks after discovery, depending on team size and onboarding requirements.',
      },
      {
        question: 'Can you work with our existing internal engineering team?',
        answer:
          'Yes. We routinely collaborate as an extension of internal teams with shared tooling, standards, and sprint rituals.',
      },
      {
        question: 'Do you provide fixed-scope and managed service models?',
        answer:
          'Yes. We support fixed-scope projects, capacity-based teams, and fully managed services based on delivery objectives.',
      },
      {
        question: 'How do you ensure quality and delivery predictability?',
        answer:
          'We apply test automation, CI/CD controls, release governance, and KPI reporting to maintain quality and schedule confidence.',
      },
      {
        question: 'Can Logisoft support post-launch operations?',
        answer:
          'Absolutely. We provide SLA-backed support, incident response, enhancements, and roadmap planning after go-live.',
      },
    ],
  },
  {
    slug: 'cyber-security',
    path: '/services/cyber-security',
    title: 'Cyber Security Services',
    tagline: 'Protect critical systems with proactive, business-aligned security.',
    description:
      'Logisoft helps organizations strengthen cyber resilience through risk-led security programs, continuous monitoring, and practical controls that safeguard data, operations, and customer trust.',
    theme: {
      accent: '#60A5FA',
      accentSecondary: '#3B82F6',
      glowColor: 'rgba(96,165,250,0.32)',
      heroVariant: 'split-shield',
      includedLayout: 'alternating',
    },
    stats: [
      { value: '<15 min', label: 'Average Alert Triage Time' },
      { value: '60%', label: 'Reduction in Critical Vulnerabilities' },
      { value: '24/7', label: 'Threat Monitoring Coverage' },
      { value: '100%', label: 'Security Policy Traceability' },
    ],
    benefits: [
      'Reduce breach exposure with layered preventive and detective controls.',
      'Align security investments with business risk and compliance obligations.',
      'Accelerate incident response through mature workflows and playbooks.',
      'Embed security into development and operations without slowing delivery.',
    ],
    services: [
      {
        title: 'Cybersecurity Services',
        description:
          'Deliver end-to-end cyber security strategy, operations, and continuous improvement for modern enterprises.',
      },
    ],
    whyChoose: [
      {
        title: 'Risk-First Methodology',
        description:
          'We prioritize controls based on business impact, threat likelihood, and regulatory requirements.',
      },
      {
        title: 'Operational Security Expertise',
        description:
          'Our team combines governance, architecture, and SOC practices to secure both IT and cloud environments.',
      },
      {
        title: 'Actionable Roadmaps',
        description:
          'You receive phased remediation plans with ownership, effort estimates, and measurable risk reduction goals.',
      },
      {
        title: 'Continuous Improvement',
        description:
          'Security posture is reviewed regularly with quarterly maturity checkpoints and optimization recommendations.',
      },
    ],
    technologies: [
      'Microsoft Sentinel',
      'Splunk',
      'CrowdStrike',
      'Okta',
      'Azure Security Center',
      'Tenable',
      'Palo Alto Networks',
    ],
    industries: [
      {
        name: 'Banking & FinTech',
        description:
          'Protect sensitive financial data and transaction systems under strict regulatory and audit controls.',
      },
      {
        name: 'Healthcare Providers',
        description:
          'Secure patient data, connected systems, and remote access pathways in complex clinical environments.',
      },
      {
        name: 'Energy & Utilities',
        description:
          'Improve resilience of operational and information technology against evolving cyber threats.',
      },
      {
        name: 'Technology & SaaS',
        description:
          'Strengthen cloud-native security posture and reduce attack surface across distributed platforms.',
      },
    ],
    successStories: [
      {
        title: 'SOC Modernization Program',
        client: 'Global Logistics Enterprise',
        result:
          'Improved mean time to detect by 47% and reduced high-severity incident backlog within six months.',
      },
      {
        title: 'Zero-Trust Access Rollout',
        client: 'Healthcare Network',
        result:
          'Secured remote workforce access across 3,000+ users while passing third-party compliance assessments.',
      },
      {
        title: 'Vulnerability Remediation Acceleration',
        client: 'Digital Payments Provider',
        result:
          'Cut critical vulnerabilities by 62% and established recurring patch governance across all business units.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Assess Risk',
        description:
          'Baseline current posture with threat modeling, control review, and vulnerability analysis.',
      },
      {
        step: 2,
        title: 'Define Strategy',
        description:
          'Create a prioritized security roadmap aligned to risk appetite, budget, and compliance scope.',
      },
      {
        step: 3,
        title: 'Implement Controls',
        description:
          'Deploy identity, endpoint, network, and cloud security controls with clear operational ownership.',
      },
      {
        step: 4,
        title: 'Monitor & Respond',
        description:
          'Establish continuous monitoring, incident playbooks, and response workflows across critical environments.',
      },
      {
        step: 5,
        title: 'Review & Improve',
        description:
          'Track security KPIs, conduct exercises, and optimize controls as the threat landscape evolves.',
      },
    ],
    faqs: [
      {
        question: 'Do you provide one-time assessments or ongoing security services?',
        answer:
          'Both. We offer targeted assessments, remediation programs, and fully managed ongoing security operations.',
      },
      {
        question: 'Can Logisoft support regulatory compliance initiatives?',
        answer:
          'Yes. We map controls and evidence workflows for common frameworks and support audit preparation activities.',
      },
      {
        question: 'How do you minimize operational disruption during security rollouts?',
        answer:
          'We use phased implementation plans, pilot groups, and change management to maintain business continuity.',
      },
      {
        question: 'Do you cover cloud and hybrid environments?',
        answer:
          'Yes. Our services span on-premises, cloud, and hybrid estates with unified governance and monitoring.',
      },
      {
        question: 'How soon can incident response support begin?',
        answer:
          'Emergency response support can typically begin immediately after intake and access enablement.',
      },
    ],
  },
  {
    slug: 'cloud-services',
    path: '/services/cloud-services',
    title: 'Cloud Services',
    tagline: 'Accelerate cloud adoption while controlling risk and spend.',
    description:
      'Logisoft helps enterprises design, migrate, and operate cloud environments that are secure, resilient, and optimized for innovation across workloads, data, and AI.',
    theme: {
      accent: '#06B6D4',
      accentSecondary: '#0891B2',
      glowColor: 'rgba(6,182,212,0.3)',
      heroVariant: 'center-cloud',
      includedLayout: 'bento',
    },
    stats: [
      { value: '40%', label: 'Faster Migration Timelines' },
      { value: '30%', label: 'Average Cost Optimization' },
      { value: '99.95%', label: 'Availability Targets Achieved' },
      { value: '85%', label: 'Automation Coverage in Ops' },
    ],
    benefits: [
      'Migrate workloads with minimal disruption and clear business continuity planning.',
      'Improve cloud security posture using policy-driven controls and guardrails.',
      'Automate operations for faster provisioning, patching, and recovery.',
      'Control cloud costs through governance, FinOps discipline, and usage transparency.',
    ],
    services: [
      {
        title: 'AWS Migration & Modernization',
        description:
          'Move and modernize legacy workloads into scalable AWS architectures tailored for reliability and agility.',
      },
      {
        title: 'Cloud Managed Services',
        description:
          'Operate cloud platforms with monitoring, incident response, optimization, and SLA-backed support.',
      },
      {
        title: 'Security & Compliance',
        description:
          'Implement cloud-native security controls and compliance-aligned governance across environments.',
      },
      {
        title: 'DevOps & Automation',
        description:
          'Adopt infrastructure-as-code, CI/CD pipelines, and automated operations to improve release velocity.',
      },
      {
        title: 'Data & AI Solutions',
        description:
          'Build cloud data foundations and AI-ready architectures for analytics, forecasting, and decision support.',
      },
      {
        title: 'Training & Upskilling',
        description:
          'Enable internal teams with role-based cloud training, standards, and operational best practices.',
      },
    ],
    whyChoose: [
      {
        title: 'Cloud-Native Expertise',
        description:
          'Our architects and engineers design patterns that balance performance, security, and cost from the start.',
      },
      {
        title: 'Migration Discipline',
        description:
          'Structured assessment and migration waves reduce downtime risk and improve execution confidence.',
      },
      {
        title: 'Operational Maturity',
        description:
          'We establish runbooks, observability, and automation for predictable cloud operations at scale.',
      },
      {
        title: 'FinOps Focus',
        description:
          'Spend optimization is embedded in architecture and governance to prevent long-term cloud cost drift.',
      },
    ],
    technologies: [
      'AWS',
      'Azure',
      'Terraform',
      'Kubernetes',
      'Docker',
      'Jenkins',
      'Datadog',
      'Ansible',
    ],
    industries: [
      {
        name: 'Telecommunications',
        description:
          'Scale digital platforms and analytics workloads to meet demand, reliability, and latency requirements.',
      },
      {
        name: 'Insurance',
        description:
          'Modernize policy and claims systems while improving resiliency, compliance, and data governance.',
      },
      {
        name: 'Media & Entertainment',
        description:
          'Optimize high-volume content delivery and processing pipelines with elastic cloud infrastructure.',
      },
      {
        name: 'Professional Services',
        description:
          'Enable secure collaboration, integrated operations, and cloud-based delivery for distributed teams.',
      },
    ],
    successStories: [
      {
        title: 'Multi-Region Cloud Migration',
        client: 'Enterprise Distributor',
        result:
          'Migrated 120+ workloads with zero critical downtime and achieved 27% infrastructure cost savings.',
      },
      {
        title: 'Cloud Operations Standardization',
        client: 'Healthcare Technology Firm',
        result:
          'Introduced automation-first runbooks that reduced recurring incidents by 39% within two quarters.',
      },
      {
        title: 'Data Platform Modernization',
        client: 'Insurance Group',
        result:
          'Decreased analytics pipeline runtime by 52% and improved reporting freshness to near real-time.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Evaluate',
        description:
          'Assess current estate, workload dependencies, and business priorities to shape cloud strategy.',
      },
      {
        step: 2,
        title: 'Design',
        description:
          'Define target architecture, landing zones, security baselines, and migration sequencing.',
      },
      {
        step: 3,
        title: 'Migrate',
        description:
          'Execute migration waves with testing, rollback planning, and coordinated cutover controls.',
      },
      {
        step: 4,
        title: 'Operate',
        description:
          'Implement managed operations with monitoring, incident management, and SRE-aligned practices.',
      },
      {
        step: 5,
        title: 'Optimize',
        description:
          'Refine cost, performance, and governance continuously through FinOps and platform analytics.',
      },
    ],
    faqs: [
      {
        question: 'Do you support multi-cloud and hybrid cloud strategies?',
        answer:
          'Yes. We design and operate AWS, Azure, and hybrid models based on compliance, latency, and business needs.',
      },
      {
        question: 'Can you migrate legacy applications with minimal downtime?',
        answer:
          'Yes. We use phased migration waves, pilot cutovers, and rollback planning to protect business continuity.',
      },
      {
        question: 'How do you manage cloud cost governance?',
        answer:
          'We establish budgets, tagging standards, usage analytics, and optimization cadences with finance alignment.',
      },
      {
        question: 'Do you provide cloud security hardening services?',
        answer:
          'Absolutely. Security baselines, IAM controls, logging, and compliance guardrails are built into every engagement.',
      },
      {
        question: 'Can our internal teams be trained during implementation?',
        answer:
          'Yes. We include practical enablement sessions, documentation, and operating models for long-term adoption.',
      },
    ],
  },
  {
    slug: 'dynamics-crm',
    path: '/services/dynamics-crm',
    title: 'Dynamics CRM Services',
    tagline: 'Unify sales, service, and operations with Microsoft Dynamics.',
    description:
      'Logisoft delivers Microsoft Dynamics CRM solutions that improve customer engagement, automate workflows, and provide actionable visibility across the full revenue lifecycle.',
    theme: {
      accent: '#8B5CF6',
      accentSecondary: '#7C3AED',
      glowColor: 'rgba(139,92,246,0.32)',
      heroVariant: 'gradient-crm',
      includedLayout: 'cards-row',
    },
    stats: [
      { value: '32%', label: 'Average Sales Productivity Gain' },
      { value: '45%', label: 'Faster Lead-to-Opportunity Flow' },
      { value: '98%', label: 'User Adoption in 90 Days' },
      { value: '4x', label: 'Reporting Visibility Improvement' },
    ],
    benefits: [
      'Standardize customer data and process ownership across departments.',
      'Improve pipeline forecasting with cleaner data and real-time dashboards.',
      'Automate repetitive workflows to free teams for higher-value activities.',
      'Increase CRM adoption through intuitive design and role-based enablement.',
    ],
    services: [
      {
        title: 'Consulting & Advisory',
        description:
          'Align CRM vision, business process priorities, and implementation roadmap to measurable outcomes.',
      },
      {
        title: 'Implementation & Configuration',
        description:
          'Configure Dynamics CRM modules, entities, workflows, and user experiences around your operating model.',
      },
      {
        title: 'Integration & Automation',
        description:
          'Connect Dynamics with ERP, marketing, service, and finance systems for end-to-end process continuity.',
      },
      {
        title: 'Optimization & Support',
        description:
          'Improve data quality, performance, and usability through continuous enhancement and managed support.',
      },
      {
        title: 'Training & Enablement',
        description:
          'Equip teams with role-specific training, adoption playbooks, and governance for long-term success.',
      },
    ],
    whyChoose: [
      {
        title: 'Deep Microsoft Ecosystem Alignment',
        description:
          'We maximize value from Dynamics, Power Platform, and Microsoft 365 through integrated solution design.',
      },
      {
        title: 'Outcome-Focused CRM Programs',
        description:
          'Engagements are built around conversion, cycle time, and retention improvements, not just feature delivery.',
      },
      {
        title: 'Strong Data Governance',
        description:
          'We implement durable data standards and ownership models that sustain reporting integrity over time.',
      },
      {
        title: 'Adoption-Led Change Enablement',
        description:
          'Our rollout approach includes user segmentation, champion programs, and practical training assets.',
      },
    ],
    technologies: [
      'Microsoft Dynamics 365',
      'Power Automate',
      'Power Apps',
      'Azure Logic Apps',
      'Dataverse',
      'Microsoft Teams',
      'Power BI',
    ],
    industries: [
      {
        name: 'B2B Services',
        description:
          'Improve lead management, account planning, and renewals across multi-touch sales cycles.',
      },
      {
        name: 'Manufacturing',
        description:
          'Connect field sales, distributors, and service teams with unified customer and opportunity data.',
      },
      {
        name: 'Education',
        description:
          'Streamline recruitment, student engagement, and partner relationship management at scale.',
      },
      {
        name: 'Real Estate',
        description:
          'Enable faster deal progression and stronger client servicing through automated workflows.',
      },
    ],
    successStories: [
      {
        title: 'Global CRM Consolidation',
        client: 'Industrial Solutions Group',
        result:
          'Replaced three regional CRMs with a single Dynamics instance and increased sales forecast accuracy by 26%.',
      },
      {
        title: 'Service Workflow Automation',
        client: 'Facilities Management Provider',
        result:
          'Automated case routing and escalations, reducing average resolution time by 34%.',
      },
      {
        title: 'Pipeline Governance Initiative',
        client: 'Enterprise Technology Vendor',
        result:
          'Improved stage hygiene and opportunity visibility, enabling leadership to shorten sales cycle by 19%.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Align',
        description:
          'Map business objectives, customer journey priorities, and CRM success metrics with key stakeholders.',
      },
      {
        step: 2,
        title: 'Configure',
        description:
          'Implement core CRM structure, security roles, and process automations tailored to teams and functions.',
      },
      {
        step: 3,
        title: 'Integrate',
        description:
          'Connect CRM with surrounding systems and ensure data consistency through controlled integration flows.',
      },
      {
        step: 4,
        title: 'Enable',
        description:
          'Deliver user training, role playbooks, and governance models that support sustained adoption.',
      },
      {
        step: 5,
        title: 'Enhance',
        description:
          'Iterate based on usage data and evolving priorities to improve performance and business impact.',
      },
    ],
    faqs: [
      {
        question: 'Can you implement Dynamics CRM for multiple business units?',
        answer:
          'Yes. We design scalable multi-entity CRM models with controlled segmentation and shared governance.',
      },
      {
        question: 'Do you integrate Dynamics with existing ERP or marketing tools?',
        answer:
          'Yes. Integration is a core capability and includes API design, mapping, error handling, and monitoring.',
      },
      {
        question: 'How do you handle CRM data migration and cleanup?',
        answer:
          'We run structured migration cycles with profiling, cleansing rules, validation checkpoints, and reconciliation.',
      },
      {
        question: 'What support do users get after go-live?',
        answer:
          'We provide hypercare, managed support options, enhancement backlogs, and ongoing adoption guidance.',
      },
      {
        question: 'Can you help with Power Platform extensions?',
        answer:
          'Absolutely. We extend Dynamics with Power Apps, Power Automate, and Power BI for end-to-end process coverage.',
      },
    ],
  },
  {
    slug: 'salesforce-cpq-clm',
    path: '/services/salesforce-cpq-clm',
    title: 'Salesforce CPQ & CLM Services',
    tagline: 'Streamline quote-to-cash with faster deals and stronger control.',
    description:
      'Logisoft designs and implements Salesforce CPQ and CLM solutions that accelerate quoting, improve contract governance, and reduce revenue leakage across complex sales processes.',
    theme: {
      accent: '#3B82F6',
      accentSecondary: '#2563EB',
      glowColor: 'rgba(59,130,246,0.32)',
      heroVariant: 'purple-enterprise',
      includedLayout: 'mosaic',
    },
    stats: [
      { value: '50%', label: 'Faster Quote Turnaround' },
      { value: '30%', label: 'Reduction in Contract Cycle Time' },
      { value: '22%', label: 'Improved Win-Rate on Complex Deals' },
      { value: '99%', label: 'Pricing Rule Compliance' },
    ],
    benefits: [
      'Improve quote accuracy with configurable pricing and approval controls.',
      'Reduce contract bottlenecks through standardized clause and workflow management.',
      'Increase sales velocity while preserving margin and governance.',
      'Connect sales, legal, and finance on a single operational workflow.',
    ],
    services: [
      {
        title: 'Consulting & Advisory',
        description:
          'Define CPQ/CLM operating model, process blueprint, and phased roadmap for quote-to-cash maturity.',
      },
      {
        title: 'Implementation & Configuration',
        description:
          'Configure products, pricing rules, approvals, contract templates, and lifecycle workflows.',
      },
      {
        title: 'Integration & Optimization',
        description:
          'Integrate CPQ and CLM with CRM, ERP, billing, and e-sign systems while optimizing process performance.',
      },
      {
        title: 'Support & Managed Services',
        description:
          'Provide sustained administration, release management, and enhancement support for evolving business needs.',
      },
      {
        title: 'Training & Enablement',
        description:
          'Train sales, legal, and operations teams with role-based playbooks and governance standards.',
      },
    ],
    whyChoose: [
      {
        title: 'Quote-to-Cash Specialization',
        description:
          'Our consultants focus on revenue operations outcomes, balancing speed, compliance, and profitability.',
      },
      {
        title: 'Complex Pricing Expertise',
        description:
          'We design scalable logic for bundles, tiers, renewals, and discount governance in high-variance deal models.',
      },
      {
        title: 'Contract Lifecycle Discipline',
        description:
          'We establish clause governance, approval routing, and obligations tracking for cleaner contracting.',
      },
      {
        title: 'Cross-Functional Execution',
        description:
          'Sales, legal, finance, and IT are aligned through integrated delivery and adoption planning.',
      },
    ],
    technologies: [
      'Salesforce CPQ',
      'Salesforce Revenue Cloud',
      'Salesforce CLM',
      'DocuSign',
      'MuleSoft',
      'Salesforce Flow',
      'Tableau',
    ],
    industries: [
      {
        name: 'Technology Services',
        description:
          'Handle multi-year subscriptions, renewals, and usage-based pricing with controlled quote governance.',
      },
      {
        name: 'Telecom',
        description:
          'Support complex product bundles and region-specific contracting for enterprise and channel sales.',
      },
      {
        name: 'Manufacturing',
        description:
          'Improve configurable product quoting, approvals, and handoff to fulfillment and finance.',
      },
      {
        name: 'Business Services',
        description:
          'Standardize proposal-to-contract processes across distributed sales and delivery teams.',
      },
    ],
    successStories: [
      {
        title: 'Enterprise CPQ Overhaul',
        client: 'Global SaaS Provider',
        result:
          'Reduced quote generation time from two days to under four hours and improved discount compliance.',
      },
      {
        title: 'CLM Standardization Program',
        client: 'Managed Services Company',
        result:
          'Cut average contract redline cycles by 33% with standardized templates and approval workflows.',
      },
      {
        title: 'Integrated Revenue Operations',
        client: 'Telecom Solutions Integrator',
        result:
          'Connected CRM, CPQ, and billing workflows to reduce order fallout by 29%.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Diagnose',
        description:
          'Analyze current quote, approval, and contracting bottlenecks across departments.',
      },
      {
        step: 2,
        title: 'Blueprint',
        description:
          'Design pricing, product, and contract lifecycle architecture with policy-aligned governance.',
      },
      {
        step: 3,
        title: 'Configure',
        description:
          'Implement CPQ and CLM capabilities with staged testing for accuracy, scalability, and usability.',
      },
      {
        step: 4,
        title: 'Adopt',
        description:
          'Enable stakeholders with role-based training and operational playbooks for real-world execution.',
      },
      {
        step: 5,
        title: 'Scale',
        description:
          'Optimize rules, templates, and reporting as product portfolio and commercial models evolve.',
      },
    ],
    faqs: [
      {
        question: 'Can you implement CPQ and CLM together in one program?',
        answer:
          'Yes. We commonly deliver phased programs that integrate both solutions for end-to-end quote-to-cash continuity.',
      },
      {
        question: 'Do you support custom pricing and approval hierarchies?',
        answer:
          'Absolutely. We configure advanced pricing models and approval frameworks aligned to policy and margin targets.',
      },
      {
        question: 'Can Salesforce CPQ integrate with ERP and billing platforms?',
        answer:
          'Yes. We design robust integrations for product, pricing, order, and invoicing synchronization.',
      },
      {
        question: 'How do you improve user adoption for sales teams?',
        answer:
          'We simplify quoting experiences, reduce manual steps, and deliver role-specific training with guided playbooks.',
      },
      {
        question: 'What post-implementation support do you provide?',
        answer:
          'We offer managed administration, release support, enhancement governance, and KPI-based optimization cycles.',
      },
    ],
  },
  {
    slug: 'snowflake-services',
    path: '/services/snowflake-services',
    title: 'Snowflake Services',
    tagline: 'Turn enterprise data into trusted, scalable business intelligence.',
    description:
      'Logisoft helps organizations implement and optimize Snowflake data platforms for faster analytics, governed data sharing, and AI-ready architecture across business-critical domains.',
    theme: {
      accent: '#22D3EE',
      accentSecondary: '#0EA5E9',
      glowColor: 'rgba(34,211,238,0.34)',
      heroVariant: 'data-viz',
      includedLayout: 'timeline-cards',
    },
    stats: [
      { value: '55%', label: 'Faster Analytics Query Performance' },
      { value: '40%', label: 'Reduction in Data Pipeline Cost' },
      { value: '10x', label: 'Scalable Concurrent Workloads' },
      { value: '90%', label: 'Data Quality Rule Coverage' },
    ],
    benefits: [
      'Consolidate fragmented data estates into a governed Snowflake foundation.',
      'Deliver near real-time analytics for finance, operations, and customer teams.',
      'Improve trust in data through quality controls and lineage visibility.',
      'Enable advanced analytics and AI initiatives with scalable architecture.',
    ],
    services: [
      {
        title: 'Consulting & Advisory',
        description:
          'Define Snowflake strategy, target architecture, and governance priorities aligned to business goals.',
      },
      {
        title: 'Migration & Implementation',
        description:
          'Migrate legacy warehouses and implement Snowflake environments with reliable ingestion and transformation.',
      },
      {
        title: 'Optimization Services',
        description:
          'Tune performance, warehouse usage, and query design to improve speed and cost efficiency.',
      },
      {
        title: 'Data Security & Compliance',
        description:
          'Implement role-based access, masking, and audit controls to protect sensitive data assets.',
      },
      {
        title: 'Training & Enablement',
        description:
          'Upskill data teams on Snowflake operations, modeling standards, and analytics best practices.',
      },
    ],
    whyChoose: [
      {
        title: 'Data Platform Engineering Strength',
        description:
          'We combine architecture, data engineering, and governance expertise to deliver reliable data ecosystems.',
      },
      {
        title: 'Cost-Aware Performance Tuning',
        description:
          'Our optimization approach balances query performance with warehouse spend and workload patterns.',
      },
      {
        title: 'Governance by Design',
        description:
          'Security, lineage, and quality controls are incorporated early to sustain trust and compliance.',
      },
      {
        title: 'Business-Ready Analytics Delivery',
        description:
          'We prioritize use cases that create visible impact for operations, revenue, and executive decision-making.',
      },
    ],
    technologies: [
      'Snowflake',
      'dbt',
      'Fivetran',
      'Matillion',
      'Python',
      'Tableau',
      'Power BI',
      'Airflow',
    ],
    industries: [
      {
        name: 'Retail',
        description:
          'Unify sales, inventory, and customer data for demand forecasting and merchandising optimization.',
      },
      {
        name: 'Financial Services',
        description:
          'Enable governed analytics for risk, compliance, and performance reporting across complex data domains.',
      },
      {
        name: 'Healthcare & Life Sciences',
        description:
          'Consolidate clinical and operational data for faster insights while meeting privacy and audit requirements.',
      },
      {
        name: 'Logistics & Supply Chain',
        description:
          'Drive real-time visibility into network performance, delays, and capacity planning across operations.',
      },
    ],
    successStories: [
      {
        title: 'Enterprise Data Warehouse Migration',
        client: 'Regional Retail Group',
        result:
          'Migrated 300+ legacy reports to Snowflake and reduced reporting latency from 24 hours to under 2 hours.',
      },
      {
        title: 'Finance Analytics Modernization',
        client: 'Insurance Enterprise',
        result:
          'Enabled near real-time executive dashboards and cut monthly close analytics preparation time by 38%.',
      },
      {
        title: 'Data Governance Program',
        client: 'Global Logistics Provider',
        result:
          'Implemented access policies and quality rules that improved trusted data coverage across key domains.',
      },
    ],
    process: [
      {
        step: 1,
        title: 'Assess',
        description:
          'Review data landscape, critical use cases, and governance gaps to define migration priorities.',
      },
      {
        step: 2,
        title: 'Architect',
        description:
          'Design Snowflake account structure, data model strategy, and ingestion transformation patterns.',
      },
      {
        step: 3,
        title: 'Implement',
        description:
          'Build pipelines, models, and security controls with automated testing and deployment workflows.',
      },
      {
        step: 4,
        title: 'Operationalize',
        description:
          'Stand up monitoring, performance management, and ownership models for reliable daily operation.',
      },
      {
        step: 5,
        title: 'Expand',
        description:
          'Scale to new domains and analytics use cases while continually optimizing platform efficiency.',
      },
    ],
    faqs: [
      {
        question: 'Can Logisoft migrate us from traditional data warehouses to Snowflake?',
        answer:
          'Yes. We handle assessment, phased migration, validation, and cutover for legacy warehouse modernization.',
      },
      {
        question: 'Do you support both batch and near real-time data pipelines?',
        answer:
          'Yes. We design ingestion architectures for batch, micro-batch, and near real-time reporting needs.',
      },
      {
        question: 'How do you secure sensitive data in Snowflake?',
        answer:
          'We implement role-based controls, data masking, access policies, and audit-ready governance standards.',
      },
      {
        question: 'Can you optimize our existing Snowflake costs?',
        answer:
          'Absolutely. We assess workload patterns, warehouse sizing, and query design to reduce cost without sacrificing performance.',
      },
      {
        question: 'Do you provide training for internal data teams?',
        answer:
          'Yes. We offer practical enablement on modeling, operations, governance, and optimization for self-sufficient teams.',
      },
    ],
  },
];

export const servicePagesRecord: Record<ServicePageSlug, ServicePageConfig> = servicePages.reduce(
  (record, page) => {
    record[page.slug] = page;
    return record;
  },
  {} as Record<ServicePageSlug, ServicePageConfig>,
);

export function getServicePage(slug: ServicePageSlug): ServicePageConfig {
  return servicePagesRecord[slug];
}
