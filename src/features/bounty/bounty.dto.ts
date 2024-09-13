type Bounty = {
  id: string
  title: string
  description: string
  severityRewardId: string
  programId: string
  status: string
  scope?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

type BountyAssignment = {
  id: string
  bountyId: string
  userId: string
  assignedAt: string
}
