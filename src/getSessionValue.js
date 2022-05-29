export function getSessionValue(request, name, defaultValue) {
  if (!request.session) {
    return defaultValue;
  }
  const value = request.session[name];
  return value === undefined ? defaultValue : value;
}
