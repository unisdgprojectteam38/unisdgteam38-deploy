# LMS Frontend

## Overview

The frontend of the Learning Management System (LMS) is developed using **React** and **Next.js**, and is deployed on **Vercel**. The project follows a React component-based architecture and utilizes the app router integrated with the latest Next.js.

## Demo

Try our staging deployment: [LMS Quiz Demo](https://sdg-gamified-lms-it-git-staging-kevinzhouus-projects.vercel.app/quiz)

## Project Structure

```
/app
├── /auth         # Authentication related pages and components
├── /callback     # Handles authentication callbacks
├── /login        # Login page
├── /notes        # Notes related functionalities
├── /protected    # Protected routes
├── /quiz         # Quiz functionalities
├── /components   # Reusable components (NavBar, Quiz, etc.)
├── /styles       # Global and component-level styling
├── /utils        # Utility functions (API calls, helpers)
├── /hooks        # Custom hooks for state management
```

## Key React Components

1. **NavBar**
   - **Purpose**: Provides navigation across different sections of the application.
   - **Key Features**: User login/logout, responsive design.

2. **Dashboard**
   - **Purpose**: Displays a summary of user activity.
   - **Key Features**: Personalized progress view, available modules.

3. **InteractiveModule**
   - **Purpose**: Displays module content and quizzes.
   - **Key Features**: Content-quiz integration, module completion tracking.

4. **ModuleList**
   - **Purpose**: Lists all available learning modules.
   - **Key Features**: Module browsing, filtering, selection based on completion.

5. **ContentDisplay**
   - **Purpose**: Renders various content types within a module.
   - **Key Features**: Dynamic content loading, engagement tracking.

6. **Quiz**
   - **Purpose**: Presents quizzes for module completion.
   - **Key Features**: Multiple choice support, submission handling.

7. **QuizResults**
   - **Purpose**: Displays quiz outcomes.
   - **Key Features**: Answer review, performance feedback.

8. **Login/Signup**
   - **Purpose**: Handles user authentication.
   - **Key Features**: Authentication forms, post-auth redirects.

9. **Profile**
   - **Purpose**: User profile management.
   - **Key Features**: Profile updates, role-based information display.

10. **AdminList**
    - **Purpose**: Admin user management.
    - **Key Features**: Admin CRUD operations, privilege management.

11. **ModuleEditor** (Admin only)
    - **Purpose**: Module creation and editing interface.
    - **Key Features**: Quiz/content addition, module structure editing.

12. **QuizEditor** (Admin only)
    - **Purpose**: Quiz creation and modification.
    - **Key Features**: Question management, answer setting.

13. **UserProgress**
    - **Purpose**: User progress tracking and display.
    - **Key Features**: Progress visualization for modules and quizzes.

14. **ManageAdmins** (Admin only)
    - **Purpose**: Admin role and permission management.
    - **Key Features**: Admin privilege assignment and revocation.

## Getting Started

(Add instructions for setting up the project locally, including prerequisites, installation steps, and how to run the development server.)

## Contributing

(Add guidelines for contributing to the project, if applicable.)

## License

(Add license information for the project.)