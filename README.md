# Automation Exercises with Playwright

A Playwright-based automation project for functional UI testing of the Automation Exercise demo site. The purpose of this repository is for study purposes only.

## Project Overview

This repository contains a Playwright test suite built with TypeScript and a Page Object Model structure.

## Tech Stack

- `@playwright/test` for browser automation and assertions
- `@faker-js/faker` for test data generation
- `dotenv` for optional environment configuration
- `TypeScript` with `commonjs` module support

## Repository Structure

- `playwright.config.ts` - Playwright test configuration and browser project setup
- `pages/` - Page object model classes for reusing page behavior
- `src/` - Main test source files
  - `data/` - test data sources and text constants
  - `elements/` - locator definitions organized by page
  - `fixtures/` - custom fixtures and test setup utilities
  - `specs/` - Playwright test files
  - `utils/` - helper utilities such as Faker wrappers
- `playwright-report/` - generated HTML reports from Playwright runs
- `test-results/` - artifacts and historical run results

## Setup

1. Install dependencies:

```bash
npm install
```

2. Optionally configure environment variables using a `.env` file.
   The project includes commented dotenv setup in `playwright.config.ts`.

## Running Tests

Run all tests with Playwright:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test src/specs/login.spec.ts
```

Open the HTML report after a test run:

```bash
npx playwright show-report
```

## Configuration Highlights

- Tests are located in `./src/specs`
- Base URL is set to `https://www.automationexercise.com/`
- Browser: Chromium by default
- Screenshot capture is enabled
- Trace collection is enabled on first retry

## Notes

- `headless` is currently set to `false` for visible browser execution.
- Additional browser projects (`firefox`, `webkit`, mobile views) are present but commented out.
- You can enable `dotenv` features by uncommenting the import and config lines in `playwright.config.ts`.
