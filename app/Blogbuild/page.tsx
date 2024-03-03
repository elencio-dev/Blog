"use client"

import { useEffect, useState } from 'react';
import CreatBlog from "@/components/ui/createblog";
import { Account } from 'appwrite';
import { client } from '../api/config';


const account = new Account(client);

export default function Page() {
 const [currentAccount, setCurrentAccount] = useState(null);

 useEffect(() => {
    const fetchCurrentAccount = async () => {
      try {
        // Retrieve the session from localStorage
        //@ts-ignore
        const session = JSON.parse(localStorage.getItem('appwrite-session'));

        // If there is a session, use it to get the account details
        if (session) {
          const accountData = await account.get();
          //@ts-ignore
          setCurrentAccount(accountData);
          console.log(accountData)
        } else {
          console.log("No session found");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCurrentAccount();
 }, []);

 return (
    <div className="flex flex-col gap-4 mx-auto px-12 py-4">
      {currentAccount ? (
        <>
          <h1>Cria tua postagem aqui</h1>
          //@ts-ignore
          <CreatBlog account={currentAccount} />
        </>
      ) : (
        <p>You must be logged in to access this page.</p>
      )}
    </div>
 );
}
