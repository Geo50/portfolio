export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  video: string;
  poster?: string;
  technologies: string[];
  featured?: boolean;
  github?: string;
  demo?: string;
  metrics?: string;
}
