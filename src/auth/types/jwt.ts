export interface JwtPayload {
  sub: string;
}

export interface JwtConfig {
  secret: string;
  expiresIn: string;
}
