# Contributing to NGO Website

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: \`git clone https://github.com/your-username/ngo-website.git\`
3. Create a branch: \`git checkout -b feature/your-feature-name\`
4. Make your changes
5. Test thoroughly
6. Commit: \`git commit -m "Add: your feature description"\`
7. Push: \`git push origin feature/your-feature-name\`
8. Create a Pull Request

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Component Guidelines

- Use Server Components by default
- Add "use client" only when necessary
- Keep components in \`src/components/\`
- UI components go in \`src/components/ui/\`

### Commit Messages

Use conventional commits:
- \`feat:\` New feature
- \`fix:\` Bug fix
- \`docs:\` Documentation changes
- \`style:\` Code style changes
- \`refactor:\` Code refactoring
- \`test:\` Test additions/changes
- \`chore:\` Build/config changes

### Testing

- Test all forms and user interactions
- Verify responsive design on mobile/tablet/desktop
- Check accessibility with keyboard navigation
- Test with different content lengths
- Verify email notifications work

### Accessibility

- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Maintain color contrast ratios
- Add alt text to images

## Pull Request Process

1. Update README.md if needed
2. Ensure all tests pass
3. Update documentation
4. Request review from maintainers
5. Address review feedback
6. Wait for approval and merge

## Questions?

Open an issue for:
- Bug reports
- Feature requests
- Documentation improvements
- General questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
