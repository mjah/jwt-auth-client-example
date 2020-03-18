# JWT Auth Client Example

This is an example client for [jwt-auth](https://github.com/mjah/jwt-auth).

## Quick Start

### Prerequisite

* Ensure that you have got [jwt-auth](https://github.com/mjah/jwt-auth) up and running before proceeding.
* Clone this repository and enter it's directory.

### Run using Docker Compose

```sh
docker-compose up
```

### Run using Docker


Build:

```sh
docker build -t jwt-auth-client-example .
```

Run:

```sh
docker run -it -p 8080:80 jwt-auth-client-example
```

## Project setup

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn serve
```

### Compiles and minifies for production

```sh
yarn build
```

### Lints and fixes files

```sh
yarn lint
```

### Format the code

```sh
yarn prettier
```

## Contributing

Any feedback and pull requests are welcome and highly appreciated. Please open an issue first if you intend to send in a larger pull request or want to add additional features.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/mjah/jwt-auth-client-example/blob/master/LICENSE) file for details.
