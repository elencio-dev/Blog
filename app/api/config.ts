import { Client, Databases } from "appwrite";
  

export const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('65e1c12e251c595feb4e');

  export const databases = new Databases(client);