import { Stack, Text, Tag, Icon } from "@inubekit/inubekit";
import { MdApps, MdClose } from "react-icons/md";

import { spacing } from "@design/tokens/spacing";

import {
  StyledContainerFilters,
  MoreFiltersWrapper,
  HiddenFiltersMenu,
  HiddenFilterItem,
} from "./styles";
import { useSelectedFilters, SelectedFiltersProps } from "./interface";

function SelectedFilters({ filters, onRemove }: SelectedFiltersProps) {
  const {
    containerRef,
    visibleFilters,
    hiddenFilters,
    isMobile,
    showHiddenFilters,
    setShowHiddenFilters,
    handleRemoveFilter,
  } = useSelectedFilters(filters, onRemove);

  return (
    <StyledContainerFilters ref={containerRef}>
      {filters.length > 0 ? (
        <Stack direction="row" gap={spacing.s100}>
          {visibleFilters.map((filter, index) => (
            <Tag
              key={index}
              appearance={filter.type === "status" ? "dark" : "primary"}
              label={`${filter.label} (${filter.count})`}
              removable={!!onRemove}
              onClose={() => handleRemoveFilter(filter.id)}
              displayIcon={false}
            />
          ))}

          {hiddenFilters.length > 0 && (
            <MoreFiltersWrapper
              onClick={() => setShowHiddenFilters((prev) => !prev)}
            >
              <Tag
                appearance="primary"
                label="..."
                removable={false}
                displayIcon={false}
              />
              {showHiddenFilters && (
                <HiddenFiltersMenu $isMobile={isMobile}>
                  {hiddenFilters.map((filter, index) => (
                    <HiddenFilterItem key={index}>
                      <Stack gap={spacing.s050} alignItems="center">
                        <Icon
                          appearance="primary"
                          icon={<MdApps />}
                          size="14px"
                        />
                        <Text size="small">
                          {`${filter.label} (${filter.count})`}
                        </Text>
                      </Stack>
                      <Icon
                        appearance="dark"
                        icon={<MdClose />}
                        cursorHover={true}
                        size="16px"
                        onClick={() => handleRemoveFilter(filter.label)}
                      />
                    </HiddenFilterItem>
                  ))}
                </HiddenFiltersMenu>
              )}
            </MoreFiltersWrapper>
          )}
        </Stack>
      ) : (
        <Text type="label" size="small" appearance="gray">
          Sin filtros aún.
        </Text>
      )}
    </StyledContainerFilters>
  );
}

export { SelectedFilters };
