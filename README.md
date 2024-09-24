
![Designer](https://github.com/user-attachments/assets/142dc9b0-81d6-4731-83ea-84f55d9c105c)

# Weather Dashboard Application
This project is a sophisticated weather dashboard application, built using **React**, **Next.js**, and **Tailwind CSS**, with **Ant Design** for an elegant user interface. The application offers users detailed and real-time weather data, including current weather conditions, air quality levels, and a 5-day weather forecast. Designed with user-friendliness in mind, it provides an interactive and responsive experience that works seamlessly across devices.

## Features
- 🌍 **Current Weather and Local Time**: Displays real-time weather conditions for the selected city, alongside the current date and local time.
- 🏙️ **City Selector and Large City Quick-Access**: Users can quickly search for and switch between cities using a search bar or by selecting from a list of major cities.
- 📅 **5-Day Weather Forecast**: Shows a detailed weather forecast for the next 5 days, including high/low temperatures, making future weather trends easily accessible.
- 🌡️ **Temperature Details**: Displays current temperature, feels-like temperature, and expected temperature highs and lows, along with weather descriptions (e.g., Broken Clouds).
- 📉 **Air Quality Index (AQI)**: Visualizes air quality using a color-coded progress bar, helping users understand environmental conditions at a glance.
- 🌅 **Sunset and Sunrise Times**: Includes sunset and sunrise information, with an additional feature displaying sunset time on a compass-like widget.
- 🌬️ **Wind Speed and Direction**: A wind compass shows the current wind speed and direction for easy interpretation.
- 🌞 **UV Index**: Displays the current UV index and advises users to take precautions during higher levels of UV exposure.
- 💧 **Humidity and Pressure Levels**: Provides additional weather metrics such as humidity and atmospheric pressure.
- 🌫️ **Visibility Data**: Shows current visibility distances, aiding in understanding local weather clarity.
- 🗺️ **Interactive Map Component**: An embedded map powered by OpenStreetMap allows users to interact with the geographical location, enhancing navigation and selection of cities.
- 💡 **Theme Switching**: Users can toggle between dark and light themes, improving accessibility and customization options.
- 📏 **Additional Metrics**: Provides visibility and pressure measurements to offer a comprehensive view of current weather conditions.

## Technologies Used
- **React**: Framework for building the interactive user interface.
- **Next.js**: For server-side rendering and optimized performance.
- **Tailwind CSS**: For flexible styling and responsive design.
- **Ant Design**: Used for modern and visually consistent UI components.
- **React Redux Toolkit**: Manages global state efficiently across the app, improving scalability.
- **Axios**: Handles asynchronous API requests to fetch weather and air quality data.
- **OpenStreetMap API**: Powers the interactive map component.

## Getting Started
1. Clone the repository:
   ```bash
   https://github.com/nuricanbrdmr/Weather-Dashboard-Website.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Key Insights
- Efficient state management using **React Redux Toolkit** simplifies handling multiple cities and API requests while maintaining responsiveness.
- Implementing debounce for the search feature improves performance, preventing unnecessary API calls during typing.
- Temperature conversions (Kelvin to Celsius) and additional weather data metrics, such as wind and humidity, enhance the depth of the application.
- Using color-coded scales for AQI and UV index adds a clear visual representation, making data interpretation easier for users.
- A well-structured layout ensures that weather data, maps, and user inputs are always accessible and cleanly presented, regardless of screen size or device.

📸 Screenshots

![Screenshot_3](https://github.com/user-attachments/assets/f972e725-1b93-4f2e-94a2-a6fceb56e719)

![Screenshot_4](https://github.com/user-attachments/assets/185c879c-28e4-4765-be49-113b3467e2d1)

![Screenshot_1](https://github.com/user-attachments/assets/8fc35714-6f36-478f-8740-48f611c0a5a1)

![Screenshot_2](https://github.com/user-attachments/assets/843f9dcf-c69c-409f-bd29-0db3e93deec6)

## References
I used [The Code Dealer YouTube channel](https://www.youtube.com/watch?v=rscl9VwwnQg&t=19564s) to develop this project. Thank you for the useful content.

