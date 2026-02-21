import yaml from 'js-yaml';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load and parse a YAML file
 * @param {string} filePath - Path to the YAML file
 * @returns {Object} Parsed YAML data
 */
export function loadYAML(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return yaml.load(content);
  } catch (error) {
    throw new Error(`Failed to load YAML file ${filePath}: ${error.message}`);
  }
}

/**
 * Deep merge two objects, with custom handling for experiences array
 * @param {Object} base - Base resume data
 * @param {Object} custom - Custom resume data (overrides)
 * @returns {Object} Merged resume data
 */
export function mergeResumes(base, custom) {
  if (!custom) {
    return base;
  }

  const merged = { ...base };

  // Override top-level fields if present in custom
  if (custom.title) merged.title = custom.title;
  if (custom.introduction) merged.introduction = custom.introduction;
  if (custom.links) merged.links = { ...base.links, ...custom.links };
  if (custom.education) merged.education = custom.education;
  if (custom.skills) merged.skills = { ...base.skills, ...custom.skills };

  // Merge experiences with id-based matching
  if (custom.experiences) {
    merged.experiences = mergeExperiences(base.experiences || [], custom.experiences);
  }

  return merged;
}

/**
 * Merge experiences arrays by matching company id and role id
 * @param {Array} baseExperiences - Base experiences array
 * @param {Array} customExperiences - Custom experiences array
 * @returns {Array} Merged experiences array
 */
function mergeExperiences(baseExperiences, customExperiences) {
  const merged = [...baseExperiences];

  // Create a map of base experiences by company id for quick lookup
  const baseMap = new Map();
  baseExperiences.forEach(exp => {
    if (exp.id) {
      baseMap.set(exp.id, exp);
    }
  });

  // Process each custom experience
  customExperiences.forEach(customExp => {
    if (!customExp.id) {
      console.warn('Custom experience missing id, skipping:', customExp.company);
      return;
    }

    const baseExp = baseMap.get(customExp.id);
    
    if (baseExp) {
      // Company exists in base, merge it
      const mergedExp = mergeCompanyExperience(baseExp, customExp);
      const index = merged.findIndex(e => e.id === customExp.id);
      merged[index] = mergedExp;
    } else {
      // New company, add it
      merged.push(customExp);
    }
  });

  return merged;
}

/**
 * Merge a single company experience
 * @param {Object} baseExp - Base company experience
 * @param {Object} customExp - Custom company experience
 * @returns {Object} Merged company experience
 */
function mergeCompanyExperience(baseExp, customExp) {
  const merged = { ...baseExp };

  // Override company-level fields
  if (customExp.company) merged.company = customExp.company;
  if (customExp.keySkills) merged.keySkills = customExp.keySkills;

  // Merge roles with id-based matching
  if (customExp.roles) {
    merged.roles = mergeRoles(baseExp.roles || [], customExp.roles);
  }

  return merged;
}

/**
 * Merge roles arrays by matching role id
 * @param {Array} baseRoles - Base roles array
 * @param {Array} customRoles - Custom roles array
 * @returns {Array} Merged roles array
 */
function mergeRoles(baseRoles, customRoles) {
  const merged = [...baseRoles];

  // Create a map of base roles by id for quick lookup
  const baseMap = new Map();
  baseRoles.forEach(role => {
    if (role.id) {
      baseMap.set(role.id, role);
    }
  });

  // Process each custom role
  customRoles.forEach(customRole => {
    if (!customRole.id) {
      console.warn('Custom role missing id, skipping:', customRole.title);
      return;
    }

    const baseRole = baseMap.get(customRole.id);
    
    if (baseRole) {
      // Role exists in base, merge it
      const mergedRole = { ...baseRole };
      
      // Override role fields if present in custom
      if (customRole.title) mergedRole.title = customRole.title;
      if (customRole.period) mergedRole.period = customRole.period;
      if (customRole.note) mergedRole.note = customRole.note;
      if (customRole.bullets) mergedRole.bullets = customRole.bullets;
      if (customRole.keySkills) mergedRole.keySkills = customRole.keySkills;
      
      const index = merged.findIndex(r => r.id === customRole.id);
      merged[index] = mergedRole;
    } else {
      // New role, add it as-is
      merged.push(customRole);
    }
  });

  return merged;
}

