export const getData = async (name, type) => {
  const res = await window.fetch(`/api/${name}/${type}`)
  return await res.json()
}

export const getRandom = async () => {
  const res = await window.fetch('/api/random')
  return await res.json()
}
