import { useState } from "react";
import { MdOutlineInfo } from "react-icons/md";
import { Text, SkeletonLine, Icon, Stack } from "@inubekit/inubekit";

import { ActionModal } from "@components/modals/ActionModal";
import { spacing } from "@design/tokens/spacing";

import {
  StyledContainer,
  StyledTable,
  StyledTbody,
  StyledThead,
  StyledTr,
  StyledTh,
  StyledTd,
  StyledThactions,
  StyledTdactions,
  StyledDivactions,
} from "./styles";
import { ITitle, IRenderActionsTitles, IActionsComponent } from "./types";
import { ITableBoardProps } from ".";

const RenderActionsTitles = (props: IRenderActionsTitles) => {
  const {
    actions,
    appearance,
    isTablet,
    isStyleMobile,
    isFirstTable,
    onInfoClick,
  } = props;

  return (
    <>
      {!isTablet
        ? actions.map((actionTitle) => (
            <StyledThactions key={actionTitle.id}>
              <Text
                appearance={appearance}
                size="large"
                padding="0px 4px"
                textAlign="center"
                weight="bold"
              >
                {actionTitle.actionName}
              </Text>
            </StyledThactions>
          ))
        : isFirstTable && (
            <StyledThactions $isTablet={isTablet} colSpan={3} $isFirst>
              {isStyleMobile && (
                <Icon
                  icon={<MdOutlineInfo />}
                  appearance="primary"
                  size="20px"
                  onClick={onInfoClick}
                />
              )}
            </StyledThactions>
          )}
    </>
  );
};

const actionsLoading = (numberActions: number) => {
  const cellsOfActionsLoading = [];
  for (let cellAction = 0; cellAction < numberActions; cellAction++) {
    cellsOfActionsLoading.push(
      <StyledTd key={cellAction}>
        <SkeletonLine animated />
      </StyledTd>,
    );
  }
  return cellsOfActionsLoading;
};

const dataLoading = (titleColumns: ITitle[], numberActions: number) => {
  const rowsLoading = [];
  for (let rows = 0; rows < 3; rows++) {
    rowsLoading.push(
      <StyledTr key={rows}>
        {titleColumns.map((title) => (
          <StyledTd key={`e-${title.id}`}>
            <SkeletonLine animated />
          </StyledTd>
        ))}
        {actionsLoading(numberActions)}
      </StyledTr>,
    );
  }
  return rowsLoading;
};

const ActionsIcon = (props: IActionsComponent) => {
  const { actionMobile, entry, isTablet } = props;

  return (
    <>
      {isTablet &&
        actionMobile?.map((action, index) => (
          <StyledDivactions
            key={action.id}
            $isTablet={isTablet}
            $isFirst={index === 0}
          >
            {action.content(entry)}
          </StyledDivactions>
        ))}
    </>
  );
};

const Actions = (props: IActionsComponent) => {
  const { actions, isTablet, entry, actionMobile } = props;

  return (
    <>
      {!isTablet &&
        actions.map((action) => (
          <StyledTdactions key={action.id}>
            {action.content(entry)}
          </StyledTdactions>
        ))}
      {isTablet &&
        actionMobile?.map((action, index) => (
          <StyledTdactions
            key={action.id}
            $isTablet={isTablet}
            $isFirst={index === 0}
          >
            {action.content(entry)}
          </StyledTdactions>
        ))}
    </>
  );
};

interface ITableBoardUIProps extends ITableBoardProps {
  loading: boolean;
  isTablet: boolean;
  showTagsInMobile?: boolean;
}

export const TableBoardUI = (props: ITableBoardUIProps) => {
  const {
    id,
    entries,
    actions,
    titles,
    borderTable,
    loading,
    appearanceTable,
    isTablet,
    actionMobile,
    actionMobileIcon,
    isFirstTable,
    showTagsInMobile = false,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const shouldShowTitle = (title: ITitle) => {
    if (title.id === "tag" && isTablet && !showTagsInMobile) {
      return false;
    }
    return true;
  };

  return (
    <StyledContainer
      id={id}
      $borderTable={borderTable!}
      $isTablet={isTablet}
      $actionsMobile={Boolean(actionMobile)}
    >
      <StyledTable
        $zebraEffect={appearanceTable!.efectzebra!}
        $background={appearanceTable!.background!}
        $isTablet={isTablet}
      >
        <StyledThead>
          <tr>
            {titles.filter(shouldShowTitle).map((title) => (
              <StyledTh key={title.id + id}>
                <Text
                  appearance={appearanceTable!.title}
                  type="title"
                  size="medium"
                  padding={isTablet ? "0px" : "0px 4px"}
                >
                  {title.titleName}
                </Text>
              </StyledTh>
            ))}

            {actions && actionMobile && (
              <RenderActionsTitles
                actions={actions}
                appearance={appearanceTable!.title!}
                isTablet={isTablet}
                isStyleMobile={appearanceTable!.isStyleMobile!}
                onInfoClick={() => setIsModalOpen(true)}
                isFirstTable={isFirstTable ?? false}
              />
            )}
          </tr>
        </StyledThead>
        <StyledTbody>
          {loading ? (
            dataLoading(titles, actions?.length ?? 0)
          ) : (
            <>
              {entries.map((entry, index) => (
                <StyledTr
                  key={`${entry.id}-${index}`}
                  $borderTable={appearanceTable!.borderTable}
                >
                  {titles.filter(shouldShowTitle).map((title) => (
                    <StyledTd
                      key={title.id}
                      $widthTd={appearanceTable?.widthTd}
                    >
                      <Stack gap={spacing.s075}>
                        {actionMobileIcon && (
                          <ActionsIcon
                            actionMobile={actionMobileIcon}
                            entry={entry}
                            isTablet={isTablet}
                            actions={[]}
                          />
                        )}
                        {typeof entry[title.id] !== "string" ? (
                          entry[title.id]
                        ) : (
                          <Text
                            size="medium"
                            padding={isTablet ? "0px" : "0px 4px"}
                          >
                            {entry[title.id]}
                          </Text>
                        )}
                      </Stack>
                    </StyledTd>
                  ))}
                  {isTablet &&
                    appearanceTable!.isStyleMobile &&
                    isFirstTable && <StyledTdactions $isTablet={isTablet} />}
                  {actions && (
                    <Actions
                      actions={actions}
                      isTablet={isTablet}
                      entry={entry}
                      actionMobile={actionMobile}
                    />
                  )}
                </StyledTr>
              ))}
            </>
          )}
        </StyledTbody>
      </StyledTable>
      {isModalOpen && (
        <ActionModal
          onClose={() => setIsModalOpen(false)}
          disableDeleteAction={true}
        />
      )}
    </StyledContainer>
  );
};
