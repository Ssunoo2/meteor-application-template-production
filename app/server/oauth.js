// server/oauth.js
import { Meteor } from 'meteor/meteor';
import { ServiceConfiguration } from 'meteor/service-configuration';

const configureOAuth = () => {
  const oauthProviders = [
    {
      name: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
    },
    {
      name: 'github',
      clientId: process.env.GITHUB_CLIENT_ID,
      secret: process.env.GITHUB_CLIENT_SECRET,
    },
    // Add more providers as needed
  ];

  oauthProviders.forEach(({ name, clientId, secret }) => {
    if (clientId && secret) {
      ServiceConfiguration.configurations.upsert(
        { service: name },
        {
          $set: {
            clientId,
            secret,
            loginStyle: 'popup', // or 'redirect'
          },
        }
      );
    } else {
      console.warn(`Missing credentials for ${name}`);
    }
  });
};

Meteor.startup(() => {
  configureOAuth();
});
