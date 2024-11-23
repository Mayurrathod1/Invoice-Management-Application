# Invoice Management Application

A React-based invoice management system that automates the extraction, processing, and management of invoice data from various file formats. The application provides real-time synchronization across different sections using Redux for state management.

## 📺 Demo Video

[Watch the Full Demo Video](https://drive.google.com/file/d/11tCKWfgeoBsr8df46e9AFOecdBhGe8dz/view?usp=drive_link)

The demo video covers:
- File upload and processing workflow
- Real-time data synchronization
- Search and sort functionality
- Theme switching
- Error handling demonstrations

## 📸 Screenshots

### Dashboard Overview
![image](https://github.com/user-attachments/assets/b96e73fc-065b-4393-9512-f33f1a6e84bb)

*Main dashboard showing all three tabs and navigation*

### Product Catalog
![image](https://github.com/user-attachments/assets/32fb2226-3340-4c5b-9961-c04be8c81a32)

*Products management interface with sorting enabled*

### Customer Management
![image](https://github.com/user-attachments/assets/3869a9d9-4fe3-43e6-abf2-ca4035eedfdf)
*Customer information and purchase history*

### Features Showcase

#### Dark/Light Theme
| Light Theme | Dark Theme |
|-------------|------------|
|![image](https://github.com/user-attachments/assets/794532d7-eeb0-48fd-958f-f75183a45ead) | ![image](https://github.com/user-attachments/assets/932885cf-f36f-47b8-8aef-638ef5b6e724)  |

#### Data Validation
![Screenshot from 2024-11-23 16-49-39](https://github.com/user-attachments/assets/4e825e84-5380-49f7-830b-da43f5d7fbfe)
*Example of form validation and error handling*

#### File Upload Process
![image](https://github.com/user-attachments/assets/c2e834ad-9300-4f3e-89e5-20ed32bea9a5)

*Step-by-step file upload and processing visualization*

## 🚀 Features

### Core Functionality
- **Multi-format File Processing**
  - Support for Excel files (transaction details)
  - Support for PDF/Images (invoice details)
  - AI-powered data extraction (using Gemini AI)

### Data Management
- **Three Main Sections**
  1. Invoices: Complete transaction details
  2. Products: Inventory and pricing information
  3. Customers: Client information and purchase history

### Real-time Features
- Live data synchronization across tabs
- Automatic updates when data changes
- Debounced search functionality
- Dynamic sorting capabilities

### User Experience
- Dark/Light theme support
- Validation feedback
- Missing field indicators
- Error handling for unsupported formats
- Database persistence

## 🏗️ Project Structure

```
client/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── [other components]
│   ├── pages/
│   ├── handlers/
│   ├── lib/
│   ├── store/
│   │   ├── slice/
│   │   │   ├── productSlice
│   │   │   ├── invoiceSlice
│   │   │   └── customerSlice
│   │   ├── thunks/
│   │   │   ├── productThunk
│   │   │   ├── invoiceThunk
│   │   │   └── customerThunk
│   │   ├── selectors/
│   │   │   └── productSelector
│   │   └── index.ts
│   └── types/
│       └── redux-types
│
server/
└── [Gemini AI API implementation]
```

## 🔄 Data Flow

![image](https://github.com/user-attachments/assets/334d6db4-a5c3-4662-8a0c-0117a44ac874)


## 💻 Required Data Structure

### Invoices Tab
- Serial Number
- Customer Name
- Product Name
- Quantity
- Tax
- Total Amount
- Date

### Products Tab
- Name
- Quantity
- Unit Price
- Tax
- Price with Tax
- Discount (optional)

### Customers Tab
- Customer Name
- Phone Number
- Total Purchase Amount

## 🛠️ Technical Stack

### Frontend
- React
- Redux + Redux Thunk
- TypeScript
- Custom UI Components (No external libraries)

### Backend
- Gemini AI API for data extraction

## 🔍 State Management Details

### Redux Implementation
1. **Store Initialization**
   - Configures Redux store with middleware
   - Sets up Redux Thunk for async operations

2. **Data Flow**
   - Components dispatch thunks on mount
   - Thunks handle async API calls with debouncing
   - Store updates trigger UI re-renders
   - Selectors optimize data retrieval

3. **Error Handling**
   - Captures and displays API errors
   - Validates data integrity
   - Manages loading states

## 🎨 Additional Features

### Search Functionality
- Real-time search across all tabs
- Debounced input handling
- Multiple field search support

### Sorting Capabilities
- Multi-column sorting
- Ascending/descending toggle
- Persistent sort preferences

### Theme Support
- Dark/Light mode toggle
- Consistent styling
- Smooth transitions

### Data Validation
- Required field checking
- Format validation
- Error highlighting
- User feedback system

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:3000`

