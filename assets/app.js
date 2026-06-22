(function () {
  /* ── Hamburger nav toggle ── */
  const toggle = document.getElementById('menu-toggle');
  const nav    = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕' : '☰';
    });
    /* Close nav when a link is tapped */
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
      });
    });
  }


  const track = (eventName, params) => {
    if (!eventName) return;
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params || {});
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...(params || {}) });
  };

  document.querySelectorAll("[data-track]").forEach((element) => {
    element.addEventListener("click", () => {
      track(element.getAttribute("data-track"), {
        link_text: element.textContent.trim(),
        link_url: element.getAttribute("href") || ""
      });
    });
  });

  document.querySelectorAll("form[data-track-submit]").forEach((form) => {
    form.addEventListener("submit", () => {
      track(form.getAttribute("data-track-submit"), {
        form_name: form.getAttribute("name") || "lead_form"
      });
    });
  });

  const zipForm = document.querySelector("[data-zip-form]");
  const zipInput = document.querySelector("[data-zip-input]");
  const zipResult = document.querySelector("[data-zip-result]");

  const ranges = {
    PA: ["190", "191", "193", "194"],
    NJ: ["080", "081", "082", "083", "084", "085", "086"],
    DE: ["197", "198"]
  };

  const findRegion = (zip) => {
    const prefix = zip.slice(0, 3);
    return Object.entries(ranges).find(([, prefixes]) => prefixes.includes(prefix));
  };

  if (zipForm && zipInput && zipResult) {
    zipForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const zip = zipInput.value.replace(/\D/g, "").slice(0, 5);

      if (zip.length !== 5) {
        zipResult.textContent = "Enter a 5-digit ZIP code and we will help confirm the route.";
        track("zip_check", { zip_status: "invalid" });
        return;
      }

      const region = findRegion(zip);
      if (region) {
        zipResult.textContent = `This ZIP looks like it may be in the ${region[0]} Philly-region route. Submit a request so Elite can confirm availability.`;
        track("zip_check", { zip_status: "likely_in_range", region: region[0], zip_prefix: zip.slice(0, 3) });
      } else {
        zipResult.textContent = "This ZIP may be outside the regular Philly-region route. Send the request anyway and Elite can confirm.";
        track("zip_check", { zip_status: "confirm_needed", zip_prefix: zip.slice(0, 3) });
      }
    });
  }
})();
