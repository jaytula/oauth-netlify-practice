import fetch from 'node-fetch'

export const getUser = async (token: string) => {
  const url = `https://api.netlify.com/api/v1/user/`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  
  const data = await response.json()

  if (response.status === 422) {
    throw new Error(`Error ${JSON.stringify(data)}`)
  }

  return data
}

module.exports = {
  getUser: getUser
}
