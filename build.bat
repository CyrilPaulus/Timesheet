cd PrestationClient
ng build --prod
cd ..
cd PrestationApi
dotnet publish -c Release -o ../build
cd ..