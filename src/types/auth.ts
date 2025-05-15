
import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  userId?: string;
  name?: string;
  roles?: string;
  sub: string;
  [key: string]: any; // Allow for any additional properties
}
