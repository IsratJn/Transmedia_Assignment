# Playwright Automation Test Suite

Playwright test automation framework with UI and API testing.

## What I Implemented

- **Page Object Model (POM)**: Organized page classes with inheritance structure
- **ESLint Configuration**: Code quality rules and Playwright-specific linting
- **Shared Test Context**: Worker-scoped fixtures for data sharing between tests
- **Serial Test Execution**: Maintains state dependencies across test cases
- **External Test Data**: JSON-based test data management
- **File Upload Testing**: Image upload functionality with sample files

## Project Structure

```
├── src/
│   ├── pages/
│   │   ├── BasePage.js          # Base page with common methods
│   │   ├── HomePage.js          # Home page operations
│   │   ├── BoardPage.js         # Board and list management
│   │   └── CardPage.js          # Card operations
│   └── tests/
│       ├── api/
│       │   └── list-api.spec.js     # API tests
│       └── ui/
│           └── board-workflow.spec.js   # UI workflow tests
├── postman/
│   └── Transmedia.postman_collection.json  # Postman API collection
├── testdata/
│   ├── testData.json           # Test data
│   └── pexels-brett-sayles-1322185.jpg  # Sample image
├── test-results/               # Test execution results
├── playwright-report/          # HTML test reports
└── eslint.config.js            # Linting configuration
```

## Configuration

- **Base URL**: `http://localhost:3000` (update in `playwright.config.js`, `HomePage.js` and `list-api.spec.js` for different ports)

## Setup and Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run UI tests only
npx playwright test board-workflow.spec.js

# Run API tests only
npx playwright test list-api.spec.js

# Run with headed browser
npx playwright test --headed
```

## Test Coverage

### UI Workflow Tests

1. **TC 001**: Create board and verify navigation
2. **TC 002**: Add two lists, create card with description and image
3. **TC 003**: Delete a list and verify removal

### API Tests

1. **Playwright API**: Create and delete lists via Playwright request library
2. **Postman Collection**: Alternative API automation with pre/post test assertions

**API Test Approach**: Used pre-existing board from database instead of creating new one, as the assessment focuses on list operations. The DELETE endpoint clears all lists from database, which matches the server implementation that sets `lists: []` and `cards: []`.
