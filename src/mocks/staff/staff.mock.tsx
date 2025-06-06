import { IOption } from "@inubekit/inubekit";

const mockStaffMembers: IOption[] = [
  {
    id: "1",
    label: "Juan Pérez",
    value: "1",
  },
  {
    id: "2",
    label: "María González",
    value: "2",
  },
  {
    id: "3",
    label: "Carlos Rodríguez",
    value: "3",
  },
  {
    id: "4",
    label: "Ana Martínez",
    value: "4",
  },
  {
    id: "5",
    label: "Luis Sánchez",
    value: "5",
  },
];

const businessUnitStaff = [
  {
    businessUnitPublicCode: "860514047",
    languageId: "1111",
    abbreviatedName: "SistemasEnLinea",
    descriptionUse: "SistemasEnLinea",
    firstMonthOfFiscalYear: "JAN",
    urlLogo: "http://www.sistemasenlinea.com.co/images/logos/selsalogo2.png",
  },
  {
    businessUnitPublicCode: "cooptraisspru",
    languageId: "1111",
    abbreviatedName: "cooptraisspru",
    descriptionUse: "cooptraisspru",
    firstMonthOfFiscalYear: "JAN",
    urlLogo: "http://www.sistemasenlinea.com.co/images/nuevo-logo-linix.png",
  },
  {
    businessUnitPublicCode: "test",
    languageId: "1111",
    abbreviatedName: "test",
    descriptionUse: "test ",
    firstMonthOfFiscalYear: "JAN",
    urlLogo: "http://logo.png",
  },
  {
    businessUnitPublicCode: "test2",
    languageId: "1111",
    abbreviatedName: "test2",
    descriptionUse: "test2",
    firstMonthOfFiscalYear: "JAN",
    urlLogo: "http://logo.png",
  },
];

const dataStaff = {
  staffId: "11e07ee6-8506-4743-878d-926d6cab0525",
  staffName: "Angie Pinilla",
  biologicalSex: "Female",
  identificationTypeNaturalPerson: "DNI",
  identificationDocumentNumber: "angiepinillanova@gma",
  birthDay: "1993-02-26T00:00:00Z",
  principalEmail: "angiepinillanova@gmail.com",
  principalPhone: "3144081029",
  businessManagerCode: "SistemasEnlinea",
  businessManagerName: "SistemasEnlinea",
  missionName: "cargouno",
  staffByBusinessUnitAndRole: [
    {
      staffId: "11e07ee6-8506-4743-878d-926d6cab0525",
      roleName: "Administrador",
      businessUnitCode: "test",
      BusinessUnitName: "test",
    },
  ],
};

const optionMenuStaff = [
  {
    staffPortalId: "49ff6546-ab8b-488f-9df4-3a4879a03cdb",
    publicCode: "PortalIhuremBoard",
    abbreviatedName: "Portal ERM Gestion humanas",
    descriptionUse: "A traves de este portal se gestionan los empleados",
    businessManagerId: "598a8ec2-8725-48ac-b592-b23cdd54ec30",
    staffPortalCatalogId: "d70c5ddc-02c1-443d-970b-e3913ffe6458",
    url: "https://images.jpg",
    optionsByStaffPortalBusinessManager: [
      {
        staffPortalId: "49ff6546-ab8b-488f-9df4-3a4879a03cdb",
        optionStaffId: "5dcf4327-88e2-4053-bd1a-acaa3f41672c",
        staffPortalCatalogId: "d70c5ddc-02c1-443d-970b-e3913ffe6458",
      },
      {
        staffPortalId: "49ff6546-ab8b-488f-9df4-3a4879a03cdb",
        optionStaffId: "08489ba9-2484-4549-ab52-f0f11a4b7ccd",
        staffPortalCatalogId: "d70c5ddc-02c1-443d-970b-e3913ffe6458",
      },
      {
        staffPortalId: "49ff6546-ab8b-488f-9df4-3a4879a03cdb",
        optionStaffId: "ca9d5183-7249-4374-ae49-c5424eabaf58",
        staffPortalCatalogId: "d70c5ddc-02c1-443d-970b-e3913ffe6458",
      },
      {
        staffPortalId: "49ff6546-ab8b-488f-9df4-3a4879a03cdb",
        optionStaffId: "002e13ba-37cf-4ec9-ac2b-1f2d7cf89b6b",
        staffPortalCatalogId: "d70c5ddc-02c1-443d-970b-e3913ffe6458",
      },
      {
        staffPortalId: "49ff6546-ab8b-488f-9df4-3a4879a03cdb",
        optionStaffId: "4deb1d13-7433-4ba4-b958-a9de025a5b50",
        staffPortalCatalogId: "d70c5ddc-02c1-443d-970b-e3913ffe6458",
      },
      {
        staffPortalId: "49ff6546-ab8b-488f-9df4-3a4879a03cdb",
        optionStaffId: "235126e1-7c13-4ce5-abba-a63e4e14abb6",
        staffPortalCatalogId: "d70c5ddc-02c1-443d-970b-e3913ffe6458",
      },
      {
        staffPortalId: "49ff6546-ab8b-488f-9df4-3a4879a03cdb",
        optionStaffId: "2573cf2a-0b0d-4558-a275-dd5eed87c0e5",
        staffPortalCatalogId: "d70c5ddc-02c1-443d-970b-e3913ffe6458",
      },
    ],
  },
];

const optionDescriptionStaff = [
  {
    optionStaffId: "08489ba9-2484-4549-ab52-f0f11a4b7ccd",
    publicCode: "incapacidadesPortalErm",
    abbreviatedName: "Incapacidades",
    descriptionUse: "Incapacidades",
  },
  {
    optionStaffId: "ca9d5183-7249-4374-ae49-c5424eabaf58",
    publicCode: "ausenciasPortalErm",
    abbreviatedName: "Ausencias",
    descriptionUse: "Ausencias",
  },
  {
    optionStaffId: "002e13ba-37cf-4ec9-ac2b-1f2d7cf89b6b",
    publicCode: "certificacionPortalErm",
    abbreviatedName: "Certificación",
    descriptionUse: "Certificación",
  },
  {
    optionStaffId: "4deb1d13-7433-4ba4-b958-a9de025a5b50",
    publicCode: "contratoPortalErm",
    abbreviatedName: "Contratos",
    descriptionUse: "Contratos",
  },
  {
    optionStaffId: "235126e1-7c13-4ce5-abba-a63e4e14abb6",
    publicCode: "cargoPortalErm",
    abbreviatedName: "Cargos",
    descriptionUse: "Cargos",
  },
  {
    optionStaffId: "2573cf2a-0b0d-4558-a275-dd5eed87c0e5",
    publicCode: "solTramitePortalErm",
    abbreviatedName: "Solicitudes en Trámite",
    descriptionUse: "Solicitudes en Trámite",
  },
  {
    optionStaffId: "5dcf4327-88e2-4053-bd1a-acaa3f41672c",
    publicCode: "vacacionesPortalErm",
    abbreviatedName: "Vacaciones",
    descriptionUse: "Vacaciones",
  },
];

export {
  mockStaffMembers,
  businessUnitStaff,
  dataStaff,
  optionMenuStaff,
  optionDescriptionStaff,
};
