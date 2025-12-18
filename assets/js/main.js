
(function(){
  const root = document.documentElement;
  const key = "iso9001-oap72-theme";
  const saved = localStorage.getItem(key);
  if(saved){ root.setAttribute("data-theme", saved); }

  const toggle = document.querySelector("[data-toggle-theme]");
  if(toggle){
    toggle.addEventListener("click", ()=>{
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem(key, next);
      toggle.setAttribute("aria-pressed", String(next==="light"));
    });
  }

  // Active nav highlight
  const path = location.pathname.split("/").pop();
  document.querySelectorAll(".nav a").forEach(a=>{
    const href = (a.getAttribute("href")||"").split("/").pop();
    if(href === path){ a.classList.add("active"); }
  });

  // Glossary filtering
  const search = document.querySelector("[data-glossary-search]");
  if(search){
    const items = [...document.querySelectorAll("[data-term]")];
    const norm = (s)=> (s||"").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"");
    search.addEventListener("input", ()=>{
      const q = norm(search.value.trim());
      items.forEach(el=>{
        const hay = norm(el.getAttribute("data-term")+" "+el.textContent);
        el.style.display = hay.includes(q) ? "" : "none";
      });
    });
  }
})();
