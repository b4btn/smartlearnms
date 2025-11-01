export interface Credentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  "status": string;
  "code": number;
  "data": {
    "access": string;
    "refresh": string;
    "role": string
    "permissions": string[];
    "uid": string;
  },
  "message": string;
}
