import { get } from 'axios'

export const getData = (name, type) => get(`/api/${name}/${type}`)

export const getRandom = () => get('/api/random')
