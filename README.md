# 3D Orderbook Depth Visualizer

A sophisticated real-time cryptocurrency orderbook visualization tool built with Next.js, React Three Fiber, and TypeScript. This application provides an immersive 3D representation of market depth data with advanced pressure zone analysis and multi-venue filtering capabilities.

![3D Orderbook Visualizer](https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop)

## 🚀 Features

### Core Visualization
- **Interactive 3D Graph**: Price (X-axis), Quantity (Y-axis), Time (Z-axis) representation
- **Real-time Updates**: Live orderbook data simulation with configurable refresh rates
- **Smooth Rotation**: Auto-rotating visualization with adjustable speed controls
- **Manual Controls**: Zoom, pan, and rotate capabilities for detailed exploration

### Advanced Analytics
- **Pressure Zone Analysis**: Automatic detection and visualization of high-concentration order areas
- **Multi-Venue Support**: Filter and compare data across multiple exchanges (Binance, OKX, Bybit, Deribit)
- **Market Statistics**: Real-time bid/ask ratios, spread analysis, and volume metrics
- **Time Range Filtering**: Historical data viewing (1m, 5m, 15m, 1h intervals)

### User Experience
- **Dark/Light Mode**: Seamless theme switching with trading-optimized color schemes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Tooltips**: Detailed order information on hover
- **Performance Optimized**: 60fps rendering with level-of-detail optimization

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **3D Graphics**: React Three Fiber + Three.js
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom trading themes
- **State Management**: React Context API with useReducer
- **Theme System**: next-themes for dark/light mode
- **Type Safety**: TypeScript throughout
- **Icons**: Lucide React

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: For cloning the repository

You can verify your installations by running:
\`\`\`bash
node --version
npm --version
git --version
\`\`\`

## 🚀 Local Setup Instructions

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/AnkithBangre/Orderbook-Depth-3D-Visualize.git
cd orderbook-3d-visualizer
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

This will install all required packages including:
- React Three Fiber for 3D rendering
- shadcn/ui components
- Tailwind CSS for styling
- TypeScript definitions

### 3. Start Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at \`http://localhost:3000\`

### 4. Build for Production (Optional)

\`\`\`bash
npm run build
npm start
\`\`\`

## 📁 Project Structure

\`\`\`
orderbook-3d-visualizer/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Main application page
│   └── globals.css              # Global styles and CSS variables
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── slider.tsx
│   │   └── ...
│   ├── orderbook-visualizer.tsx # Main 3D canvas container
│   ├── orderbook-scene.tsx      # 3D scene logic
│   ├── orderbook-bar.tsx        # Individual order visualization
│   ├── pressure-zone-indicator.tsx # Pressure zone markers
│   ├── control-panel.tsx        # User controls interface
│   ├── stats-panel.tsx          # Market statistics display
│   ├── theme-provider.tsx       # Theme context provider
│   └── theme-toggle.tsx         # Dark/light mode toggle
├── contexts/                     # React contexts
│   └── orderbook-context.tsx    # Orderbook state management
├── lib/                         # Utility functions
│   └── utils.ts                 # Common utilities
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
\`\`\`

## 🔧 Configuration Options

### Environment Variables

Currently, the application runs entirely with mock data and doesn't require environment variables. For future real API integration, you would add:

\`\`\`env
# .env.local (for future real API integration)
NEXT_PUBLIC_BINANCE_WS_URL=wss://stream.binance.com:9443/ws
NEXT_PUBLIC_OKX_WS_URL=wss://ws.okx.com:8443/ws/v5/public
\`\`\`

### Customization

You can customize various aspects of the visualization:

1. **Venues**: Edit \`initialState.venues\` in \`contexts/orderbook-context.tsx\`
2. **Price Range**: Modify \`priceRange\` in the same file
3. **Colors**: Update theme colors in \`tailwind.config.ts\`
4. **Update Frequency**: Change the interval in the real-time effect (currently 1000ms)

## 📊 Data Structure & APIs

### Mock Data Generation

The application currently uses sophisticated mock data generation to simulate real orderbook behavior:

\`\`\`typescript
interface OrderbookEntry {
  price: number        // Order price level
  quantity: number     // Order size
  timestamp: number    // When the order was placed
  venue: string       // Exchange name
  side: "bid" | "ask" // Order side
  id: string          // Unique identifier
}
\`\`\`

### Pressure Zone Algorithm

Pressure zones are calculated using a clustering algorithm:

1. **Price Grouping**: Orders are grouped by $10 price levels
2. **Quantity Aggregation**: Total quantity per price level is calculated
3. **Intensity Calculation**: Normalized based on maximum observed quantity
4. **Filtering**: Only zones above threshold are displayed
5. **Ranking**: Sorted by total quantity, top 10 displayed

### Future API Integration

The architecture is designed to easily integrate with real APIs:

- **WebSocket Support**: Ready for real-time data streams
- **Multiple Venues**: Structured to handle different exchange formats
- **Error Handling**: Graceful degradation for connection issues
- **Rate Limiting**: Built-in throttling mechanisms

## 🎨 Design Decisions

### 3D Visualization Choices

1. **Axis Mapping**:
   - **X-axis (Price)**: Horizontal spread for easy price comparison
   - **Y-axis (Quantity)**: Vertical height for intuitive volume representation
   - **Z-axis (Time)**: Depth for temporal progression

2. **Color Coding**:
   - **Green**: Bid orders (buying pressure)
   - **Red**: Ask orders (selling pressure)
   - **Venue Colors**: Unique colors for each exchange
   - **Pressure Zones**: Heat map colors (green → yellow → red)

3. **Performance Optimizations**:
   - **LOD System**: Simplified rendering for distant objects
   - **Data Limiting**: Maximum 1000 entries to prevent memory issues
   - **Efficient Updates**: Only re-render changed components
   - **Smooth Animations**: 60fps target with optimized frame loops

### UI/UX Decisions

1. **Theme System**:
   - **Dark Mode Default**: Optimized for trading environments
   - **Smooth Transitions**: 300ms transitions for all theme changes
   - **Trading Colors**: High contrast for critical information

2. **Control Layout**:
   - **Right Panel**: Controls for easy access
   - **Left Panel**: Statistics for monitoring
   - **Top Bar**: Theme toggle and title
   - **Responsive**: Adapts to different screen sizes

3. **Interaction Design**:
   - **Hover Tooltips**: Detailed information without cluttering
   - **Smooth Controls**: Intuitive camera manipulation
   - **Real-time Feedback**: Immediate response to user actions

## 🔍 Technical Assumptions

### Data Assumptions

1. **Price Precision**: Assumes USD pricing with 2 decimal places
2. **Quantity Range**: Orders between 0.01 and 5.0 units
3. **Time Window**: 5-minute default window for optimal performance
4. **Venue Availability**: All venues assumed to be online and responsive

### Performance Assumptions

1. **Hardware**: Modern GPU with WebGL 2.0 support
2. **Browser**: Chrome/Firefox/Safari with hardware acceleration
3. **Network**: Stable connection for real-time updates
4. **Memory**: Sufficient RAM for 1000+ 3D objects

### User Assumptions

1. **Trading Knowledge**: Users familiar with orderbook concepts
2. **3D Navigation**: Basic understanding of 3D controls
3. **Screen Size**: Minimum 1024px width for optimal experience

## 🧪 Testing

### Running Tests

\`\`\`bash
# Unit tests (when implemented)
npm test

# Type checking
npm run type-check

# Linting
npm run lint
\`\`\`

### Manual Testing Checklist

- [ ] 3D scene loads without errors
- [ ] Theme toggle works correctly
- [ ] All venue filters function properly
- [ ] Pressure zones display accurately
- [ ] Real-time updates work smoothly
- [ ] Mobile responsiveness
- [ ] Performance maintains 60fps

## 🚀 Deployment

### Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Other Platforms

The application can be deployed to any platform supporting Next.js:

- **Netlify**: \`npm run build && npm run export\`
- **AWS Amplify**: Connect GitHub repository
- **Docker**: Use provided Dockerfile (if added)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit changes: \`git commit -m 'Add amazing feature'\`
4. Push to branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use semantic commit messages
- Add tests for new features
- Update documentation as needed
- Ensure responsive design

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Three Fiber**: For excellent 3D React integration
- **shadcn/ui**: For beautiful, accessible components
- **Tailwind CSS**: For rapid styling development
- **Next.js**: For the robust React framework
- **Three.js**: For powerful 3D graphics capabilities

## 📞 Support

For support, please:

1. Check the [Issues](https://github.com/AnkithBangre/Depth-3D-Visualizer/issues) page
2. Create a new issue with detailed description
3. Include browser version and error messages
4. Provide steps to reproduce the problem

## 🔮 Future Enhancements

- [ ] Real WebSocket API integration
- [ ] Machine learning pressure zone prediction
- [ ] Order flow animation
- [ ] Volume profile overlay
- [ ] Export functionality for analysis
- [ ] Mobile touch controls optimization
- [ ] Multi-timeframe analysis
- [ ] Custom alert system

---

**Built with ❤️ for the trading community**
\`\`\`

## 🏃‍♂️ Quick Start

For the impatient developer:

\`\`\`bash
git clone <repository-url>
cd orderbook-3d-visualizer
npm install
npm run dev
# Open http://localhost:3000
\`\`\`

That's it! You should see the 3D orderbook visualizer running with simulated data.
