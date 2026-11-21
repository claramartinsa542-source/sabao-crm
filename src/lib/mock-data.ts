// Mock data for standalone frontend deployment (no backend required)
// This enables visual validation on Vercel before backend implementation

export type LeadStage = 'new' | 'qualified' | 'contacted' | 'negotiation' | 'closed_won' | 'closed_lost'
export type ProfileStatus = 'active' | 'paused' | 'rate_limited' | 'offline' | 'challenge'
export type AgentStatus = 'active' | 'paused' | 'error'
export type InteractionType = 'like' | 'follow' | 'dm_initiated' | 'dm_recipient_selected' | 'navigate' | 'comment_attempted' | 'message_sent'

export interface Lead {
  id: string
  handle: string
  fullName: string
  email?: string
  phone?: string
  bio?: string
  followersCount: number
  followingCount: number
  postsCount: number
  profileUrl: string
  currentStage: LeadStage
  assignedTo?: string
  assignedAgent?: string
  firstSeenAt: string
  lastUpdatedAt: string
  convertedAt?: string
  agentFilled: boolean
  sourceCampaign?: string
  sourceProfile?: string
}

export interface InstagramProfile {
  id: string
  profileId: string
  username: string
  displayName: string
  avatarUrl: string
  followersCount: number
  followingCount: number
  postsCount: number
  bio: string
  wsPort: number
  status: ProfileStatus
  lastActiveAt: string
  lastHeartbeat: string
}

export interface Agent {
  id: string
  name: string
  profileId: string
  status: AgentStatus
  actionsPerHour: number
  successRate: number
  uptime: number
  lastAction: string
  totalActions: number
}

export interface Campaign {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'completed'
  instagramProfileId: string
  agentId: string
  totalActions: number
  successCount: number
  failureCount: number
  successRate: number
  startedAt: string
  completedAt?: string
}

export interface FinancialRecord {
  id: string
  leadId: string
  campaignId?: string
  transactionType: 'revenue' | 'cost' | 'refund'
  amount: number
  currency: string
  description: string
  transactionDate: string
}

export interface Interaction {
  id: string
  leadId: string
  agentProfileId: string
  interactionType: InteractionType
  targetHandle: string
  timestamp: string
  success: boolean
  latencyMs: number
  errorMessage?: string
}

export interface Message {
  id: string
  leadId: string
  agentProfileId: string
  messageType: 'initial' | 'follow_up' | 'closing' | 'custom'
  copyVariation: string
  messageText: string
  sentAt: string
  delivered: boolean
  read: boolean
  replied: boolean
  repliedAt?: string
  responseTimeMs?: number
}

export interface DashboardMetrics {
  totalLeads: number
  newLeadsToday: number
  conversionsThisWeek: number
  revenueThisMonth: number
  responseRate: number
  activeAgents: number
  activeProfiles: number
  pendingActions: number
}

export interface PipelineData {
  stage: LeadStage
  label: string
  count: number
  leads: Lead[]
}

// Mock Leads
export const mockLeads: Lead[] = [
  {
    id: 'lead-001',
    handle: '@maria.silva',
    fullName: 'Maria Silva',
    email: 'maria@example.com',
    bio: 'Empreendedora digital | Marketing de conteúdo',
    followersCount: 12500,
    followingCount: 890,
    postsCount: 342,
    profileUrl: 'https://instagram.com/maria.silva',
    currentStage: 'qualified',
    assignedAgent: 'agent-001',
    firstSeenAt: '2026-11-15T10:30:00Z',
    lastUpdatedAt: '2026-11-20T14:22:00Z',
    agentFilled: true,
    sourceProfile: 'profile-001',
  },
  {
    id: 'lead-002',
    handle: '@joao.santos',
    fullName: 'João Santos',
    followersCount: 8900,
    followingCount: 450,
    postsCount: 156,
    profileUrl: 'https://instagram.com/joao.santos',
    currentStage: 'new',
    firstSeenAt: '2026-11-20T09:15:00Z',
    lastUpdatedAt: '2026-11-20T09:15:00Z',
    agentFilled: false,
    sourceProfile: 'profile-002',
  },
  {
    id: 'lead-003',
    handle: '@ana.costa',
    fullName: 'Ana Costa',
    email: 'ana.costa@email.com',
    phone: '+55 11 99999-0000',
    bio: 'Designer gráfico | Freelancer',
    followersCount: 5600,
    followingCount: 1200,
    postsCount: 89,
    profileUrl: 'https://instagram.com/ana.costa',
    currentStage: 'contacted',
    assignedAgent: 'agent-002',
    firstSeenAt: '2026-11-10T16:45:00Z',
    lastUpdatedAt: '2026-11-19T11:30:00Z',
    agentFilled: true,
    sourceProfile: 'profile-001',
  },
  {
    id: 'lead-004',
    handle: '@pedro.oliveira',
    fullName: 'Pedro Oliveira',
    followersCount: 23000,
    followingCount: 670,
    postsCount: 567,
    profileUrl: 'https://instagram.com/pedro.oliveira',
    currentStage: 'negotiation',
    assignedAgent: 'agent-001',
    firstSeenAt: '2026-11-05T08:00:00Z',
    lastUpdatedAt: '2026-11-20T16:45:00Z',
    agentFilled: true,
    sourceProfile: 'profile-003',
  },
  {
    id: 'lead-005',
    handle: '@carla.mendes',
    fullName: 'Carla Mendes',
    email: 'carla@business.com',
    bio: 'CEO @ StartupX | Tech enthusiast',
    followersCount: 45000,
    followingCount: 320,
    postsCount: 234,
    profileUrl: 'https://instagram.com/carla.mendes',
    currentStage: 'closed_won',
    assignedAgent: 'agent-003',
    firstSeenAt: '2026-10-28T12:00:00Z',
    lastUpdatedAt: '2026-11-18T09:00:00Z',
    convertedAt: '2026-11-18T09:00:00Z',
    agentFilled: true,
    sourceProfile: 'profile-002',
  },
  {
    id: 'lead-006',
    handle: '@lucas.ferreira',
    fullName: 'Lucas Ferreira',
    followersCount: 3200,
    followingCount: 890,
    postsCount: 45,
    profileUrl: 'https://instagram.com/lucas.ferreira',
    currentStage: 'closed_lost',
    firstSeenAt: '2026-11-01T14:30:00Z',
    lastUpdatedAt: '2026-11-15T10:00:00Z',
    agentFilled: false,
    sourceProfile: 'profile-001',
  },
]

// Mock Instagram Profiles
export const mockProfiles: InstagramProfile[] = [
  {
    id: 'profile-001',
    profileId: 'k1j96odp',
    username: 'luan_03',
    displayName: 'Luan 03',
    avatarUrl: '/placeholder-avatar.png',
    followersCount: 1250,
    followingCount: 890,
    postsCount: 45,
    bio: 'Agente de prospecção #1',
    wsPort: 56399,
    status: 'active',
    lastActiveAt: '2026-11-20T18:30:00Z',
    lastHeartbeat: '2026-11-20T18:32:00Z',
  },
  {
    id: 'profile-002',
    profileId: 'k1j95prq',
    username: 'anadasul35',
    displayName: 'Ana Dasul',
    avatarUrl: '/placeholder-avatar.png',
    followersCount: 3400,
    followingCount: 1200,
    postsCount: 123,
    bio: 'Agente de prospecção #2',
    wsPort: 50757,
    status: 'active',
    lastActiveAt: '2026-11-20T18:28:00Z',
    lastHeartbeat: '2026-11-20T18:31:00Z',
  },
  {
    id: 'profile-003',
    profileId: 'k1j97abc',
    username: 'prospect_bot_3',
    displayName: 'Prospect Bot 3',
    avatarUrl: '/placeholder-avatar.png',
    followersCount: 890,
    followingCount: 450,
    postsCount: 23,
    bio: 'Agente de prospecção #3',
    wsPort: 52100,
    status: 'rate_limited',
    lastActiveAt: '2026-11-20T17:45:00Z',
    lastHeartbeat: '2026-11-20T17:45:00Z',
  },
  {
    id: 'profile-004',
    profileId: 'k1j98def',
    username: 'growth_agent_4',
    displayName: 'Growth Agent 4',
    avatarUrl: '/placeholder-avatar.png',
    followersCount: 2100,
    followingCount: 780,
    postsCount: 67,
    bio: 'Agente de prospecção #4',
    wsPort: 53200,
    status: 'offline',
    lastActiveAt: '2026-11-19T22:00:00Z',
    lastHeartbeat: '2026-11-19T22:00:00Z',
  },
]

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: 'agent-001',
    name: 'Claude Opus - Luan 03',
    profileId: 'profile-001',
    status: 'active',
    actionsPerHour: 45,
    successRate: 94.5,
    uptime: 99.2,
    lastAction: 'like_post',
    totalActions: 1247,
  },
  {
    id: 'agent-002',
    name: 'Claude Sonnet - Ana Dasul',
    profileId: 'profile-002',
    status: 'active',
    actionsPerHour: 38,
    successRate: 91.2,
    uptime: 98.7,
    lastAction: 'dm_initiated',
    totalActions: 986,
  },
  {
    id: 'agent-003',
    name: 'Claude Opus - Prospect Bot 3',
    profileId: 'profile-003',
    status: 'paused',
    actionsPerHour: 0,
    successRate: 88.9,
    uptime: 95.3,
    lastAction: 'follow_profile',
    totalActions: 743,
  },
]

// Mock Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'campaign-001',
    name: 'Prospecção Hashtag #marketing',
    description: 'Campanha focada em leads de marketing digital',
    status: 'active',
    instagramProfileId: 'profile-001',
    agentId: 'agent-001',
    totalActions: 456,
    successCount: 423,
    failureCount: 33,
    successRate: 92.8,
    startedAt: '2026-11-15T08:00:00Z',
  },
  {
    id: 'campaign-002',
    name: 'Outreach Empreendedores',
    description: 'Contato direto com empreendedores digitais',
    status: 'active',
    instagramProfileId: 'profile-002',
    agentId: 'agent-002',
    totalActions: 312,
    successCount: 289,
    failureCount: 23,
    successRate: 92.6,
    startedAt: '2026-11-18T10:00:00Z',
  },
  {
    id: 'campaign-003',
    name: 'Follow-up Novembro',
    description: 'Follow-up com leads qualificados de outubro',
    status: 'completed',
    instagramProfileId: 'profile-001',
    agentId: 'agent-001',
    totalActions: 189,
    successCount: 178,
    failureCount: 11,
    successRate: 94.2,
    startedAt: '2026-11-01T09:00:00Z',
    completedAt: '2026-11-10T18:00:00Z',
  },
]

// Mock Financial Records
export const mockFinancialRecords: FinancialRecord[] = [
  { id: 'fin-001', leadId: 'lead-005', campaignId: 'campaign-001', transactionType: 'revenue', amount: 2500, currency: 'BRL', description: 'Fechamento pacote básico', transactionDate: '2026-11-18' },
  { id: 'fin-002', leadId: 'lead-004', campaignId: 'campaign-002', transactionType: 'revenue', amount: 4800, currency: 'BRL', description: 'Proposta aceita - aguardando pagamento', transactionDate: '2026-11-20' },
  { id: 'fin-003', leadId: 'lead-001', transactionType: 'cost', amount: 150, currency: 'BRL', description: 'Custo de aquisição (interações)', transactionDate: '2026-11-15' },
  { id: 'fin-004', leadId: 'lead-003', transactionType: 'cost', amount: 85, currency: 'BRL', description: 'Custo de aquisição (DMs enviadas)', transactionDate: '2026-11-10' },
]

// Mock Interactions
export const mockInteractions: Interaction[] = [
  { id: 'int-001', leadId: 'lead-001', agentProfileId: 'profile-001', interactionType: 'like', targetHandle: '@maria.silva', timestamp: '2026-11-15T10:30:00Z', success: true, latencyMs: 1200 },
  { id: 'int-002', leadId: 'lead-001', agentProfileId: 'profile-001', interactionType: 'follow', targetHandle: '@maria.silva', timestamp: '2026-11-15T10:32:00Z', success: true, latencyMs: 980 },
  { id: 'int-003', leadId: 'lead-001', agentProfileId: 'profile-001', interactionType: 'dm_initiated', targetHandle: '@maria.silva', timestamp: '2026-11-15T10:35:00Z', success: true, latencyMs: 2100 },
  { id: 'int-004', leadId: 'lead-003', agentProfileId: 'profile-001', interactionType: 'message_sent', targetHandle: '@ana.costa', timestamp: '2026-11-19T11:30:00Z', success: true, latencyMs: 1800 },
]

// Mock Messages
export const mockMessages: Message[] = [
  { id: 'msg-001', leadId: 'lead-001', agentProfileId: 'profile-001', messageType: 'initial', copyVariation: 'A', messageText: 'Olá Maria! Vi seu perfil e achei incrível seu trabalho com marketing de conteúdo...', sentAt: '2026-11-15T10:35:00Z', delivered: true, read: true, replied: true, repliedAt: '2026-11-15T14:20:00Z', responseTimeMs: 13500000 },
  { id: 'msg-002', leadId: 'lead-001', agentProfileId: 'profile-001', messageType: 'follow_up', copyVariation: 'B', messageText: 'Oi Maria! Tudo bem? Queria saber se você teve chance de ver minha mensagem anterior...', sentAt: '2026-11-17T09:00:00Z', delivered: true, read: true, replied: false },
  { id: 'msg-003', leadId: 'lead-003', agentProfileId: 'profile-001', messageType: 'initial', copyVariation: 'A', messageText: 'Oi Ana! Adorei seu portfólio de design. Temos uma oportunidade que pode te interessar...', sentAt: '2026-11-19T11:30:00Z', delivered: true, read: false, replied: false },
]

// Dashboard Metrics
export const mockDashboardMetrics: DashboardMetrics = {
  totalLeads: 1247,
  newLeadsToday: 23,
  conversionsThisWeek: 18,
  revenueThisMonth: 45800,
  responseRate: 34.5,
  activeAgents: 2,
  activeProfiles: 3,
  pendingActions: 156,
}

// Pipeline Data
export const mockPipelineData: PipelineData[] = [
  { stage: 'new', label: 'Novos', count: 45, leads: mockLeads.filter(l => l.currentStage === 'new') },
  { stage: 'qualified', label: 'Qualificados', count: 32, leads: mockLeads.filter(l => l.currentStage === 'qualified') },
  { stage: 'contacted', label: 'Contactados', count: 28, leads: mockLeads.filter(l => l.currentStage === 'contacted') },
  { stage: 'negotiation', label: 'Negociação', count: 15, leads: mockLeads.filter(l => l.currentStage === 'negotiation') },
  { stage: 'closed_won', label: 'Fechados (Ganho)', count: 12, leads: mockLeads.filter(l => l.currentStage === 'closed_won') },
  { stage: 'closed_lost', label: 'Fechados (Perda)', count: 8, leads: mockLeads.filter(l => l.currentStage === 'closed_lost') },
]

// Chart Data for Dashboard
export const mockChartData = {
  leadsOverTime: [
    { date: '2026-11-14', leads: 18, conversions: 3 },
    { date: '2026-11-15', leads: 24, conversions: 5 },
    { date: '2026-11-16', leads: 15, conversions: 2 },
    { date: '2026-11-17', leads: 31, conversions: 6 },
    { date: '2026-11-18', leads: 28, conversions: 4 },
    { date: '2026-11-19', leads: 22, conversions: 3 },
    { date: '2026-11-20', leads: 23, conversions: 5 },
  ],
  revenueBySource: [
    { source: 'Instagram DM', value: 28500 },
    { source: 'Hashtag Outreach', value: 12300 },
    { source: 'Referral', value: 5000 },
  ],
  agentPerformance: [
    { agent: 'Luan 03', actions: 456, success: 423, rate: 92.8 },
    { agent: 'Ana Dasul', actions: 312, success: 289, rate: 92.6 },
    { agent: 'Prospect Bot 3', actions: 189, success: 168, rate: 88.9 },
  ],
  responseRates: [
    { variation: 'Copy A', rate: 38.5, responses: 145 },
    { variation: 'Copy B', rate: 31.2, responses: 112 },
    { variation: 'Copy C', rate: 42.1, responses: 167 },
  ],
}

// Recent Activity Feed
export const mockActivityFeed = [
  { id: 'act-001', type: 'lead_moved', message: 'Lead @carla.mendes movido para Fechado (Ganho)', timestamp: '2026-11-20T16:45:00Z', agent: 'agent-003' },
  { id: 'act-002', type: 'dm_sent', message: 'DM enviada para @ana.costa', timestamp: '2026-11-20T16:30:00Z', agent: 'agent-001' },
  { id: 'act-003', type: 'new_lead', message: 'Novo lead detectado: @joao.santos', timestamp: '2026-11-20T16:15:00Z', agent: 'agent-002' },
  { id: 'act-004', type: 'rate_limit', message: 'Perfil prospect_bot_3 atingiu rate limit', timestamp: '2026-11-20T15:45:00Z', agent: null },
  { id: 'act-005', type: 'follow', message: 'Seguiu @pedro.oliveira', timestamp: '2026-11-20T15:30:00Z', agent: 'agent-001' },
]