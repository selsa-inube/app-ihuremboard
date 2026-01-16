export const getPreAuthHeaders = (): Record<string, string> => ({
  "Content-Type": "application/json; charset=UTF-8",
  "X-Business-unit": "test",
  Authorization: "",
});
