export interface MonthlyData {
  month: string;
  count: number;
}

export interface Last12MonthsData {
  last12MonthsData: MonthlyData[];
}
