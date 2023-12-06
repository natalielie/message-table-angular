export interface IMessage {
  id: string;
  name: string;
  text: string;
  date: Date;
}

export interface ISnackbar {
  action: string;
  duration: number;
}
