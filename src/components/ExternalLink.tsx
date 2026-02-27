import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "className" | "children"
> & {
  href: string;
  children: ReactNode;
  fontWeight?: "normal" | "medium" | "semibold";
  className?: string;
};

export default function ExternalLink({
  href,
  children,
  fontWeight = "semibold",
  className,
  ...rest
}: ExternalLinkProps) {
  const weightClassByFontWeight = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
  } as const;
  const weightClass = weightClassByFontWeight[fontWeight];
  const linkClassName = [
    "hover:text-primary group transition-colors duration-300",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
      {...rest}
    >
      <span
        className={`${weightClass} underline decoration-dotted decoration-1 underline-offset-7`}
      >
        {children}
      </span>
      <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </a>
  );
}
