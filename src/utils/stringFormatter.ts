export const capitalizeFirstLetter = (input: string): string => {
  if (!input) return input
  const newInput = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
  return newInput
}

export const centsToEuros = (cents: string): string => {
  const parsedCents = Number.parseInt(cents, 10)

  if (Number.isNaN(parsedCents)) {
    throw new Error('Invalid input: not a valid number string.')
  }

  const euros = parsedCents / 100
  return euros.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
}
