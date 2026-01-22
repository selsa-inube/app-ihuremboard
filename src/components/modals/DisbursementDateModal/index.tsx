import { createPortal } from "react-dom";
import { MdClear, MdCalendarToday } from "react-icons/md";
import {
  Icon,
  Stack,
  Text,
  useMediaQuery,
  Blanket,
  Divider,
  Button,
  Date as DateField,
} from "@inubekit/inubekit";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Logger } from "@utils/logger";
import { spacing } from "@design/tokens/spacing";
import { validationMessages } from "@validations/validationMessages";

import { StyledModal, StyledContainerClose } from "./styles";

export interface DisbursementDateFormValues {
  disbursementDate: string;
}

export interface DisbursementDateModalProps {
  portalId?: string;
  onCloseModal?: () => void;
  onSubmit?: (disbursementDate: string) => void;
  isLoading?: boolean;
}

export function DisbursementDateModal(props: DisbursementDateModalProps) {
  const {
    portalId = "portal",
    onCloseModal,
    onSubmit,
    isLoading = false,
  } = props;

  const isMobile = useMediaQuery("(max-width: 1280px)");
  const portalNode = document.getElementById(portalId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validationSchema = Yup.object({
    disbursementDate: Yup.date()
      .required(validationMessages.required)
      .min(
        today,
        "La fecha de desembolso no puede ser anterior a la fecha actual",
      )
      .typeError("Debe ingresar una fecha válida"),
  });

  const formik = useFormik<DisbursementDateFormValues>({
    initialValues: {
      disbursementDate: "",
    },
    validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      Logger.debug("DisbursementDateModal form submitted", {
        disbursementDate: values.disbursementDate,
      });

      if (onSubmit) {
        onSubmit(values.disbursementDate);
      }
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  if (!portalNode) {
    throw new Error("Portal node not found");
  }

  return createPortal(
    <Blanket>
      <StyledModal $smallScreen={isMobile}>
        <Stack alignItems="center" justifyContent="space-between">
          <Text type="headline" size="small">
            Fecha de desembolso
          </Text>
          <StyledContainerClose onClick={onCloseModal}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Text>Cerrar</Text>
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

        <Stack
          direction="column"
          gap={spacing.s200}
          margin={`${spacing.s250} ${spacing.s0}`}
        >
          <Text size="medium" appearance="gray">
            Ingrese la fecha programada para el desembolso del pago de
            vacaciones
          </Text>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" gap={spacing.s250}>
            <Stack alignItems="center" gap={spacing.s100}>
              <Stack
                margin={`${spacing.s250} ${spacing.s0} ${spacing.s0} ${spacing.s0}`}
              >
                <Icon
                  icon={<MdCalendarToday />}
                  size="20px"
                  appearance={
                    formik.values.disbursementDate ? "primary" : "gray"
                  }
                />
              </Stack>

              <DateField
                label="Fecha de desembolso"
                name="disbursementDate"
                id="disbursementDate"
                value={formik.values.disbursementDate}
                status={
                  formik.touched.disbursementDate &&
                  formik.errors.disbursementDate
                    ? "invalid"
                    : undefined
                }
                message={formik.errors.disbursementDate}
                disabled={isLoading}
                size="compact"
                fullwidth
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </Stack>

            <Stack justifyContent="flex-end" gap={spacing.s250}>
              <Button
                onClick={onCloseModal}
                appearance="gray"
                variant="outlined"
                disabled={isLoading}
              >
                Cancelar
              </Button>

              <Button
                onClick={handleSubmit}
                loading={isLoading}
                disabled={!formik.isValid || !formik.values.disbursementDate}
              >
                Guardar fecha
              </Button>
            </Stack>
          </Stack>
        </form>
      </StyledModal>
    </Blanket>,
    portalNode,
  );
}
