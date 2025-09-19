# Book Management Dashboard

## Overview

This is a responsive React.js dashboard application for managing a book inventory. It provides an intuitive user interface to list, add, edit, and delete books with full CRUD capabilities. The app integrates with a RESTful API for persistent data storage and includes key features such as search, filtering, pagination, and form validation.

## Features

- Display a paginated list of books with columns for Title, Author, Genre, Published Year, and Status (Available/Issued).
- Search books by title or author.
- Filter books by genre and availability status.
- Add and edit books via modal forms with comprehensive validation rules.
- Delete books with confirmation modals.
- User-friendly toast notifications for success and error feedback.
- Loading skeletons during data fetching improve user experience.
- Responsive design built using Tailwind CSS.
- Integration with a live REST API (e.g., CrudCrud) using axios and React Query for efficient data fetching and mutation.
- Clean, modular, and maintainable codebase using React functional components and hooks.

## Technology Stack

- **React.js** — UI library for building the frontend.
- **React Query** — For efficient and automatic server state management.
- **Axios** — HTTP client for REST API requests.
- **React Hook Form** — For simple and powerful form handling and validation.
- **Tailwind CSS** — For utility-first styling and responsive design.
- **Lucide React** — For consistent and modern SVG icons.
- **CrudCrud / Fake REST API** — Backend service for simulating persistent book storage.

## Getting Started

### Prerequisites

- Node.js (version 14 or above)
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/satywanbhalekar/book-management-app.git
   cd book-management-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root and add your API endpoint:

   ```env
   REACT_APP_API_BASE_URL=https://crudcrud.com/api/<your-api-key>/books
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

- `/src/components` — Contains reusable UI components, forms, modals, and the main Dashboard.
- `/src/services` — API layer wrapping REST calls using axios.
- `/src/hooks` — Custom hooks (if any for state or logic).
- Tailwind CSS configuration files for styling.

## Future Enhancements

- Add user authentication for secured access.
- Improve form UX with dynamic selects and date pickers.
- Add sorting and advanced filtering options.
- Implement unit and integration testing for components and API interactions.

## Contact & Acknowledgments

- Developed as part of a React.js developer assessment task.
- Icons from Lucide React, UI styling using Tailwind CSS.
- API powered by CrudCrud fake REST service.

***


