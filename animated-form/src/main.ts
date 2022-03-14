import "./style.scss";
import gsap from "gsap";

const $containers = document.querySelectorAll(".input-container");
const $form = document.querySelector("form");

const tl = gsap.timeline({ defaults: { duration: 1, ease: "Power2.easeOut" } });

const lineStart =
  "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
const lineEnd = "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";

$containers.forEach((container) => {
  const input = container.querySelector<HTMLInputElement>(".input")!;
  const line = container.querySelector(".elastic-line")!;
  const placeholder = container.querySelector(".placeholder")!;

  validateInput(input, line, placeholder);

  input.addEventListener("focus", () => {
    if (!input.value) {
      tl.fromTo(line, { attr: { d: lineStart } }, { attr: { d: lineEnd }, duration: 0.6 });
      tl.to(line, { attr: { d: lineStart }, ease: "elastic.out(3, 0.5)" }, "<40%");
      tl.to(placeholder, { top: -15, scale: 0.9, duration: 0.35 }, "<15%");
    }
  });

  input.addEventListener("blur", () => {
    if (!input.value) {
      gsap.to(placeholder, { top: 0, scale: 1, duration: 0.35 });
    }
  });
});

function validateInput(input: HTMLInputElement, line: Element, placeholder: Element) {
  input.addEventListener("input", (e: any) => {
    if (e.target.type === "text") {
      let inputText = e.target.value;
      setColor(inputText.length > 2, line, placeholder);
    }
    if (e.target.type === "email") {
      let valid = validateEmail(e.target.value);
      setColor(valid, line, placeholder);
    }
    if (e.target.type === "tel") {
      let valid = validatePhone(e.target.value);
      setColor(valid, line, placeholder);
    }
  });
}

function colorize(color: string, line: Element, placeholder: Element) {
  gsap.to(line, { stroke: color, duration: 0.75 });
  gsap.to(placeholder, { color: color, duration: 0.75 });
}

function setColor(valid: boolean, line: Element, placeholder: Element) {
  if (valid) {
    colorize("#6391E8", line, placeholder);
  } else {
    colorize("#FE8C99", line, placeholder);
  }
}

function validateEmail(email: string) {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhone(phone: string) {
  let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  return re.test(phone);
}

const checkbox = document.querySelector<HTMLInputElement>("#checkbox")!;

const tl2 = gsap.timeline({ defaults: { duration: 0.5, ease: "Power2.easeOut" } });
const tickMarkPath = document.querySelector(".tick-mark path");
//@ts-expect-error
const pathLength = tickMarkPath.getTotalLength();

gsap.set(tickMarkPath, { strokeDashoffset: pathLength, strokeDasharray: pathLength });

checkbox.addEventListener("click", () => {
  if (checkbox.checked) {
    tl2.to(".checkbox-fill", { top: "0%" });
    tl2.fromTo(tickMarkPath, { strokeDashoffset: pathLength }, { strokeDashoffset: 0 });
  } else {
    tl2.fromTo(tickMarkPath, { strokeDashoffset: 0 }, { strokeDashoffset: pathLength });
    tl2.to(".checkbox-fill", { top: "100%" });
  }
});

const submitButton = document.querySelector(".join-button")!;
const tl3 = gsap.timeline({ defaults: { duration: 0.75, ease: "Power2.easeOut" } });

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  tl3.to(".contact-block, .form", { y: 30, opacity: 0, pointerEvents: "none" });
  tl3.to("form", { scale: 0.8 }, "<");
  tl3.fromTo(".submitted", { opacity: 0, y: 30 }, { opacity: 1, y: 0 });

  tl3.fromTo("#hand", { rotation: 0 }, { rotation: -15, yoyo: true, repeat: -1, delay: 1 });
});
