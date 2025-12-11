export interface Role {
  title: string;
  period: string;
  description?: string;
}

export interface Vote {
  subject: string;
  result: 'A favor' | 'En contra' | 'Abstención' | 'Ausente';
  date: string;
}

export interface Initiative {
  title: string;
  status: 'Aprobada' | 'Rechazada' | 'Pendiente' | 'Retirada';
  date: string;
  description: string;
}

export interface Politician {
  id: string;
  name: string;
  party: string;
  image: string;
  bio: string;
  roles: Role[];
  votes: Vote[];
  initiatives: Initiative[];
}

export type ViewState = 'HOME' | 'PROFILE';