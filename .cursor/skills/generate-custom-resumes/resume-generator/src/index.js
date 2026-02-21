#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { generateResume } from './generator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get project root (five levels up from .cursor/skills/generate-custom-resumes/resume-generator/src/)
const projectRoot = path.resolve(__dirname, '../../../../..');

// Default paths
const DEFAULT_BASE = path.join(projectRoot, 'resumes', 'resume-base.yaml');

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    base: DEFAULT_BASE,
    custom: null,
    output: null,
    all: false
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (arg === '--base' || arg === '-b') {
      options.base = path.isAbsolute(args[++i]) ? args[i] : path.join(projectRoot, args[i]);
    } else if (arg === '--custom' || arg === '-c') {
      const customPath = args[++i];
      options.custom = path.isAbsolute(customPath) ? customPath : path.join(projectRoot, customPath);
    } else if (arg === '--output' || arg === '-o') {
      const outputPath = args[++i];
      options.output = path.isAbsolute(outputPath) ? outputPath : path.join(projectRoot, outputPath);
    } else if (arg === '--all' || arg === '-a') {
      options.all = true;
    }
  }

  return options;
}

/**
 * Print help message
 */
function printHelp() {
  console.log(`
Resume PDF Generator

Usage:
  node src/index.js [options]

Options:
  -b, --base <path>     Path to base resume YAML (default: resumes/resume-base.yaml)
  -c, --custom <path>   Path to customization YAML (optional)
  -o, --output <path>   Path to output PDF file
  -a, --all             Generate PDFs for all processes in hiring-processes/in-progress/
  -h, --help            Show this help message

Examples:
  # Generate single resume with customization
  node src/index.js -c hiring-processes/in-progress/beyond-ai/resume.yaml -o hiring-processes/in-progress/beyond-ai/resume.pdf

  # Generate base resume only
  node src/index.js -o resumes/resume-2025.pdf

  # Generate all resumes for in-progress processes
  node src/index.js --all
`);
}

/**
 * Find all hiring process directories with resume.yaml files
 */
async function findAllProcesses() {
  const processesDir = path.join(projectRoot, 'hiring-processes', 'in-progress');
  const processes = [];

  if (!fs.existsSync(processesDir)) {
    return processes;
  }

  const entries = await fs.readdir(processesDir, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const resumePath = path.join(processesDir, entry.name, 'resume.yaml');
      if (fs.existsSync(resumePath)) {
        processes.push({
          name: entry.name,
          customPath: resumePath,
          outputPath: path.join(processesDir, entry.name, 'resume.pdf')
        });
      }
    }
  }

  return processes;
}

/**
 * Main function
 */
async function main() {
  const options = parseArgs();

  try {
    if (options.all) {
      // Generate all resumes
      const processes = await findAllProcesses();
      
      if (processes.length === 0) {
        console.log('No processes found with resume.yaml files');
        return;
      }

      console.log(`Found ${processes.length} process(es) to generate:\n`);
      
      for (const process of processes) {
        console.log(`Generating resume for: ${process.name}`);
        await generateResume(options.base, process.customPath, process.outputPath);
      }
      
      console.log(`\n✅ Generated ${processes.length} resume(s)`);
    } else {
      // Generate single resume
      if (!options.output) {
        console.error('❌ Error: --output is required (or use --all to generate all)');
        printHelp();
        process.exit(1);
      }

      await generateResume(options.base, options.custom, options.output);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

