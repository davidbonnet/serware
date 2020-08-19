export function setSessionValue(request, name, value) {
  if (!request.session) {
    request.session = {}
  }
  if (request.session[name] === value) {
    return value
  }
  request.session = { ...request.session, [name]: value }
  return value
}
