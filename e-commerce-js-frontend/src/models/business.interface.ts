export interface Business {
  id: string;
  name: string;
  tag: string;
  email: string;
}

export interface CreateBusiness {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface BusinessResponse {
  status: number;
  data: {
    message?: string;
    business?: Business;
  };
}

