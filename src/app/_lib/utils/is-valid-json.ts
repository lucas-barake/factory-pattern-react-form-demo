export function isValidJSON(text: string): { success: true; data: unknown } | { success: false; error: string } {
  try {
    const data: unknown = JSON.parse(text);
    return { success: true, data };
  } catch (error) {
    if (error instanceof SyntaxError || error instanceof TypeError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unknown error" };
  }
}
