import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeaderNavItemBaseProps {
  label: string;
  icon?: LucideIcon;
  active?: boolean;
  className?: string;
  children?: ReactNode;
}

type HeaderNavItemLinkProps = HeaderNavItemBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof HeaderNavItemBaseProps> & {
    href: string;
  };

type HeaderNavItemButtonProps = HeaderNavItemBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof HeaderNavItemBaseProps> & {
    href?: undefined;
  };

export type HeaderNavItemProps = HeaderNavItemLinkProps | HeaderNavItemButtonProps;

export function HeaderNavItem({
  label,
  icon: Icon,
  active,
  className,
  children,
  ...props
}: HeaderNavItemProps) {
  const content = (
    <>
      <span className="glass-header__nav-icon-wrap">
        {children ??
          (Icon ? (
            <Icon className="glass-header__nav-icon" strokeWidth={2} aria-hidden />
          ) : null)}
      </span>
      <span className="glass-header__nav-label">{label}</span>
    </>
  );

  const itemClass = cn(
    "glass-header__nav-item",
    active && "glass-header__nav-item--active",
    className
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link
        href={href}
        className={itemClass}
        aria-current={active ? "page" : undefined}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  const buttonProps = props as HeaderNavItemButtonProps;
  return (
    <button type="button" className={itemClass} {...buttonProps}>
      {content}
    </button>
  );
}
