import axios from 'axios'
import jwt from 'jsonwebtoken'
import FormData from 'form-data'
import credentials from '../../tokens.json' assert { type: 'json'}

const getAccessTokenByJWT = async () => {

    const MILLISECONDS = 1000;
    const ONE_HOUR_IN_SECONDS = 3600;
    const currentDateTimestamp = Date.parse(new Date()) / MILLISECONDS;
    const nextHour = currentDateTimestamp + ONE_HOUR_IN_SECONDS;

    const key = credentials.private_key
    const payload = {
        iss: credentials.client_email,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        aud: credentials.token_uri,
        exp: nextHour,
        iat: currentDateTimestamp
    }

    const token = jwt.sign(payload, key, { algorithm: 'RS256' })

    const formData = new FormData()
    formData.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer')
    formData.append('assertion', token)

    try {
        const response = await axios.post(
            credentials.token_uri,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            },
        )

        return response.data.access_token
    } catch (error) {
        throw error
    }
}

export default getAccessTokenByJWT