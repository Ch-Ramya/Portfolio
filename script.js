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
      "Enhanced the accessibility compliance of the VMware portal to meet industry standards",
      "Developed and managed VMware Explore pages, providing customers with access to technical content focused on infrastructure modernization, application enhancement, and related technologies",
      "Contributed to developing Customer Connect pages using Angular, enabling personalized success plans and tracking progress to help customers achieve faster outcomes with VMware technology.",
      "Resolved bugs and implemented solutions to improve functionality and user experience",
    ],
  },
  {
    company: "Pramati Technologies",
    logo: "fa-solid fa-laptop-code",
    role: "UI Development Engineer",
    duration: "05/2021 - 05/2022",
    details: [
      "Added localization, which enables the user to run application in multiple languages. This includes auto-detect the user's preferred locale(from browser) or through default language configuration and renders the application, maintain a list of app-related languagespecifc messages, add new languages/ messages, handling unsupported locale etc.",
      "Enabled GoogleMaps by dispaying various types of map(markers, heatMap, routeMap) in page. Added events like plotting markers, zoom functionality, removing markers, binding mapData with database/ JSON data.",
      "Enabled Search and filter facility which is helpful when dealing with huge tables through various options like global search, search in a particular column, multi-column filtering.",
      "Performing code review, bug fixes and identifying functional gaps in end-to-end application development life cycle.",
    ],
  },
  {
    company: "Customfurnish",
    logo: "fa-solid fa-city",
    role: "Software Design Engineer",
    duration: "02/2014 - 01/2016,",
    details: [
      "Standardized pages with a new, responsive, mobile-first approach and strategy using CSS media queries and Bootstrap for responsive design.",
      "Collaborate with designers and backend developers to create intuitive interfaces.",
      "Performing code review and identifying functional gaps in end-to-end application development life cycle.",
      "Extensive Experience in Testing, Debugging and troubleshooting the existing code using chrome Developer Tools",
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

// Attach event listener to check when to start the animation
window.addEventListener("scroll", checkAndStartCounters);

let currentTheme = getInitialThemePreference(
  localStorageTheme,
  systemPreferenceTheme
);
updateHTMLTheme(currentTheme);
updateButtonCTA(currentTheme);
toggleButton.addEventListener("click", changeThemeEventHandler);
