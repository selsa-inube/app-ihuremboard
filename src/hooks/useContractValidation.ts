import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "@context/AppContext/useAppContext";
import { useEmployee } from "@hooks/useEmployee";
import { useErrorModal } from "@context/ErrorModalContext/ErrorModalContext";
import { modalErrorConfig } from "@config/modalErrorConfig";
import { EmploymentContract } from "@ptypes/employeePortalConsultation.types";
import { EContractStatus } from "@ptypes/employeePortalBusiness.types";

const ERROR_CODE_NO_ACTIVE_CONTRACTS = 1020;

const isContractActive = (status: string, deadline: string): boolean => {
  if (status !== EContractStatus.formalized) return false;
  if (!deadline) return true;
  const currentDate = new Date();
  const endDate = new Date(deadline);
  return endDate > currentDate;
};

const areAllContractsFinalized = (contracts: EmploymentContract[]): boolean => {
  if (!contracts?.length) return true;
  return contracts.every(
    (contract) =>
      contract.contractStatus === EContractStatus.finalized ||
      !isContractActive(contract.contractStatus, contract.deadline),
  );
};

export const useContractValidation = () => {
  const navigate = useNavigate();
  const { selectedEmployee } = useAppContext();
  const { employee } = useEmployee(selectedEmployee.employeeId);
  const { showErrorModal } = useErrorModal();

  const contracts = employee?.employmentContracts ?? [];
  const allContractsFinalized = areAllContractsFinalized(contracts);

  const shouldShowError = contracts.length > 0 && allContractsFinalized;

  useEffect(() => {
    if (shouldShowError) {
      const errorConfig = modalErrorConfig[ERROR_CODE_NO_ACTIVE_CONTRACTS];

      showErrorModal({
        descriptionText: errorConfig.descriptionText,
        solutionText: errorConfig.solutionText,
      });

      const timer = setTimeout(() => {
        navigate("/logout");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [shouldShowError, navigate, showErrorModal]);

  return {
    contracts,
    areAllContractsFinalized: allContractsFinalized,
    shouldShowError,
    isContractActive,
  };
};
