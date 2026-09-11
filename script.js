const invitationData = {
  family: "पाटील परिवार",
  date: "१४ सप्टेंबर २०२६",
  duration: "१० दिवस",
  addressHtml: "श्री समर्थ कृपा निवास, साबे गाव<br>दिवा पूर्व, भगत वाडी",
  contact: "9653137900",
  mapsLink: "https://maps.app.goo.gl/95Sg4nqGZTtk5dVn8?g_st=ai"
};

document.addEventListener("DOMContentLoaded", () => {
  const ancientGate = document.getElementById("ancientGate");
  const openInvitation = document.getElementById("openInvitation");

  function revealInvitation() {
    if (!ancientGate || ancientGate.classList.contains("opened")) return;
    ancientGate.classList.add("opened");
    setTimeout(() => {
      document.body.classList.remove("intro-lock");
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 700);
    setTimeout(() => ancientGate.setAttribute("aria-hidden", "true"), 1450);
  }

  if (openInvitation) openInvitation.addEventListener("click", revealInvitation);
  if (ancientGate) {
    ancientGate.addEventListener("click", (event) => {
      if (event.target.closest(".ancient-seal-button")) return;
      revealInvitation();
    });
  }

  const dateText = document.getElementById("dateText");
  const durationText = document.getElementById("durationText");
  const addressText = document.getElementById("addressText");
  const contactLink = document.getElementById("contactLink");
  const mapButton = document.getElementById("mapButton");

  if (dateText) dateText.textContent = invitationData.date;
  if (durationText) durationText.textContent = invitationData.duration;
  if (addressText) addressText.innerHTML = invitationData.addressHtml;
  if (contactLink) {
    contactLink.textContent = invitationData.contact;
    contactLink.href = `tel:${invitationData.contact}`;
  }
  if (mapButton) mapButton.href = invitationData.mapsLink;

  const revealElements = document.querySelectorAll(".reveal-3d");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle("visible", entry.isIntersecting));
  }, { threshold: 0.25 });
  revealElements.forEach((el) => observer.observe(el));

  document.querySelectorAll(".next-arrow").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.next);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll(".depth-layer").forEach((layer) => {
    layer.addEventListener("pointermove", (event) => {
      const rect = layer.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      layer.style.transform = `perspective(800px) rotateX(${y * -7}deg) rotateY(${x * 9}deg) translateZ(14px)`;
    });
    layer.addEventListener("pointerleave", () => {
      layer.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    });
  });
});

async function shareInvitation() {
  const shareData = {
    title: "पाटील परिवार | श्री गणेशोत्सव निमंत्रण",
    text: "श्री गणरायाच्या कृपेने पाटील परिवाराच्या घरी लाडक्या बाप्पाचे १० दिवसांसाठी मंगलमय आगमन होत आहे. आपण सहकुटुंब श्रींच्या दर्शनासाठी आवर्जून उपस्थित राहावे, ही मनःपूर्वक विनंती.",
    url: window.location.href
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(window.location.href);
      alert("निमंत्रणाची लिंक कॉपी झाली आहे.");
      return;
    }
    alert("कृपया वेबसाइटची लिंक कॉपी करून शेअर करा.");
  } catch (error) {
    console.log("Share cancelled or failed:", error);
  }
}
