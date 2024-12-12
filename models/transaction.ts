export interface Transaction {
  user: string;
  date: string;
  number: string;
  state: string;
  amount: string;
  detail?: string;
  cardType?: string;
}
