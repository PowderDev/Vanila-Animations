import "./style.scss";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

gsap.timeline({
  scrollTrigger: {
    trigger: ".first-page",
    start: "0%",
    end: "100%",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
});

//* Fade In The Text: second page
const highLightTextTL = gsap.timeline({
  scrollTrigger: { trigger: ".second-page", scrub: true, start: "-40%", end: "40%" },
});

highLightTextTL.fromTo(
  ".highlight",
  { color: "rgba(255, 255, 255, 0.4)" },
  { color: "rgba(255, 255, 255, 1)", stagger: 1 }
);

//* Fade Out The Text: second page
const RemoveHighLightTextTL = gsap.timeline({
  scrollTrigger: { trigger: ".second-page", scrub: true, start: "-20%", end: "60%" },
});

RemoveHighLightTextTL.to(".highlight", { color: "rgba(255, 255, 255, 0.4)", stagger: 1 });

//* Splits Two Images: third page
const splitTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".third-page",
    start: "-35%",
    end: "10%",
    scrub: true,
  },
});

splitTL.fromTo(".large-phone", { x: "40%" }, { x: "20%" });
splitTL.fromTo(".product-text", { opacity: 0 }, { opacity: 1 }, "<");
splitTL.fromTo(
  ".product-text-left",
  { marginRight: 0, paddingRight: 0 },
  { marginRight: "8rem", paddingRight: "4rem" },
  "<"
);
splitTL.fromTo(".small-phone", { x: "-40%" }, { x: "-20%" }, "<");

//* Carousel of Colorful iPhones: forth page
const swatches = document.querySelectorAll(".swatches img");
const gallery = document.querySelector(".phone-gallery");
const slides = document.querySelectorAll(".phone-gallery-container");

let currentSwatch = "blue";
let zIndex = 2;

swatches.forEach((swatch, i) => {
  const leftCoord = slides[i].getBoundingClientRect().left;

  swatch.addEventListener("click", (e: any) => {
    const name = e.target.getAttribute("swatch");
    const closeUpImage = document.querySelector("." + name);

    if (currentSwatch === name) return;

    gsap.set(closeUpImage, { zIndex });
    gsap.fromTo(closeUpImage, { opacity: 0 }, { opacity: 1, duration: 1 });

    gsap.to(gallery, { x: -leftCoord, duration: 1, ease: "back.out(0.7)" });

    zIndex++;
    currentSwatch = name;
  });
});

//* Shows a video frame-by-frame: fifth page
const videoTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".fifth-page",
    start: "0%",
    end: "100%",
    scrub: true,
    pin: true,
  },
});

videoTL.fromTo(".product-video", { currentTime: 0 }, { currentTime: 3, duration: 2 });
videoTL.fromTo(
  ".product-info-container h3",
  { opacity: 0 },
  { opacity: 1, stagger: 0.25, duration: 1 },
  "<"
);
