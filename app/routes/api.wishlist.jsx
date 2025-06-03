
import {data} from '@remix-run/node'
export async function loader() {
    return data({
        ok: true,
        message: "Hello from the API"
    })
}

