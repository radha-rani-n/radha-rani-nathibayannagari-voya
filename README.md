# Project Title

## Overview

Voya is your ultimate travel companion, simplifying trip planning and exploration. It helps you discover new and popular destinations, create trip plan for a hassle-free travel experience.

### Problem Space

Planning a vacation can often feel like the most challenging part of the journey. From choosing the perfect destination to discovering popular attractions and organizing your schedule, the process can sometimes take away from the excitement of travel. Our goal is to simplify this experience by eliminating the tedious tasks, so you can focus on what truly matters—enjoying your trip.

With Voya, we aim to solve these common travel planning pain points:

- Destination Dilemma – Struggling to decide where to go and what to explore.
- Itinerary Overload – Manually planning and organizing trips.

### User Profile

The primary users of Voya are individuals who love traveling and seek a seamless way to plan their trips. These users will typically have the following characteristics:

- Age Range: 16 and above
- Personality: Travelers who appreciate having a well-thought-out plan for their trips, whether it’s for leisure, adventure, or cultural exploration. They enjoy the process of carefully organizing and refining every detail to ensure a seamless experience.
- Interests: Exploring new places, cultures, and experiences. They are passionate about traveling and discovering both popular destinations and hidden gems.
- Preferences:
  - Comfortable with technology and mobile apps
  - Prefers organized, hassle-free planning tools
  - Seeks simplicity in creating and managing their travel itineraries
  - Desires recommendations for destinations and places to visit based on their preferences
  - Enjoys the flexibility to adjust their plans as needed

### Features

- As a user, I want to be able to create a trip plan
- As a user, I want to be able to update a trip plan
- As a user, I want to be able to view my past, current, upcoming trip plans
- As a user, I want to be able to delete a trip plan
- As a user, I want to be able to save the trip plan in my profile
- As a user, I want to be able to find place recommendations based on my search
- As a user, I want to be able to add recommended places to my trip plan
- As a user, I want to be able to remove places from my trip plan

## Implementation

### Tech Stack

For Voya app, we will beusing the following technologies:

- Client:
  React.js: A popular JavaScript library for building user interfaces
  React Router DOM: For handling routing in the React application
  Sass: A CSS preprocessor for more maintainable and feature-rich stylesheets
  React-Toastify: For displaying notifications to users
  Vite: A build tool that provides faster and leaner development experience for modern web projects

- Server libraries:
  Node.js: A JavaScript runtime for executing server-side code
  Express: A minimal and flexible Node.js web application framework
  Knex.js: A SQL query builder for Node.js, which will help with database operations
  MySQL: Our chosen relational database management system
  CORS middleware: To enable Cross-Origin Resource Sharing, allowing our frontend to communicate with the backend API

- Development Tools:
  npm: The package manager for JavaScript, used to manage project dependencies
  Figma: For designing and prototyping the user interface

### APIs

For Voya, we will be using multiple API's to handle the core fucntionality of the application. These API's will be responsible for:

- Managing trip plan (CRUD operations)
- Fetching popular places based on user's search criteria

Key endpoints of our API's will include:

#### Client Side:

- /home
- /place/{placeId}
- /trips
- /trips/{tripId}
- /trips/plan
- /about-us

#### Server Side:

**GET `/place/search`**

> Get places based on user search criteria. Returns list of `hits` and nextToken to paginate

Query Parameters:

- `q`: input from user query
- `limit` (optional): default = 5
- `token` (optional)

Example:

Request:

```http
GET /place/search?q=t&limit=5&token=123 HTTP/1.1
Host: backend.voya.com
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

Response:

```json
{
  "hits": [
    {
      "id": 1,
      "name": "Toronto",
      "location": "https://en.wikipedia.org/wiki/Toronto",
      "country": "Canada"
    }
  ],
  "nextToken": "1234444552"
}
```

**GET `/place/recommend`**

> Provides place recommendations. Returns list of `recommendations` and `nextToken` to paginate

Example

Request

```http
GET /place/recommend HTTP/1.1
Host: backend.voya.com
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json
```

Response

```json
{
  "recommendations": [
    {
      "id": 1,
      "name": "Toronto",
      "location": "https://en.wikipedia.org/wiki/Toronto",
      "country": "Canada"
    },
    {
      "id": 2,
      "name": "Brandenburg Gate",
      "location": "https://www.berlin.de/sehenswuerdigkeiten/3560266-3558930-brandenburger-tor.html",
      "country": "Germany"
    }
  ],
  "nextToken": "1234555w323"
}
```

**PUT `/trip`**

> Create a trip

Example

Request

```http
PUT /trip HTTP/1.1
Host: backend.voya.com
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "destination": "Paris",
  "startDate": "2025-06-10",
  "endDate": "2025-06-20",
  "status": "planned"
}
```

Response

```json
{
  "id": "abc123",
  "destination": "Paris",
  "startDate": "2025-06-10",
  "endDate": "2025-06-20",
  "status": "planned",
  "updatedAt": "2025-02-09T12:00:00Z"
}
```

**PATCH `/trip`**

> Update trip details for a given tripId

Example

Request

```http
PATCH /trip HTTP/1.1
Host: backend.voya.com
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "id": "abc123",
  "status": "ongoing"
}
```

Response

```json
{
  "id": "abc123",
  "destination": "Paris",
  "startDate": "2025-06-10",
  "endDate": "2025-06-20",
  "status": "ongoing",
  "updatedAt": "2025-02-09T12:00:00Z"
}
```

**GET `/trip`**

> Get list of trips

Example

Request

```http
GET /trip?page=1&limit=5 HTTP/1.1
Host: backend.voya.com
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Response

```json
{
  "totalTrips": 25,
  "page": 1,
  "limit": 5,
  "totalPages": 5,
  "trips": [
    {
      "id": "trip123",
      "destination": "Paris",
      "startDate": "2025-06-10",
      "endDate": "2025-06-20",
      "status": "planned"
    },
    {
      "id": "trip124",
      "destination": "New York",
      "startDate": "2025-07-01",
      "endDate": "2025-07-10",
      "status": "ongoing"
    }
  ]
}
```

**DELETE `/trip`**

> Delete a trip

Example

Request

```http
DELETE /trip HTTP/1.1
Host: api.example.com
Authorization: Bearer YOUR_ACCESS_TOKEN
Content-Type: application/json

{
  "id": "abc123"
}
```

Response

```
{
  "message": "Trip deleted successfully",
  "id": "abc123"
}
```

### Sitemap

The Voya app will consist of the following main pages:

1. Home Page

   - Search bar for finding popular attractions in a location

2. Plan Trip
   - A form to add a new trip
3. Place
   - View place profile such as popular attractions, weather, accomodation etc.,
4. Trips
   - A page where your planned trips will be displayed
5. Trip

   - View planned trip details such as budget, places, map etc.,

6. About Us Page
   - Information about the app creator

### Mockups

Mockups will be created using Figma, focusing on the following key screens:

- Home Page
- Your Trips
- Plan a trip
- Search result

https://www.figma.com/design/rURCHCI2uvx7rmWzjZ9eSw/Voya?m=auto&t=DZgBadUeZWoML0yp-6

The design process will include:

- Creating low-fidelity wireframes
- Developing a consistent design system (color palette, typography, reusable components)
- Designing responsive layouts for both mobile, tablet and desktop views

### Data

Voya app will primarily manage data related to popular places for vacation, planned trips

## Roadmap

week 1(February 10 -16)
Day 1-2: Finalize project design and create detailed wireframes
Day 3: Set up project structure and development environment
Day 4: Implement basic backend structure and database setup
Day 5: Develop frontend components
Day 6-7: Implement Home Page
week 2(February 17-20)
Day 1: Implement Saved Trips Page
Day 2: Polish UI/UX, ensure responsive design
Day 3: Thorough testing and bug fixing
Day 4: Final adjustments and preparation for presentation

## Nice to Have

- **Login/Sign Up**
  - Login form for a user to login
  - Sign up form for a user to sign-up
- **Accommodation Finder** – Discover the best stays within your budget.
- **Interactive Maps** – Navigate destinations with integrated maps and directions.
- **Shared Trip Plans** – View trip plans shared by others.
- **Trip Plan Sharing** – Share your trip plan with others.
- **Trip Plan Notes** – Add notes or details to places in your trip plan.
- **Collaborative Planning** – Collaborate on trip plans with others.
- **Activity Reminders** – Set reminders for activities in your trip plan.
- **Calendar Sync** – Sync your trip plan with your calendar.
- **Offline Access** – View your travel plans even without an internet connection.
- **Real-time Updates** – Get live updates on flights, weather, and local events.
- **Seamless Calendar Sync** – Auto-sync travel plans with your calendar for easy scheduling.
- **Expense Tracking** – Keep track of your trip expenses and split costs effortlessly.
- **Smart Trip Planning** – Automatically generate and customize travel itineraries.
- **Booking** – Book accommodation and rental cars from within the app.
- **Gmail Sync** – Auto-sync receipts (e.g., hotels, rentals) from Gmail into your user plan.

## Future Implementations

Make the booking process seamless by forming partnerships with top-tier accommodation providers, car rental services, and other relevant travel companies. By integrating these services into the platform, users can enjoy a streamlined, all-in-one booking experience without needing to leave the app. Integration with existing platforms like booking websites, hotel chains, or car rental systems will allow for real-time availability updates, easy price comparisons, and secure payment processing. This collaborative approach not only simplifies the user experience but also ensures that customers can make informed decisions based on the latest offers, reviews, and tailored recommendations. By offering a fully integrated, end-to-end booking solution, users can book everything they need for their trip in just a few clicks, all while ensuring consistency and reliability across different services
