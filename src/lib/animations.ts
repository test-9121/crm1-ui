
import { cn } from "./utils";

// Animation class sets for easy reuse
export const animations = {
  // Fade animations
  fadeIn: "animate-fade-in",
  slideIn: "animate-slide-in",
  
  // Interactive animations  
  scale: "animate-scale",
  hover: {
    translate: "hover-translate",
    glow: "hover-glow",
    scale: "hover:scale-105 transition-transform duration-200"
  },
  
  // Button animations
  button: cn(
    "transition-all duration-200",
    "hover:-translate-y-0.5",
    "active:translate-y-0"
  ),
  
  // Card animations
  card: cn(
    "transition-all duration-200",
    "hover:shadow-lg"
  )
};

// Function to add a common animation to all buttons in the app
export const addButtonAnimations = () => {
  const buttons = document.querySelectorAll('button:not([data-no-animation])');
  
  buttons.forEach(button => {
    // Skip buttons that already have animation classes
    if (button.classList.contains('hover-translate') || 
        button.classList.contains('animate-scale')) {
      return;
    }
    
    button.classList.add('hover-translate');
    
    // Add subtle click animation
    button.addEventListener('mousedown', () => {
      // Use HTMLElement instead of Element to access style property
      if (button instanceof HTMLElement) {
        button.style.transform = 'scale(0.97)';
      }
    });
    
    button.addEventListener('mouseup', () => {
      // Use HTMLElement instead of Element to access style property
      if (button instanceof HTMLElement) {
        button.style.transform = '';
      }
    });
    
    button.addEventListener('mouseleave', () => {
      // Use HTMLElement instead of Element to access style property
      if (button instanceof HTMLElement) {
        button.style.transform = '';
      }
    });
  });
};
