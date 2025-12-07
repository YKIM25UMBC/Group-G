// menu dropdown logic, purely frontend. 


document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".menu-container");
    if (!container) return;
  
    const btn = container.querySelector(".menu-btn");
    const dropdown = container.querySelector(".dropdown-menu");
  
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = container.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      dropdown.setAttribute("aria-hidden", isOpen ? "false" : "true");
    });
  
    // close if clicked outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".menu-container")) {
        if (container.classList.contains("open")) {
          container.classList.remove("open");
          btn.setAttribute("aria-expanded", "false");
          dropdown.setAttribute("aria-hidden", "true");
        }
      }
    });
  
    // close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && container.classList.contains("open")) {
        container.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        dropdown.setAttribute("aria-hidden", "true");
      }
    });
  });
  