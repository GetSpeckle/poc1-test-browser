const passwordRules = (password, password2) => {
  const passRules = [
    () => !!password || 'Password is required',
    () => password ? password.length >= 8 : null || 'At least 8 characters'
  ]

  if (password2 !== null) {
    passRules.push(() => password === password2 || 'Password not matching')
  }

  return passRules
}

const requiredField = (message) => [
  v => !!v || message
]

const maxCharCount = (v, s) => [
  (v) => v ? v.length <= s || `Max ${s} characters` : ''
]

export {
  passwordRules,
  requiredField,
  maxCharCount
}
