import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

export function createHttpLink(uri: string, token?: null | string) {
  return createUploadLink({
    credentials: 'include',
    headers: {
      ...(token ? { authorization: token } : {}),
    },
    uri,
  })
}
