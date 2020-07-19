import {useState} from 'react'

interface IItems {
  id: number;
  username: string;
  title: string;
  description: string;
  category: string;
  price: number,
  images: string[]
}

export const useItemsPagination = () => {
  const [items, setItems] = useState<IItems[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>()
  const [pageMax, setPageMax] = useState<number>()
  const [notFound, setNotFound] = useState<boolean>(false)
  
  const setFromApi = (responseData: any) => {
    if (responseData.content.length === 0){
      setNotFound(true)
      setLoading(false)
      setItems([])
    }else{
      setNotFound(false)
      setPage(responseData.page)
      setPageMax(responseData.totalPages)
      setItems(responseData.content)
      setLoading(false)
    }
  }
  return {
    items,
    loading,
    page,
    pageMax,
    notFound,
    setFromApi,
    setLoading
  }
}