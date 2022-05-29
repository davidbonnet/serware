import { omit } from "lodash-es";

export function setSessionValue(request, name, value) {
  if (!request.session) {
    request.session = {};
  }
  if (request.session[name] === value) {
    return value;
  }
  if (value === undefined) {
    request.session = omit(request.session, name);
    return;
  }
  request.session = { ...request.session, [name]: value };
  return value;
}
