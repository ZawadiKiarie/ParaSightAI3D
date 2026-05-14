import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useSetAtom } from "jotai"; // Import useSetAtom for better performance
import { viewAtom } from "../../store/Store";

export const StartButton = () => {
  const buttonRef = useRef();
  const textRef = useRef();

  // 1. Get the setter for our view state
  const setView = useSetAtom(viewAtom);

  useEffect(() => {
    const textStr = textRef.current.innerText;
    textRef.current.innerHTML = textStr
      .split("")
      .map(
        (char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`,
      )
      .join("");

    const chars = textRef.current.querySelectorAll(".char");

    gsap.set(chars, { y: "100%", opacity: 0 });

    gsap.to(chars, {
      y: "0%",
      opacity: 1,
      duration: 0.6,
      stagger: 0.02,
      ease: "power3.out",
      delay: 0.1,
    });

    const onEnter = () => {
      gsap.to(chars, {
        y: "-100%",
        opacity: 0,
        duration: 0.2, // Increased slightly for better visual "whoosh"
        stagger: 0.01,
        ease: "power3.in",
        onComplete: () => {
          gsap.fromTo(
            chars,
            { y: "100%", opacity: 0 },
            {
              y: "0%",
              opacity: 1,
              duration: 0.2,
              stagger: 0.01,
              ease: "power3.out",
            },
          );
        },
      });
    };

    const button = buttonRef.current;
    button.addEventListener("mouseenter", onEnter);

    return () => {
      button.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="start-btn-container"
      // 2. Add the click handler to transition to the LIST view
      onClick={() => setView("LIST")}
    >
      <div className="ripple-background">
        <span className="ripple"></span>
        <span className="ripple"></span>
        <span className="ripple"></span>
      </div>

      <div className="btn-content">
        <span ref={textRef} className="btn-text">
          Start Experience
        </span>
      </div>
    </button>
  );
};
