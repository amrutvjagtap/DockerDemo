# Start with node js
FROM node:20

# Create/Use /app as my working derictory (Similar to cd /app)
WORKDIR /app

# Take package.json file from my computer and put it inside the container
COPY package*.json ./

# 
RUN npm install


COPY . .

# Expose my application to 5000
EXPOSE 4001


# When container start run this command
CMD ["npm", "start"]