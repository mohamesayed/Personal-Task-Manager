
# Personal Task Manager

A modern, feature-rich task management web application built with React, TypeScript, and Tailwind CSS v4. This application provides a clean and intuitive interface for managing personal tasks with advanced features like drag & drop, categories, and theme switching.

**Important:**

- The app displays tasks from both the DummyJSON API (read-only) and your own local tasks (saved in localStorage).
- All task operations (add, edit, delete, toggle, reorder) are available only for your local tasks. API tasks are for display only and cannot be changed.
- Drag and drop reordering is supported for local tasks only and is persisted in your browser.
- Categories and theme preferences are stored locally and persist across sessions.

![Task Manager Preview](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Personal+Task+Manager)

## ✨ Features


### Core Functionality
- **Task Management (CRUD)**: Create, read, update, delete, and toggle tasks (local tasks only)
- **API Integration**: View tasks from DummyJSON API (read-only)
- **Task Completion**: Toggle completion status for local tasks
- **Search & Filter**: Find tasks by title with instant search
- **Sorting Options**: Sort tasks by creation date, title, or completion status


### Advanced Features
- **Drag & Drop**: Reorder your local tasks with smooth animations (order is saved locally)
- **Category System**: Create and manage task categories with custom colors (local only)
- **Theme Toggle**: Switch between light and dark modes with smooth transitions (local only)
- **Responsive Design**: Optimized for mobile (≥320px), tablet (≥768px), and desktop (≥1024px)
- **Accessibility**: WCAG AA compliant with keyboard navigation and focus indicators


### User Experience
- **Loading States**: Skeleton UI and loading indicators during API calls
- **Error Handling**: Graceful error handling with user-friendly messages
- **Local Storage**: Persistent theme, categories, and your own tasks
- **Smooth Animations**: Micro-interactions and transitions throughout the app

## 🚀 Tech Stack

- **Frontend**: React 18 with Functional Components and Hooks
- **Language**: TypeScript (mandatory)
- **Styling**: Tailwind CSS v4 (latest version, no config required)
- **API Integration**: Async/await with DummyJSON API
- **State Management**: React Context API + Custom Hooks
- **Drag & Drop**: React Beautiful DnD
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Storage**: LocalStorage for categories and theme persistence

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/personal-task-manager.git
   cd personal-task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── TaskItem.tsx     # Individual task component
│   ├── TaskList.tsx     # Task list with drag & drop
│   ├── TaskForm.tsx     # Task creation form
│   ├── TaskFilters.tsx  # Search and filter controls
│   ├── CategoryManager.tsx # Category management
│   ├── Header.tsx       # App header with theme toggle
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── ErrorMessage.tsx # Error display component
│   └── ErrorBoundary.tsx # Error boundary wrapper
├── contexts/            # React Context providers
│   ├── ThemeContext.tsx # Theme management
│   └── CategoryContext.tsx # Category state
├── hooks/               # Custom React hooks
│   └── useTasks.ts      # Task management logic
├── services/            # API and storage services
│   ├── api.ts           # DummyJSON API integration
│   └── storage.ts       # LocalStorage utilities
├── types/               # TypeScript type definitions
│   └── index.ts         # Shared types
├── utils/               # Utility functions
│   └── helpers.ts       # Helper functions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles with Tailwind
```


## 🔧 API & Local Storage Integration

- **API Tasks:**
   - Fetched from DummyJSON API and shown as read-only (cannot be edited, deleted, or toggled).
   - API endpoints used: `GET /todos`, `GET /todos/{id}`.
- **Local Tasks:**
   - All your own tasks (add, edit, delete, toggle, reorder) are stored in your browser's localStorage and persist across sessions.
   - Only local tasks can be changed.
- **Categories & Theme:**
   - Categories and theme preferences are also stored in localStorage.

## 🎨 Styling & Design

- **Tailwind CSS v4**: Latest version with no configuration file required
- **Dark Mode**: Seamless theme switching with localStorage persistence
- **Responsive**: Mobile-first design approach
- **Accessibility**: WCAG AA compliance with proper contrast ratios
- **Animations**: Smooth transitions and micro-interactions

## 📱 Responsive Design

- **Mobile**: ≥320px - Optimized touch interface
- **Tablet**: ≥768px - Enhanced layout with sidebar
- **Desktop**: ≥1024px - Full feature set with expanded sidebar

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Indicators**: Clear visual focus states
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Error Messages**: Clear, descriptive error messaging

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration

### Netlify

1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure redirects for SPA routing if needed

### Manual Deployment

1. Run `npm run build`
2. Upload the contents of the `dist` folder to your web server
3. Configure your server to serve `index.html` for all routes


## 🐛 Known Issues & Limitations

- **API Tasks are Read-Only:** You cannot edit, delete, toggle, or reorder tasks from the DummyJSON API. Only your own (local) tasks are fully editable.
- **Persistence:** Only your own tasks, categories, and theme are saved locally. API tasks are always fetched fresh.
- **Drag & Drop:** Only works for local tasks. API tasks always appear after your local tasks.
- **API Rate Limiting:** DummyJSON has rate limits; consider implementing retry logic.
- **Offline Support:** No offline functionality (future enhancement).

## 🔮 Future Improvements

- [ ] **Due Dates**: Add due date functionality with calendar picker
- [ ] **Keyboard Shortcuts**: Implement keyboard shortcuts for power users
- [ ] **Export Features**: Export tasks to JSON/CSV formats
- [ ] **Task Analytics**: Statistics and productivity insights
- [ ] **Offline Support**: PWA capabilities with service workers
- [ ] **Task Templates**: Pre-defined task templates
- [ ] **Collaboration**: Multi-user support and sharing
- [ ] **Advanced Filtering**: Date ranges, priority levels, and tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing the API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for drag and drop functionality
- [Lucide React](https://lucide.dev/) for the beautiful icon set



**Happy Task Managing! 🎉**