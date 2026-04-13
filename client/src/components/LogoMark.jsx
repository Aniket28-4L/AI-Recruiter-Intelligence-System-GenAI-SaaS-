import { useId } from "react";

export default function LogoMark({
  className = "h-9 w-9",
  variant = "default",
}) {
  const gid = useId().replace(/:/g, "");
  const gradId = `lm-g-${gid}`;
  const onDark = variant === "onDark";

  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        width="40"
        height="40"
        rx="10"
        className={onDark ? "fill-white" : "fill-slate-900 dark:fill-white"}
      />
      <path
        d="M20 9.5L28.5 14.25V25.75L20 30.5L11.5 25.75V14.25L20 9.5Z"
        stroke={`url(#${gradId})`}
        strokeWidth="1.25"
        className="opacity-95"
      />
      <circle cx="20" cy="20" r="2.25" className="fill-indigo-500" />
      <circle
        cx="20"
        cy="13.5"
        r="1.35"
        className={onDark ? "fill-slate-500" : "fill-slate-200 dark:fill-slate-600"}
      />
      <circle
        cx="25.5"
        cy="23.25"
        r="1.35"
        className={onDark ? "fill-slate-500" : "fill-slate-200 dark:fill-slate-600"}
      />
      <circle
        cx="14.5"
        cy="23.25"
        r="1.35"
        className={onDark ? "fill-slate-500" : "fill-slate-200 dark:fill-slate-600"}
      />
      <line
        x1="20"
        y1="17.25"
        x2="20"
        y2="15.75"
        className={onDark ? "stroke-slate-400" : "stroke-slate-400 dark:stroke-slate-500"}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <line
        x1="22.2"
        y1="21.4"
        x2="24.1"
        y2="22.5"
        className={onDark ? "stroke-slate-400" : "stroke-slate-400 dark:stroke-slate-500"}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <line
        x1="17.8"
        y1="21.4"
        x2="15.9"
        y2="22.5"
        className={onDark ? "stroke-slate-400" : "stroke-slate-400 dark:stroke-slate-500"}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id={gradId} x1="11" y1="10" x2="29" y2="30">
          <stop stopColor="#818cf8" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
