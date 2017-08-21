import jwt_decode from 'jwt-decode'

// Helper function to decode tokens from API authentication
// TODO: Validate issuer, expiration time, etc

export function ValidateToken(token) {
  try {
    let decoded = jwt_decode(token)
    return decoded._doc
  } catch (err) {
    console.error('Error decoding token...', err)
    return false
  }
}

export function RemoveToken() {
  window.localStorage.removeItem('API_TOKEN')
}
