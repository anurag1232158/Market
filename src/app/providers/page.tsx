"use client";

import React, { useEffect, useRef } from "react";
import L, { Map as LeafletMap, Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  type Location = {
    name: string;
    lat: number;
    lng: number;
    phone?: string;
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map
    const map = L.map(mapContainerRef.current).setView([28.6139, 77.209], 9);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 60,
      attribution:
        "<span class='text-primary'>© contributors</span> | Developed by <strong>Ed-Test Team</strong> | Anurag Kumar <i class='fa fa-heart text-danger'></i>",
    }).addTo(map);

    // Service center and radius
    const centerPoint: [number, number] = [28.6139, 77.209];
    const serviceRadius = 130000; // meters

    // Circle for service area
    L.circle(centerPoint, {
      radius: serviceRadius,
      color: "green",
      fillColor: "#0f0",
      fillOpacity: 0.05,
      weight: 2,
    }).addTo(map);

    // Custom marker icon
    const customIcon = L.icon({
      iconUrl: "/assets/images/map1.gif",
      iconSize: [50, 50],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30],
    });

    // Haversine distance function (meters)
    const getDistance = (
      lat1: number,
      lon1: number,
      lat2: number,
      lon2: number
    ): number => {
      const R = 6371e3;
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // Bounce animation CSS
    const style = document.createElement("style");
    style.innerHTML = `
      .bounce {
        animation: bounce 0.5s infinite alternate;
      }
      @keyframes bounce {
        from { transform: translateY(0); }
        to { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);

    const animateMarker = (marker: LeafletMarker) => {
      setTimeout(() => {
        const icon = marker.getElement();
        if (!icon) return;
        icon.classList.add("bounce");
        setTimeout(() => icon.classList.remove("bounce"), 1500);
      }, 100);
    };

    // Locations array

    const locations: Location[] = [
      {
        name: "Noida Sector 62",
        lat: 28.6282,
        lng: 77.3656,
        phone: "9935864550",
      },
      {
        name: "Noida City Center",
        lat: 28.5702,
        lng: 77.326,
        phone: "9856321223",
      },
      { name: "New Delhi", lat: 28.6139, lng: 77.209, phone: "9725225452" },
      { name: "Dwarka", lat: 28.5953, lng: 77.02, phone: "254353453" },
      { name: "Janakpuri", lat: 28.6096, lng: 77.0689, phone: "87524235423" },
      { name: "Pitampura", lat: 28.7041, lng: 77.1547, phone: "8524523344" },
      { name: "Rohini", lat: 28.7041, lng: 77.12, phone: "7863452413" },
      { name: "Karol Bagh", lat: 28.6515, lng: 77.2, phone: "7832547533" },
      { name: "Lajpat Nagar", lat: 28.5672, lng: 77.25, phone: "78631573274" },
      { name: "Saket", lat: 28.5244, lng: 77.21, phone: "7862354532" },
      { name: "Vasant Kunj", lat: 28.5244, lng: 77.15, phone: "6356341341" },
      {
        name: "Connaught Place",
        lat: 28.6328,
        lng: 77.2197,
        phone: "84735687963",
      },
      {
        name: "Delhi (NCR) Gurgaon",
        lat: 28.4595,
        lng: 77.0266,
        phone: "876586523",
      },
      {
        name: "Delhi (NCR) Noida",
        lat: 28.5355,
        lng: 77.391,
        phone: "36748963542",
      },
      { name: "Ghaziabad", lat: 28.6692, lng: 77.4538, phone: "4857632434" },
      { name: "Gurugram", lat: 28.4595, lng: 77.0266, phone: "4534529863" },
      { name: "Meerut", lat: 28.9845, lng: 77.7064, phone: "5437853" },
      { name: "Palwal", lat: 28.1445, lng: 77.326, phone: "543678324" },
      { name: "Aligarh", lat: 27.8974, lng: 78.088, phone: "74345453" },
      { name: "Rewari", lat: 28.197, lng: 76.6176, phone: "86789637863" },
      { name: "Sonipat", lat: 28.9958, lng: 77.0114, phone: "87638796389" },
      { name: "Rohtak", lat: 28.8955, lng: 76.6066, phone: "7896388888" },
      { name: "Bhiwani", lat: 28.793, lng: 76.1397, phone: "877863896" },
      { name: "Karnal", lat: 29.6857, lng: 76.9905, phone: "969398634" },
      { name: "Sambhal", lat: 28.584, lng: 78.5718, phone: "7896378963" },
      { name: "Faridabad", lat: 28.4089, lng: 77.3178, phone: "789638796389" },
      { name: "Greater Noida", lat: 28.4744, lng: 77.503, phone: "789698975" },
      { name: "Bhiwadi", lat: 28.211, lng: 76.8606 },
    ];

    // Add markers for all locations within service radius
    locations.forEach((loc) => {
      const dist = getDistance(
        centerPoint[0],
        centerPoint[1],
        loc.lat,
        loc.lng
      );
      if (dist <= serviceRadius) {
        const marker = L.marker([loc.lat, loc.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(
            `<b>${loc.name}</b><br>
             <span style='color:green;'>✅ Service Available</span><br>
             <small>Distance from center: ${(dist / 1000).toFixed(
               2
             )} km</small><br>
             <small>📞 Contact: <a href="tel:${loc.phone}">${
              loc.phone || "N/A"
            }</a></small><br>
             <small>💬 <a href="https://wa.me/91${
               loc.phone
             }" target="_blank">Chat on WhatsApp</a></small>`
          );

        marker.on("click", () => {
          map.flyTo([loc.lat, loc.lng], 14, { duration: 1.5 });
          marker.openPopup();
          animateMarker(marker);
        });
      }
    });

    // SEARCH query from URL param
    const initialQuery = searchParams.get("location");
    if (initialQuery) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        initialQuery
      )}`;

      fetch(url)
        .then((res) => res.json())
        .then((data: any[]) => {
          if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            const displayName = data[0].display_name;
            const dist = getDistance(centerPoint[0], centerPoint[1], lat, lon);

            if (dist <= serviceRadius) {
              // Find nearest location
              let nearestLoc: Location | null = null;
              let minDist = Infinity;

              locations.forEach((loc) => {
                const d2 = getDistance(lat, lon, loc.lat, loc.lng);
                if (d2 < minDist) {
                  minDist = d2;
                  nearestLoc = loc;
                }
              });

              const name = nearestLoc!.name;
              const phone = nearestLoc!.phone ?? "N/A";

              // Add search marker
              const searchMarker = L.marker([lat, lon], { icon: customIcon })
                .addTo(map)
                .bindPopup(
                  `<b>${displayName}</b><br>
                   <small>Nearest: ${name}</small><br>
                   <small>📞 Contact: <a href="tel:${phone}">${phone}</a></small>`
                )
                .openPopup();

              animateMarker(searchMarker);

              setTimeout(() => {
                map.flyTo([lat, lon], 14, { duration: 1.5 });
              }, 100);

              // Remove old routing if exists
              if (routingControlRef.current) {
                map.removeControl(routingControlRef.current);
              }

              if (nearestLoc) {
                const loc: Location = nearestLoc; // explicitly typed
                routingControlRef.current = (L as any).Routing.control({
                  waypoints: [L.latLng(lat, lon), L.latLng(loc.lat, loc.lng)],
                  lineOptions: {
                    styles: [{ color: "#013aa3ff", weight: 5 }],
                  },
                  addWaypoints: false,
                  draggableWaypoints: false,
                  fitSelectedRoute: true,
                  showAlternatives: false,
                }).addTo(map);

                routingControlRef.current?.on("routesfound", (e: any) => {
                  const routes = e.routes;
                  if (routes && routes.length > 0) {
                    const summary = routes[0].summary;
                    const distanceMeters = summary.totalDistance;
                    const distanceKm = (distanceMeters / 1000).toFixed(2);

                    searchMarker
                      .bindPopup(
                        `<b>${displayName}</b><br>
         <small>Nearest: ${loc.name}</small><br>
         <small>📞 Contact: <a href="tel:${loc.phone}">${loc.phone}</a></small><br>
         <small>Route distance: ${distanceKm} km</small>`
                      )
                      .openPopup();
                  }
                });
              }
            } else {
              alert("❌ Sorry, this location is outside our service area.");
            }
          } else {
            alert("Location not found. Please try a different query.");
          }
        });
    }

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
      map.remove();
      document.head.removeChild(style);
    };
  }, [searchParams]);

  L.Icon.Default.mergeOptions({
    iconUrl: "/assets/images/Welcome.gif",
    iconSize: [30, 30],
    iconRetinaUrl: "",
    shadowUrl: "",
  });

  return (
    <>
      <br />
      <div className="section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div
                id="map"
                className="map-container pt-2 w-100"
                ref={mapContainerRef}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
