# Taller_3_web-movil

Taller 3 introduccion al desarrollo web movil por Matias Fontecilla, 21.729.131-3
El taller fue desarrollado utilizando React .NET 7, .NET EF y SQLite

## Requisitos

- SDK [.NET 8](https://dotnet.microsoft.com/es-es/download/dotnet/8.0).
- .NET [EF CLI](https://www.nuget.org/packages/dotnet-ef/)
- git [2.33.0](https://git-scm.com/downloads) o superior.
- Node.js [18.19.0](https://nodejs.org/en/about/previous-releases)

## Clonar repositorio

```
git clone https://github.com/MatiasFontecillaUCN/Taller-3-web-movil.git
```

## Instalación Backend

Inicialmente se prepará el backend, para ello se deberá ejecutar los siguentes comando en la terminal:

### Entrar a la carpeta del backend

Se debe estar en el directorio raiz de la aplicacion

```+
cd Taller-3-web-movil/backend/MobileHub/
```

### Copiar .env
Se debe crear un .env y llenarlo con lo espesificado
```+
cp .env.example .env
```


### Instalar dependencias de dotnet

```+
dotnet tool install --global dotnet-ef
dotnet restore
```

### Actualizar base de datos

```+
dotnet ef database update
```

### Iniciar aplicacion

```+
dotnet run
```

## Instalación Frontend

### Entrar a la carpeta del frontend

En una nueva consola que debe estar en el directorio raiz
Entrar a la carpeta del frontend

```+
cd Taller-3-web-movil/frontend/MobileHub/
```

### Instalar dependencias de react-native

```+
npm install
```

### Iniciar aplicacion

```+
npx expo start
```

### Ademas de el .env se debe cambiar la ip en los siguentes lugares
- backend/MobileHub/Properties/launchSettings.json
- frontend/MobileHub/app/api/agent.ts
