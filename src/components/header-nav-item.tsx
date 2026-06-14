import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeaderNavItemBaseProps {
  label: string;
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
  active,
  className,
  children,
  ...props
}: HeaderNavItemProps) {
  const content = children ?? label;

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
