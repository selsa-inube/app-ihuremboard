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
  IOption,
} from "@inubekit/inubekit";
import { useFormik } from "formik";
import * as Yup from "yup";

import { spacing } from "@design/tokens/spacing";
import { validationMessages } from "@validations/validationMessages";
import { labels } from "@i18n/labels";
import { BoxAttribute } from "@components/cards/BoxAttribute";

import { IVacationTrimFormValues } from "./types";
import { StyledModal, StyledContainerClose } from "./styles";

export interface VacationTrimModalProps {
  portalId?: string;
  currentReturnDate: string;
  returnDateOptions: IOption[];
  isLoading?: boolean;
  onCloseModal?: () => void;
  onSubmit?: (values: IVacationTrimFormValues) => void;
}

function VacationTrimModal(props: VacationTrimModalProps) {
  const {
    portalId = "portal",
    currentReturnDate,
    returnDateOptions,
    isLoading = false,
    onCloseModal,
    onSubmit,
  } = props;

  const isTablet = useMediaQuery("(max-width: 1280px)");
  const portalNode = document.getElementById(portalId);

  const validationSchema = Yup.object({
    newReturnDate: Yup.string().required(validationMessages.required),
    justification: Yup.string()
      .required(validationMessages.required)
      .max(400, labels.modal.validation.textarea.maxLength),
  });

  const formik = useFormik<IVacationTrimFormValues>({
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
      <StyledModal $smallScreen={isTablet}>
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
          <Stack direction="column" gap={spacing.s100}>
            <Fieldset
              legend={labels.modal.vacationTrim.originalRequest}
              spacing="compact"
            >
              <Stack width="100%" direction="column">
                <BoxAttribute
                  label={labels.modal.vacationTrim.currentReturnDate}
                  value={currentReturnDate}
                  direction="column"
                />
              </Stack>
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
              size="compact"
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
          </Stack>
        </form>
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
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}

export { VacationTrimModal };
