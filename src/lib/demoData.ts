// Centralized Demo / Mock Data Store for Chronos
// Provides fully populated, realistic workspace data when in demo mode or offline.

export const DEMO_USERS = [
  {
    _id: 'demo-user-001',
    id: 'demo-user-001',
    name: 'James Lewis',
    email: 'james@chronos.demo',
    title: 'Founder & CEO',
    role: 'admin' as const,
    avatarUrl: '',
    isActive: true,
  },
  {
    _id: 'demo-user-002',
    id: 'demo-user-002',
    name: 'Sarah Chen',
    email: 'sarah@chronos.demo',
    title: 'Lead Product Designer',
    role: 'member' as const,
    avatarUrl: '',
    isActive: true,
  },
  {
    _id: 'demo-user-003',
    id: 'demo-user-003',
    name: 'Alex Patel',
    email: 'alex@chronos.demo',
    title: 'Staff Full-Stack Engineer',
    role: 'member' as const,
    avatarUrl: '',
    isActive: true,
  },
  {
    _id: 'demo-user-004',
    id: 'demo-user-004',
    name: 'Maria Garcia',
    email: 'maria@chronos.demo',
    title: 'VP of Product',
    role: 'admin' as const,
    avatarUrl: '',
    isActive: true,
  },
  {
    _id: 'demo-user-005',
    id: 'demo-user-005',
    name: 'David Kim',
    email: 'david@chronos.demo',
    title: 'Senior DevOps Engineer',
    role: 'member' as const,
    avatarUrl: '',
    isActive: true,
  },
]

const todayStr = new Date().toISOString()
const todayDateStr = todayStr.split('T')[0]
const tomorrowDateStr = new Date(Date.now() + 86400000).toISOString().split('T')[0]
const nextWeekDateStr = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]

export let demoProjects = [
  {
    _id: 'proj-1',
    id: 'proj-1',
    name: 'Website Redesign & Brand V2',
    description: 'Overhaul the marketing site with a new brand design system, interactive canvas, and dark mode.',
    color: '#6366f1',
    status: 'active' as const,
    ownerId: DEMO_USERS[0],
    members: [DEMO_USERS[0], DEMO_USERS[1], DEMO_USERS[2], DEMO_USERS[3]],
    dueDate: nextWeekDateStr,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: todayStr,
    taskStats: [
      { _id: 'todo', count: 2 },
      { _id: 'in_progress', count: 2 },
      { _id: 'review', count: 2 },
      { _id: 'done', count: 3 },
    ],
  },
  {
    _id: 'proj-2',
    id: 'proj-2',
    name: 'Mobile App V2 (iOS & Android)',
    description: 'Offline-first React Native mobile client with local SQLite sync, push notifications, and biometric auth.',
    color: '#22c55e',
    status: 'active' as const,
    ownerId: DEMO_USERS[3],
    members: [DEMO_USERS[0], DEMO_USERS[2], DEMO_USERS[3], DEMO_USERS[4]],
    dueDate: nextWeekDateStr,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: todayStr,
    taskStats: [
      { _id: 'todo', count: 1 },
      { _id: 'in_progress', count: 2 },
      { _id: 'review', count: 1 },
      { _id: 'done', count: 2 },
    ],
  },
  {
    _id: 'proj-3',
    id: 'proj-3',
    name: 'AI Outreach Engine',
    description: 'Automated multi-touch outreach workflow builder with LLM personalization, jitter rate limits, and webhooks.',
    color: '#a855f7',
    status: 'active' as const,
    ownerId: DEMO_USERS[0],
    members: [DEMO_USERS[0], DEMO_USERS[2], DEMO_USERS[3]],
    dueDate: nextWeekDateStr,
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: todayStr,
    taskStats: [
      { _id: 'todo', count: 1 },
      { _id: 'in_progress', count: 1 },
      { _id: 'review', count: 1 },
      { _id: 'done', count: 2 },
    ],
  },
  {
    _id: 'proj-4',
    id: 'proj-4',
    name: 'SOC-2 Type II Compliance',
    description: 'Cloud security audit, automated vulnerability scanning, and evidence collection across AWS infrastructure.',
    color: '#06b6d4',
    status: 'paused' as const,
    ownerId: DEMO_USERS[4],
    members: [DEMO_USERS[0], DEMO_USERS[4]],
    dueDate: nextWeekDateStr,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: todayStr,
    taskStats: [
      { _id: 'todo', count: 2 },
      { _id: 'in_progress', count: 1 },
      { _id: 'review', count: 0 },
      { _id: 'done', count: 1 },
    ],
  },
]

export let demoTasks = [
  // Web Project Tasks
  {
    _id: 'task-1',
    id: 'task-1',
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    title: 'Approve homepage copy & hero interactive demo',
    description: 'Review the high-conversion copy and interactive canvas widget before landing page launch.',
    status: 'review' as const,
    priority: 'urgent' as const,
    assigneeId: DEMO_USERS[0], // James Lewis (logged in user)
    createdBy: DEMO_USERS[1],
    dueDate: todayDateStr, // Due today!
    position: 0,
    tags: ['design', 'frontend'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-2',
    id: 'task-2',
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    title: 'Review AI personalization prompt templates',
    description: 'Ensure prompt templates have guardrails and fallback values for missing lead fields.',
    status: 'in_progress' as const,
    priority: 'high' as const,
    assigneeId: DEMO_USERS[0], // James Lewis
    createdBy: DEMO_USERS[0],
    dueDate: todayDateStr, // Due today!
    position: 1,
    tags: ['ai', 'prompt-eng'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-3',
    id: 'task-3',
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    title: 'Design dark/light mode token system',
    description: 'Establish unified CSS custom properties for all elevated surfaces and borders.',
    status: 'done' as const,
    priority: 'high' as const,
    assigneeId: DEMO_USERS[1], // Sarah Chen
    createdBy: DEMO_USERS[0],
    dueDate: todayDateStr,
    position: 0,
    tags: ['design-system'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-4',
    id: 'task-4',
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    title: 'Implement animated hero canvas with Framer Motion',
    description: 'Build interactive drag-and-drop workflow nodes with custom spring physics.',
    status: 'in_progress' as const,
    priority: 'high' as const,
    assigneeId: DEMO_USERS[2], // Alex Patel
    createdBy: DEMO_USERS[0],
    dueDate: tomorrowDateStr,
    position: 2,
    tags: ['frontend', 'animation'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-5',
    id: 'task-5',
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    title: 'Audit Lighthouse Core Web Vitals (LCP < 1.2s)',
    description: 'Optimize hero WebP assets and inline critical CSS for high PageSpeed score.',
    status: 'todo' as const,
    priority: 'medium' as const,
    assigneeId: DEMO_USERS[2],
    createdBy: DEMO_USERS[0],
    dueDate: tomorrowDateStr,
    position: 0,
    tags: ['perf', 'seo'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-6',
    id: 'task-6',
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    title: 'Write technical spec for multilingual translations',
    description: 'Draft dictionary structure and useT() hook specifications across 10 locales.',
    status: 'done' as const,
    priority: 'medium' as const,
    assigneeId: DEMO_USERS[0], // James Lewis
    createdBy: DEMO_USERS[3],
    dueDate: todayDateStr,
    position: 1,
    tags: ['i18n', 'spec'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-7',
    id: 'task-7',
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    title: 'Finalize pricing table & feature comparison matrix',
    description: 'Align starter, growth, and enterprise tier feature gates with marketing team.',
    status: 'todo' as const,
    priority: 'low' as const,
    assigneeId: DEMO_USERS[3],
    createdBy: DEMO_USERS[0],
    dueDate: nextWeekDateStr,
    position: 1,
    tags: ['pricing', 'product'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-8',
    id: 'task-8',
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    title: 'Setup Google & Credentials OAuth handlers',
    description: 'Configure NextAuth JWT sessions with credentials provider and demo mode bypass.',
    status: 'done' as const,
    priority: 'high' as const,
    assigneeId: DEMO_USERS[2],
    createdBy: DEMO_USERS[0],
    dueDate: todayDateStr,
    position: 2,
    tags: ['auth', 'backend'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-9',
    id: 'task-9',
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    title: 'Cross-browser QA on Safari & Chrome mobile',
    description: 'Verify touch responsiveness, bottom navigation sheet, and viewport meta scaling.',
    status: 'review' as const,
    priority: 'medium' as const,
    assigneeId: DEMO_USERS[1],
    createdBy: DEMO_USERS[3],
    dueDate: tomorrowDateStr,
    position: 1,
    tags: ['qa', 'mobile'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },

  // Mobile App Tasks
  {
    _id: 'task-10',
    id: 'task-10',
    projectId: { _id: 'proj-2', name: 'Mobile App V2 (iOS & Android)', color: '#22c55e' },
    title: 'Configure WatermelonDB local schema & migrations',
    description: 'Setup SQLite persistent schema for fast offline reading of tasks and messages.',
    status: 'done' as const,
    priority: 'high' as const,
    assigneeId: DEMO_USERS[2],
    createdBy: DEMO_USERS[3],
    dueDate: todayDateStr,
    position: 0,
    tags: ['db', 'offline'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-11',
    id: 'task-11',
    projectId: { _id: 'proj-2', name: 'Mobile App V2 (iOS & Android)', color: '#22c55e' },
    title: 'Build biometric FaceID / TouchID auth prompt',
    description: 'Integrate native biometrics for quick workspace unlock without entering passwords.',
    status: 'in_progress' as const,
    priority: 'high' as const,
    assigneeId: DEMO_USERS[0], // James Lewis
    createdBy: DEMO_USERS[3],
    dueDate: tomorrowDateStr,
    position: 1,
    tags: ['security', 'mobile'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-12',
    id: 'task-12',
    projectId: { _id: 'proj-2', name: 'Mobile App V2 (iOS & Android)', color: '#22c55e' },
    title: 'Push notification background handler',
    description: 'Handle APNS and FCM payloads for real-time task mentions and chat replies.',
    status: 'in_progress' as const,
    priority: 'urgent' as const,
    assigneeId: DEMO_USERS[4],
    createdBy: DEMO_USERS[0],
    dueDate: tomorrowDateStr,
    position: 2,
    tags: ['notifications'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-13',
    id: 'task-13',
    projectId: { _id: 'proj-2', name: 'Mobile App V2 (iOS & Android)', color: '#22c55e' },
    title: 'Test offline sync conflict resolution strategy',
    description: 'Validate last-write-wins with server timestamp checks during reconnect.',
    status: 'review' as const,
    priority: 'high' as const,
    assigneeId: DEMO_USERS[2],
    createdBy: DEMO_USERS[3],
    dueDate: tomorrowDateStr,
    position: 0,
    tags: ['sync', 'offline'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-14',
    id: 'task-14',
    projectId: { _id: 'proj-2', name: 'Mobile App V2 (iOS & Android)', color: '#22c55e' },
    title: 'Prepare App Store TestFlight beta release build',
    description: 'Upload signed IPA binary and configure changelog for external beta testers.',
    status: 'todo' as const,
    priority: 'medium' as const,
    assigneeId: DEMO_USERS[4],
    createdBy: DEMO_USERS[3],
    dueDate: nextWeekDateStr,
    position: 0,
    tags: ['ios', 'deploy'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },

  // AI Outreach Tasks
  {
    _id: 'task-15',
    id: 'task-15',
    projectId: { _id: 'proj-3', name: 'AI Outreach Engine', color: '#a855f7' },
    title: 'Build workflow node execution state machine',
    description: 'Implement execution flow supporting trigger, delay, AI message, and email delivery nodes.',
    status: 'done' as const,
    priority: 'urgent' as const,
    assigneeId: DEMO_USERS[2],
    createdBy: DEMO_USERS[0],
    dueDate: todayDateStr,
    position: 0,
    tags: ['engine', 'workflows'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-16',
    id: 'task-16',
    projectId: { _id: 'proj-3', name: 'AI Outreach Engine', color: '#a855f7' },
    title: 'Implement randomized jitter delay to mimic human behavior',
    description: 'Add safety scheduling so bulk emails are spaced with natural 90-240s delays.',
    status: 'done' as const,
    priority: 'high' as const,
    assigneeId: DEMO_USERS[0], // James Lewis
    createdBy: DEMO_USERS[0],
    dueDate: todayDateStr,
    position: 1,
    tags: ['safety', 'anti-spam'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-17',
    id: 'task-17',
    projectId: { _id: 'proj-3', name: 'AI Outreach Engine', color: '#a855f7' },
    title: 'n8n webhook integration for external workflow triggers',
    description: 'Allow outreach steps to dispatch payloads to n8n pipelines for CRM synchronization.',
    status: 'in_progress' as const,
    priority: 'high' as const,
    assigneeId: DEMO_USERS[2],
    createdBy: DEMO_USERS[0],
    dueDate: tomorrowDateStr,
    position: 0,
    tags: ['webhooks', 'n8n'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-18',
    id: 'task-18',
    projectId: { _id: 'proj-3', name: 'AI Outreach Engine', color: '#a855f7' },
    title: 'Live execution visualizer on dot-grid canvas',
    description: 'Animate active node borders and pulse states as leads advance through sequence.',
    status: 'review' as const,
    priority: 'medium' as const,
    assigneeId: DEMO_USERS[1],
    createdBy: DEMO_USERS[0],
    dueDate: tomorrowDateStr,
    position: 0,
    tags: ['canvas', 'ui'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
  {
    _id: 'task-19',
    id: 'task-19',
    projectId: { _id: 'proj-3', name: 'AI Outreach Engine', color: '#a855f7' },
    title: 'Add CSV / Excel bulk lead importer with column mapping',
    description: 'Support automatic header recognition for First Name, Company, Email, and LinkedIn.',
    status: 'todo' as const,
    priority: 'medium' as const,
    assigneeId: DEMO_USERS[3],
    createdBy: DEMO_USERS[0],
    dueDate: nextWeekDateStr,
    position: 0,
    tags: ['import', 'csv'],
    createdAt: todayStr,
    updatedAt: todayStr,
  },
]

export let demoActivity = [
  {
    _id: 'act-1',
    actorId: DEMO_USERS[1], // Sarah Chen
    action: 'moved_task' as const,
    entityType: 'task' as const,
    entityId: 'task-1',
    entityTitle: 'Approve homepage copy & hero interactive demo',
    metadata: { from: 'in_progress', to: 'review' },
    createdAt: new Date(Date.now() - 8 * 60000).toISOString(),
  },
  {
    _id: 'act-2',
    actorId: DEMO_USERS[0], // James Lewis
    action: 'updated_project' as const,
    entityType: 'project' as const,
    entityId: 'proj-3',
    entityTitle: 'AI Outreach Engine',
    createdAt: new Date(Date.now() - 22 * 60000).toISOString(),
  },
  {
    _id: 'act-3',
    actorId: DEMO_USERS[2], // Alex Patel
    action: 'moved_task' as const,
    entityType: 'task' as const,
    entityId: 'task-16',
    entityTitle: 'Implement randomized jitter delay to mimic human behavior',
    metadata: { from: 'review', to: 'done' },
    createdAt: new Date(Date.now() - 55 * 60000).toISOString(),
  },
  {
    _id: 'act-4',
    actorId: DEMO_USERS[3], // Maria Garcia
    action: 'created_document' as const,
    entityType: 'document' as const,
    entityId: 'doc-1',
    entityTitle: 'Q3 Product Strategy & Roadmap',
    createdAt: new Date(Date.now() - 110 * 60000).toISOString(),
  },
  {
    _id: 'act-5',
    actorId: DEMO_USERS[4], // David Kim
    action: 'created_task' as const,
    entityType: 'task' as const,
    entityId: 'task-12',
    entityTitle: 'Push notification background handler',
    createdAt: new Date(Date.now() - 180 * 60000).toISOString(),
  },
  {
    _id: 'act-6',
    actorId: DEMO_USERS[0], // James Lewis
    action: 'created_task' as const,
    entityType: 'task' as const,
    entityId: 'task-2',
    entityTitle: 'Review AI personalization prompt templates',
    createdAt: new Date(Date.now() - 240 * 60000).toISOString(),
  },
]

export let demoDocs = [
  {
    _id: 'doc-1',
    id: 'doc-1',
    title: 'Q3 Product Strategy & Roadmap',
    type: 'prd' as const,
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    authorId: DEMO_USERS[3],
    isPinned: true,
    content: `<h1>Q3 Product Strategy & Roadmap</h1>
<p><strong>Executive Summary:</strong> Accelerate early-stage startup adoption by unifying project management, team messaging, and AI outreach workflows into one frictionless workspace.</p>
<h2>1. Strategic Objectives</h2>
<ul>
<li><strong>Frictionless Onboarding:</strong> Single-click demo access with rich sample datasets.</li>
<li><strong>Autonomous AI Workflows:</strong> Multi-step outreach automation powered by Groq LLMs.</li>
<li><strong>Global Reach:</strong> Complete UI localization across 10 international languages.</li>
</ul>
<h2>2. Success Metrics</h2>
<p>Targeting 45% increase in weekly active collaborative teams and 70% faster project setup.</p>`,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: todayStr,
  },
  {
    _id: 'doc-2',
    id: 'doc-2',
    title: 'Architecture RFC: Event-Driven Workflow Engine',
    type: 'technical' as const,
    projectId: { _id: 'proj-3', name: 'AI Outreach Engine', color: '#a855f7' },
    authorId: DEMO_USERS[2],
    isPinned: true,
    content: `<h1>Architecture RFC: Event-Driven Outreach Engine</h1>
<p><strong>Author:</strong> Alex Patel (Staff Engineer)</p>
<h2>Architecture Overview</h2>
<p>The workflow engine executes complex DAG sequences of actions including:</p>
<ol>
<li><strong>Trigger:</strong> New lead imported or tag applied.</li>
<li><strong>AI Message:</strong> Context-aware email drafting with custom variable interpolation.</li>
<li><strong>Human Jitter Delay:</strong> Random delay interval (90s - 300s) preventing mail provider rate limits.</li>
<li><strong>Delivery:</strong> SMTP dispatch with open/click tracking webhooks.</li>
</ol>`,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: todayStr,
  },
  {
    _id: 'doc-3',
    id: 'doc-3',
    title: 'Sprint 24 Retrospective & Key Takeaways',
    type: 'meeting_notes' as const,
    authorId: DEMO_USERS[0],
    isPinned: false,
    content: `<h1>Sprint 24 Retrospective</h1>
<p><strong>Date:</strong> November 2026 | <strong>Facilitator:</strong> James Lewis</p>
<h3>What Went Exceptionally Well</h3>
<ul>
<li>Next.js 16.1 Turbopack migration reduced build times by 65%.</li>
<li>Added full support for dark mode and dynamic theme transitions.</li>
<li>One-click demo mode established for instant portfolio showcase.</li>
</ul>
<h3>Action Items</h3>
<ul>
<li>Complete mobile offline sync tests.</li>
<li>Polish Outreach live execution telemetry visualizer.</li>
</ul>`,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: todayStr,
  },
  {
    _id: 'doc-4',
    id: 'doc-4',
    title: 'Brand Guidelines & Design Language V2',
    type: 'general' as const,
    projectId: { _id: 'proj-1', name: 'Website Redesign & Brand V2', color: '#6366f1' },
    authorId: DEMO_USERS[1],
    isPinned: false,
    content: `<h1>Brand Guidelines & Design Language V2</h1>
<p>Designed by Sarah Chen. Defines our typography, elevation tokens, and micro-interactions.</p>
<h2>Typography</h2>
<ul>
<li><strong>Display Font:</strong> Fraunces (Warm, authoritative editorial serif)</li>
<li><strong>Body Font:</strong> Instrument Sans (Crisp, clean geometric sans-serif)</li>
</ul>
<h2>Color Hierarchy</h2>
<p>Brand primary indigo (#6366f1), Emerald success (#22c55e), Amber warning (#f59e0b), and Rose danger (#ef4444).</p>`,
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    updatedAt: todayStr,
  },
]

export let demoLeads = [
  { _id: 'lead-1', firstName: 'Priya', lastName: 'Sharma', email: 'priya@techcorp.io', company: 'TechCorp Solutions', title: 'CEO & Founder', status: 'new', createdAt: todayStr },
  { _id: 'lead-2', firstName: 'James', lastName: 'Wilson', email: 'james@scaleup.com', company: 'ScaleUp Ventures', title: 'VP of Growth', status: 'contacted', createdAt: todayStr },
  { _id: 'lead-3', firstName: 'Aisha', lastName: 'Khan', email: 'aisha@growthlab.co', company: 'GrowthLab Digital', title: 'Head of Partnerships', status: 'in_sequence', createdAt: todayStr },
  { _id: 'lead-4', firstName: 'David', lastName: 'Chen', email: 'david@nextera.ai', company: 'NextEra AI Systems', title: 'Chief Technology Officer', status: 'in_sequence', createdAt: todayStr },
  { _id: 'lead-5', firstName: 'Elena', lastName: 'Rodriguez', email: 'elena@brightpath.com', company: 'BrightPath Capital', title: 'Managing Partner', status: 'replied', createdAt: todayStr },
  { _id: 'lead-6', firstName: 'Tom', lastName: 'Harris', email: 'tom@cloudnine.dev', company: 'CloudNine Cloud Ops', title: 'Engineering Director', status: 'converted', createdAt: todayStr },
  { _id: 'lead-7', firstName: 'Sophie', lastName: 'Martin', email: 'sophie@datawise.io', company: 'DataWise Analytics', title: 'Chief Operating Officer', status: 'opted_out', createdAt: todayStr },
  { _id: 'lead-8', firstName: 'Raj', lastName: 'Patel', email: 'raj@velocity.tech', company: 'Velocity Software', title: 'Director of Enterprise Sales', status: 'bounced', createdAt: todayStr },
]

export let demoWorkflows = [
  {
    _id: 'wf-1',
    id: 'wf-1',
    name: 'Cold Outreach — SaaS Founders',
    description: 'Automated cold outreach sequence for SaaS company founders with AI personalized intro and follow-up.',
    status: 'active',
    ownerId: 'demo-user-001',
    createdAt: todayStr,
    updatedAt: todayStr,
    nodes: [
      { id: 'trigger_1', type: 'trigger', position: { x: 250, y: 0 }, data: { label: 'Lead Imported', nodeType: 'trigger' } },
      { id: 'ai_1', type: 'aiMessage', position: { x: 250, y: 120 }, data: { label: 'AI Personalize Email', nodeType: 'aiMessage', promptTemplate: 'Write a concise, friendly email to {{firstName}} at {{company}} highlighting team velocity.' } },
      { id: 'delay_1', type: 'delay', position: { x: 250, y: 240 }, data: { label: 'Wait 2 Hours', nodeType: 'delay', delayMinutes: 120 } },
      { id: 'email_1', type: 'sendEmail', position: { x: 250, y: 360 }, data: { label: 'Send via SMTP', nodeType: 'sendEmail' } },
      { id: 'end_1', type: 'end', position: { x: 250, y: 480 }, data: { label: 'Sequence Complete', nodeType: 'end' } },
    ],
    edges: [
      { id: 'e1', source: 'trigger_1', target: 'ai_1' },
      { id: 'e2', source: 'ai_1', target: 'delay_1' },
      { id: 'e3', source: 'delay_1', target: 'email_1' },
      { id: 'e4', source: 'email_1', target: 'end_1' },
    ],
    config: { maxActionsPerHour: 50, maxActionsPerDay: 200, minDelaySeconds: 120 },
  },
  {
    _id: 'wf-2',
    id: 'wf-2',
    name: 'Inbound Demo Request Nurture',
    description: 'Automated scheduling follow-up for leads who submitted the interactive demo request form.',
    status: 'active',
    ownerId: 'demo-user-001',
    createdAt: todayStr,
    updatedAt: todayStr,
    nodes: [
      { id: 'trigger_1', type: 'trigger', position: { x: 250, y: 0 }, data: { label: 'Demo Request', nodeType: 'trigger' } },
      { id: 'ai_1', type: 'aiMessage', position: { x: 250, y: 120 }, data: { label: 'Draft Calendar Invite', nodeType: 'aiMessage' } },
      { id: 'email_1', type: 'sendEmail', position: { x: 250, y: 240 }, data: { label: 'Send Booking Link', nodeType: 'sendEmail' } },
      { id: 'end_1', type: 'end', position: { x: 250, y: 360 }, data: { label: 'Complete', nodeType: 'end' } },
    ],
    edges: [
      { id: 'e1', source: 'trigger_1', target: 'ai_1' },
      { id: 'e2', source: 'ai_1', target: 'email_1' },
      { id: 'e3', source: 'email_1', target: 'end_1' },
    ],
  },
]

export const demoExecutions = [
  {
    _id: 'exec-1',
    workflowId: { _id: 'wf-1', name: 'Cold Outreach — SaaS Founders' },
    leadId: demoLeads[0],
    status: 'pending',
    currentNodeId: 'trigger_1',
    stepHistory: [],
    updatedAt: todayStr,
  },
  {
    _id: 'exec-2',
    workflowId: { _id: 'wf-1', name: 'Cold Outreach — SaaS Founders' },
    leadId: demoLeads[1],
    status: 'pending',
    currentNodeId: 'trigger_1',
    stepHistory: [],
    updatedAt: todayStr,
  },
  {
    _id: 'exec-3',
    workflowId: { _id: 'wf-1', name: 'Cold Outreach — SaaS Founders' },
    leadId: demoLeads[2],
    status: 'running',
    currentNodeId: 'ai_1',
    stepHistory: [{ nodeId: 'trigger_1', nodeType: 'trigger', executedAt: todayStr, result: 'success' }],
    updatedAt: todayStr,
  },
  {
    _id: 'exec-4',
    workflowId: { _id: 'wf-1', name: 'Cold Outreach — SaaS Founders' },
    leadId: demoLeads[3],
    status: 'paused',
    currentNodeId: 'delay_1',
    stepHistory: [
      { nodeId: 'trigger_1', nodeType: 'trigger', executedAt: todayStr, result: 'success' },
      {
        nodeId: 'ai_1',
        nodeType: 'aiMessage',
        executedAt: todayStr,
        result: 'success',
        messageGenerated: 'Hi David, noticed NextEra AI is pushing boundaries in modern AI agents. What if your engineering team could automate repetitive sprint setup and outreach in seconds? Would love to share a 2-min video walkthrough.',
      },
    ],
    nextExecutionAt: new Date(Date.now() + 90 * 60000).toISOString(),
    updatedAt: todayStr,
  },
  {
    _id: 'exec-5',
    workflowId: { _id: 'wf-1', name: 'Cold Outreach — SaaS Founders' },
    leadId: demoLeads[4],
    status: 'completed',
    currentNodeId: 'end_1',
    stepHistory: [
      { nodeId: 'trigger_1', nodeType: 'trigger', executedAt: todayStr, result: 'success' },
      {
        nodeId: 'ai_1',
        nodeType: 'aiMessage',
        executedAt: todayStr,
        result: 'success',
        messageGenerated: 'Hi Elena, BrightPath caught our attention. As Managing Partner, we built an all-in-one platform to streamline team project execution. Open to taking a look?',
      },
      { nodeId: 'delay_1', nodeType: 'delay', executedAt: todayStr, result: 'success', delayUsedSeconds: 120 },
      { nodeId: 'email_1', nodeType: 'sendEmail', executedAt: todayStr, result: 'success' },
      { nodeId: 'end_1', nodeType: 'end', executedAt: todayStr, result: 'success' },
    ],
    updatedAt: todayStr,
  },
  {
    _id: 'exec-6',
    workflowId: { _id: 'wf-1', name: 'Cold Outreach — SaaS Founders' },
    leadId: demoLeads[5],
    status: 'completed',
    currentNodeId: 'end_1',
    stepHistory: [
      { nodeId: 'trigger_1', nodeType: 'trigger', executedAt: todayStr, result: 'success' },
      {
        nodeId: 'ai_1',
        nodeType: 'aiMessage',
        executedAt: todayStr,
        result: 'success',
        messageGenerated: 'Hey Tom, CloudNine is doing phenomenal work. I think your engineering squad would appreciate a workspace that replaces four disconnected SaaS tools.',
      },
      { nodeId: 'delay_1', nodeType: 'delay', executedAt: todayStr, result: 'success', delayUsedSeconds: 180 },
      { nodeId: 'email_1', nodeType: 'sendEmail', executedAt: todayStr, result: 'success' },
      { nodeId: 'end_1', nodeType: 'end', executedAt: todayStr, result: 'success' },
    ],
    updatedAt: todayStr,
  },
  {
    _id: 'exec-7',
    workflowId: { _id: 'wf-1', name: 'Cold Outreach — SaaS Founders' },
    leadId: demoLeads[6],
    status: 'opted_out',
    currentNodeId: 'ai_1',
    stepHistory: [{ nodeId: 'trigger_1', nodeType: 'trigger', executedAt: todayStr, result: 'success' }],
    errorMessage: 'Recipient requested unsubscribe',
    updatedAt: todayStr,
  },
  {
    _id: 'exec-8',
    workflowId: { _id: 'wf-1', name: 'Cold Outreach — SaaS Founders' },
    leadId: demoLeads[7],
    status: 'failed',
    currentNodeId: 'email_1',
    stepHistory: [{ nodeId: 'trigger_1', nodeType: 'trigger', executedAt: todayStr, result: 'success' }],
    errorMessage: 'SMTP 550 Mailbox unavailable / bounced',
    updatedAt: todayStr,
  },
]

export const demoChats = [
  {
    _id: 'chat-1',
    isGroup: true,
    name: 'General Discussion',
    participants: DEMO_USERS,
    admin: DEMO_USERS[0]._id,
    lastMessageAt: todayStr,
    latestMessage: {
      content: 'Brand V2 tokens and docs are published. Take a look when you get a chance!',
      createdAt: todayStr,
    },
  },
  {
    _id: 'chat-2',
    isGroup: true,
    name: 'Product & Engineering',
    participants: [DEMO_USERS[0], DEMO_USERS[2], DEMO_USERS[3], DEMO_USERS[4]],
    admin: DEMO_USERS[3]._id,
    lastMessageAt: new Date(Date.now() - 40 * 60000).toISOString(),
    latestMessage: {
      content: 'CI build passed and deployment pipeline is green. Ready for QA.',
      createdAt: new Date(Date.now() - 40 * 60000).toISOString(),
    },
  },
  {
    _id: 'chat-3',
    isGroup: false,
    participants: [DEMO_USERS[0], DEMO_USERS[1]],
    lastMessageAt: new Date(Date.now() - 75 * 60000).toISOString(),
    latestMessage: {
      content: 'The new landing page aesthetic looks clean, James!',
      createdAt: new Date(Date.now() - 75 * 60000).toISOString(),
    },
  },
]

export const demoMessages: Record<string, any[]> = {
  'chat-1': [
    {
      _id: 'm-1',
      chatId: 'chat-1',
      senderId: DEMO_USERS[1],
      content: 'Good morning everyone! Just pushed the updated brand tokens into the design system.',
      createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
    },
    {
      _id: 'm-2',
      chatId: 'chat-1',
      senderId: DEMO_USERS[2],
      content: 'Awesome work Sarah, testing the dark mode variables on the Kanban board now.',
      createdAt: new Date(Date.now() - 95 * 60000).toISOString(),
    },
    {
      _id: 'm-3',
      chatId: 'chat-1',
      senderId: DEMO_USERS[0],
      content: 'Brand V2 tokens and docs are published. Take a look when you get a chance!',
      createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    },
  ],
  'chat-2': [
    {
      _id: 'm-4',
      chatId: 'chat-2',
      senderId: DEMO_USERS[3],
      content: 'Sprint 24 goals: finish offline sync testing and prepare for App Store submission.',
      createdAt: new Date(Date.now() - 90 * 60000).toISOString(),
    },
    {
      _id: 'm-5',
      chatId: 'chat-2',
      senderId: DEMO_USERS[4],
      content: 'CI build passed and deployment pipeline is green. Ready for QA.',
      createdAt: new Date(Date.now() - 40 * 60000).toISOString(),
    },
  ],
  'chat-3': [
    {
      _id: 'm-6',
      chatId: 'chat-3',
      senderId: DEMO_USERS[1],
      content: 'The new landing page aesthetic looks clean, James!',
      createdAt: new Date(Date.now() - 75 * 60000).toISOString(),
    },
    {
      _id: 'm-7',
      chatId: 'chat-3',
      senderId: DEMO_USERS[0],
      content: 'Thanks Sarah! Appreciate your help with the interactive workflow canvas!',
      createdAt: new Date(Date.now() - 60 * 60000).toISOString(),
    },
  ],
}


// ── Extra seed data so every screen looks lived-in ────────────────────────────
const minsAgo = (m: number) => new Date(Date.now() - m * 60000).toISOString()
const daysAgo = (d: number) => new Date(Date.now() - d * 86400000).toISOString()

// Leads
const extraLeads: [string, string, string, string, string, string][] = [
  ['Marcus', 'Bell', 'marcus@orbitlabs.io', 'Orbit Labs', 'Co-founder', 'contacted'],
  ['Nina', 'Fischer', 'nina@kernelworks.de', 'KernelWorks', 'CTO', 'new'],
  ['Omar', 'Haddad', 'omar@lumenpay.com', 'LumenPay', 'Head of Growth', 'in_sequence'],
  ['Grace', 'Okafor', 'grace@fieldnote.app', 'Fieldnote', 'CEO', 'replied'],
  ['Lucas', 'Moreau', 'lucas@pixelforge.fr', 'PixelForge', 'Product Director', 'new'],
  ['Hana', 'Sato', 'hana@mirai-ai.jp', 'Mirai AI', 'Founder', 'in_sequence'],
  ['Ben', 'Carter', 'ben@stackhaven.io', 'StackHaven', 'VP Engineering', 'contacted'],
  ['Isabel', 'Costa', 'isabel@novaretail.com.br', 'Nova Retail', 'COO', 'new'],
  ['Yusuf', 'Demir', 'yusuf@routeiq.com', 'RouteIQ', 'Head of Sales', 'converted'],
  ['Chloe', 'Bennett', 'chloe@northbeam.co', 'Northbeam', 'Marketing Lead', 'contacted'],
  ['Arjun', 'Mehta', 'arjun@finstack.in', 'FinStack', 'Managing Director', 'replied'],
  ['Laura', 'Novak', 'laura@brightlane.eu', 'Brightlane', 'Partnerships Manager', 'new'],
]
extraLeads.forEach(([firstName, lastName, email, company, title, status], i) => {
  demoLeads.push({ _id: `lead-${9 + i}`, firstName, lastName, email, company, title, status, createdAt: daysAgo(i % 6) })
})

// Executions for the new leads
const wf1 = { _id: 'wf-1', name: 'Cold Outreach — SaaS Founders' }
const wf2 = { _id: 'wf-2', name: 'Inbound Demo Request Nurture' }
const doneSteps = (msg: string) => [
  { nodeId: 'trigger_1', nodeType: 'trigger', executedAt: todayStr, result: 'success' },
  { nodeId: 'ai_1', nodeType: 'aiMessage', executedAt: todayStr, result: 'success', messageGenerated: msg },
  { nodeId: 'email_1', nodeType: 'sendEmail', executedAt: todayStr, result: 'success' },
]
demoExecutions.push(
  { _id: 'exec-9', workflowId: wf1, leadId: demoLeads[8], status: 'completed', currentNodeId: 'end_1', stepHistory: doneSteps('Hi Marcus, Orbit Labs’ launch last month was impressive. We help founding teams run projects, docs and outreach from one place — happy to show how.'), updatedAt: minsAgo(35) },
  { _id: 'exec-10', workflowId: wf1, leadId: demoLeads[10], status: 'running', currentNodeId: 'ai_1', stepHistory: [{ nodeId: 'trigger_1', nodeType: 'trigger', executedAt: minsAgo(4), result: 'success' }], updatedAt: minsAgo(4) },
  { _id: 'exec-11', workflowId: wf1, leadId: demoLeads[11], status: 'completed', currentNodeId: 'end_1', stepHistory: doneSteps('Hi Grace, saw Fieldnote hit 10k users — congrats! Curious how your team keeps sprints and customer follow-ups in sync.'), updatedAt: minsAgo(90) },
  { _id: 'exec-12', workflowId: wf2, leadId: demoLeads[13], status: 'running', currentNodeId: 'email_1', stepHistory: [{ nodeId: 'trigger_1', nodeType: 'trigger', executedAt: minsAgo(12), result: 'success' }, { nodeId: 'ai_1', nodeType: 'aiMessage', executedAt: minsAgo(11), result: 'success', messageGenerated: 'Hi Hana, thanks for requesting a demo! Here are a few times that work this week.' }], updatedAt: minsAgo(11) },
  { _id: 'exec-13', workflowId: wf2, leadId: demoLeads[16], status: 'completed', currentNodeId: 'end_1', stepHistory: doneSteps('Hi Yusuf, thanks for booking! Looking forward to walking RouteIQ through the workflow builder.'), updatedAt: minsAgo(300) },
  { _id: 'exec-14', workflowId: wf1, leadId: demoLeads[18], status: 'completed', currentNodeId: 'end_1', stepHistory: doneSteps('Hi Arjun, FinStack’s approach to SME lending caught my eye. Would a shared workspace for your ops team be useful?'), updatedAt: minsAgo(180) },
  { _id: 'exec-15', workflowId: wf1, leadId: demoLeads[14], status: 'paused', currentNodeId: 'delay_1', stepHistory: [{ nodeId: 'trigger_1', nodeType: 'trigger', executedAt: minsAgo(20), result: 'success' }], nextExecutionAt: new Date(Date.now() + 45 * 60000).toISOString(), updatedAt: minsAgo(20) },
  { _id: 'exec-16', workflowId: wf1, leadId: demoLeads[15], status: 'pending', currentNodeId: 'trigger_1', stepHistory: [], updatedAt: minsAgo(2) },
)

// Activity feed
const extraActivity: [number, string, string, string, string, number][] = [
  [1, 'moved_task', 'task', 'task-5', 'Dark mode variables for Kanban board', 300],
  [4, 'created_task', 'task', 'task-14', 'Biometric auth fallback flow', 420],
  [2, 'created_document', 'document', 'doc-4', 'Brand Guidelines & Design Language V2', 600],
  [3, 'updated_project', 'project', 'proj-2', 'Mobile App V2 (iOS & Android)', 780],
  [0, 'moved_task', 'task', 'task-8', 'Lead CSV import header detection', 1000],
  [4, 'updated_project', 'project', 'proj-4', 'SOC-2 Type II Compliance', 1300],
  [1, 'created_task', 'task', 'task-9', 'Pricing page redesign', 1500],
  [2, 'moved_task', 'task', 'task-11', 'Offline SQLite sync conflict resolution', 1800],
]
extraActivity.forEach(([u, action, entityType, entityId, entityTitle, m], i) => {
  demoActivity.push({
    _id: `act-${7 + i}`,
    actorId: DEMO_USERS[u],
    action: action as any,
    entityType: entityType as any,
    entityId,
    entityTitle,
    createdAt: minsAgo(m),
  } as any)
})

// Docs
demoDocs.push(...([
  {
    _id: 'doc-5', id: 'doc-5', title: 'Customer Interview Notes — Founders Round 2', type: 'meeting_notes' as const,
    projectId: { _id: 'proj-3', name: 'AI Outreach Engine', color: '#a855f7' }, authorId: DEMO_USERS[1], isPinned: false,
    content: `<h1>Customer Interview Notes — Founders Round 2</h1>
<p><strong>Participants:</strong> 6 early-stage founders | <strong>Interviewer:</strong> Sarah Chen</p>
<h2>Key Themes</h2>
<ul>
<li>Founders hate switching between a CRM, a task board and an email tool.</li>
<li>Personalised outreach converts, but writing it by hand does not scale.</li>
<li>Trust matters: they want human-like send timing and easy opt-outs.</li>
</ul>
<blockquote>"If it drafts the first email and I just approve it, that saves me an hour a day." — Founder, Fieldnote</blockquote>`,
    createdAt: daysAgo(4), updatedAt: daysAgo(1),
  },
  {
    _id: 'doc-6', id: 'doc-6', title: 'Mobile Release Checklist', type: 'general' as const,
    projectId: { _id: 'proj-2', name: 'Mobile App V2 (iOS & Android)', color: '#22c55e' }, authorId: DEMO_USERS[4], isPinned: false,
    content: `<h1>Mobile Release Checklist</h1>
<h2>Before submission</h2>
<ul>
<li>Offline sync soak test passes on both platforms</li>
<li>Push notification certificates renewed</li>
<li>Privacy manifest and data-safety forms updated</li>
<li>Crash-free sessions above 99.5% on TestFlight</li>
</ul>
<h2>Rollout</h2>
<p>Staged rollout: 5% → 25% → 100% over four days, monitored by on-call.</p>`,
    createdAt: daysAgo(6), updatedAt: daysAgo(2),
  },
  {
    _id: 'doc-7', id: 'doc-7', title: 'SOC-2 Evidence Collection Plan', type: 'technical' as const,
    projectId: { _id: 'proj-4', name: 'SOC-2 Type II Compliance', color: '#06b6d4' }, authorId: DEMO_USERS[4], isPinned: false,
    content: `<h1>SOC-2 Evidence Collection Plan</h1>
<p>Automated evidence gathering across AWS, GitHub and our identity provider.</p>
<ol>
<li><strong>Access reviews:</strong> quarterly export of IAM roles and group membership.</li>
<li><strong>Change management:</strong> pull-request approvals mapped to deployments.</li>
<li><strong>Vulnerability scanning:</strong> weekly reports archived for the audit window.</li>
</ol>`,
    createdAt: daysAgo(15), updatedAt: daysAgo(5),
  }
] as any[]))

// Extra chat history
demoMessages['chat-1'].unshift(
  { _id: 'm-8', chatId: 'chat-1', senderId: DEMO_USERS[3], content: 'Welcome to the new workspace, everyone — this is where we’ll share company-wide updates.', createdAt: minsAgo(60 * 26) },
  { _id: 'm-9', chatId: 'chat-1', senderId: DEMO_USERS[4], content: 'Reminder: SOC-2 evidence review is on Thursday. Please check your assigned tasks.', createdAt: minsAgo(60 * 24) },
)
demoMessages['chat-2'].push(
  { _id: 'm-10', chatId: 'chat-2', senderId: DEMO_USERS[0], content: 'Great. Alex, can you confirm the workflow engine rate limits before we flip the flag?', createdAt: minsAgo(30) },
  { _id: 'm-11', chatId: 'chat-2', senderId: DEMO_USERS[2], content: 'Confirmed — 50/hour and 200/day per workspace, with 2–5 minute jitter between sends.', createdAt: minsAgo(25) },
)
demoMessages['chat-3'].push(
  { _id: 'm-12', chatId: 'chat-3', senderId: DEMO_USERS[1], content: 'Anytime! I’ll send over the final hero animation by end of day.', createdAt: minsAgo(50) },
)
