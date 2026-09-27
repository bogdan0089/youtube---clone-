export function parseApiError(error) {
  const data = error.response?.data
  if (!data || typeof data !== 'object') {
    return { message: 'Сервер недоступний. Спробуйте пізніше.', fields: {} }
  }

  const { detail, ...fields } = data
  const fieldErrors = Object.fromEntries(
    Object.entries(fields).map(([field, messages]) => [field, [].concat(messages).join(' ')]),
  )
  return { message: detail ?? null, fields: fieldErrors }
}
