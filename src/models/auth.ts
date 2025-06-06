export interface ClientCredentialTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export interface AuthUrlParams {
    response_type:"code";
    client_id:string;
    scope:string;
    code_challenge_method: "S256";
    code_challenge: string;
    redirect_uri: string;

}

export interface ExchangeTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}