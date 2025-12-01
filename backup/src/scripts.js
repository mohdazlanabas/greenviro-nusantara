// Progress bar animation
let currentProgress = 42;
const targetProgress = 85;
const progressElement = document.getElementById('progress-percent');
const progressFill = document.querySelector('.progress-fill');

// Simulate progress increment
function animateProgress() {
    const increment = setInterval(() => {
        if (currentProgress < targetProgress) {
            currentProgress++;
            progressElement.textContent = currentProgress;
            progressFill.style.width = currentProgress + '%';
        } else {
            clearInterval(increment);
        }
    }, 50);
}

// Start progress animation after 2 seconds
setTimeout(animateProgress, 2000);

// Location detection using IP-based geolocation
async function getVisitorLocation() {
    const locationElement = document.getElementById('visitor-location');
    
    try {
        // First try to get location from IP
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        if (data.city && data.country_name) {
            const location = `${data.city}, ${data.region}, ${data.country_name}`;
            locationElement.textContent = location;
            
            // Add a subtle animation when location is loaded
            locationElement.style.animation = 'fadeInUp 1s ease-out';
        } else {
            // Fallback to browser geolocation API
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        // Try reverse geocoding
                        try {
                            const geoResponse = await fetch(
                                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                            );
                            const geoData = await geoResponse.json();
                            
                            if (geoData.address) {
                                const city = geoData.address.city || geoData.address.town || geoData.address.village || 'Unknown City';
                                const country = geoData.address.country || 'Unknown Country';
                                locationElement.textContent = `${city}, ${country}`;
                            }
                        } catch (error) {
                            locationElement.textContent = `Coordinates: ${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`;
                        }
                    },
                    (error) => {
                        // If user denies location permission
                        locationElement.textContent = 'Location access denied';
                    }
                );
            } else {
                locationElement.textContent = 'Location detection not supported';
            }
        }
    } catch (error) {
        // Fallback message if all methods fail
        locationElement.textContent = 'Unable to detect location';
        console.error('Location detection error:', error);
    }
}

// Get visitor location on page load
document.addEventListener('DOMContentLoaded', getVisitorLocation);

// Update visitor's local time
function updateVisitorTime() {
    const timeElement = document.getElementById('visitor-time');

    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        timeElement.textContent = `${dateString}, ${timeString}`;
    }

    // Update immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);
}

// Start time update on page load
document.addEventListener('DOMContentLoaded', updateVisitorTime);

// Add interactive hover effects to leaves
document.addEventListener('DOMContentLoaded', function() {
    const leaves = document.querySelectorAll('.leaf');
    
    leaves.forEach((leaf, index) => {
        leaf.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        leaf.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add a subtle parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const leaves = document.querySelectorAll('.leaf');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    leaves.forEach((leaf, index) => {
        const speed = (index + 1) * 0.5;
        const translateX = (x - 0.5) * speed * 20;
        const translateY = (y - 0.5) * speed * 20;
        
        leaf.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
});

// Console easter egg
console.log('%c🌿 Welcome to a Greener World! 🌿', 
    'color: #27ae60; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%cWe\'re building something special. Stay tuned!', 
    'color: #2ecc71; font-size: 14px;');

// Add time-based greeting
function updateGreeting() {
    const hour = new Date().getHours();
    const mainTitle = document.querySelector('.main-title');
    
    if (hour >= 5 && hour < 12) {
        mainTitle.textContent = 'Good Morning, World';
    } else if (hour >= 12 && hour < 17) {
        mainTitle.textContent = 'Good Afternoon, World';
    } else if (hour >= 17 && hour < 22) {
        mainTitle.textContent = 'Good Evening, World';
    } else {
        mainTitle.textContent = 'Hello, Night Owl';
    }
    
    // Reset to Hello World after 5 seconds
    setTimeout(() => {
        mainTitle.textContent = 'Hello World';
    }, 5000);
}

// Update greeting after page loads
setTimeout(updateGreeting, 3000);

// Webcam functionality with mirror view
let webcamStream = null;
let isCameraActive = false;

async function startWebcam() {
    const video = document.getElementById('webcam');
    const status = document.getElementById('camera-status');
    const container = document.getElementById('camera-container');
    const icon = document.getElementById('camera-icon');

    try {
        // Request camera access
        webcamStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 640 },
                height: { ideal: 480 },
                facingMode: 'user'
            },
            audio: false
        });

        video.srcObject = webcamStream;
        isCameraActive = true;
        container.classList.add('active');
        status.textContent = '📸 Looking good!';
        icon.textContent = '🎥';

        // Add fun animation when camera starts
        container.style.animation = 'bounceIn 0.5s ease-out';
    } catch (error) {
        console.error('Camera access error:', error);

        if (error.name === 'NotAllowedError') {
            status.textContent = '😔 Camera access denied';
        } else if (error.name === 'NotFoundError') {
            status.textContent = '📷 No camera found';
        } else {
            status.textContent = '⚠️ Camera unavailable';
        }

        container.classList.add('error');
        icon.textContent = '❌';
    }
}

function stopWebcam() {
    const video = document.getElementById('webcam');
    const status = document.getElementById('camera-status');
    const container = document.getElementById('camera-container');
    const icon = document.getElementById('camera-icon');

    if (webcamStream) {
        webcamStream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        webcamStream = null;
        isCameraActive = false;
        container.classList.remove('active');
        status.textContent = '📸 Camera off';
        icon.textContent = '📷';
    }
}

function toggleWebcam() {
    if (isCameraActive) {
        stopWebcam();
    } else {
        startWebcam();
    }
}

// Initialize camera on page load with a delay
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('camera-toggle');
    const container = document.getElementById('camera-container');

    toggleButton.addEventListener('click', toggleWebcam);

    // Auto-start camera after 2 seconds with permission prompt
    setTimeout(() => {
        const status = document.getElementById('camera-status');
        status.textContent = '🌿 Click To See Who Makes The World Greener';
        container.style.cursor = 'pointer';

        // Click anywhere on container to start camera
        container.addEventListener('click', function(e) {
            if (!isCameraActive && e.target !== toggleButton) {
                startWebcam();
                container.style.cursor = 'default';
            }
        }, { once: true });
    }, 2000);
});
