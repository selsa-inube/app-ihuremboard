import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUseCasesByStaff } from "@services/StaffUser/staffPortalBusiness";
import { getOptionForCustomerPortal } from "@services/staffPortal/getOptionForCustomerPortal";
import { useAppContext } from "@context/AppContext";

export interface IBusinessUnitFixed {
  businessUnitPublicCode: string;
  descriptionUse: string;
  abbreviatedName: string;
  urlLogo: string;
}

export const useHome = () => {
  const {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    setSelectedClient,
    optionForCustomerPortal,
    setOptionForCustomerPortal,
    provisionedPortal,
  } = useAppContext();

  const navigate = useNavigate();

  const [collapse, setCollapse] = useState(false);
  const collapseMenuRef = useRef<HTMLDivElement>(null);
  const businessUnitChangeRef = useRef<HTMLDivElement>(null);

  const [localModalVisible, setLocalModalVisible] = useState(false);
  const [, setClientWithoutPrivileges] = useState<IBusinessUnitFixed | null>(
    null,
  );

  const [validateTrigger, setValidateTrigger] = useState(!!selectedClient);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      if (!selectedClient) {
        return;
      }

      if (
        user?.id &&
        (!optionForCustomerPortal || optionForCustomerPortal.length === 0)
      ) {
        try {
          setLoading(true);
          const staffPortalPublicCode = provisionedPortal?.publicCode ?? "";
          const businessUnitPublicCode = selectedClient.id;
          const options = await getOptionForCustomerPortal(
            staffPortalPublicCode,
            businessUnitPublicCode,
          );

          setOptionForCustomerPortal(options);
        } catch (error) {
          console.error("Error obteniendo opciones:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOptions();
  }, [
    user,
    optionForCustomerPortal,
    setOptionForCustomerPortal,
    provisionedPortal,
    selectedClient,
  ]);

  useEffect(() => {
    if (!selectedClient) {
      navigate("/login", { replace: true });
    }
  }, [selectedClient, navigate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        collapseMenuRef.current &&
        !collapseMenuRef.current.contains(event.target as Node) &&
        businessUnitChangeRef.current &&
        !businessUnitChangeRef.current.contains(event.target as Node)
      ) {
        setCollapse(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (validateTrigger) {
      const timeout = setTimeout(() => setValidateTrigger(false), 100);
      return () => clearTimeout(timeout);
    }
  }, [validateTrigger]);

  const handleLogoClick = async (businessUnit: IBusinessUnitFixed) => {
    if (!businessUnit.businessUnitPublicCode) {
      setClientWithoutPrivileges(businessUnit);
      setLocalModalVisible(true);
      return;
    }

    try {
      setLoading(true);
      const staffPortalPublicCode = provisionedPortal?.publicCode ?? "";
      const businessUnitPublicCode = businessUnit.businessUnitPublicCode;
      const useCases = await getUseCasesByStaff(
        user?.id ?? "",
        staffPortalPublicCode,
        businessUnitPublicCode,
      );

      const roles = useCases.listOfUseCasesByRoles ?? [];
      const hasAccess = roles.includes("PortalBoardAccess");

      if (hasAccess) {
        setSelectedClient({
          id: businessUnit.businessUnitPublicCode,
          name: businessUnit.descriptionUse,
          sigla: businessUnit.abbreviatedName,
          logo: businessUnit.urlLogo,
        });

        setValidateTrigger(true);
        setCollapse(false);
        navigate("/");
      } else {
        setClientWithoutPrivileges(businessUnit);
        setLocalModalVisible(true);
      }
    } catch (error) {
      console.error("Error al obtener privilegios del portal:", error);
      setClientWithoutPrivileges(businessUnit);
      setLocalModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const showBusinessUnitSelector = businessUnits.length > 1;

  return {
    user,
    logoUrl,
    selectedClient,
    businessUnits,
    optionForCustomerPortal,
    collapse,
    collapseMenuRef,
    businessUnitChangeRef,
    localModalVisible,
    setLocalModalVisible,
    validateTrigger,
    loading,
    showBusinessUnitSelector,
    setCollapse,
    handleLogoClick,
  };
};
