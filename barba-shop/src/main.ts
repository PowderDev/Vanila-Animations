import "./style.scss";
import barba from "@barba/core";
import gsap from "gsap";

const tlLeave = gsap.timeline({ defaults: { duration: 0.75, ease: "Power2.easeOut" } });
const tlEnter = gsap.timeline({ defaults: { duration: 0.75, ease: "Power2.easeOut" } });

const animationOnLeave = ($current: Element, done: () => void) => {
  const product = $current.querySelector(".image-container");
  const text = $current.querySelector(".showcase-text");
  const arrow = $current.querySelectorAll(".arrow");

  tlLeave.fromTo(product, { opacity: 1, x: 0 }, { opacity: 0, x: -50 });
  tlLeave.fromTo(text, { opacity: 1, x: 0 }, { opacity: 0, x: 50 }, "<");
  tlLeave.fromTo(arrow, { opacity: 1, y: 0 }, { opacity: 0, y: 50, onComplete: done }, "<");
};

const animationOnEnter = ($next: Element, gradient: string) => {
  const product = $next.querySelector(".image-container");
  const text = $next.querySelector(".showcase-text");
  const arrow = $next.querySelectorAll(".arrow");

  tlEnter.to("body", { background: gradient });
  tlEnter.fromTo(product, { opacity: 0, x: -50 }, { opacity: 1, x: 0 }, "<");
  tlEnter.fromTo(text, { opacity: 0, x: 50 }, { opacity: 1, x: 0 }, "<");
  tlEnter.fromTo(arrow, { opacity: 0, y: 50 }, { opacity: 1, y: 0 }, "<");
};

barba.init({
  transitions: [
    {
      name: "product-transition",
      to: { namespace: ["product"] },
      from: { namespace: ["boot", "hat", "handbag"] },
      enter(data) {
        const $next = data.next.container;
        gsap.set("body", { overflowY: "scroll" });
        tlEnter.fromTo($next, { y: "1000%" }, { y: "0%", ease: "none" });
        tlEnter.fromTo(".card", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.1 });
      },
      leave(data) {
        //@ts-expect-error: Unreachable error
        const done = this.async();
        const $current = data.current.container;
        tlLeave.fromTo($current, { y: "0%" }, { y: "100%", onComplete: done });
      },
    },
    {
      name: "product-transition",
      from: { namespace: ["product"] },
      to: { namespace: ["boot", "hat", "handbag"] },
      enter(data) {
        const $next = data.next.container;
        tlEnter.fromTo($next, { y: "100%" }, { y: "0%", ease: "none" });
        tlEnter.fromTo(".card", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.1 });
      },
      leave(data) {
        //@ts-expect-error: Unreachable error
        const done = this.async();
        const $current = data.current.container;
        gsap.set("body", { overflowY: "hidden" });
        tlLeave.fromTo($current, { y: "0%" }, { y: "1000%", onComplete: done });
      },
    },
    {
      name: "default",
      once(data) {
        const $next = data.next.container;
        animationOnEnter($next, getGradient(data.next.namespace));
      },
      leave(data) {
        //@ts-expect-error: Unreachable error
        const done = this.async();
        const $current = data.current.container;
        animationOnLeave($current, done);
      },
      enter(data) {
        const $next = data.next.container;
        animationOnEnter($next, getGradient(data.next.namespace));
      },
    },
  ],
  preventRunning: true,
});

function getGradient(name: string) {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg, #b75d62, #754d4f)";
    case "boot":
      return "linear-gradient(260deg, #5d8cb7, #4c4f70)";
    case "hat":
      return "linear-gradient(260deg, #b27a5c, #7f5450)";
  }
}
