FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /workspace

# Copy everything
COPY . .
# Restore as distinct layers
RUN dotnet restore "./API/API.csproj"
# Build and publish a release
RUN dotnet publish  "./API/API.csproj" -c Release -o ./app --no-restore

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /workspace/app .
COPY --from=build-env /workspace/API/CRM.db .
EXPOSE 5000
CMD ["dotnet", "API.dll"]