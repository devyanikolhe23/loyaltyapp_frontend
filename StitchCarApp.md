Documentaion on StitchCar App Project

1. Project's Folders Structure

stitchcar/
├── __tests__/                     
├── .bundle/                       
├── android/                       
├── ios/                           
├── node_modules/                  
│
├── src/                           
│   ├── assets/                    
│   │   └── images/                
│   │       ├── carbanner.jpg
│   │       ├── engine_bay.webp
│   │       ├── exterior_polishing.jpg
│   │       ├── full_car_wash.jpg
│   │       ├── interior_detailing.webp
│   │       ├── map.webp
│   │       ├── oil_change.jpg
│   │       ├── referfriend.jpg
│   │       ├── reward_car.jpg
│   │       └── tire_rotation.jpg
│   │
│   ├── navigation/                
│   │   ├── AppNavigator.js
│   │   ├── BottomTabs.js
│   │   └── StackNavigator.js
│   │
│   ├── screens/                   
│   │   ├── home/                  
│   │   │   └── home_dashboard.jsx
│   │   │
│   │   ├── service/               
│   │   │   ├── ServiceScreen.jsx
│   │   │   ├── ServiceCenterScreen.jsx
│   │   │   ├── ServiceHistoryScreen.jsx
│   │   │   ├── VehicleRecallsScreen.jsx
│   │   │   └── RoadsideAssistanceScreen.jsx
│   │   │
│   │   ├── booking/               
│   │   │   ├── BookingServiceScreen.jsx
│   │   │   └── BookingConfirmationScreen.jsx
│   │   │
│   │   ├── user/                  
│   │   │   ├── LoginScreen.jsx
│   │   │   ├── ProfileScreen.jsx
│   │   │   ├── MyVehiclesScreen.jsx
│   │   │   └── NotificationsScreen.jsx
│   │   │
│   │   ├── payments/              
│   │   │   ├── PaymentMethodsScreen.jsx
│   │   │   ├── PaymentScreen.jsx
│   │   │   └── CouponsScreen.jsx
│   │   │
│   │   ├── rewards/               
│   │   │   ├── LoyaltyRewardsScreen.jsx
│   │   │   ├── MembershipScreen.jsx
│   │   │   ├── PromotionsScreen.jsx
│   │   │   └── ReferFriendScreen.jsx
│   │   │
│   │   ├── insurance/             
│   │   │   └── InsurancePolicyScreen.jsx
│   │   │
│   │   ├── support/               
│   │   │   ├── HelpCenterScreen.jsx
│   │   │   ├── FeedbackScreen.jsx
│   │   │   ├── SupportScreen.jsx
│   │   │   ├── DrivingTipsScreen.jsx
│   │   │   ├── ReferralProgramScreen.jsx
│   │   │   └── TermsAndConditionsScreen.jsx
│   │   │
│   │   └── showroom/              
│   │       └── ShowroomsScreen.jsx
│   │
│   ├── components/                
│   │   ├── BottomNavBar.jsx
│   │   │
│   │   ├── home/                  
│   │   │   ├── QuickAction.jsx
│   │   │   ├── ExploreButton.jsx
│   │   │   └── PromotionCard.jsx
│   │   │
│   │   ├── service/ServiceCard.jsx
│   │   │
│   │   ├── bookingConfirmation/   
│   │   │   ├── DetailRow.jsx
│   │   │   ├── MapCard.jsx
│   │   │   ├── BookingDetailsCard.jsx
│   │   │   └── ActionButtons.jsx
│   │   │
│   │   ├── bookingService/        
│   │   │   ├── ServiceSelection.jsx
│   │   │   ├── DateTimePicker.jsx
│   │   │   └── VehicleDetailsForm.jsx
│   │   │
│   │   ├── drivingTips/           
│   │   │   ├── TabItem.jsx
│   │   │   ├── ArticleCardWidget.jsx
│   │   │   └── ArticleCard.jsx
│   │   │
│   │   ├── feedback/StarRating.jsx
│   │   ├── insurancePolicy/InfoCard.jsx
│   │   ├── login/CustomTextField.jsx
│   │   │
│   │   ├── loyaltyRewards/        
│   │   │   ├── RewardCard.jsx
│   │   │   └── EarnCard.jsx
│   │   │
│   │   ├── membership/MembershipCard.jsx
│   │   ├── coupons/CouponsCard.jsx
│   │   ├── myVehicles/VehicleCard.jsx
│   │   ├── notifications/ToggleTile.jsx
│   │   │
│   │   ├── paymentMethods/        
│   │   │   ├── CardTile.jsx
│   │   │   └── WalletTile.jsx
│   │   │
│   │   ├── profile/               
│   │   │   ├── AccountTile.jsx
│   │   │   ├── PreferenceTile.jsx
│   │   │   ├── MoreTile.jsx
│   │   │   └── ProfileImagePicker.jsx
│   │   │
│   │   ├── serviceHistory/ServiceRecord.jsx
│   │   │
│   │   ├── support/               
│   │   │   ├── FaqTile.jsx
│   │   │   ├── ContactTile.jsx
│   │   │   └── ResourceTile.jsx
│   │   │
│   │   ├── termsAndConditions/ReusableCard.jsx
│   │   └── vehicleRecalls/RecallCard.jsx
│   │
│   ├── models/                    
│   │   ├── Service.js
│   │   ├── ChatMessage.js
│   │   ├── FaqItem.js
│   │   ├── FeedbackModel.js
│   │   └── InsuranceModel.js
│   │
│   ├── utils/                     
│   │   ├── colors.js
│   │   ├── textStyles.js
│   │   ├── constants.js
│   │   └── styles.js
│   │
│   └── services/                  
│       ├── api.js
│       ├── authService.js
│       ├── bookingService.js
│       ├── notificationService.js
│       └── paymentService.js
│
├── .eslintrc.js
├── .gitignore
├── .prettierrc.js
├── .watchmanconfig
├── app.json
├── App.jsx  
├── babel.config.js
├── Gemfile
├── index.js 
├── jest.config.js
├── metro.config.js
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json

2. Project's Tech Stack (Frontend Only)

Framework: React Native
Language: JavaScript (JSX)          
Navigation: React Navigation (Stack Navigator + Bottom Tabs)
State Management: React Hooks + Context API
UI / Styling: React Native StyleSheet
Custom utility files (colors.js, textStyles.js, styles.js)
Reusable components (src/components/)
Networking: Axios (src/services/api.js)
Testing: Jest (__tests__/)
Assets Management: Local images and icons in src/assets/
Platform Support: Android & iOS

3. Project's Description
Stitch Car is a modern, user-friendly mobile application designed to streamline car service management for customers and service providers. The app provides a comprehensive platform where users can conveniently book, track, and manage vehicle services in just a few taps.
Built with React Native for a seamless cross-platform experience, Stitch Car ensures high performance, a clean UI/UX, and easy scalability. The application focuses on enhancing customer experience through real-time updates, smart notifications, and integrated support.

Key Features:
1. Service Booking: Users can book services such as oil changes, tire rotations, brake       inspections, and full car servicing.
2. Smart Scheduling: Calendar integration allows customers to select preferred dates and time slots.
3. Service History: View and track past service records for better vehicle maintenance planning.
4. Notifications & Reminders: Stay updated on upcoming services, appointments, and special offers.
5. Loyalty & Rewards: Users can access promotions, referral programs, and loyalty benefits.
6. Secure Payments: Multiple payment methods including UPI, cards, and net banking.
7. Support Center: Built-in FAQs, contact options, and chat support for quick assistance.
8. Profile Management: Manage personal details, update profile picture, and set user preferences.

4. Project's Low-Level Diagram
+------------------------------------------------------+
|                  Stitch Car Service App              |
+------------------------------------------------------+
|                                                      |
|  [Frontend Layer]                                   |
|  ├── HomePage                                        |
|  ├── ServicesPage                                    |
|  ├── BookServicePage                                 |
|  │     ├── ServiceCard (title, desc, price, image) |
|  │     ├── AddButton                                |
|  │     └── PopularBadge                              |
|  ├── BookingHistoryPage                              |
|  ├── SupportPage                                     |
|  ├── ProfilePage                                     |
|  └── BottomNavigationBar                             |
|         ├── Home                                     |
|         ├── Services                                 |
|         ├── Book Service (active)                    |
|         ├── Support                                  |
|         └── Profile                                  |
|                                                      |
|  [Backend Layer]                                     |
|  ├── BookingController                               |
|  │     ├── createBooking()                           |
|  │     ├── cancelBooking()                           |
|  │     └── getBookingsByUser()                       |
|  ├── UserController                                  |
|  │     ├── createUser()                              |
|  │     ├── loginUser()                               |
|  │     └── getUserProfile()                          |
|  ├── ServiceController                               |
|  │     ├── getServices()                             |
|  │     └── getServiceDetails()                       |
|  ├── PaymentController                               |
|  │     └── processPayment()                          |
|  ├── BookingService                                   |
|  │     ├── validateBooking()                         |
|  │     ├── processBooking()                          |
|  │     └── notifyUser()                              |
|  ├── UserService                                      |
|  ├── ServiceService                                   |
|  ├── PaymentService                                   |
|  └── Repositories                                     |
|         ├── BookingRepository                        |
|         ├── UserRepository                           |
|         ├── ServiceRepository                        |
|         └── PaymentRepository                        |
|                                                      |
|  [Database Layer]                                    |
|  ├── users                                            |
|  ├── bookings                                         |
|  ├── services                                         |
|  └── payments                                         |
|                                                      |
|  [External Integrations]                             |
|  ├── Payment Gateway API                             |
|  ├── Firebase Notification Service                    |
|  └── Google Maps API                                 |
+------------------------------------------------------+

5. How to Set Up the Project and Run It

Step 1: Clone the Repository
git clone <repository_url>
cd stitchcar

Step 2: Verify Node.js and npm
Ensure you have Node.js v18+ installed. Check versions:
node -v
npm -v

Step 3: Install Project Dependencies
npm install
This will install all required packages listed in package.json.

Step 4: Start Metro Bundler
Metro Bundler serves the JavaScript code to the emulator or device:
npx react-native start

Step 5: Run the App on Android
Make sure Android Studio is installed and an emulator or device is connected:
npx react-native run-android

Step 6: Run the App on iOS (macOS only)
Ensure Xcode is installed and a simulator/device is available:
npx react-native run-ios

6. How to install all dependencies and get started with the project setup 
1. Prerequisites
Before setting up the project, ensure the following software and tools are installed: 
Node.js (version 18 or higher)
npm (Node package manager) or Yarn
React Native CLI
Android Studio with SDK and emulator (for Android development)
Xcode (for iOS development, macOS only)
Optional Development Tools:
VS Code with React Native extensions
Flipper for debugging
Android Emulator / iOS Simulator

2. Clone the Project Repository
Obtain the project repository URL and clone it to your local machine:
git clone <repository_url>
cd stitchcar

3. Install Project Dependencies
Install all necessary Node.js packages required for the project:
npm install
Alternatively, if using Yarn:
yarn install
This will install all libraries listed in package.json, including React Native, React Navigation, Axios, and Jest.

4. iOS-specific Setup (macOS only)
For iOS development, CocoaPods must be installed to manage native dependencies. Navigate to the iOS folder and install pods:
cd ios
pod install
cd ..

5. Start the Development Server
Start the Metro JavaScript bundler to serve the app to emulators or connected devices:
npx react-native start

6. Run the Application
Android:
Ensure Android Studio is installed and an emulator or physical device is connected.
npx react-native run-android
iOS (macOS only):
Ensure Xcode is installed and a simulator or physical device is available.
npx react-native run-ios

7. Optional Development Tools
VS Code with React Native extension for debugging and code assistance
Flipper for inspecting network requests, UI components, and state
Android Emulator / iOS Simulator for device simulation