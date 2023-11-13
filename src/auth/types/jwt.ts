export interface TokenPayload {
  sub: string;
}

export interface TokenConfig {
  secret: string;
  expiresIn: string;
}
