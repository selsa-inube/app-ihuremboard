import { useMediaQuery, Text, Stack } from "@inubekit/inubekit";

import { spacing } from "@design/tokens/spacing";

import { TaskCard, TaskCardProps } from "../TaskCard";
import {
  StyledTaskBoardContainer,
  StyledTaskSection,
  StyledTaskHeader,
  StyledTaskContent,
  StyledMobileBoard,
} from "./styles";

export interface TaskBoardProps {
  pendingTasks?: TaskCardProps[];
  completedTasks?: TaskCardProps[];
  isResponsible?: boolean;
}

function TaskBoard(props: TaskBoardProps) {
  const {
    pendingTasks = [],
    completedTasks = [],
    isResponsible = true,
  } = props;
  const isMobile = useMediaQuery("(max-width: 710px)");

  const renderTaskSection = (
    title: string,
    tasks: TaskCardProps[],
    isRightSection = false,
    isMobileView = false,
  ) => {
    return (
      <StyledTaskSection>
        <StyledTaskHeader>
          <Text type="title" weight="bold" size="medium" textAlign="center">
            {title}
          </Text>
        </StyledTaskHeader>
        <StyledTaskContent $isRightSection={!isMobileView && isRightSection}>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                isNotResponsible={!isResponsible}
              />
            ))
          ) : (
            <Stack width={isMobile ? "auto" : "100%"}>
              <Text size="small" appearance="gray">
                {title === "Tareas por hacer"
                  ? "No hay ninguna tarea pendiente por ahora."
                  : "Ninguna tarea está hecha por ahora."}
              </Text>
            </Stack>
          )}
        </StyledTaskContent>
      </StyledTaskSection>
    );
  };

  if (isMobile) {
    return (
      <Stack direction="column" gap={spacing.s300}>
        <StyledMobileBoard>
          {renderTaskSection("Tareas por hacer", pendingTasks, false, true)}
        </StyledMobileBoard>
        <StyledMobileBoard>
          {renderTaskSection("Tareas hechas", completedTasks, false, true)}
        </StyledMobileBoard>
      </Stack>
    );
  }

  return (
    <StyledTaskBoardContainer>
      {renderTaskSection("Tareas por hacer", pendingTasks)}
      {renderTaskSection("Tareas hechas", completedTasks, true)}
    </StyledTaskBoardContainer>
  );
}

export { TaskBoard };
