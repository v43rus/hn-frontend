import apiClient from './apiClient'

export const fetchPopularTags = async (period = '1d') => {
  const response = await apiClient.get(`/tags/popular/${period}`)
  return response.data
}

export const fetchTagHistory = async (tag) => {
  const response = await apiClient.get(`/tags/history/${encodeURIComponent(tag)}`)
  return response.data
}

export const fetchTopPostsByTagAndPeriod = async (tag, period = '7d') => {
  const response = await apiClient.get(`/posts/top/${tag}/${period}`)
  return response.data
}
