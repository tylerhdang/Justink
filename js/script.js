/* Add LOTS OF LINKS for scroll testing */
const linksData = [
  { name: "Instagram", url: "https://instagram.com" },
  { name: "YouTube", url: "https://youtube.com" },
  { name: "Portfolio", url: "#" },
  { name: "Contact", url: "mailto:email@example.com" },
  { name: "Twitter", url: "https://twitter.com" },
  { name: "LinkedIn", url: "https://linkedin.com" },
  { name: "GitHub", url: "https://github.com" },
  { name: "Discord", url: "#" },
  { name: "Store", url: "#" },
  { name: "Blog", url: "#" },
  { name: "Newsletter", url: "#" }
];

const linksContainer = document.getElementById("links");

linksData.forEach((link) => {
  const wrapper = document.createElement("div");
  wrapper.className = "tilt-item fade-up";

  const el = document.createElement("a");
  el.href = link.url;
  el.target = "_blank";

  el.className =
    "block w-full py-4 rounded-xl bg-primary text-primaryFg font-semibold " +
    "shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.03] " +
    "active:scale-[0.97] transition-all duration-200";

  el.textContent = link.name;

  wrapper.appendChild(el);
  linksContainer.appendChild(wrapper);
});

/* Scroll Reveal */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

/* Tilt Effect only on link wrappers */
document.querySelectorAll(".tilt-item").forEach((item) => {
  item.addEventListener("mousemove", (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    item.style.transform = `rotateX(${(-y / 25)}deg) rotateY(${x / 25}deg)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});