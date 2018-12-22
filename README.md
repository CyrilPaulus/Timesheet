# Prestations

A simple application to handle prestations inside a company.
The server is made using **ASP.NET Core 2.2** and the client uses **Angular 7**. 

## How to run

### With docker

The easiest way to run is to use the docker image
```shell
$ docker build -t prestations .
$ docker volume create prestations
$ docker run -d -p 5000:80 --name prestations --mount type=volume,source=prestations,target=/app/data prestations
```

This will build and launch the server on http://localhost:5000.
A volume is used so the database is persisted if the container is removed.


### Yourself
Otherwise you can still build everything yourself.
Don't forget to install **dotnet-sdk-2.2** and **@angular/cli** before trying to build.

```shell
$ cd PrestationClient
$ npm install
$ ng build --prod
$ cd ../PrestationApi
$ dotnet publish -c Release -o ../build
$ cd ../build
$ dotnet PrestationApi.dll
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* En franglais
* Not secured


## Authors

* **Cyril Paulus** - *Initial work* - [CyrilPaulus](https://github.com/CyrilPaulus)
