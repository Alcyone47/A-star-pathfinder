export async function geocode(location) {
    const apiKey = '3abc8a09fe224ff6a49033043d9e9a17';
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (data.results.length === 0) {
            throw new Error('No results found');
        }

        const { lat, lng } = data.results[0].geometry;
        return { lat, lng };
    } catch (error) {
        console.error('Geocoding error:', error.message);
        throw new Error('Failed to fetch location data');
    }
}  