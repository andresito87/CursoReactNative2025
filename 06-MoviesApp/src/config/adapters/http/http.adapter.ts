
// Bridge between my app and the api, useful to make request and obtain response
export abstract class HttpAdapter {
    abstract get<T>(url: string, options?: Record<string, unknown>): Promise<T>
}