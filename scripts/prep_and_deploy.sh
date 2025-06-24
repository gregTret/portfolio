#!/bin/bash

echo "--Portfolio Site Deployment Script--"

# Check if required environment variables are set
if [ -z "$username" ] || [ -z "$password" ] || [ -z "$host" ] || [ -z "$port" ]; then
    echo "Error: Missing required environment variables (username, password, host, port)"
    exit 1
fi

echo "--Installing Dependencies--"
sudo apt-get update
sudo apt-get install sshpass -y

echo "--Checking Portfolio Site Directory--"
if [ ! -d "./portfolio_site" ]; then
    echo "Error: portfolio_site directory not found"
    exit 1
fi

echo "--Cleaning up target directory--"
sshpass -p $password ssh -p $port -o StrictHostKeyChecking=no -tt $username@$host "cd public_html; rm -rf *; exit;"
if [ $? -eq 0 ]; then
    echo "Target directory cleaned successfully"
else
    echo "Failed to clean target directory"
    exit 1
fi

echo "--Copying portfolio files to server--"
sshpass -p $password scp -P $port -r ./portfolio_site/* $username@$host:./public_html/
if [ $? -eq 0 ]; then
    echo "Portfolio files copied successfully"
else
    echo "Failed to copy portfolio files"
    exit 1
fi

echo "--Deployment completed successfully--"
echo "Portfolio site is now live at your Hostinger domain" 