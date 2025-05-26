# PRISMA Design System Components

A modern React component library built with TypeScript, Tailwind CSS, and Storybook. This project contains reusable UI components designed for the PRISMA design system.

## 🚀 Tech Stack

- **React 19** - Latest React with modern features
- **Next.js 15** - React framework for development and build tooling
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Storybook** - Component development and documentation
- **CVA (Class Variance Authority)** - Type-safe variant management
- **Vitest** - Fast unit testing framework

## 📦 Components

### Form Controls

- **RadioButton** - Single selection input with customizable states
- **Checkbox** - Multi-selection input with indeterminate state support

### UI Elements

- **Button** - Primary, Secondary, and Ghost variants with icon support
- **Avatar** - User profile display with different sizes

### Features

- 🎨 **Consistent Design** - Following PRISMA design system guidelines
- ♿ **Accessible** - WCAG compliant with proper ARIA attributes
- 🌍 **RTL Support** - Right-to-left text direction support
- 🎭 **Interactive States** - Hover, active, focus, and disabled states
- 📱 **Responsive** - Mobile-first design approach
- 🔧 **Customizable** - Variant-based styling with CVA

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Available Scripts

```bash
# Start Next.js development server
npm run dev

# Start Storybook development server
npm run storybook

# Build Next.js application
npm run build

# Build Storybook static files
npm run build-storybook

# Run linting
npm run lint
```

### Development Workflow

1. **Component Development**: Use Storybook for isolated component development

   ```bash
   npm run storybook
   ```

   Open [http://localhost:6006](http://localhost:6006) to view Storybook

2. **Next.js Development**: Test components in a Next.js environment
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application

## 📚 Documentation

Each component includes:

- **Component files** (`.tsx`) - Main component implementation
- **Story files** (`.stories.tsx`) - Storybook stories for all variants
- **Documentation** (`.mdx`) - Comprehensive usage guides with interactive examples

### Storybook Features

- 🎛️ **Controls** - Interactive props manipulation
- 📖 **Docs** - Auto-generated and custom documentation
- 🎨 **Canvas** - Visual component testing
- 📱 **Viewports** - Responsive design testing

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app directory
├── stories/             # Component library
│   ├── Avatar/
│   │   ├── Avatar.tsx
│   │   ├── Avatar.stories.tsx
│   │   └── Avatar.mdx
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── Button.mdx
│   ├── Checkbox/
│   │   ├── Checkbox.tsx
│   │   ├── Checkbox.stories.tsx
│   │   └── Checkbox.mdx
│   └── Radio button/
│       ├── RadioButton.tsx
│       ├── RadioButton.stories.tsx
│       └── RadioButton.mdx
└── ...
```

## 🎨 Design System

### Colors

- **Primary**: `#0093EE` (hover: `#0081D1`, active: `#005B94`)
- **Secondary**: `#A8B0B8`
- **Background**: `#101010`
- **Text**: White with opacity variants for disabled states

### Typography

- **Font**: System font stack optimized for readability
- **Sizes**: Small (14px), Medium (16px), Large (18px)

### Spacing

- **Component spacing**: 8px grid system
- **Internal padding**: 4px increments

## 🤝 Contributing

1. **Component Standards**:

   - Use CVA for variant management
   - Include comprehensive TypeScript types
   - Follow accessibility guidelines
   - Add hover, active, focus, and disabled states

2. **Documentation**:

   - Create Storybook stories for all variants
   - Write comprehensive MDX documentation
   - Include interactive examples

3. **Testing**:
   - Write unit tests for component logic
   - Test accessibility with screen readers
   - Verify responsive behavior

## 📄 License

This project is part of the PRISMA design system. Please refer to your organization's licensing terms.

## 🔗 Related Links

- [Figma Design System](https://www.figma.com/design/ppQGa1NbINpWppi8iYQMXG/PRISMA---DS-Components)
- [Storybook Documentation](http://localhost:6006)
- [Next.js Documentation](https://nextjs.org/docs)
