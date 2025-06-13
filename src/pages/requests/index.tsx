import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useMediaQuery, IOption } from "@inubekit/inubekit";
import { useHumanResourceRequests } from "@hooks/useHumanResourceRequests";

import { formatHumanResourceRequests } from "./formatHumanResourceRequests";
import { RequestsUI } from "./interface";
import { assignmentOptions, statusOptions } from "./config";
import { IRequest, Status } from "./types";
import { breadcrumbs } from "./config/nav.config";

const useDebouncedSearch = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const useOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  active: boolean,
  onOutsideClick: () => void,
) => {
  useEffect(() => {
    if (!active) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutsideClick();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [active, ref, onOutsideClick]);
};

function Requests() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<IOption[]>([]);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const isTablet = useMediaQuery("(max-width: 1280px)");
  const isMobile = useMediaQuery("(max-width: 490px)");

  const { data } = useHumanResourceRequests<IRequest>(
    formatHumanResourceRequests,
  );

  const debouncedSearchTerm = useDebouncedSearch(searchTerm);
  useOutsideClick(menuRef, isMenuOpen, () => setIsMenuOpen(false));

  const boardSections = useMemo(() => {
    const statusMap: Record<Status, string> = {
      pending: "Por evaluar",
      inProgress: "En progreso",
      completed: "Terminada",
    };

    const backgroundMap: Record<Status, "gray" | "light"> = {
      pending: "gray",
      inProgress: "light",
      completed: "gray",
    };

    const statuses: Status[] = ["pending", "inProgress", "completed"];

    return statuses.map((status) => ({
      sectionTitle: statusMap[status],
      value: status,
      sectionBackground: backgroundMap[status],
      sectionInformation: data.filter((req) => req.status === status),
    }));
  }, [data]);

  const openFilterModal = useCallback(() => {
    setIsFilterModalOpen(true);
    setIsMenuOpen(false);
  }, []);

  const closeFilterModal = useCallback(() => setIsFilterModalOpen(false), []);

  return (
    <RequestsUI
      appName={breadcrumbs.label}
      navigatePage={breadcrumbs.url}
      isFilterModalOpen={isFilterModalOpen}
      isMenuOpen={isMenuOpen}
      menuRef={menuRef}
      isMobile={isMobile}
      isTablet={isTablet}
      assignmentOptions={assignmentOptions}
      statusOptions={statusOptions}
      searchTerm={searchTerm}
      debouncedSearchTerm={debouncedSearchTerm}
      selectedFilters={selectedFilters}
      setSearchTerm={setSearchTerm}
      setSelectedFilters={setSelectedFilters}
      openFilterModal={openFilterModal}
      closeFilterModal={closeFilterModal}
      setIsMenuOpen={setIsMenuOpen}
      boardSections={boardSections}
    />
  );
}

export { Requests };
