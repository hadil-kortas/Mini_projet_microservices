# Mini_projet_microservices
A simple microservices with REST and et GraphQL architectures using node js as a framework and SQLite as a database
# Usage
books-service/ customers-service/ orders-service :

npm init -y

npm install express graphql sqlite3 body-parser express-graphql

api-gateway:

npm install express

npm install http-proxy-middleware

# BOOKS MICROSERVICE 

Rest :

Get/books


GraphQL :

query {

   books {
    id
    title
    author
    publicationYear
  }
}

Rest : 

Post/book

| Parameter | Type | Description |
| -------------- | -------------- | -------------- |
| title | string | required |
| author | string | required |
| publicationYear | number | required |




GraphQL : 

mutation Mutation($title: String!, $author: String! $publicationYear: Int! ) {

  createUser(title: $title, author: $author, publicationYear: $publicationYear ) {
    
   id
   title    
   author    
   publicationYear
  }
}






