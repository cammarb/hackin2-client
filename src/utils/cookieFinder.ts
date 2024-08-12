export const findCookie = (cookieString: string) => {
  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(cookieString))
    ?.split('=')[1]

  return cookie
}
