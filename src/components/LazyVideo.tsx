import {
  useRef,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
  memo,
} from "react";

/* Seconds before the video ends to fire onNearEnd (must be > FADE_DURATION/1000) */
const NEAR_END_THRESHOLD = 2.0;

/* ═══════════════════════════════════════════════════════════════════
   Public imperative API
   ═══════════════════════════════════════════════════════════════════ */
export interface LazyVideoHandle {
  /** Hot-swap the video source without remounting the DOM node. */
  load(src: string, poster?: string): void;
  /** Start playback (catches autoplay rejections silently). */
  play(): Promise<void>;
  /** Pause playback. */
  pause(): void;
  /** `true` once the current source can play without buffering. */
  readonly ready: boolean;
  /** The underlying HTMLVideoElement (escape hatch). */
  readonly el: HTMLVideoElement | null;
}

/* ═══════════════════════════════════════════════════════════════════
   Props
   ═══════════════════════════════════════════════════════════════════ */
interface LazyVideoProps {
  /** Video loaded on first mount — later changes use handle.load(). */
  initialSrc?: string;
  /** Poster image displayed while the video buffers. */
  poster?: string;
  /** Drive layer opacity: true → 1, false → 0. */
  isActive: boolean;
  /** Crossfade transition duration in ms (default 1 200). */
  fadeDuration?: number;
  /** Called when the video finishes playing (no loop). */
  onEnded?: () => void;
  /** Called ~2 s before the video ends — use to pre-trigger the next crossfade. */
  onNearEnd?: () => void;
  /** Extra Tailwind / CSS classes on the wrapper. */
  className?: string;
  /** Preload strategy for the video element. */
  preload?: "auto" | "metadata" | "none";
  /** Native autoPlay attribute for the video element. */
  autoPlay?: boolean;
}

/* ═══════════════════════════════════════════════════════════════════
   Component

   GPU-accelerated background-video layer for the hero crossfade
   system.

   Guarantees:
   ─ The <video> DOM node is NEVER unmounted / recreated.
   ─ Source changes are imperative (handle.load()), so React never
     tears down the element.
   ─ Opacity is compositor-only (will-change: opacity) → 60 fps.
   ─ A poster <img> dissolves out once the buffer is ready,
     preventing any white / black flash on first load.
   ═══════════════════════════════════════════════════════════════════ */
const LazyVideo = memo(
  forwardRef<LazyVideoHandle, LazyVideoProps>(
    (
      {
        initialSrc,
        poster: initialPoster,
        isActive,
        fadeDuration = 1200,
        onEnded,
        onNearEnd,
        className = "",
        preload = "auto",
        autoPlay = false,
      },
      ref,
    ) => {
      const videoRef = useRef<HTMLVideoElement>(null);
      const srcRef = useRef(initialSrc);
      // Tracks whether onNearEnd has already fired for the current playback
      const nearEndFiredRef = useRef(false);
      const [ready, setReady] = useState(false);
      const [posterSrc, setPosterSrc] = useState(initialPoster);

      /* ── Imperative handle ────────────────────────────────────── */
      useImperativeHandle(
        ref,
        () => ({
          load(src: string, poster?: string) {
            const v = videoRef.current;
            if (!v || srcRef.current === src) return;
            srcRef.current = src;
            setReady(false);
            setPosterSrc(poster);
            // Disable autoplay so the preloading layer doesn't
            // start playing while it's still hidden (opacity 0).
            v.autoplay = false;
            v.src = src;
            v.load();
          },

          play() {
            const v = videoRef.current;
            if (!v) return Promise.resolve();
            // Reset near-end flag each time a new playback starts
            nearEndFiredRef.current = false;
            v.muted = true;
            // Note: v.load() already resets currentTime to 0 per spec,
            // so we do NOT seek here — avoids an unnecessary seek stall.
            return v.play().catch(() => {});
          },

          pause() {
            videoRef.current?.pause();
          },

          get ready() {
            return ready;
          },

          get el() {
            return videoRef.current;
          },
        }),
        [ready],
      );

      /* ── First mount: force muted IDL property for autoplay compat ──── */
      useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        // React's `muted` JSX prop doesn't always sync the DOM IDL property
        // in every browser — set it explicitly to guarantee muted autoplay.
        v.muted = true;
        // initialSrc is already set via the `src` JSX prop below, so the
        // browser begins fetching it at DOM-creation time — no v.load() needed.
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      // Use canplay (fires sooner than canplaythrough) so the poster dissolves
      // as early as the browser has enough data to start rendering frames.
      const handleCanPlay = useCallback(() => setReady(true), []);

      /* ── Near-end detection: fire onNearEnd once per playback ────────── */
      const handleTimeUpdate = useCallback(() => {
        const v = videoRef.current;
        if (!v || !v.duration) return;

        // Reset the flag if the video just started or looped back
        if (v.currentTime < v.duration - NEAR_END_THRESHOLD - 0.5) {
          nearEndFiredRef.current = false;
        }

        if (onNearEnd && !nearEndFiredRef.current && v.duration - v.currentTime <= NEAR_END_THRESHOLD) {
          nearEndFiredRef.current = true;
          onNearEnd();
        }
      }, [onNearEnd]);

      /* ── Render ───────────────────────────────────────────────── */
      return (
        <div
          className={`absolute inset-0 ${className}`}
          style={{
            opacity: isActive ? 1 : 0,
            transition: `opacity ${fadeDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            willChange: "opacity",
            zIndex: isActive ? 2 : 1,
            backfaceVisibility: "hidden",
            contain: "layout paint",
          }}
          aria-hidden={!isActive}
        >
          {/* Poster fallback — dissolves once the video can play */}
          {posterSrc && (
            <img
              src={posterSrc}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                zIndex: 0,
                opacity: ready ? 0 : 1,
                transition: "opacity 0.6s ease",
              }}
            />
          )}

          {/* Video — this DOM node is NEVER destroyed.
              src is set as a JSX prop for layer A so the browser starts
              fetching immediately at DOM-creation time (before any effect). */}
          <video
            ref={videoRef}
            src={initialSrc || undefined}
            autoPlay={autoPlay}
            loop
            muted
            playsInline
            preload={preload}
            onCanPlay={handleCanPlay}
            onTimeUpdate={handleTimeUpdate}
            onEnded={onEnded}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
        </div>
      );
    },
  ),
);

LazyVideo.displayName = "LazyVideo";
export default LazyVideo;
