import { useEffect, useState } from "react";
import { getUseCasesByStaff } from "@services/StaffUser/staffPortalBusiness";
import { IUseCasesByRole } from "@ptypes/staffPortalBusiness.types";

interface UseCasesProps {
  userName: string;
  businessManagerCode: string;
  businessUnitCode: string;
  onUseCasesLoaded?: (useCases: IUseCasesByRole) => void;
}

export const useUseCasesByStaff = ({
  userName,
  businessManagerCode,
  businessUnitCode,
  onUseCasesLoaded,
}: UseCasesProps) => {
  const [useCases, setUseCases] = useState<IUseCasesByRole>({
    listOfUseCasesByRoles: [],
  });
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState<number | null>(null);

  useEffect(() => {
    const fetchUseCases = async () => {
      console.log("🔄 [useUseCasesByStaff] Iniciando fetch...");
      console.log("➡️ Parámetros recibidos:", {
        userName,
        businessManagerCode,
        businessUnitCode,
      });

      if (!userName || !businessManagerCode || !businessUnitCode) {
        console.warn(
          "⚠️ [useUseCasesByStaff] Faltan parámetros. No se hará la consulta",
        );
        setHasError(400);
        setUseCases({ listOfUseCasesByRoles: [] });
        setLoading(false);
        return;
      }

      setLoading(true);
      setHasError(null);

      try {
        const data = await getUseCasesByStaff(
          userName,
          businessManagerCode,
          businessUnitCode,
        );

        console.log("✅ [useUseCasesByStaff] Datos recibidos:", data);

        setUseCases(data);

        if (onUseCasesLoaded) {
          console.log(
            "📩 [useUseCasesByStaff] Ejecutando callback onUseCasesLoaded",
          );
          onUseCasesLoaded(data);
        }
      } catch (error) {
        console.error(
          "❌ [useUseCasesByStaff] Error al obtener casos de uso:",
          error,
        );
        setHasError(500);
      } finally {
        setLoading(false);
        console.log("🏁 [useUseCasesByStaff] Estado final:", {
          useCases,
          loading: false,
          hasError,
        });
      }
    };

    fetchUseCases();
  }, [userName, businessManagerCode, businessUnitCode]);

  console.log("📊 [useUseCasesByStaff] Render hook ->", {
    useCases,
    loading,
    hasError,
  });

  return { useCases, loading, hasError };
};
