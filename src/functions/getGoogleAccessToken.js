import axios from 'axios'

const getGoogleAccessToken = async () => {
    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET
    const refreshToken = process.env.REFRESH_TOKEN

    try {
        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            `client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )

        return response.data.access_token
    } catch (error) {
        throw error.response.data;
    }

}

export default getGoogleAccessToken