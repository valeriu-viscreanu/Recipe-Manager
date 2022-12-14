
export class User{
    constructor(private readonly email: string, 
        private readonly id: string,
        private readonly _token: string,
        private readonly _tokenExpirationDate: Date){
    }

    
    public get token() : string {
        if(this._tokenExpirationDate && new Date() > this._tokenExpirationDate)
        {
            return null;
        }
        return this._token;
    }    
}