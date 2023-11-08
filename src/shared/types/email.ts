export interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  context: { [key: string]: any };
}
