export default {
    apiGateway: "http://192.168.1.11:4000",
    store: {
        storageKey: "@CaloocialStore:",
        accessTokenKey: this.storageKey + "AccessToken",
        accessTokenExpiresKey: this.storageKey + "AcccesTokenExpires",
        refreshTokenKey: this.storageKey + "RefreshToken",
        principalKey: this.storageKey + "Principal",
        personKey: this.storageKey + "Person"
    }
}