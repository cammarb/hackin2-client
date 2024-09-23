import type { Submission } from '@/utils/types'

export type Bounty = {
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

export type BountyAssignment = {
  id: string
  bountyId: string
  userId: string
  assignedAt: string
  status: string
  User?: {
    username: string
  }
  Bounty?: {
    title: string
  }
  Submission?: Submission
}
