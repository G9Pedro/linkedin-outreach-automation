export interface IndustryTemplate {
  industry: string
  connectionMsg: string
  followUp1: string
  followUp2: string
  followUp3: string
}

export const industryTemplates: IndustryTemplate[] = [
  {
    industry: 'Technology',
    connectionMsg: `Hi {firstName}, I noticed your work in {industry} and was impressed by your experience at {company}. I'd love to connect and exchange insights on the latest tech trends.`,
    followUp1: `Hi {firstName}, thanks for connecting! I've been following {company}'s innovative approach in {industry}. I'm curious about your thoughts on emerging technologies and how they're shaping the industry. Would love to hear your perspective!`,
    followUp2: `Hey {firstName}, I wanted to follow up on my last message. I'm currently working on some exciting projects in {industry} and thought you might find them interesting. Would you be open to a quick chat about potential collaboration opportunities?`,
    followUp3: `Hi {firstName}, I hope this message finds you well. I understand you're busy, but I genuinely believe there could be value in connecting about {industry} trends. If you're interested, I'd love to schedule a brief 15-minute call. Let me know what works for you!`,
  },
  {
    industry: 'Marketing',
    connectionMsg: `Hi {firstName}, I came across your profile and was impressed by your marketing expertise at {company}. I'd love to connect and share ideas about modern marketing strategies.`,
    followUp1: `Thanks for connecting, {firstName}! I've been analyzing successful marketing campaigns in {industry} and would love to hear about your approach at {company}. What strategies have worked best for you recently?`,
    followUp2: `Hi {firstName}, following up on my previous message. I'm working on some innovative marketing solutions for {industry} companies and thought you might be interested in exploring synergies. Open to a quick conversation?`,
    followUp3: `Hey {firstName}, I wanted to reach out one more time. I believe there's real potential for us to collaborate or at least exchange valuable insights about {industry} marketing. Would a brief call work for you sometime next week?`,
  },
  {
    industry: 'Finance',
    connectionMsg: `Hi {firstName}, I noticed your expertise in {industry} at {company}. I'd appreciate connecting to discuss financial trends and potential insights.`,
    followUp1: `Hi {firstName}, thanks for connecting! I'm particularly interested in how {company} approaches financial strategy in today's market. Would you be open to sharing some insights about {industry} trends you're seeing?`,
    followUp2: `Hey {firstName}, I wanted to follow up regarding {industry} developments. I'm working on several finance initiatives and believe your perspective from {company} would be incredibly valuable. Could we arrange a brief discussion?`,
    followUp3: `Hi {firstName}, I hope you're doing well. I understand time is valuable, but I genuinely think we could benefit from a conversation about {industry} strategies. Would you have 15 minutes for a call in the coming weeks?`,
  },
  {
    industry: 'Healthcare',
    connectionMsg: `Hi {firstName}, I was impressed by your healthcare background at {company}. I'd love to connect and discuss innovations in {industry}.`,
    followUp1: `Thanks for connecting, {firstName}! The healthcare sector is evolving rapidly, and I'm curious about your experience at {company}. What innovations in {industry} are you most excited about?`,
    followUp2: `Hi {firstName}, following up on my last message. I'm currently involved in healthcare projects that might align with your interests at {company}. Would you be open to exploring potential synergies in {industry}?`,
    followUp3: `Hey {firstName}, I wanted to reach out once more. I believe there's significant value in connecting about {industry} developments and healthcare innovation. Would you be available for a brief conversation?`,
  },
  {
    industry: 'Sales',
    connectionMsg: `Hi {firstName}, I noticed your impressive sales track record at {company}. I'd love to connect and exchange ideas about modern sales strategies.`,
    followUp1: `Thanks for connecting, {firstName}! I'm always eager to learn from successful sales professionals. What strategies have been most effective for you at {company} in {industry}?`,
    followUp2: `Hi {firstName}, I wanted to follow up regarding sales best practices in {industry}. I'm working on some innovative sales approaches and thought you might find them interesting. Open to a quick chat?`,
    followUp3: `Hey {firstName}, I hope you're well. I genuinely believe we could benefit from sharing insights about sales in {industry}. Would you have time for a brief 15-minute call?`,
  },
]

export function getTemplateByIndustry(industry: string): IndustryTemplate | undefined {
  return industryTemplates.find(
    t => t.industry.toLowerCase() === industry.toLowerCase()
  )
}

export function getAllIndustries(): string[] {
  return industryTemplates.map(t => t.industry)
}