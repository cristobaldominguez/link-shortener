function tokenIsExpirated ({ exp: expirationTimeStamp }) {
  const currentTimeStamp = parseInt(Date.now() / 1000)
  return currentTimeStamp > expirationTimeStamp
}

export default tokenIsExpirated
