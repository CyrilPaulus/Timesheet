FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
ADD build .
ENTRYPOINT ["dotnet", "PrestationApi.dll"]