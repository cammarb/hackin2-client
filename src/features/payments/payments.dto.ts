export type Payment = {
  id: string
  stripeCheckoutId: string
  amount: string
  status: string
  bountyId: string
  userId: string
  companyId: string
  memberId: string
  payedAt: string
  programId: string
  BountyAssignment: {
    Bounty: {
      title: string
    }
    User: {
      username: string
    }
  }
  PayedByCompanyMember: {
    User: {
      username: string
    }
  }
}
