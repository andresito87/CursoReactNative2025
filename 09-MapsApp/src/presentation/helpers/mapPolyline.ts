export type TimedLocation = {
    latitude: number;
    longitude: number;
    timestamp: number; // ms
};

type Segment = {
    coordinates: { latitude: number; longitude: number; }[];
    color: string;
    width: number;
};

const toRad = (v: number) => (v * Math.PI) / 180;

// Calcula la distancia en metros entre dos puntos con lat/lon
export function distanceMeters(a: TimedLocation, b: TimedLocation) {
    const R = 6371000;
    const dLat = toRad(b.latitude - a.latitude);
    const dLon = toRad(b.longitude - a.longitude);
    const lat1 = toRad(a.latitude);
    const lat2 = toRad(b.latitude);

    const h =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    return 2 * R * Math.asin(Math.sqrt(h));
}

export function speedMps(a: TimedLocation, b: TimedLocation) {
    const dt = (b.timestamp - a.timestamp) / 1000; // s
    if (!dt || dt <= 0.25) return 0; // evita divisiones por cero o tiempos muy cortos
    const d = distanceMeters(a, b);
    if (d < 2) return 0; // evita saltos pequeños
    return d / dt;
}

// Asigna un color según la velocidad en m/s
export function speedToColor(mps: number) {
    const kmh = mps * 3.6;

    if (kmh < 6) return "#3B82F6";
    if (kmh < 15) return "#22C55E";
    if (kmh < 35) return "#F59E0B";
    return "#EF4444";
}

// Construye segmentos y mezcla consecutivos del mismo color
export function buildSpeedSegments(points: TimedLocation[]) {
    const segments: Segment[] = [];

    for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];

        const mps = speedMps(a, b);
        const color = speedToColor(mps);

        // Grosor dinámico (más rápido = más grueso)
        const width = Math.min(8, Math.max(4, 4 + mps));

        const coords = [
            { latitude: a.latitude, longitude: a.longitude },
            { latitude: b.latitude, longitude: b.longitude },
        ];

        const prev = segments[segments.length - 1];
        if (prev && prev.color === color && prev.width === width) {
            prev.coordinates.push(coords[1]);
        } else {
            segments.push({ coordinates: coords, color, width });
        }
    }

    return segments;
}
