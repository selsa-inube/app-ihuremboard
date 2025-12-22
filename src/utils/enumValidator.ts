import { labels } from "@i18n/labels";

export function getValidEnumValue<T extends Record<string, string>>(
  enumObj: T,
  value: unknown,
  fallback?: string,
): T[keyof T] | string {
  if (typeof value !== "string")
    return fallback ?? labels.utils.date.unknownType;

  const normalizedValue = value.trim().toLowerCase();

  const match = Object.values(enumObj).find(
    (enumValue) => enumValue.toLowerCase() === normalizedValue,
  );

  return match ?? value;
}
