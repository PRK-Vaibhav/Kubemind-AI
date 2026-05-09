const BASE_URL = "http://127.0.0.1:8000"

export async function fetchPods() {

    const response = await fetch(`${BASE_URL}/pods`)

    return response.json()
}

export async function fetchMetrics() {

    const response = await fetch(`${BASE_URL}/metrics`)

    return response.json()
}