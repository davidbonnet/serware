const { JSON } = global

export function withJson(value, options = null) {
  return {
    ...options,
    headers: {
      ...(options != null && options.headers != null ? options.headers : null),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  }
}
