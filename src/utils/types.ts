export type Program = {
  id: string
  name: string
  description: string
  programStatus: string
  location: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  Company: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  SeverityReward: any
  createdAt: string
  updatedAt: string
}

export type EditableProgram = Omit<
  Program,
  'id' | 'createdAt' | 'updatedAt' | 'Company' | 'SeverityReward'
>

export type Submission = {
  id: string
  programId: string
  userId: string
  asset: string
  severityRewardId: string
  evidence: string
  impact: string
  findings: string[]
  status: string
  createdAt: string
  updatedAt: string
  User: {
    username: string
  }
  Program: {
    name: string
  }
  Severity: {
    severity: string
  }
}
