# CRM Web Application

## Overview

This repository contains a Customer Relationship Management (CRM) web application developed using React and TypeScript. The application fetches and displays customer data, allowing for filtering by name and city, highlighting the oldest users per city, and sorting the displayed data. It also features pagination for better data management.

## Features

Fetches customer data from https://dummyjson.com/users.
Filters customers by name and city.
Highlights the oldest users per city.
Supports sorting by first name.
Implements pagination for customer data.
Displays a loading spinner while fetching data.
Handles error states gracefully.

## Environment Setup

Ensure you have Node.js (v14.x or later) and npm (v6.x or later) installed.  
To set up and run the application, execute the following commands:

```
npm install
npm run dev
```

The application will then be accessible at http://localhost:3000.

## Project Structure

src/: Contains the source code for the application.
App.tsx: The main application component.

## Implementation Details

# State Management
- Users: Stores the fetched user data.
- Filtered Users: Stores the filtered user data based on applied filters.
- Name Filter: Stores the current name filter value.
- Debounced Name Filter: Stores the debounced name filter value.
- City Filter: Stores the current city filter value.
- Highlight Oldest: Stores the state of the "Highlight oldest per city" checkbox.
- Sort Column: Stores the current column being sorted.
- Sort Ascending: Stores the sort direction.
- Loading: Stores the loading state.
- Error: Stores the error state.
- Current Page: Stores the current page for pagination.
- Data Fetching
- Data is fetched from the API endpoint https://dummyjson.com/users using axios. Error handling and loading states are managed to provide feedback to the user.

# Debouncing
A 1-second debounce is implemented for the name filter to optimize performance by reducing the number of filter operations.

# Filtering and Highlighting
Users are filtered based on the name and city filters. The oldest user in each city is highlighted if the "Highlight oldest per city" checkbox is checked.

# Sorting
Sorting is implemented for the first name column. Clicking the column header toggles the sort direction.

# Pagination
Pagination is implemented to display a subset of users per page. Navigation buttons allow the user to move between pages.

# Component Breakdown
- App Component
The main component that encapsulates the entire application logic. It manages state, handles data fetching, implements filtering, sorting, and pagination.

- Styling
The application is styled using inline CSS to provide a clean and responsive UI. Key styles include:

- Header with a blue background and white text.
- Filters with consistent padding and border styling.
- Table with alternating row colors for readability.
- Pagination buttons styled for better user interaction.