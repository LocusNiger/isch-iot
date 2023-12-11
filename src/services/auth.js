import axios from "axios"

export const Login = async (username, password) => {
  const authUrl = "https://iot3.ischdesign.com:8181/api/auth/signin"
  try {
    const response = await axios.post(authUrl, {
      username,
      password,
    })
    if (response.data) return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}
