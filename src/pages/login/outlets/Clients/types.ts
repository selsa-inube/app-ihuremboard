interface IClientState {
  ref: (EventTarget & HTMLInputElement) | null;
  value: boolean;
}

interface IClientLocal {
  ref: HTMLInputElement | null;
  value: boolean;
}
interface IClient {
  id: string;
  name: string;
  sigla: string;
  logo: string;
}

export type { IClientState, IClientLocal, IClient };
