const API_URL = import.meta.env.VITE_APP_API_URL; //Backend BASE URL

const sendContactUs = async (payload) => {
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        });
        
        // Check if response is OK
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server response error:', errorText);
            throw new Error(`Server error (${response.status}): ${response.statusText || 'Unknown error'}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.message || "Something went wrong!");
        }
        
        return data?.data;
    } catch (error) {
        console.error('Contact form error:', error);
        throw error;
    }
}

export default sendContactUs;