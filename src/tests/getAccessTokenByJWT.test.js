import getAccessTokenByJWT from "../functions/getAccessTokenByJWT"

test('expects a access token', async () => {
    const token = await getAccessTokenByJWT()
    expect(token).toBeDefined()
})