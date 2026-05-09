import gsap from 'gsap';

export function shakeElement(element) {
  gsap.fromTo(element, 
    { x: -10 }, 
    { x: 10, duration: 0.08, repeat: 5, yoyo: true, onComplete: () => {
        gsap.to(element, { x: 0, duration: 0.1 });
    }}
  );
}

export function pulseElement(element) {
  gsap.to(element.scale, {
    x: 1.1,
    y: 1.1,
    duration: 0.3,
    yoyo: true,
    repeat: 1
  });
}
