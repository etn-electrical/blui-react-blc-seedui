import { HttpResponse, HttpRequestParams , HttpRequestBase, HttpRequestOptions} from '../types/api-types';


const bearerToken = (token: string) => (token ? `Bearer ${token}` : '');
const request = async <TResponse = unknown>(
    args: HttpRequestParams & HttpRequestBase & HttpRequestOptions & {token?: string}
): Promise<{ status: number; response: TResponse }> => {

    try {
        const url = `${args.resource}`;
        const response = await fetch(url, {
            method: args.method,
            headers: {
                ...('body' in args ? { 'Content-Type': 'application/json' } : {}),
                'claim-appid': "0oa6c6ymssh6xpgS81d7",
                'api-key' : "euJMkV8aG2eyWbubPX1rAT6Gczm1vj9p",
                'Authorization': bearerToken(args.token),
                ...args.headers
            },
            ...('body' in args
            ? {
                  body: JSON.stringify(args.body),
              }
            : {}),
        });

        return {
            status: response.status,
            response: args.responseType === 'text' ? await response.text() : await response.json(),
        };
    } catch (error) {
        return {
            status: 0,
            response: (error as Error).message as any,
        };
    }
};

export const HttpRequest = {

    post: <TBody = Record<string, never>>(
        args: { resource: string; body: TBody; token?: string } & HttpRequestOptions & {token?: string}
    ): Promise<HttpResponse> => request<TBody>({ method: 'POST', ...args }),

    get: <TResponse>(
        args: { resource: string; token?: string} & HttpRequestOptions
    ): Promise<HttpResponse<TResponse>> => request<TResponse>({ method: 'GET', ...args }),

};
