"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Matter from "matter-js";
import Image from "next/image";

export interface GravityIcon {
  src: string;
  alt: string;
}

interface GravityIconsProps {
  icons: GravityIcon[];
  /** Container height in px*/
  height?: number;
  /** Container height for md and up in px */
  heightMdUp?: number;
  /** Container height below md in px */
  heightBelowMd?: number;
  /** Icon size in px*/
  iconSize?: number;
  /** Icon size for md and up in px */
  iconSizeMdUp?: number;
  /** Icon size below md in px */
  iconSizeBelowMd?: number;
  /** Breakpoint used for md in px */
  mdBreakpoint?: number;
  /**
   * Physics body restitution / bounciness. Range: 0.0 - 1.0.
   * Higher values => more elastic collisions
   */
  restitution?: number;
  /**
   * Range: 0.0 - 1.0. Higher values => more tangential resistance
   * when bodies slide against each other or walls (they slow/stop quicker).
   */
  friction?: number;
  /**
   * Global gravity scale on the Y axis. Typical Earth-like value
   * is `1`. Higher values => stronger downward acceleration (bodies fall
   * faster); lower values (e.g. 0.5) => weaker gravity / floatier feel.
   */
  gravityY?: number;
  className?: string;
}

interface BodyState {
  x: number;
  y: number;
  angle: number;
}

export default function GravityIcons({
  icons,
  height = 400,
  heightMdUp,
  heightBelowMd,
  iconSize = 60,
  iconSizeMdUp,
  iconSizeBelowMd,
  mdBreakpoint = 768,
  restitution = 0.8,
  friction = 0.2,
  gravityY = 0.5,
  className = "",
}: GravityIconsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const rafRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const lastScrollTimeRef = useRef<number>(0);

  const [bodyStates, setBodyStates] = useState<BodyState[]>([]);
  const isMdUp = useSyncExternalStore(
    (onStoreChange) => {
      const mediaQuery = window.matchMedia(`(min-width: ${mdBreakpoint}px)`);
      mediaQuery.addEventListener("change", onStoreChange);
      return () => mediaQuery.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(`(min-width: ${mdBreakpoint}px)`).matches,
    () => false,
  );

  const resolvedHeight = isMdUp
    ? (heightMdUp ?? height)
    : (heightBelowMd ?? height);
  const resolvedIconSize = isMdUp
    ? (iconSizeMdUp ?? iconSize)
    : (iconSizeBelowMd ?? iconSize);

  // Apply force to all physics bodies based on scroll intensity
  const applyScrollForce = useCallback((delta: number) => {
    const bodies = bodiesRef.current;
    const engine = engineRef.current;
    if (!engine || bodies.length === 0) return;
    if (Math.abs(delta) < 1) return;

    const clampedDelta = Math.min(Math.abs(delta), 100); // higher => more force at high scroll speeds, but prevents extreme outliers from causing chaos
    const forceMagnitude = clampedDelta * 0.0002; // higher => more force per scroll unit

    // Scrolling down (positive delta) → push icons upward (negative Y)
    const forceY = -Math.sign(delta) * forceMagnitude;

    for (const body of bodies) {
      Matter.Sleeping.set(body, false);
      const forceX = (Math.random() - 0.5) * forceMagnitude * 1; // add some random horizontal force for more dynamic effect
      Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
    }
  }, []);

  // Primary: direct wheel event for immediate, unsmoothed force
  // (Lenis smooths velocity via lerp which drastically reduces reported speed)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      applyScrollForce(e.deltaY);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [applyScrollForce]);

  // Fallback: native scroll event (covers scrollbar drag, keyboard, touch)
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    lastScrollTimeRef.current = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const dt = now - lastScrollTimeRef.current;
      if (dt < 1) return;

      const dy = window.scrollY - lastScrollYRef.current;
      const velocity = (dy / dt) * 1000; // px/s

      lastScrollYRef.current = window.scrollY;
      lastScrollTimeRef.current = now;

      // Convert velocity to a delta-like value (scale down so it's comparable)
      applyScrollForce(velocity * 0.05);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [applyScrollForce]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;
    const h = resolvedHeight;

    // Create engine with sleeping enabled so we can wake bodies on scroll
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: gravityY },
      enableSleeping: true,
    });
    engineRef.current = engine;

    // Wall thickness — thick enough to prevent tunneling at high velocities
    const wallT = 200;
    const wallOptions = {
      isStatic: true,
      restitution: 0.5,
      friction: 0.3,
      render: { visible: false },
    } as Matter.IChamferableBodyDefinition;

    // Create walls (floor, ceiling, left, right)
    const floor = Matter.Bodies.rectangle(
      width / 2,
      h + wallT / 2,
      width + wallT * 2,
      wallT,
      wallOptions,
    );
    const ceiling = Matter.Bodies.rectangle(
      width / 2,
      -wallT / 2,
      width + wallT * 2,
      wallT,
      wallOptions,
    );
    const leftWall = Matter.Bodies.rectangle(
      -wallT / 2,
      h / 2,
      wallT,
      h + wallT * 2,
      wallOptions,
    );
    const rightWall = Matter.Bodies.rectangle(
      width + wallT / 2,
      h / 2,
      wallT,
      h + wallT * 2,
      wallOptions,
    );

    Matter.Composite.add(engine.world, [floor, ceiling, leftWall, rightWall]);

    // Create icon bodies - scattered randomly across the top portion
    const radius = resolvedIconSize / 2;
    const bodies = icons.map((_, i) => {
      const x = radius + Math.random() * (width - resolvedIconSize);
      const y = radius + Math.random() * (h * 0.4); // start in upper 40%

      return Matter.Bodies.circle(x, y, radius, {
        restitution,
        friction,
        frictionAir: 0.005, // minimal air resistance for more natural slowing
        density: 0.001,
        label: `icon-${i}`,
        render: { visible: false },
      });
    });

    bodiesRef.current = bodies;
    Matter.Composite.add(engine.world, bodies);

    // Clamp velocity every physics tick to prevent tunneling through walls
    const MAX_SPEED = 15;
    Matter.Events.on(engine, "beforeUpdate", () => {
      for (const body of bodiesRef.current) {
        const vx = body.velocity.x;
        const vy = body.velocity.y;
        const speed = Math.sqrt(vx * vx + vy * vy);
        if (speed > MAX_SPEED) {
          const scale = MAX_SPEED / speed;
          Matter.Body.setVelocity(body, {
            x: vx * scale,
            y: vy * scale,
          });
        }

        // Bounds recovery: if a body somehow escapes, teleport it back
        const margin = resolvedIconSize;
        if (
          body.position.x < -margin ||
          body.position.x > width + margin ||
          body.position.y < -margin ||
          body.position.y > h + margin
        ) {
          Matter.Body.setPosition(body, {
            x: Math.max(radius, Math.min(width - radius, body.position.x)),
            y: Math.max(radius, Math.min(h - radius, h * 0.5)),
          });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
        }
      }
    });

    // Start the engine runner
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Sync DOM positions with physics bodies via rAF
    function syncPositions() {
      const allBodies = bodiesRef.current;
      if (allBodies.length === 0) return;

      setBodyStates(
        allBodies.map((body) => ({
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
        })),
      );

      rafRef.current = requestAnimationFrame(syncPositions);
    }

    // Start syncing positions
    rafRef.current = requestAnimationFrame(syncPositions);

    // Handle resize
    const handleResize = () => {
      const newWidth = container.offsetWidth;
      if (newWidth === width) return;

      // Reposition walls
      Matter.Body.setPosition(floor, {
        x: newWidth / 2,
        y: h + wallT / 2,
      });
      Matter.Body.setVertices(
        floor,
        Matter.Bodies.rectangle(
          newWidth / 2,
          h + wallT / 2,
          newWidth + wallT * 2,
          wallT,
        ).vertices,
      );

      Matter.Body.setPosition(ceiling, {
        x: newWidth / 2,
        y: -wallT / 2,
      });
      Matter.Body.setVertices(
        ceiling,
        Matter.Bodies.rectangle(
          newWidth / 2,
          -wallT / 2,
          newWidth + wallT * 2,
          wallT,
        ).vertices,
      );

      Matter.Body.setPosition(rightWall, {
        x: newWidth + wallT / 2,
        y: h / 2,
      });
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Mouse interaction - drag bodies
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    // Prevent scroll hijacking by removing mouse wheel events from Matter
    mouse.element.removeEventListener(
      "wheel",
      (mouse as unknown as Record<string, EventListener>).mousewheel,
    );

    Matter.Composite.add(engine.world, mouseConstraint);

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Composite.clear(engine.world, false);
      engineRef.current = null;
      bodiesRef.current = [];
    };
  }, [
    icons,
    resolvedHeight,
    resolvedIconSize,
    restitution,
    friction,
    gravityY,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: resolvedHeight, touchAction: "pan-y" }}
    >
      {bodyStates.length > 0 &&
        icons.map((icon, i) => {
          const state = bodyStates[i];
          if (!state) return null;

          return (
            <div
              key={`gravity-icon-${i}`}
              className="absolute hover:cursor-pointer active:cursor-grabbing"
              style={{
                width: resolvedIconSize,
                height: resolvedIconSize,
                left: state.x - resolvedIconSize / 2,
                top: state.y - resolvedIconSize / 2,
                transform: `rotate(${state.angle}rad)`,
                willChange: "left, top, transform",
              }}
            >
              <Image
                src={icon.src}
                alt={icon.alt}
                width={resolvedIconSize}
                height={resolvedIconSize}
                className="object-contain select-none"
                draggable={false}
              />
            </div>
          );
        })}
    </div>
  );
}
