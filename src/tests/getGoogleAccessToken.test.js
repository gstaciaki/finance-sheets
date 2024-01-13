import getGoogleAccessToken from "../functions/getGoogleAccessToken";

test('request to get google access token', async () => {
    try {
        const accessToken = await getGoogleAccessToken();
        expect(accessToken).toBeDefined();
    } catch (error) {
        throw error;
    }
});
