export interface TwilioSubaccount {
  sid: string;
  authToken: string;
  apiKey: {
    sid: string;
    secret: string;
  };
  services: {
    conversations: {
      sid: string;
    };
  };
}
