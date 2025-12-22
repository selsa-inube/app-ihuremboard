import { useState } from "react";
import { createPortal } from "react-dom";
import { MdClear, MdApps, MdOutlineFilterAlt } from "react-icons/md";
import {
  Icon,
  Stack,
  Text,
  useMediaQuery,
  Blanket,
  Divider,
  Button,
  Checkpicker,
  IOption,
} from "@inubekit/inubekit";
import { useFormik } from "formik";
import * as Yup from "yup";

import { labels } from "@i18n/labels";
import { Logger } from "@utils/logger";
import { spacing } from "@design/tokens/spacing";
import { validationMessages } from "@validations/validationMessages";
import { SelectedFilters } from "@components/cards/SelectedFilters";

import { StyledModal, StyledContainerClose } from "./styles";
import { FormValues } from "./types";

export interface SelectedFilter extends IOption {
  count: number;
}

export interface FilterRequestModalProps {
  portalId?: string;
  assignmentOptions?: IOption[];
  statusOptions?: IOption[];
  selectedFilters?: SelectedFilter[];
  onCloseModal?: () => void;
  onSubmit?: (values: object) => void;
  onClearFilters?: () => void;
  onRemoveFilter?: (filterValue: string) => void;
}

export function FilterRequestModal(props: FilterRequestModalProps) {
  const {
    portalId = "portal",
    assignmentOptions = [],
    statusOptions = [],
    selectedFilters = [],
    onCloseModal,
    onSubmit,
    onClearFilters,
    onRemoveFilter,
  } = props;

  const isMobile = useMediaQuery("(max-width: 1280px)");
  const portalNode = document.getElementById(portalId);

  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    assignment: Yup.string().required(validationMessages.required),
    status: Yup.string().required(validationMessages.required),
    value: Yup.number()
      .required(validationMessages.required)
      .min(1, "El valor debe ser mayor a 0"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      assignment: "",
      status: "",
    },
    validationSchema,
    onSubmit: () => {
      Logger.debug("FilterRequestModal form submitted");
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      if (onSubmit) {
        onSubmit(formik.values);
      }
      setLoading(false);
    }, 800);
  };

  const sortedAssignmentOptions = [...assignmentOptions].sort((a, b) =>
    a.label.localeCompare(b.label),
  );
  const sortedStatusOptions = [...statusOptions].sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  if (!portalNode) {
    throw new Error(labels.modal.requestDetail.errorPortalNode);
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {labels.modal.filterRequest.title}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>{labels.modal.filterRequest.close}</Text>
              <Icon
                icon={<MdClear />}
                size="24px"
                cursorHover
                appearance="dark"
              />
            </Stack>
          </StyledContainerClose>
        </Stack>
        <Divider />
        {isMobile && (
          <>
            <Stack alignItems="center" gap={spacing.s100}>
              <Icon
                icon={<MdOutlineFilterAlt />}
                size="20px"
                appearance="gray"
              />
              <SelectedFilters
                filters={selectedFilters.map((filter) => ({
                  id: filter.id,
                  label: filter.label,
                  type: statusOptions.some(
                    (status) => status.value === filter.value,
                  )
                    ? "status"
                    : "assignment",
                  count: filter.count,
                }))}
                onRemove={onRemoveFilter}
              />
            </Stack>
            <Divider dashed />
          </>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" gap={spacing.s250}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Stack
                margin={`${spacing.s250} ${spacing.s0} ${spacing.s0} ${spacing.s0}`}
              >
                <Icon
                  icon={<MdApps />}
                  size="20px"
                  appearance={formik.values.assignment ? "primary" : "gray"}
                />
              </Stack>
              <Checkpicker
                label={labels.modal.filterRequest.typeLabel}
                placeholder={labels.modal.filterRequest.placeholderOption}
                name="assignment"
                id="assignment"
                values={formik.values.assignment}
                message={
                  formik.touched.assignment
                    ? formik.errors.assignment
                    : undefined
                }
                size="compact"
                fullwidth
                onChange={(name, value) => {
                  void formik.setFieldValue(name, value);
                }}
                options={sortedAssignmentOptions}
              />
            </Stack>

            <Stack alignItems="center" gap={spacing.s100}>
              <Stack
                margin={`${spacing.s250} ${spacing.s0} ${spacing.s0} ${spacing.s0}`}
              >
                <Icon
                  icon={<MdApps />}
                  size="20px"
                  appearance={formik.values.status ? "primary" : "gray"}
                />
              </Stack>
              <Checkpicker
                label={labels.modal.filterRequest.statusLabel}
                placeholder={labels.modal.filterRequest.placeholderOption}
                name="status"
                id="status"
                values={formik.values.status}
                message={
                  formik.touched.status ? formik.errors.status : undefined
                }
                size="compact"
                fullwidth
                onChange={(name, value) => {
                  void formik.setFieldValue(name, value);
                }}
                options={sortedStatusOptions}
              />
            </Stack>

            <Stack justifyContent="flex-end" gap={spacing.s250}>
              <Button
                onClick={isMobile ? onClearFilters : onCloseModal}
                appearance="gray"
                variant="outlined"
              >
                {isMobile
                  ? labels.modal.filterRequest.clearMobile
                  : labels.modal.filterRequest.cancelDesktop}
              </Button>
              <Button onClick={handleSubmit} loading={loading}>
                {labels.modal.filterRequest.submit}
              </Button>
            </Stack>
          </Stack>
        </form>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
