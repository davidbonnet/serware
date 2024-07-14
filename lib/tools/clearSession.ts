export function clearSession(request) {
  request.session = null;
  return request;
}
