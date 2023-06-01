FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore "./API.csproj"
# Build and publish a release
RUN dotnet publish  "./API.csproj" -c Release -o /app --no-restore

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app /.
EXPOSE 5000
ENTRYPOINT ["dotnet", "API.dll"]