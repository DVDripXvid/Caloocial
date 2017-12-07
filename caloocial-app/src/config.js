export default {
    apiGateway: "http://152.66.175.208:4000",
    store: {
        storageKey: "@CaloocialStore:",
        accessTokenKey: this.storageKey + "AccessToken",
        accessTokenExpiresKey: this.storageKey + "AcccesTokenExpires",
        refreshTokenKey: this.storageKey + "RefreshToken",
        principalKey: this.storageKey + "Principal",
        personKey: this.storageKey + "Person"
    }
}