# Use node as runtime
FROM node:18.12.1

WORKDIR /usr/src/app

# Copy package.json into the container
COPY package*.json ./

RUN npm install

COPY . .

# Expose the port Hardhat might use (Is maybe not necessary)
EXPOSE 8545

# Default command is node
CMD ["node"]
