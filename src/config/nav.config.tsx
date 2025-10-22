import { ReactNode } from "react";
import { IconType } from "react-icons";
import { MdLogout } from "react-icons/md";
import * as MdIcons from "react-icons/md";
import { useLocation } from "react-router-dom";
import { ILinkNav } from "@inubekit/inubekit";

import { IOptionWithSubOptions } from "@ptypes/staffPortalBusiness.types";

const baseNavLinks = [
  {
    id: "solTramitePortalIhurem",
    label: "Solicitudes en tramite",
    path: "/requests",
    description:
      "Son trámites o gestiones que están en proceso de ser aprobadas o completadas.",
    order: 1,
  },
];

const noop = () => undefined;

const actions = [
  {
    id: "logout",
    label: "Cerrar sesión",
    icon: <MdLogout />,
    action: () => {
      window.location.href = "/logout";
    },
  },
];

const getIcon = (iconReference?: string): ReactNode => {
  if (iconReference && iconReference.trim() !== "") {
    const IconComponent: IconType | undefined = (
      MdIcons as Record<string, IconType>
    )[iconReference];
    if (IconComponent) {
      return <IconComponent size={24} />;
    }
  }
  return <div style={{ width: 24, height: 24 }} />;
};

const navConfig = (optionForCustomerPortal: IOptionWithSubOptions[]) => {
  const filteredLinks = baseNavLinks.filter((link) =>
    optionForCustomerPortal.some((option) => option.publicCode === link.id),
  );

  return filteredLinks
    .map((link) => {
      const option = optionForCustomerPortal.find(
        (o) => o.publicCode === link.id,
      );

      return {
        ...link,
        icon: option ? (
          getIcon(option.iconReference)
        ) : (
          <div style={{ width: 24, height: 24 }} />
        ),
        isEnabled: true,
        order: link.order ?? 0,
      };
    })
    .sort((a, b) => a.order - b.order);
};

const useNavConfig = (optionForCustomerPortal: IOptionWithSubOptions[]) => {
  const location = useLocation();
  const baseNav = navConfig(optionForCustomerPortal);

  const nav = {
    reactPortalId: "portals",
    title: "MENU",
    sections: {
      administrate: {
        name: "",
        links: baseNav.reduce(
          (acc, link) => {
            acc[link.id] = {
              ...link,
              isActive: location.pathname.startsWith(link.path),
            };
            return acc;
          },
          {} as Record<string, ILinkNav>,
        ),
      },
    },
    actions,
  };

  return nav;
};

const useConfigHeader = (optionForCustomerPortal: IOptionWithSubOptions[]) => {
  const nav = {
    reactPortalId: "portal",
    title: "MENU",
    sections: [
      {
        isOpen: true,
        onClose: noop,
        onToggle: noop,
        subtitle: "Administrate",
        links: navConfig(optionForCustomerPortal),
      },
    ],
    actions,
  };

  return nav;
};

const userMenu = [
  {
    id: "section",
    title: "",
    links: [
      {
        id: "logout",
        title: "Cerrar sesión",
        path: "/logout",
        iconBefore: <MdLogout />,
      },
    ],
    divider: true,
  },
];

export {
  useNavConfig,
  getIcon,
  useConfigHeader,
  baseNavLinks,
  userMenu,
  actions,
  navConfig,
};
