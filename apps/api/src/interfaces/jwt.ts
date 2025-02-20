export type JwtPayload = {
  userId: number
}

export type JwtContext = {
  payload?: JwtPayload
}

export type Context = {
  jwt: JwtContext
}
