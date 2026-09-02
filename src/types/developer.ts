export interface DeveloperInfo {
  name: string;
  role: string;
  tagline: string;
  statusText: string;
  isAvailable: boolean;
  location: string;
  bio: {
    lead: string;
    paragraphs: string[];
  };
  email: string;
  github: string;
  linkedin: string;
  stats?: {
    label: string;
    value: string;
    description?: string;
  }[];
}
