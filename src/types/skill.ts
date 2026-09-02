export type SkillCategory = 'Frontend' | 'UI / Styling' | 'Backend / Data' | 'Tools';

export interface SkillItem {
  name: string;
  isPrimary?: boolean;
  tag?: string;
  description?: string;
}

export interface SkillGroup {
  category: SkillCategory;
  description: string;
  skills: SkillItem[];
}

export interface ReactHighlight {
  title: string;
  subtitle: string;
  description: string;
  focusAreas: {
    title: string;
    description: string;
  }[];
  ecosystem: string[];
}
