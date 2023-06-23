import { OutgoingHttpHeaders } from 'http';

export enum HttpMethod {
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    GET = 'GET',
    DELETE = 'DELETE',
}

export type BaseHttpResponse<T> = {
    status: number;
    response: T;
};

export type HttpRequestParams<TBody = unknown> =
    | {
        method: 'GET';
    }
    | {
        method: 'DELETE';
    }
    | {
        method: 'POST';
        body: TBody;
    }
    | {
        method: 'PUT';
        body: TBody;
    };

export type HttpRequestBase = {
    resource: string;
};

export type ApiUrl = {
    baseUrl: string;
}

export type HttpRequestOptions = {
    responseType?: 'text' | 'json';
    headers?: OutgoingHttpHeaders;
    prependApiUrl?: boolean;
    version?: number;
};

export type HttpResponse<TResponse = unknown> = {
    status: number;
    response: TResponse;
};
