import { createPortal } from "react-dom";
import { MdClear } from "react-icons/md";
import {
  Icon,
  Stack,
  Text,
  useMediaQuery,
  Blanket,
  Divider,
  Button,
  Select,
  Textarea,
  Fieldset,
} from "@inubekit/inubekit";
import { useFormik } from "formik";
import * as Yup from "yup";

import { spacing } from "@design/tokens/spacing";
import { validationMessages } from "@validations/validationMessages";
import { labels } from "@i18n/labels";

import { StyledModal, StyledContainerClose, DetailItem } from "./styles";

export interface VacationTrimFormValues {
  newReturnDate: string;
  justification: string;
}

export interface VacationTrimModalProps {
  portalId?: string;
  currentReturnDate: string;
  returnDateOptions: { id: string; label: string; value: string }[];
  isLoading?: boolean;
  onCloseModal?: () => void;
  onSubmit?: (values: VacationTrimFormValues) => void;
}

export function VacationTrimModal(props: VacationTrimModalProps) {
  const {
    portalId = "portal",
    currentReturnDate,
    returnDateOptions,
    isLoading = false,
    onCloseModal,
    onSubmit,
  } = props;

  const isMobile = useMediaQuery("(max-width: 1280px)");
  const portalNode = document.getElementById(portalId);

  const validationSchema = Yup.object({
    newReturnDate: Yup.string().required(validationMessages.required),
    justification: Yup.string()
      .required(validationMessages.required)
      .max(400, labels.modal.validation.textarea.maxLength),
  });

  const formik = useFormik<VacationTrimFormValues>({
    initialValues: {
      newReturnDate: "",
      justification: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (onSubmit) onSubmit(values);
    },
  });

  if (!portalNode) throw new Error(labels.modal.requestDetail.errorPortalNode);

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            {labels.modal.vacationTrim.title}
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>{labels.modal.generic.close}</Text>
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
          <Stack direction="column" gap={spacing.s250}>
            <Fieldset
              legend={labels.modal.vacationTrim.originalRequest}
              spacing="compact"
            >
              <DetailItem>
                <Stack direction="column" gap={spacing.s050}>
                  <Text
                    type="label"
                    size="medium"
                    appearance="gray"
                    weight="bold"
                  >
                    {labels.modal.vacationTrim.currentReturnDate}
                  </Text>
                  <Text size="medium">{currentReturnDate}</Text>
                </Stack>
              </DetailItem>
            </Fieldset>

            <Select
              label={labels.modal.vacationTrim.newReturnDate}
              name="newReturnDate"
              id="newReturnDate"
              placeholder={labels.modal.vacationTrim.placeholder}
              value={formik.values.newReturnDate}
              options={returnDateOptions}
              message={formik.errors.newReturnDate}
              disabled={isLoading}
              size="compact"
              fullwidth
              required
              onBlur={formik.handleBlur}
              onChange={(name: string, value: string) =>
                void formik.setFieldValue(name, value)
              }
            />

            <Textarea
              label={labels.modal.vacationTrim.justification}
              name="justification"
              id="justification"
              placeholder={labels.modal.vacationTrim.justificationPlaceholder}
              value={formik.values.justification}
              maxLength={400}
              size="wide"
              status={
                formik.touched.justification && formik.errors.justification
                  ? "invalid"
                  : "pending"
              }
              message={formik.errors.justification}
              disabled={isLoading}
              fullwidth
              required
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />

            <Stack justifyContent="flex-end" gap={spacing.s150}>
              <Button
                onClick={onCloseModal}
                appearance="gray"
                variant="outlined"
                disabled={isLoading}
              >
                {labels.modal.generic.cancel}
              </Button>
              <Button
                onClick={() => formik.handleSubmit()}
                loading={isLoading}
                disabled={!formik.isValid || !formik.dirty}
              >
                {labels.modal.vacationTrim.submit}
              </Button>
            </Stack>
          </Stack>
        </form>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
