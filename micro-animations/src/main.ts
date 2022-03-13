import "./style.scss";
import gsap from "gsap";

const $homeIcon = document.querySelector(".home")!;
gsap.set(".feather", { scale: 0, transform: "center" });

$homeIcon.addEventListener("click", () => {
  gsap.fromTo(".home-svg", { scale: 1 }, { scale: 0.9, yoyo: true, repeat: 1 });
  gsap.fromTo(".feather", { y: -5, scale: 0 }, { y: 20, scale: 1.5, duration: 1, stagger: 0.2 });
  gsap.fromTo(".right-feather", { x: 0 }, { x: 5 });
  gsap.fromTo(".left-feather", { x: 0 }, { x: -5 });
  gsap.fromTo(".roof", { y: 0 }, { y: -2, yoyo: true, repeat: 1 });
});

const $notificationIcon = document.querySelector(".notifications")!;
gsap.set(".bell", { transformOrigin: "top center" });
gsap.set(".ringer", { transformOrigin: "top center" });
gsap.set(".wave", { opacity: 0 });

$notificationIcon.addEventListener("click", () => {
  gsap.fromTo(".bell", { rotation: 3 }, { rotation: 0, duration: 2, ease: "elastic.out(5, 0.2)" });
  gsap.fromTo(
    ".ringer",
    { rotation: 3 },
    { rotation: 0, duration: 2, ease: "elastic.out(5, 0.2)" }
  );
  gsap.fromTo(".wave", { opacity: 1 }, { opacity: 0, duration: 1.5 });
});

const $messageIcon = document.querySelector(".messages")!;
gsap.set(".flap", { transformOrigin: "top" });

const tl = gsap.timeline({ defaults: { duration: 0.35, ease: "Power2.easeOut" } });

$messageIcon.addEventListener("click", () => {
  tl.fromTo(".message-svg", { scale: 1 }, { scale: 0.9 });
  tl.fromTo(".flap", { scale: 1 }, { scale: -1 }, "<50%");
  tl.fromTo(".messages-svg", { scale: 0.9 }, { scale: 1 });
  tl.fromTo(".note", { y: 0, opacity: 1 }, { y: -40, opacity: 0, duration: 0.75 });
  tl.to(".flap", { scale: 1 });
});
