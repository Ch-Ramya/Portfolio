const htmlElement = document.querySelector("html");
const toggleButton = document.querySelector(".dark-light-toggle-btn");
const themeIcon = document.querySelector(".theme-icon-toggle");
const localStorageTheme = localStorage.getItem("theme");
const systemPreferenceTheme = window.matchMedia(
  "(prefers-color-scheme: light)"
);
const roleInfo = document.querySelector(".highlight-role-text");
const downloadCvBtn = document.querySelector(".download-cv-btn");
const skillsContainer = document.querySelector(".skills-grid");
const counters = document.querySelectorAll(".counter");
const aboutSection = document.querySelector("#about");
const experienceTimelineContainer = document.querySelector(
  ".experience-timeline"
);
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a, .nav-links button");

const roles = ["Frontend Developer.", "Web Enthusiast.", "UI Engineer."];
const buttonCtaText = {
  light: { label: "Toggle dark mode", icon: "fa-solid fa-moon" },
  dark: { label: "Toggle light mode", icon: "fa-solid fa-sun" },
};
const skills = [
  { name: "HTML5", icon: "fa-brands fa-js" },
  { name: "CSS", icon: "fa-brands fa-css3-alt" },
  { name: "JavaScript", icon: "fa-brands fa-js" },
  { name: "React", icon: "fa-brands fa-react" },
  { name: "Angular", icon: "fa-brands fa-angular" },
  { name: "JQuery", icon: "fa-brands fa-js" },
  { name: "Bootstrap", icon: "fa-brands fa-bootstrap" },
  { name: "TailwindCSS", icon: "fa-brands fa-tailwind-css" },
  { name: "C language", icon: "fas fa-file-code" },
  { name: "Python", icon: "fa-brands fa-python" },
  { name: "SQL", icon: "fa-solid fa-database" },
  { name: "MongoDB", icon: "fa-solid fa-leaf" },
  { name: "GIT", icon: "fa-brands fa-git-alt" },
  { name: "Parcel", icon: "fa-solid fa-box" },
];
const experienceData = [
  {
    company: "VMWare",
    logo: "fa-solid fa-building",
    duration: "06/2022 - 01/2024,",
    role: "Frontend Developer - P3",
    details: [
      "Enhanced user experience and accessibility for the VMware portal, ensuring compliance with industry standards.",
      "Developed key Customer Connect pages using Angular, contributing to a platform accessed by millions of users monthly, which increased productivity by ~25% and saved ~1,000 person-hours annually.",
      "Managed VMware Explore pages and resolved bugs, significantly improving functionality and user experience across the portal.",
    ],
  },
  {
    company: "Pramati Technologies",
    logo: "fa-solid fa-laptop-code",
    role: "UI Development Engineer",
    duration: "05/2021 - 05/2022",
    details: [
      "Implemented localization with auto-detect locale, multi-language support, and dynamic message handling.",
      "Integrated Google Maps with marker plotting, heatmaps, routing, zoom, and data binding.",
      "Built advanced search and filter features for large datasets, and contributed to code reviews, bug fixes, and functional gap analysis.",
    ],
  },
  {
    company: "Customfurnish",
    logo: "fa-solid fa-city",
    role: "Software Design Engineer",
    duration: "02/2014 - 01/2016,",
    details: [
      "Built an end-to-end online furniture store enabling users to personalize, visualize, and price complete home furnishings.",
      "Standardized pages with a responsive, mobile-first design using CSS media queries and Bootstrap; collaborated closely with designers and backend teams.",
      "Performed thorough code reviews, identified functional gaps, and debugged issues using Chrome DevTools.",
    ],
  },
];

function getInitialThemePreference(localStorageTheme, systemPreferenceTheme) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }

  return systemPreferenceTheme.matches ? "light" : "dark";
}

function updateButtonCTA(theme) {
  const themeInfo = buttonCtaText[theme];
  toggleButton.setAttribute("aria-label", themeInfo.label);
  themeIcon.className = `theme-icon-toggle ${buttonCtaText[theme].icon}`;
}

function updateHTMLTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);
}

function changeThemeEventHandler(e) {
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  updateHTMLTheme(newTheme);
  updateButtonCTA(newTheme);
  currentTheme = newTheme;
}

function generateExperienceTimeline(data) {
  data.forEach((experience, index) => {
    const companyContainer = document.createElement("div");
    companyContainer.classList.add(
      "company-container",
      index % 2 === 0 ? "left-container" : "right-container"
    );

    const iTag = document.createElement("i");
    iTag.classList = experience.logo;

    const textBox = document.createElement("div");
    textBox.classList.add("text-box");

    const h2 = document.createElement("h2");
    h2.textContent = experience.company;

    const h3 = document.createElement("h3");
    h3.textContent = experience.role;

    const small = document.createElement("small");
    small.textContent = experience.duration;

    const ul = document.createElement("ul");
    experience.details.forEach((detail) => {
      const li = document.createElement("li");
      li.textContent = detail;
      ul.appendChild(li);
    });

    const span = document.createElement("span");
    span.classList.add(
      index % 2 === 0 ? "left-container-arrow" : "right-container-arrow"
    );

    textBox.append(h2, h3, small, ul, span);
    companyContainer.append(iTag, textBox);
    experienceTimelineContainer.appendChild(companyContainer);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = roles[wordIndex];
    if (!isDeleting) {
      roleInfo.textContent = " " + currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 3000); // Pause before deleting
        return;
      }
    } else {
      roleInfo.textContent = " " + currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % roles.length; // Switch to next word
        setTimeout(typeEffect, 1800);
        return;
      }
    }
    setTimeout(typeEffect, 250); // Adjust speed
  }

  skills.forEach((skill) => {
    const skillChip = document.createElement("div");
    skillChip.classList.add("skill-chip");
    skillChip.innerHTML = `<i class="${skill.icon}"></i> ${skill.name}`;
    skillsContainer.appendChild(skillChip);
  });

  setTimeout(typeEffect, 1500); // Start animation

  generateExperienceTimeline(experienceData);

  document.getElementById("footer-year").textContent = new Date().getFullYear();
});

downloadCvBtn.addEventListener("click", function (e) {
  console.log("Download cv button clicked");
});

function startCounter(element, target) {
  let count = 0;
  const duration = 2000; // Animation duration in milliseconds
  const interval = 50; // Update interval in milliseconds
  const steps = duration / interval;
  const increment = target / steps;

  const counterInterval = setInterval(() => {
    count += increment;
    if (count < target) {
      element.innerText = Math.ceil(count);
    } else {
      element.innerText = target;
      clearInterval(counterInterval);
    }
  }, interval);
}

function checkAndStartCounters() {
  const stats = document.querySelectorAll(".counter");
  const section = document.querySelector(".stats-section");
  const sectionTop = section.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.7; // Start animation when section is 70% in viewport

  if (sectionTop < triggerPoint) {
    stats.forEach((stat) => {
      const target = +stat.getAttribute("data-target");
      startCounter(stat, target);
    });
    window.removeEventListener("scroll", checkAndStartCounters); // Run once
  }
}

function toggleMenu() {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !expanded);
  navLinks.classList.toggle("nav-open");
}

// Attach event listener to check when to start the animation
window.addEventListener("scroll", checkAndStartCounters);

let currentTheme = getInitialThemePreference(
  localStorageTheme,
  systemPreferenceTheme
);
updateHTMLTheme(currentTheme);
updateButtonCTA(currentTheme);
toggleButton.addEventListener("click", changeThemeEventHandler);

hamburger.addEventListener("click", toggleMenu);

// Close when a nav item is clicked
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (navLinks.classList.contains("nav-open")) {
      toggleMenu();
    }
  });
});
