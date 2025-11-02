import axios from "axios";

export function useAppHooks() {
  const reqApiGetOne = async ({
    id,
    setResponse,
  }: {
    id: any;
    setResponse?: any;
  }) => {
    try {
      const response = await axios.get(`/api/widgets/${id}`);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { reqApiGetOne };
}
