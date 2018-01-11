export function Post(path, params) {
  return fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
}

export function Get(path, params) {
  path += '?'
  for (let param in params) path += param + '=' + params[param] + '&'
  return fetch(path)
}

export function Put(path, params) {
  return fetch(path, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
}

export function Delete(path) {
  return fetch(path, { method: 'DELETE' })
}