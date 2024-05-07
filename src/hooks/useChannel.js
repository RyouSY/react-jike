import { useEffect, useState } from 'react'
import { getChannelApi } from '@/api/article'

const useChannels = () => {
  const [channleList, setChannelList] = useState([])
  const fetchChannel = async () => {
    const result = await getChannelApi()
    setChannelList(result.data.data.channels)
  }
  useEffect(() => {
    fetchChannel()
  }, [])

  return {
    channleList
  }
}

export default useChannels