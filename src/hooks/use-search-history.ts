import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localstorage";
type TSearchHistory = {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchAt: number
}

export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<TSearchHistory[]>("search-history", [])
  const queryClient = new QueryClient()
  // get the available history from local storage
  const historyQuery = useQuery({
    queryKey: ['search-history'],
    queryFn: () => history,
    initialData: history
  })
  const addToHistory = useMutation(
    {
      mutationFn: async (search: Omit<TSearchHistory, "id" | "searchAt">) => {
        const newSearch: TSearchHistory = {
          ...search,
          id: `${search.lat}-${search.lon}-${Date.now()}`,
          searchAt: Date.now()
        }
        //  filter history to rremove  duplicate history
        const filteredHistory = history.filter((item) => !(item.lat == search.lat && item.lon == search.lon))
        // only store 10 history
        const newHistory = [newSearch, ...filteredHistory].slice(0, 10)
        setHistory(newHistory)
        return newHistory
      }, onSuccess: (newHistory) => {
        queryClient.setQueryData(["search-history"], newHistory)
      }

    }
  )
  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return []
    }, onSuccess: () => {
      queryClient.setQueryData(['search-history'], [])
    }
  })
  return {
    history: historyQuery.data,
    addToHistory,
    clearHistory
  }
}