import "./style.scss";
import gsap from "gsap";

const tl = gsap.timeline({ defaults: { duration: 0.75, ease: "Power3.easeOut" } });

tl.fromTo(
  ".hero-image",
  { scale: 1.3, borderRadius: "0rem", duration: 2 },
  { scale: 1, borderRadius: "2rem", duration: 2.5, ease: "elastic.out(1.5,1)" }
);

tl.fromTo(".cta1", { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, "<30%");
tl.fromTo(".cta3", { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, "<30%");
tl.fromTo(".cta2", { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, "<30%");
tl.fromTo(".cta4", { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, "<30%");
tl.fromTo(".cta6", { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, "<30%");
tl.fromTo(".cta5", { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "<30%");
tl.fromTo(".cta-button", { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "<30%");

const $logo = document.querySelector(".logo")!;
const letters = $logo?.textContent?.split("");

if (letters) {
  $logo.textContent = "";
  letters.forEach((letter) => ($logo.innerHTML += "<span class='letter'>" + letter + "</span>"));
  gsap.set(".letter", { display: "inline-block" });
  gsap.fromTo(".letter", { y: -50 }, { y: 0, delay: 1.5, stagger: 0.05 });
}
