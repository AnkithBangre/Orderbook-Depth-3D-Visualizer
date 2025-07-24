# Contributing to 3D Orderbook Depth Visualizer

Thank you for your interest in contributing to the 3D Orderbook Depth Visualizer! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm 8.0 or higher
- Git
- Basic knowledge of React, TypeScript, and Three.js

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   \`\`\`bash
   git clone https://github.com/YOUR_USERNAME/orderbook-3d-visualizer.git
   cd orderbook-3d-visualizer
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Create a new branch for your feature:
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces for all data structures
- Use strict type checking
- Avoid \`any\` types when possible

### React

- Use functional components with hooks
- Follow React best practices
- Use proper dependency arrays in useEffect
- Implement proper error boundaries

### 3D Graphics

- Optimize for 60fps performance
- Use proper disposal of Three.js objects
- Implement level-of-detail where appropriate
- Test on various hardware configurations

### Styling

- Use Tailwind CSS classes
- Follow the existing theme system
- Ensure responsive design
- Test in both dark and light modes

## 🧪 Testing

### Before Submitting

- [ ] Code compiles without TypeScript errors
- [ ] Application runs without console errors
- [ ] 3D visualization performs smoothly
- [ ] Theme switching works correctly
- [ ] All interactive elements function properly
- [ ] Responsive design works on mobile

### Testing Commands

\`\`\`bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
\`\`\`

## 📋 Pull Request Process

1. **Update Documentation**: Update README.md if needed
2. **Test Thoroughly**: Ensure all functionality works
3. **Clean Commit History**: Use meaningful commit messages
4. **Create Pull Request**: Use the provided template
5. **Address Feedback**: Respond to review comments promptly

### Commit Message Format

Use semantic commit messages:

\`\`\`
feat: add new pressure zone algorithm
fix: resolve theme switching bug
docs: update API documentation
style: improve mobile responsiveness
refactor: optimize 3D rendering performance
test: add unit tests for orderbook context
\`\`\`

## 🎯 Areas for Contribution

### High Priority

- Real WebSocket API integration
- Performance optimizations
- Mobile touch controls
- Unit test coverage
- Accessibility improvements

### Medium Priority

- Additional exchange support
- Advanced analytics features
- Export functionality
- Custom themes
- Keyboard shortcuts

### Low Priority

- Animation enhancements
- Additional chart types
- Machine learning features
- Advanced filtering options

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**: Browser, OS, device type
2. **Steps to Reproduce**: Clear, numbered steps
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Console Errors**: Any error messages

## 💡 Feature Requests

For feature requests, please provide:

1. **Use Case**: Why is this feature needed?
2. **Description**: Detailed explanation of the feature
3. **Mockups**: Visual representation if applicable
4. **Priority**: How important is this feature?
5. **Implementation Ideas**: Any technical suggestions

## 📚 Resources

### Learning Materials

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Project-Specific Resources

- [Architecture Overview](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Performance Guidelines](docs/PERFORMANCE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🤝 Community Guidelines

### Be Respectful

- Use inclusive language
- Be constructive in feedback
- Help newcomers learn
- Respect different perspectives

### Be Professional

- Keep discussions on-topic
- Provide helpful, actionable feedback
- Document your contributions
- Follow the code of conduct

## 📞 Getting Help

If you need help:

1. Check existing issues and documentation
2. Ask questions in GitHub Discussions
3. Join our Discord community (if available)
4. Reach out to maintainers directly

## 🏆 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- Special mentions for outstanding work

Thank you for contributing to the 3D Orderbook Depth Visualizer! 🚀
