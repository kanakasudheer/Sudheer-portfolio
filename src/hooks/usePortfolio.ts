import portfolioData from '../data/portfolio.json';
import type { PortfolioData } from '../types/portfolio';

const data = portfolioData as PortfolioData;

export function usePortfolio(): PortfolioData {
  return data;
}

export function useProfile() {
  return data.profile;
}

export function useSkills() {
  return data.skills;
}

export function useExperience() {
  return data.experience;
}

export function useProjects() {
  return data.projects;
}

export function useEducation() {
  return data.education;
}
