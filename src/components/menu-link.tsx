import { HTMLAttributes, ReactNode } from "react";
import { LinkProps, NavLink } from "react-router-dom";

interface MenuLinkProps extends HTMLAttributes<"div"> {
  to: LinkProps["to"];
  icon: ReactNode;
}

export function MenuLink({ to, icon, children }: MenuLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 py-2 flex items-center rounded-lg hover:bg-violet-100 hover:text-violet-600 cursor-pointer ${
          isActive && "bg-violet-100 text-violet-600"
        }`
      }
    >
      {icon}
      <span className="ml-3 font-medium">{children}</span>
    </NavLink>
  );
}
