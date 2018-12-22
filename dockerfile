FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app

COPY PrestationApi/*.csproj ./
RUN dotnet restore

FROM node as client
WORKDIR /app
RUN npm install -g @angular/cli
COPY PrestationClient ./
RUN npm install
RUN ng build --prod --output-path out

FROM build-env as publish
WORKDIR /app
COPY PrestationApi .
COPY --from=client /app/out out/wwwroot
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet:aspnetcore-runtime
RUN apt-get update && apt-get install -y libgdiplus libc6-dev && ln -s /usr/lib/libgdiplus.so /usr/lib/gdiplus.dll
WORKDIR /app
COPY --from=publish /app/out .
ENTRYPOINT ["dotnet", "PrestationApi.dll"]