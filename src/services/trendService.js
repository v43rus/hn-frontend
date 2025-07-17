import apiClient from './apiClient'

export const fetchPopularTags = async (period = '1d') => {
  const response = await apiClient.get(`/tags/popular/${period}`)
  return response.data
}

export const fetchTagHistory = async (tag) => {
  const response = await apiClient.get(`/tags/history/${encodeURIComponent(tag)}`)
  return response.data
}

export const fetchTopPostsByTagAndPeriod = async (tag, period = '7d', page = 1, perPage = 9) => {
  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
  })
  const response = await apiClient.get(`/posts/top/${tag}/${period}?${params}`)
  return response.data
}
