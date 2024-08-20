export const capitalizeFirstLetter = (input: string): string => {
  if (!input) return input
  const newInput = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
  return newInput
}
