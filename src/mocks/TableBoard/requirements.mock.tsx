import { Tag, Text } from "@inubekit/inubekit";
import {
  IEntries as ITableEntries,
  ITitle,
} from "@components/data/TableBoard/types";

export const titles: ITitle[] = [
  { id: "requirement", titleName: "Validaciones del sistema", priority: 1 },
  { id: "tag", titleName: "", priority: 2 },
];

export const requirementsMock: ITableEntries[] = [
  {
    id: "1",
    requirement: "Que el asociado sea activo",
    tag: <Tag label="Cumple" appearance="success" displayIcon={false} />,
  },
  {
    id: "2",
    requirement: "Que esté al día con las obligaciones",
    tag: <Tag label="Cumple" appearance="success" displayIcon={false} />,
  },
  {
    id: "3",
    requirement: "Que tenga más de 30 años",
    tag: <Tag label="Sin Evaluar" appearance="warning" displayIcon={false} />,
  },
  {
    id: "subtitle-docs",
    requirement: (
      <Text appearance="primary" size="large" weight="bold">
        Requisitos documentales
      </Text>
    ),
    tag: "",
    isSubTitle: true,
  },
  {
    id: "4",
    requirement: "Imágenes de la Cédula de ciudadanía",
    tag: <Tag label="Cumple" appearance="success" displayIcon={false} />,
  },
  {
    id: "5",
    requirement: "Desprendible de pago",
    tag: <Tag label="Sin Evaluar" appearance="warning" displayIcon={false} />,
  },
  {
    id: "6",
    requirement: "Declaración de renta",
    tag: <Tag label="Sin Evaluar" appearance="warning" displayIcon={false} />,
  },
  {
    id: "subtitle-docs 2",
    requirement: (
      <Text appearance="primary" size="large" weight="bold">
        Requisitos por cumplir
      </Text>
    ),
    tag: "",
    isSubTitle: true,
  },
  {
    id: "4",
    requirement: "Imágenes de la Cédula de ciudadanía",
    tag: <Tag label="Cumple" appearance="success" displayIcon={false} />,
  },
  {
    id: "5",
    requirement: "Desprendible de pago",
    tag: <Tag label="Sin Evaluar" appearance="warning" displayIcon={false} />,
  },
  {
    id: "6",
    requirement: "Declaración de renta",
    tag: <Tag label="Sin Evaluar" appearance="warning" displayIcon={false} />,
  },
];
