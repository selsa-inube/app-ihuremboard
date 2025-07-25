import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@context/AppContext/useAppContext";
import { IBusinessUnit } from "@ptypes/employeePortalBusiness.types";
import { InfoModal } from "@components/modals/InfoModal";
import { useUseCasesByStaff } from "@hooks/useUseCasesByStaff";

import { ClientsUI } from "./interface";
import { IClientLocal } from "./types";
import { IClient } from "./types";

export interface ClientsProps {
  businessUnits?: IBusinessUnit[];
  handleClientChange?: (client: IClient) => void;
}

const ClientsWithProps = (props: ClientsProps) => {
  const navigate = useNavigate();

  const clients: IClient[] = (props.businessUnits ?? []).map((unit) => ({
    id: unit.businessUnitPublicCode,
    name: unit.businessUnitPublicCode,
    sigla: unit.abbreviatedName,
    logo: unit.urlLogo,
  }));

  const [clientLocal, setClientLocal] = useState<IClientLocal>({
    ref: null,
    value: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientLocal({ ref: event.target, value: false });
    const selectedClient = clients.find(
      (client) => client.name === event.target.value,
    );

    if (selectedClient && props.handleClientChange) {
      props.handleClientChange(selectedClient);
    }
  };

  const handleSubmit = () => {
    navigate("/login/loading-app");
  };

  return (
    <ClientsUI
      clients={clients}
      client={clientLocal}
      handleClientChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

const ClientsWithContext = () => {
  const context = useAppContext();
  const navigate = useNavigate();

  const clients: IClient[] = (context.businessUnits ?? []).map((unit) => ({
    id: unit.businessUnitPublicCode,
    name: unit.businessUnitPublicCode,
    sigla: unit.abbreviatedName,
    logo: unit.urlLogo,
  }));

  const [clientLocal, setClientLocal] = useState<IClientLocal>({
    ref: null,
    value: true,
  });

  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { useCases, loading } = useUseCasesByStaff({
    userName: context.user?.id ?? "",
    businessUnitCode: selectedClient?.name ?? "",
    businessManagerCode: context.businessManagers?.publicCode ?? "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClientLocal({ ref: event.target, value: false });
    const client = clients.find((c) => c.name === event.target.value);

    if (client && context.handleClientChange) {
      context.handleClientChange(client);
      setSelectedClient(client);
    }
  };

  const handleSubmit = () => {
    if (!selectedClient || loading) return;

    const roles = useCases?.listOfUseCasesByRoles ?? [];
    const hasAccess = roles.includes("PortalBoardAccess");

    if (hasAccess) {
      navigate("/login/loading-app");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClient(null);
  };

  return (
    <>
      <ClientsUI
        clients={clients}
        client={clientLocal}
        handleClientChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {showModal && (
        <InfoModal
          title="Acceso no autorizado"
          titleDescription="No tienes privilegios en esta unidad de negocio"
          description="Por favor selecciona otra unidad "
          buttonText="Cerrar"
          onCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

function Clients(props: ClientsProps) {
  if (props.businessUnits && props.handleClientChange) {
    return (
      <ClientsWithProps
        businessUnits={props.businessUnits}
        handleClientChange={props.handleClientChange}
      />
    );
  }

  return <ClientsWithContext />;
}

export { Clients };
