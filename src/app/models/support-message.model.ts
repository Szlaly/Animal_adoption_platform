export interface SupportMessage {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email?: string;   // ha szükséges, lehet opcionális
    role?: string;    // ha van ilyen backend oldalon
  };
  text: string;       // a backend szerint a szöveg mező neve text
  sentAt: string;     // a backend szerint az időpont sentAt
}
