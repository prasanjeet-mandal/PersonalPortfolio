/**
 * Helper to compute time of day greeting
 */
export const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good Morning, Visitor";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon, Visitor";
  } else if (hour >= 17 && hour < 22) {
    return "Good Evening, Visitor";
  } else {
    return "Welcome, Night Visitor";
  }
};

/**
 * Smooth scroll to element id
 */
export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -80; // Account for sticky navbar
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};
