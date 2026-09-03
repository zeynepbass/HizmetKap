export function toDisplay  (text) {
    if (!text) return "";
    return text
      .replace(/-/g, " ")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };
