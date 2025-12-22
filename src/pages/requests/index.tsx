import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useMediaQuery, IOption } from "@inubekit/inubekit";

import { labels } from "@i18n/labels";
import { useHumanEmployeeResourceRequests } from "@hooks/useHumanEmployeeResourceRequests";

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
  const [requestsData, setRequestsData] = useState<IRequest[]>([]);

  const menuRef = useRef<HTMLDivElement | null>(null);

  const isTablet = useMediaQuery("(max-width: 1280px)");
  const isMobile = useMediaQuery("(max-width: 490px)");

  const { data, isLoading } = useHumanEmployeeResourceRequests<IRequest>(
    formatHumanResourceRequests,
  );

  useEffect(() => {
    if (data) setRequestsData(data);
  }, [data]);

  const debouncedSearchTerm = useDebouncedSearch(searchTerm);
  useOutsideClick(menuRef, isMenuOpen, () => setIsMenuOpen(false));

  const boardSections = useMemo(() => {
    type BoardStatus = Extract<
      Status,
      "noResponsible" | "inProgress" | "completed"
    >;

    const sectionTitles: Record<BoardStatus, string> = {
      noResponsible: labels.requests.board.sections.noResponsible,
      inProgress: labels.requests.board.sections.inProgress,
      completed: labels.requests.board.sections.completed,
    };

    const backgroundMap: Record<BoardStatus, "gray" | "light"> = {
      noResponsible: "gray",
      inProgress: "light",
      completed: "gray",
    };

    const statuses: BoardStatus[] = [
      "noResponsible",
      "inProgress",
      "completed",
    ];

    return statuses.map((status) => ({
      sectionTitle: sectionTitles[status],
      value: status,
      sectionBackground: backgroundMap[status],
      sectionInformation: requestsData.filter((req) => req.status === status),
    }));
  }, [requestsData]);

  const openFilterModal = useCallback(() => {
    setIsFilterModalOpen(true);
    setIsMenuOpen(false);
  }, []);

  const closeFilterModal = useCallback(() => setIsFilterModalOpen(false), []);

  const handleDeleteSuccess = useCallback((deletedId: string) => {
    setRequestsData((prev) => prev.filter((r) => r.id !== deletedId));
  }, []);

  return (
    <RequestsUI
      appName={breadcrumbs.label}
      appRoute={breadcrumbs.crumbs}
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
      isLoadingRequests={isLoading}
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}

export { Requests };
