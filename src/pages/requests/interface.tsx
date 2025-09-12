import { Input, Stack, Text, Icon, Button, IOption } from "@inubekit/inubekit";
import {
  MdSearch,
  MdOutlineFilterAltOff,
  MdOutlineFilterAlt,
  MdMoreVert,
  MdClear,
} from "react-icons/md";

import { AppMenu } from "@components/layout/AppMenu";
import { spacing } from "@design/tokens/spacing";
import { BoardSection } from "@components/layout/BoardSection";
import { RequestCard } from "@components/cards/RequestCard";
import { FilterRequestModal } from "@components/modals/FilterRequestModal";
import { SelectedFilters } from "@components/cards/SelectedFilters";
import { ERequestType } from "@ptypes/humanResourcesRequest.types";

import { RequestsNav } from "./config/nav.config";
import { IRoute, BoardSections, RequestItem } from "./types";

import {
  StyledRequestsContainer,
  StyledBoardContainer,
  SearchContainer,
  StyledMenuContainer,
  StyledMenuButton,
  StyledMenuIconContainer,
} from "./styles";

import { useNavigate } from "react-router-dom";

export interface RequestsUIProps {
  appName?: string;
  appRoute?: IRoute[];
  navigatePage?: string;
  isFilterModalOpen: boolean;
  isMenuOpen: boolean;
  isMobile: boolean;
  isTablet: boolean;
  menuRef: React.RefObject<HTMLDivElement>;
  assignmentOptions: IOption[];
  statusOptions: IOption[];
  searchTerm: string;
  debouncedSearchTerm: string;
  selectedFilters: IOption[];
  boardSections: BoardSections[];
  isLoadingRequests: boolean;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  setIsMenuOpen: (isOpen: boolean) => void;
  setSearchTerm: (term: string) => void;
  setSelectedFilters: (filters: IOption[]) => void;
}

function RequestsUI(props: RequestsUIProps) {
  const {
    appName,
    appRoute,
    navigatePage,
    isFilterModalOpen,
    isMenuOpen,
    menuRef,
    isMobile,
    isTablet,
    assignmentOptions,
    statusOptions,
    debouncedSearchTerm,
    selectedFilters,
    boardSections,
    setSearchTerm,
    setSelectedFilters,
    openFilterModal,
    closeFilterModal,
    setIsMenuOpen,
    isLoadingRequests,
  } = props;

  const navigate = useNavigate();

  function getRequestTypeTitle(type: string): string {
    if (type in ERequestType) {
      return ERequestType[type as keyof typeof ERequestType];
    }
    return "Tipo desconocido";
  }

  const handleRemove = (filterIdToRemove: string) => {
    setSelectedFilters(
      selectedFilters.filter((filter) => filter.id !== filterIdToRemove),
    );
  };

  const selectedStatusFilters = selectedFilters.filter((filter) =>
    statusOptions.some((status) => status.id === filter.id),
  );

  const selectedAssignmentFilters = selectedFilters.filter((filter) =>
    assignmentOptions.some((assignment) => assignment.id === filter.id),
  );

  const handleApplyFilters = (values: {
    assignment?: string;
    status?: string;
  }) => {
    const combinedFilters: IOption[] = [];

    if (values.assignment) {
      const assignmentIds = values.assignment.toString().split(",");
      const foundAssignments = assignmentOptions.filter((opt) =>
        assignmentIds.includes(opt.id),
      );
      combinedFilters.push(...foundAssignments);
    }

    if (values.status) {
      const statusIds = values.status.toString().split(",");
      const foundStatuses = statusOptions.filter((opt) =>
        statusIds.includes(opt.id),
      );
      combinedFilters.push(...foundStatuses);
    }

    setSelectedFilters(combinedFilters);
    closeFilterModal();
  };

  const filterRequests = (
    sectionInformation: RequestItem[],
    sectionValue: string,
    debouncedSearchTerm: string,
    selectedAssignmentFilters: { label: string }[],
    selectedStatusFilters: { value: string }[],
  ) => {
    return sectionInformation.filter(
      ({ id, title, requestDate, employeeName }) => {
        const titleTransformed = getRequestTypeTitle(title);

        const matchesSearch = [
          id,
          titleTransformed,
          requestDate,
          employeeName,
        ].some((field) =>
          field?.toString().toLowerCase().includes(debouncedSearchTerm),
        );

        const matchesAssignment =
          selectedAssignmentFilters.length === 0 ||
          selectedAssignmentFilters.some((assignment) =>
            titleTransformed
              .toLowerCase()
              .includes(assignment.label.toLowerCase()),
          );

        const matchesStatus =
          selectedStatusFilters.length === 0 ||
          selectedStatusFilters.some(
            (filter) =>
              filter.value.toLowerCase() === sectionValue.toLowerCase(),
          );

        return matchesSearch && matchesAssignment && matchesStatus;
      },
    );
  };

  const filteredRequestsData = boardSections.flatMap(
    ({ value, sectionInformation }) =>
      filterRequests(
        sectionInformation,
        value,
        debouncedSearchTerm,
        selectedAssignmentFilters,
        selectedStatusFilters,
      ).map((item) => ({ ...item, status: value })),
  );

  const getFilterCount = (filter: IOption) => {
    const isStatusFilter = statusOptions.some(
      (status) => status.value === filter.value,
    );
    const isAssignmentFilter = assignmentOptions.some(
      (assignment) => assignment.value === filter.value,
    );

    return filteredRequestsData.filter((info) => {
      if (isStatusFilter) {
        return info.status.toLowerCase() === filter.id.toLowerCase();
      }
      if (isAssignmentFilter) {
        return getRequestTypeTitle(info.title)
          .toLowerCase()
          .includes(filter.label.toLowerCase());
      }
      return false;
    }).length;
  };

  return (
    <AppMenu
      appName={appName ?? ""}
      appRoute={appRoute ?? []}
      navigatePage={navigatePage ?? ""}
      isMobile={isMobile}
    >
      <SearchContainer $isTablet={isTablet}>
        <Stack gap={spacing.s150} direction="column" width="100%">
          <Stack
            direction="row"
            gap={spacing.s150}
            padding={
              isTablet
                ? `${spacing.s0} ${spacing.s0} ${spacing.s150} ${spacing.s0}`
                : spacing.s0
            }
          >
            <Input
              id="seeker"
              placeholder="Palabra clave"
              iconAfter={<MdSearch size={20} />}
              size="compact"
              fullwidth={isTablet}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
            {isTablet && (
              <>
                <StyledMenuIconContainer>
                  <Icon
                    appearance="dark"
                    icon={<MdMoreVert />}
                    cursorHover
                    parentHover={false}
                    disabled={false}
                    spacing="narrow"
                    variant="empty"
                    size="24px"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMenuOpen(!isMenuOpen);
                    }}
                  />
                </StyledMenuIconContainer>
                {isMenuOpen && (
                  <StyledMenuContainer
                    $isTablet={isTablet}
                    $isMobile={isMobile}
                    ref={menuRef}
                  >
                    <StyledMenuButton onClick={openFilterModal}>
                      <Icon
                        appearance="primary"
                        icon={<MdOutlineFilterAlt />}
                        spacing="narrow"
                        variant="empty"
                        size="24px"
                      />
                      <Text size="medium">
                        Filtrar ({selectedFilters.length})
                      </Text>
                      <Stack
                        margin={`${spacing.s0} ${spacing.s0} ${spacing.s0} ${spacing.s300}`}
                      >
                        <Icon
                          icon={<MdClear />}
                          size="18px"
                          cursorHover
                          appearance="dark"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeFilterModal();
                            setIsMenuOpen(false);
                          }}
                        />
                      </Stack>
                    </StyledMenuButton>
                  </StyledMenuContainer>
                )}
              </>
            )}
          </Stack>

          {!isTablet && (
            <StyledRequestsContainer $isTablet={isTablet}>
              <SelectedFilters
                onRemove={handleRemove}
                filters={selectedFilters.map((filter) => ({
                  id: filter.id,
                  label: filter.label,
                  type: statusOptions.some(
                    (status) => status.value === filter.value,
                  )
                    ? "status"
                    : "assignment",
                  count: getFilterCount(filter),
                }))}
              />
              <Button
                appearance="gray"
                iconBefore={<MdOutlineFilterAltOff />}
                type="button"
                spacing="wide"
                variant="outlined"
                disabled={selectedFilters.length === 0}
                onClick={() => setSelectedFilters([])}
              >
                Quitar
              </Button>
              <Button
                appearance="primary"
                iconBefore={<MdOutlineFilterAlt />}
                type="button"
                spacing="wide"
                variant="outlined"
                onClick={openFilterModal}
              >
                Filtrar
              </Button>
            </StyledRequestsContainer>
          )}
        </Stack>
      </SearchContainer>

      {isFilterModalOpen && (
        <FilterRequestModal
          portalId="portal"
          assignmentOptions={assignmentOptions}
          statusOptions={statusOptions}
          onCloseModal={closeFilterModal}
          onClearFilters={() => setSelectedFilters([])}
          onSubmit={handleApplyFilters}
          selectedFilters={selectedFilters.map((filter) => ({
            ...filter,
            count: getFilterCount(filter),
          }))}
          onRemoveFilter={handleRemove}
        />
      )}

      <StyledBoardContainer $isTablet={isTablet}>
        {boardSections.map(
          ({ value, sectionTitle, sectionBackground, sectionInformation }) => {
            const filteredRequests = filterRequests(
              sectionInformation,
              value,
              debouncedSearchTerm,
              selectedAssignmentFilters,
              selectedStatusFilters,
            );

            return (
              <BoardSection
                key={sectionTitle}
                sectionTitle={sectionTitle}
                sectionBackground={sectionBackground}
                orientation={isTablet ? "horizontal" : "vertical"}
                sectionInformation={filteredRequests}
                errorLoadingPins={false}
                searchRequestValue={debouncedSearchTerm}
                selectedFilters={selectedFilters}
                isLoading={isLoadingRequests}
              >
                {filteredRequests.length > 0 ? (
                  filteredRequests.map(
                    ({ id, title, requestDate, employeeName, status }) => {
                      const requestTypeTitle = getRequestTypeTitle(title);

                      return (
                        <RequestCard
                          key={id}
                          id={id}
                          title={requestTypeTitle}
                          requestDate={requestDate}
                          employeeName={employeeName}
                          status={
                            statusOptions.find((opt) => opt.value === status)
                              ?.label ?? status
                          }
                          responsible="Sin responsable"
                          onclick={() => {
                            if (RequestsNav[requestTypeTitle]) {
                              navigate(
                                `${RequestsNav[requestTypeTitle].path}/${id}`,
                                { state: { section: value } },
                              );
                            }
                          }}
                          showExtraIcon={sectionTitle === "Con pendientes"}
                        />
                      );
                    },
                  )
                ) : (
                  <Text>
                    No hay solicitudes que coincidan con los filtros
                    seleccionados.
                  </Text>
                )}
              </BoardSection>
            );
          },
        )}
      </StyledBoardContainer>
    </AppMenu>
  );
}

export { RequestsUI };
