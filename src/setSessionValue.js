export function setSessionValue(request, name, value) {
  if (!request.session) {
    request.session = {}
  }
  request.session = { ...request.session, [name]: value }
  return request
}
