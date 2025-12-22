import {
  Icon,
  Stack,
  Text,
  useMediaQuery,
  Blanket,
  Divider,
  Button,
  Select,
  IOption,
  Toggle,
} from "@inubekit/inubekit";
import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import { labels } from "@i18n/labels";
import { spacing } from "@design/tokens/spacing";
import { validationMessages } from "@validations/validationMessages";
import { IUser } from "@context/AppContext/types";

import { StyledModal, StyledContainerClose } from "./styles";

export interface SelectStaffModalProps {
  title: string;
  portalId?: string;
  loading?: boolean;
  selectionOptions?: IOption[];
  initialSelection?: string;
  selectedEmployee?: IUser;
  onCloseModal?: () => void;
  onSubmit?: (values: { selection: string }) => void;
}

export function SelectStaffModal(props: SelectStaffModalProps) {
  const {
    title = "default title",
    portalId = "portal",
    loading = false,
    selectionOptions = [],
    initialSelection = "",
    selectedEmployee,
    onCloseModal,
    onSubmit,
  } = props;

  const [isToggleActive, setIsToggleActive] = useState(false);
  const [toggleInitiallyDisabled, setToggleInitiallyDisabled] = useState(
    initialSelection === selectedEmployee?.username,
  );
  const isMobile = useMediaQuery("(max-width: 700px)");

  const validationSchema = Yup.object({
    selection: Yup.string().required(validationMessages.required),
  });

  const formik = useFormik({
    initialValues: {
      selection: initialSelection,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => onSubmit?.(values),
  });

  useEffect(() => {
    setIsToggleActive(initialSelection === selectedEmployee?.id);
  }, [initialSelection, selectedEmployee]);

  useEffect(() => {
    if (isToggleActive && selectedEmployee) {
      formik.setFieldValue("selection", `${selectedEmployee.username}`);
    }
  }, [selectedEmployee, isToggleActive]);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleInitiallyDisabled(false);
    const isActive = event.target.checked;
    setIsToggleActive(isActive);

    formik.setFieldValue(
      "selection",
      isActive ? (selectedEmployee?.id ?? "") : "",
    );
  };

  const isButtonDisabled = () => {
    return (
      !formik.values.selection ||
      Object.keys(formik.errors).length > 0 ||
      loading ||
      !formik.dirty
    );
  };

  const portalNode = document.getElementById(portalId);
  if (!portalNode) {
    throw new Error(
      "The portal node is not defined. Ensure the specific node exists in the DOM.",
    );
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small" ellipsis={isMobile}>
            {title}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack
              alignItems="center"
              gap={spacing.s100}
              padding={isMobile ? "0px 0px 0px 10px" : "0px"}
            >
              <Text>{labels.requests.modals.selectStaff.close}</Text>
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

        <form onSubmit={formik.handleSubmit}>
          <Stack
            justifyContent="flex-end"
            gap={spacing.s250}
            direction="column"
          >
            <Select
              placeholder={labels.requests.modals.selectStaff.selectPlaceholder}
              name="selection"
              label={labels.requests.modals.selectStaff.selectLabel}
              id="selection"
              value={formik.values.selection}
              message={
                formik.touched.selection ? formik.errors.selection : undefined
              }
              size="compact"
              fullwidth
              onChange={(name, value) => {
                formik.setFieldValue(name, value);
              }}
              onBlur={formik.handleBlur}
              options={selectionOptions}
            />
            <Stack alignItems="center">
              <Toggle
                checked={isToggleActive}
                onChange={handleToggleChange}
                size={isMobile ? "small" : "large"}
                disabled={toggleInitiallyDisabled}
              />
              <Text
                type="label"
                weight="bold"
                size="medium"
                appearance={toggleInitiallyDisabled ? "gray" : "dark"}
              >
                {labels.requests.modals.selectStaff.assignMe}
              </Text>
            </Stack>

            <Stack justifyContent="flex-end" gap={spacing.s250}>
              <Button
                type="button"
                onClick={onCloseModal}
                appearance="gray"
                variant="outlined"
              >
                {labels.requests.modals.selectStaff.cancel}
              </Button>
              <Button type="submit" disabled={isButtonDisabled()}>
                {labels.requests.modals.selectStaff.save}
              </Button>
            </Stack>
          </Stack>
        </form>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
