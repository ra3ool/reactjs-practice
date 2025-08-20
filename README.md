# 🚀 Modern React Application

A production-ready React application built with modern tools and best practices, featuring a clean architecture and comprehensive functionality.

## ✨ Features

- 🔐 **Authentication & Authorization** - Complete auth system with custom ACL
- 🎨 **Modern UI** - Beautiful interface with dark/light theme support
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔒 **Secure Storage** - Encrypted local storage with crypto-js
- 🚦 **Advanced Routing** - React Router with data loaders
- 📋 **Form Management** - React Hook Form with Zod validation
- 🎭 **Custom Components** - Reusable UI component library
- 🏗️ **Clean Architecture** - File-type based structure with clear separation of concerns

## 🛠️ Tech Stack

### Core Framework

- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning fast build tool and dev server

### State Management & Data

- **Zustand** - Lightweight state management
- **React Router (Data Mode)** - Advanced routing with data loading
- **Axios** - HTTP client with request/response interceptors
- **React Hook Form** - Performant form handling
- **Zod** - TypeScript-first schema validation

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **Custom Component Library** - Built-in reusable components
- **Theme System** - Dark/light mode support
- **SVG Loader** - Dynamic SVG component loading

### Security & Storage

- **js-cookie** - Cookie management
- **crypto-js** - Client-side encryption for sensitive data
- **Custom ACL** - Role-based access control system

### Development Tools

- **pnpm** - Fast, disk space efficient package manager
- **ESLint & Prettier** - Code linting and formatting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic components (Button, Input, Dropdown, etc.)
│   └── common/          # Complex shared components
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   ├── errors/         # 403, 404 error pages
│   └── ...
├── services/           # API services and external integrations
│   ├── api/           # API calls and endpoints
│   ├── auth/          # Authentication services
│   └── ...
├── stores/            # Zustand stores
│   ├── authStore.ts   # Authentication state
│   ├── themeStore.ts  # Theme management
│   └── ...
├── mappers/           # Data transformation utilities
├── hooks/             # Custom React hooks
│   ├── useAuth.ts     # Authentication hooks
│   ├── useAcl.ts      # Access control hooks
│   └── ...
├── utils/             # Utility functions
│   ├── storage.ts     # Encrypted storage utilities
│   ├── crypto.ts      # Encryption helpers
│   └── ...
├── constants/         # App constants and configuration
├── types/            # TypeScript type definitions
└── assets/           # Static assets (images, icons, etc.)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript checks
```

## 🔐 Authentication & Security

### Features

- JWT-based authentication
- Secure token storage with encryption
- Automatic token refresh
- Custom ACL system for role-based permissions
- Protected routes and components

### ACL (Access Control List)

```typescript
// Example usage
const { canAccess } = useAcl();
const canViewAdmin = canAccess('admin.dashboard');

// In components
{
  canAccess('users.create') && <CreateUserButton />;
}
```

## 🎨 Custom Components

Built-in component library includes:

- **Button** - Various styles and states
- **Input** - Form inputs with validation
- **Dropdown** - Select and multi-select
- **Modal** - Accessible modal dialogs
- **Table** - Data tables with sorting/filtering
- **Loading** - Loading states and spinners

```typescript
// Example usage
import { Button, Input, Dropdown } from '@/components/ui';

<Button variant="primary" size="lg">
  Click me
</Button>;
```

## 🌍 Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Your App Name
VITE_ENCRYPTION_KEY=your-secret-key
```

## 🏗️ Architecture Principles

### File-Type Based Structure

- **Services Layer** - External API calls and business logic
- **Store Layer** - Application state management
- **Components Layer** - UI components and views
- **Utils Layer** - Pure utility functions
- **Mappers Layer** - Data transformation

### Best Practices

- TypeScript everywhere for type safety
- Custom hooks for reusable logic
- Encrypted storage for sensitive data
- Interceptors for global HTTP handling
- Component composition over inheritance

## 🎭 Theme System

Supports both light and dark themes with:

- Automatic system preference detection
- Manual theme switching
- Persistent theme selection
- Tailwind CSS integration

## 🛡️ Error Handling

- **403 Forbidden** - Custom unauthorized access page
- **404 Not Found** - Custom page not found
- **Global Error Boundary** - Catches and displays errors gracefully
- **Form Validation** - Real-time validation with helpful messages

## 📦 Build & Deployment

### Build for Production

```bash
pnpm build
```

### Docker Support

```dockerfile
# Dockerfile included for containerized deployment
docker build -t your-app .
docker run -p 3000:3000 your-app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- All the open-source contributors who made this possible

---

⭐ **Star this repo if you found it helpful!**
