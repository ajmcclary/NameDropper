# Agent Guidelines for NameDropper

This project is an Angular application. Follow these best practices when modifying or adding code:

- **Use Angular CLI** whenever possible to generate components, services, and modules (`ng generate`).
- **Coding Style**:
  - Two-space indentation
  - Prefer single quotes in TypeScript
  - Always include semicolons
  - Keep line length under 120 characters
- **Strict TypeScript**: Avoid `any` and enable `strict` flags in tsconfig.
- **Component Structure**: Keep components focused and small. Place business logic in services.
- **Reactive Programming**: Favor `Observable` patterns (RxJS) for asynchronous tasks.
- **Unit Tests**: Write Jasmine tests for all new components and services. Run `npm test` before committing.
- **Documentation**: Update `README.md` when introducing new features or significant changes.

These guidelines apply to the entire repository.
