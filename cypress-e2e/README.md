## Prerequsisitos

- [Repositorio](https://github.com/duvanjamidvc/pruebas-e2e-ghost.git) `git clone https://github.com/duvanjamidvc/pruebas-e2e-ghost.git` o descargué el zip y descomprímalo.
- [NodeJS (Version ≥ 12)](https://nodejs.org)

## Ejecutar pruebas

- Abra una terminar y ubíquese en el folder del proyecto descargado y acceda a la carpeta cypress `cd /cypress`
- Ejecute el siguiente comando para instalar los paquetes necesarios
  `npm install`
- Verifique que puede acceder al sitio  [https://ghost-e2e-miso.herokuapp.com/ghost/](https://ghost-e2e-miso.herokuapp.com/ghost/) con las credenciales:


  - Email address: dj.vargasc1@uniandes.edu.co
  - Password: bonita1809


- Ejecute el comando `npm start` para ejecutar las pruebas end to end con cypress

- Para ver el reporte de hallazgos puede ingresar al directorio /screenshots/ghost
