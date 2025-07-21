import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import selsaLogo from "@assets/images/selsa.png";
import {
  IStaffPortalByBusinessManager,
  IOptionWithSubOptions,
  IStaffUserAccount,
  IUseCasesByRole,
} from "@ptypes/staffPortalBusiness.types";
import {
  IBusinessManager,
  IBusinessUnit,
} from "@ptypes/employeePortalBusiness.types";
import { Employee } from "@ptypes/employeePortalConsultation.types";
import {
  IAppContextType,
  IPreferences,
  IClient,
  IUser,
  BusinessManager,
} from "./types";

const AppContext = createContext<IAppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
  businessManagersData: IBusinessManager;
  dataPortal: IStaffPortalByBusinessManager;
  businessUnitsData: IBusinessUnit[];
}

function AppProvider(props: AppProviderProps) {
  const { children, dataPortal, businessManagersData, businessUnitsData } =
    props;
  const { user: auth0User } = useAuth0();

  const [user, setUser] = useState<IUser | null>(
    auth0User
      ? {
          username: auth0User.name ?? "",
          id: "1234567890",
          company: "Company Name",
          urlImgPerfil: auth0User.picture ?? "",
        }
      : null,
  );

  const initialLogo = localStorage.getItem("logoUrl") ?? selsaLogo;
  const [logoUrl, setLogoUrl] = useState<string>(initialLogo);

  const [preferences, setPreferences] = useState<IPreferences>({
    boardOrientation:
      (localStorage.getItem("boardOrientation") as "vertical" | "horizontal") ??
      "vertical",
    showPinnedOnly: false,
  });

  const [staffUser, setStaffUser] = useState<IStaffUserAccount>(() => {
    const stored = localStorage.getItem("staffUser");
    return stored ? JSON.parse(stored) : ({} as IStaffUserAccount);
  });

  useEffect(() => {
    if (staffUser && Object.keys(staffUser).length > 0) {
      localStorage.setItem("staffUser", JSON.stringify(staffUser));
    } else {
      localStorage.removeItem("staffUser");
    }
  }, [staffUser]);

  const [useCasesByRole, setUseCasesByRole] = useState<IUseCasesByRole[]>(
    () => {
      const stored = localStorage.getItem("useCasesByRole");
      return stored ? JSON.parse(stored) : [];
    },
  );

  useEffect(() => {
    if (useCasesByRole && useCasesByRole.length > 0) {
      localStorage.setItem("useCasesByRole", JSON.stringify(useCasesByRole));
    } else {
      localStorage.removeItem("useCasesByRole");
    }
  }, [useCasesByRole]);

  const [provisionedPortal, setProvisionedPortal] =
    useState<IStaffPortalByBusinessManager>(dataPortal);

  const [businessManagers, setBusinessManagers] =
    useState<BusinessManager | null>(businessManagersData);

  const [businessUnits, setBusinessUnits] =
    useState<IBusinessUnit[]>(businessUnitsData);
  const [businessUnitsIsFetching, setBusinessUnitsIsFetching] =
    useState<boolean>(false);

  const [optionForCustomerPortal, setOptionForCustomerPortal] = useState<
    IOptionWithSubOptions[] | null
  >(() => {
    const stored = localStorage.getItem("optionForCustomerPortal");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (optionForCustomerPortal) {
      localStorage.setItem(
        "optionForCustomerPortal",
        JSON.stringify(optionForCustomerPortal),
      );
    } else {
      localStorage.removeItem("optionForCustomerPortal");
    }
  }, [optionForCustomerPortal]);

  const [selectedClient, setSelectedClient] = useState<IClient | null>(() => {
    const stored = localStorage.getItem("selectedClient");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (selectedClient) {
      localStorage.setItem("selectedClient", JSON.stringify(selectedClient));
    } else {
      localStorage.removeItem("selectedClient");
    }
  }, [selectedClient]);

  const handleClientChange = (client: IClient) => {
    setSelectedClient(client);
  };

  const updatePreferences = (newPreferences: Partial<IPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("logoUrl", logoUrl);
      localStorage.setItem("boardOrientation", preferences.boardOrientation);
    }
  }, [logoUrl, preferences, user]);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(() => {
    const stored = localStorage.getItem("selectedEmployee");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (selectedEmployee) {
      localStorage.setItem(
        "selectedEmployee",
        JSON.stringify(selectedEmployee),
      );
    } else {
      localStorage.removeItem("selectedEmployee");
    }
  }, [selectedEmployee]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        preferences,
        updatePreferences,
        logoUrl,
        setLogoUrl,
        handleClientChange,
        provisionedPortal,
        setProvisionedPortal,
        staffUser,
        setStaffUser,
        businessManagers,
        setBusinessManagers,
        businessUnits,
        setBusinessUnits,
        businessUnitsIsFetching,
        setBusinessUnitsIsFetching,
        selectedClient,
        setSelectedClient,
        selectedEmployee,
        setSelectedEmployee,
        optionForCustomerPortal,
        setOptionForCustomerPortal,
        useCasesByRole,
        setUseCasesByRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, AppContext, useAppContext };
