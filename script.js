// ===== Sidebar and Top Bar Configuration =====
const sidebarPages = [
  { href: "index.html", icon: "icons/home.svg", label: "Home" },
  { href: "gallery.html", icon: "icons/gallery.svg", label: "Gallery" },
  { href: "collections.html", icon: "icons/collections.svg", label: "Collections" },
  { href: "about.html", icon: "icons/about.svg", label: "About" },
  { href: "contact.html", icon: "icons/contact.svg", label: "Contact" }
];

function createTopBar() {
  const topBar = document.createElement("header");
  topBar.className = "top-bar";

  const logo = document.createElement("h1");
  logo.className = "logo";
  logo.textContent = "BBird";
  topBar.appendChild(logo);

  const pageTitle = document.createElement("h2");
  pageTitle.className = "page-title";
  pageTitle.textContent = document.title.replace("BBird - ", "");
  topBar.appendChild(pageTitle);

  document.body.insertBefore(topBar, document.body.firstChild);
}

function createSidebar() {
  const sidebar = document.createElement("aside");
  sidebar.id = "sidebar";
  sidebar.className = "sidebar";

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "sidebar-toggle";
  toggleBtn.innerHTML = "☰";
  sidebar.appendChild(toggleBtn);

  sidebarPages.forEach(page => {
    const a = document.createElement("a");
    a.href = page.href;

    const img = document.createElement("img");
    img.src = page.icon;
    img.className = "icon";
    a.appendChild(img);

    const span = document.createElement("span");
    span.textContent = page.label;
    a.appendChild(span);

    if (window.location.pathname.endsWith(page.href)) {
      a.classList.add("active");
    }

    sidebar.appendChild(a);
  });

  document.body.appendChild(sidebar);

  // Toggle sidebar
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    localStorage.setItem(
      "sidebarState",
      sidebar.classList.contains("collapsed") ? "collapsed" : "expanded"
    );
  });

  if (localStorage.getItem("sidebarState") === "collapsed") {
    sidebar.classList.add("collapsed");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  createTopBar();
  createSidebar();
});
