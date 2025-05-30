# Global Agricultural Analytics Visualization

A comprehensive data visualization project that explores global agricultural production, sustainability metrics, and regional trends from 1961 to 2007.

Link：https://com-480-data-visualization.github.io/Yakety/

A process book showcases the progression of the design workflow: [link]

[link]: https://github.com/com-480-data-visualization/Yakety/blob/main/Milestone3_document.pdf

The screencast of  what you can do with this viz: [Link2]
[Link2]: https://drive.google.com/file/d/1xxzw705Revbu-JilgRqR-St8mPpEBAr0/view?usp=sharing

## Project Overview

This project provides an interactive visualization platform for analyzing global agricultural data, focusing on:
- Global grain production patterns
- Regional production dynamics
- Sustainable resource utilization
- Agricultural intensification indicators

## Technical Setup

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Local web server (for development)

### Dependencies
The project uses the following main libraries:
- D3.js (v7.8.5) - For data visualization and mapping
- TopoJSON (v3.0.2) - For geographic data processing
- Chart.js - For radar charts and other statistical visualizations

### Project Structure
```
├── assets/           # Media assets (images, videos)
├── data/            # Data files
├── fonts/           # Custom fonts
├── img/             # Image resources
├── js/
│   └── charts/      # JavaScript visualization modules
│       ├── main.js          # Main visualization logic
│       ├── constants.js     # Shared constants and configurations
│       ├── land-map.js      # Land utilization map visualization
│       ├── radar.js         # Radar charts implementation
│       └── dynamic.js       # Dynamic chart updates
├── styles.css       # Main stylesheet
└── index.html       # Main application file
```

## Features

### 1. Interactive World Map
- Visualizes global agricultural production data
- Supports multiple crop type selections
- Interactive tooltips with detailed information

### 2. Production Analysis
- Regional production trends over time
- Comparative analysis between continents
- Dynamic bar charts showing production rankings

### 3. Sustainability Metrics
- Land utilization patterns
- Fertilizer usage analysis
- Water resource utilization
- Regional sustainability indicators

### 4. Radar Charts
- Multi-dimensional analysis of agricultural sustainability
- Region-specific sustainability profiles
- Interactive data exploration

## Usage

1. Clone the repository
2. Set up a local web server
3. Run 'python -m http.server 8000' in local terminal
4. Open `http://[::]:8000/` in your web browser


## Data Sources

The project uses agricultural data from various sources, including:
- FAO (Food and Agriculture Organization)
- World Bank
- Regional agricultural databases


## License

This project is part of the COM-480 Data Visualization course at EPFL.

## Team Members

- Yuan Xiao (404006)
- Jingyi Guo (377173)
- Wenyu Liu (383193) 
