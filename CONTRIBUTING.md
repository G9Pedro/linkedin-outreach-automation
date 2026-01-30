# Contributing to LinkedIn Outreach Automation

First off, thank you for considering contributing to this project! 🎉

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case** - why would this be useful?
- **Possible implementation** approach
- **Alternative solutions** you've considered

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes**
3. **Write or update tests** if applicable
4. **Update documentation** as needed
5. **Follow code style** (use ESLint and Prettier)
6. **Commit with clear messages**
7. **Push to your fork** and submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/linkedin-outreach-automation.git
cd linkedin-outreach-automation

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your configuration

# Initialize database
npm run db:generate
npm run db:push

# Run development server
npm run dev
```

## Code Style

We use ESLint and Prettier for code formatting:

```bash
# Run linter
npm run lint

# Format code
npm run format
```

## Commit Messages

Follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add CSV import for prospects
fix: resolve connection rate calculation bug
docs: update API documentation
```

## Project Structure

```
/app                # Next.js app directory
  /api             # API routes
  /campaigns       # Campaign pages
  /analytics       # Analytics pages
/lib               # Shared libraries
  /automation      # Automation logic
  /templates       # Message templates
/prisma            # Database schema
/docs              # Documentation
```

## Testing

```bash
# Run tests (when available)
npm test

# Run tests in watch mode
npm test -- --watch
```

## Pull Request Process

1. **Update documentation** if you're changing APIs or adding features
2. **Add tests** for new functionality
3. **Ensure all tests pass**
4. **Update the README** if needed
5. **Request review** from maintainers

## Code Review Guidelines

Reviewers will check for:

- Code quality and readability
- Test coverage
- Performance implications
- Security considerations
- Documentation completeness
- Adherence to project patterns

## Community

- Be respectful and inclusive
- Welcome newcomers
- Help others learn
- Assume good intentions

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.