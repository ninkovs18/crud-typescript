const apiRequest = async (
  url: string = "",
  options: RequestInit | undefined = undefined,
  errorMsg: string | null = null
): Promise<string | null> => {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Please reload the app");
  } catch (error) {
    errorMsg = (error as Error).message;
  } finally {
    return errorMsg;
  }
};

export default apiRequest;
