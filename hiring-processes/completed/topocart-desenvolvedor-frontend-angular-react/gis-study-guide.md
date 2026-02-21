# GIS for Frontend Developers: Quick Study Guide

This guide is designed to help a Senior Frontend Engineer (Angular/React) bridge the gap for a GIS-focused role at Topocart.

## 1. Core GIS Concepts

*   **Coordinate Reference Systems (CRS):** How the 3D Earth is mapped to a 2D screen. 
    *   **EPSG:4326 (WGS 84):** Latitude and Longitude (Standard for GPS).
    *   **EPSG:3857 (Web Mercator):** Standard for most web maps (Google Maps, OpenStreetMap).
*   **Layers:** Maps are built like a cake.
    *   **Base Layer:** The background map (Tile layers, like OpenStreetMap).
    *   **Overlay/Vector Layers:** Points, lines, and polygons (GeoJSON data).
    *   **Raster Layers:** Images (Satellite imagery, Heatmaps).
*   **GeoJSON:** The standard JSON format for spatial data.
    ```json
    {
      "type": "Feature",
      "geometry": { "type": "Point", "coordinates": [-47.8828, -15.7942] },
      "properties": { "name": "Brasília" }
    }
    ```

## 2. Key Libraries & Framework Integration

### OpenLayers (Robust, Enterprise-grade)
*   **Best for:** Complex GIS apps with many layers and heavy interactions.
*   **Angular Integration:** Use `ngx-openlayers` or wrap the native library in a Directive/Service.
*   **React Integration:** Use `rlayers` or manage the map instance in a `useRef` hook.

### Leaflet (Lightweight, Simple)
*   **Best for:** Standard maps with markers and simple overlays.
*   **Angular Integration:** `ngx-leaflet`.
*   **React Integration:** `react-leaflet`.

### deck.gl (High-performance, WebGL)
*   **Best for:** Visualizing massive datasets (millions of points).
*   **Integration:** Excellent support for React via `@deck.gl/react`.

## 3. Interview "Bridge" Talking Points

*   **State Management:** "Handling a map with hundreds of interactive features is essentially a complex state management problem. My experience with **NgRx** and **Redux** is directly applicable here to ensure the UI stays in sync with the map state."
*   **Performance:** "Rendering thousands of GeoJSON features can impact the main thread. I've dealt with similar performance challenges during the **Angular 16 migration** at TechCorp, where I optimized rendering cycles and reduced bundle sizes."
*   **Real-time Data:** "At StartUp Inc, I used **WebSockets** for real-time collaborative editing. This translates well to GIS for live tracking of assets or real-time territorial monitoring."

## 4. Quick Practice Tasks
1.  **Render a Map:** Use Leaflet or OpenLayers to show a map centered on Brasília.
2.  **Add a Marker:** Load a GeoJSON point and show a popup on click.
3.  **Toggle Layers:** Create a simple UI to switch between 'Satellite' and 'Street' views.
