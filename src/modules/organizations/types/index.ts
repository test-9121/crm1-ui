
export interface Organization {
  id: string;
  name: string;
  description: string;
  domain: string;
  disabled: boolean;
  createdDateTime?: string;
  lastUpdatedDateTime?: string | null;
  logoImgSrc?: string | null;
}
