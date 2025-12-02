# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-11-26
### Added
- Initial monorepo structure (backend, gateway, microservices, frontend) with Docker support.
- Security hardening: Helmet, rate limiting, JWT cookies HttpOnly, Joi validators, Winston logger.
- Deployment automation on Render for pre-production and production environments.
- Tooling: ESLint flat config, Prettier, and JSDoc generation (`npm run docs`).

### Fixed
- Order total recalculated server-side and ObjectId validation added to avoid tampering.
- API client default URL pointed to hosted backend instead of localhost.

### Security
- Environment secrets pulled from Render env vars, `.env` kept local-only.

[1.0.0]: https://github.com/VincentSechi/CC_EXAM_1/releases/1.0.0
