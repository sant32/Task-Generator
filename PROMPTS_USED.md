# Prompts Used During Development

AI tools were used as an engineering assistant to speed up implementation, validate architecture decisions, and help debug issues. All outputs were reviewed, tested, and modified manually before integration.

Below are representative examples of how AI was used.

---

## 1. Backend Design Assistance

Prompt theme:
"Suggest a clean Express backend structure with REST endpoints for generating and updating structured specs using an LLM."

Used for:
- Refining API structure
- Validating JSON response format
- Structuring health endpoints

All controller logic, validation, and database schema were reviewed and adjusted manually.

---

## 2. Frontend Refactoring Guidance

Prompt theme:
"Refactor a React app into modular components with API abstraction and routing."

Used for:
- Component organization ideas
- Separation of concerns
- Suggesting scalable folder structure

Final structure and integration were manually implemented and adapted.

---

## 3. Debugging Assistance

Prompt theme:
"PUT request not updating. Diagnose possible causes."

This led to identifying:
- Missing PUT in CORS configuration
- Nested state mutation issue in React

Root cause validation and final fix were implemented and tested manually.

---

## 4. Markdown Formatting Logic

Prompt theme:
"Convert structured JSON into properly formatted Markdown."

Used to:
- Validate markdown formatting approach
- Improve output readability

Final implementation adjusted for project-specific schema.

---

## 5. Health Page Implementation

Prompt theme:
"Create a simple system status page checking backend, DB, and LLM endpoints."

Used to:
- Validate UI approach
- Improve badge display logic

All endpoint integration and error handling were manually verified.

---

## Development Philosophy

AI was used as:
- A debugging assistant
- A structural reviewer
- A productivity accelerator

All architectural decisions, API integrations, and deployment steps were implemented and tested manually.
