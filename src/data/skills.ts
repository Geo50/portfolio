import type { SkillGroup, ReactHighlight } from '../types/skill';

export const reactHighlightData: ReactHighlight = {
  title: 'React Ecosystem Specialist',
  subtitle: 'Primary Frontend Core',
  description:
    'Modern React engineering with a focus on component architecture, state management, and high-performance interfaces.',
  focusAreas: [
    {
      title: 'Modern Patterns',
      description: 'Hooks, Suspense, Concurrency & Vite tooling',
    },
    {
      title: 'State Architecture',
      description: 'Context, reactive store & optimistic UI',
    },
    {
      title: 'Performance',
      description: 'Zero layout shift & smooth micro-interactions',
    },
  ],
  ecosystem: ['React 19 / 18', 'TypeScript', 'Next.js', 'React Native', 'Custom Hooks', 'Vite'],
};

export const skillGroupsData: SkillGroup[] = [
  {
    category: 'Frontend',
    description: '',
    skills: [
      { name: 'React', isPrimary: true, tag: 'Primary' },
      { name: 'TypeScript', isPrimary: true, tag: 'Primary' },
      { name: 'JavaScript' },
      { name: 'HTML5' },
      { name: 'CSS3' },
      { name: 'Vite' },
      { name: 'React Native' },
      { name: 'Flutter' },
    ],
  },
  {
    category: 'UI / Styling',
    description: '',
    skills: [
      { name: 'Tailwind CSS' },
      { name: 'shadcn/ui' },
      { name: 'Material UI' },
      { name: 'Bootstrap' },
    ],
  },
  {
    category: 'Backend / Data',
    description: '',
    skills: [
      { name: 'C#' },
      { name: '.NET' },
      { name: 'REST APIs' },
      { name: 'PostgreSQL' },
      { name: 'Dapper' },
    ],
  },
  {
    category: 'Tools',
    description: '',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Docker' },
      { name: 'Firebase' },
      { name: 'Figma' },
    ],
  },
];
