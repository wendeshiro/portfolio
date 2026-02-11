type BarredHeadingProps = {
  text: string;
  headingClassName?: string;
  className?: string;
  barClassName?: string;
};

export default function BarredHeading({
  text,
  headingClassName,
  className,
  barClassName,
}: BarredHeadingProps) {
  const headingClasses = `font-serif text-xl font-semibold md:text-2xl${
    headingClassName ? ` ${headingClassName}` : ""
  }`;
  const rootClassName = `inline-flex items-stretch gap-2${className ? ` ${className}` : ""}`;
  const barClasses = `bg-primary/70 my-1 inline-block w-0.5 rounded-full${barClassName ? ` ${barClassName}` : ""}`;

  return (
    <h3 className={headingClasses}>
      <span className={rootClassName}>
        <span aria-hidden="true" className={barClasses} />
        <span>{text}</span>
      </span>
    </h3>
  );
}
