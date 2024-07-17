<h1 align='center'> <img src = 'https://github.com/user-attachments/assets/48c067ac-bc07-44c9-bf48-58156d802c77' height='35px'>
 Sistema de gestión de residuos <img src = 'https://github.com/user-attachments/assets/48c067ac-bc07-44c9-bf48-58156d802c77' height='35px'>
</h1>

> [!IMPORTANT]
> **Planteamiento del problema**
>
> En la actualidad Ecuador enfrenta serios desafíos en la gestión de residuos y la contaminación ambiental, muchas de las ciudades tienen sistemas ineficientes para la recolección de basura, lo que resulta en una acumulación de desechos que contaminan el suelo, agua y aire, ya que sin sistemas de recolección eficaces y accesibles, los residuos no se manejan correctamente, lo que lleva a la proliferación de basureros ilegales y la quema de desechos, por lo que es esencial la implementación de soluciones innovadoras.

🚮 **Sprint 0 - Configuracion del ambiente de desarrollo**

<details>
  <summary>🧩 Requerimientos </summary>
  
> - **Ciudadanos**
>   -  Los ciudadanos deben poder registrarse y acceder a la aplicación utilizando su correo electrónico y su contraseña.
>   -  Podrán consultar Información sobre el calendario de recolección de residuos, además de poder generar reportes de problemas que estén relacionados con la recolección de residuos.
> - **Administrador**
>   -  Los administradores deben poder registrarse y acceder a la aplicación utilizando su correo electrónico y su contraseña.
>   -  Una vez dentro, podrán agregar, modificar, actualizar o eliminar rutas de recolección, además de poder listar todos los reportes que han proporcionado cada usuario.
</details>

<details>
  <summary>🧩 Roles de usuario </summary>
  
> - **Ciudadanos**
> - **Administrador**
</details>

<details>
  <summary>🧩 Estructura del proyecto </summary>
  <img src = 'https://github.com/user-attachments/assets/6255b2de-6e41-462f-8c59-ee3f5f7b5b4b'>
</details>

🚮 **Sprint 1 - Modulo del administrador y rutas**

<details>
  <summary>🧩 Endpoints </summary>
  
> - **Endpoint de Administrador**
>   - ✨ Endpoint para registrar Administrador
>   
>     ```http
>     POST /api/registro
>     ```
>     
>     - Colocar los siguientes campos en el cuerpo de la petición
>     
>     ```json
>     {
>      "nombre": "isabel",
>      "apellido": "pazto",
>      "direccion": "Guamani",
>      "telefono": 994231454,
>      "email": "jesenia.pazto2003@gmail.com",
>      "password": "1234jK"
>     }
>     ```
>     
>     ![image](https://github.com/user-attachments/assets/86ff0313-c4f7-4227-a93f-fdd9a3903f26)
>
>   - ✨ Endpoint para ingresar como Administrador
>     
>     ```http
>     POST /api/login
>     ```
>     
>     - Colocar los siguientes campos en el cuerpo de la petición
>
>     ```json
>     {
>      "email": "jesenia.pazto2003@gmail.com",
>      "password": "1234jK"
>     }
>     ```
>     
>     - Respuesta del servidor
>     
>     ```json
>     {
>      "_id": "66972a7d8a55721ef661eccc",
>      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTcyYTdkOGE1NTcyMWVmNjYxZWNjYyIsImlhdCI6MTcyMTE4MzgwNywiZXhwIjoxNzIxMjcwMjA3fQ.HTcBRP5BweKe1kaX8afgt0qLZoif6OmuGBC5hV9MGZM",
>      "nombre": "isabel",
>      "apellido": "pazto",
>      "direccion": "Guamani",
>      "telefono": 994231454,
>      "email": "jesenia.pazto2003@gmail.com"
>     }
>     ```
>     
>   - ✨ Endpoint para perfil de Administrador
>     
>     ```http
>     GET /api/perfil
>     ```
>     
>     - Respuesta del servidor
>       
>      ![image](https://github.com/user-attachments/assets/6608874d-c4b5-443e-8649-23bd73dad831)
>   
>   - ✨ Endpoint para actualizar perfil de administrador
>     
>     ```http
>     PUT /api/administrador/:id
>     ```
>     
>     - Colocar los siguientes campos en el cuerpo de la petición
>     
>      ![image](https://github.com/user-attachments/assets/e4309770-fa9e-4ab0-8833-575e69df76c9)
>
>     - Respuesta del servidor
> 
>      ![image](https://github.com/user-attachments/assets/c57dd5ca-f5c8-4e22-879c-acebd0018fdd)
> 
>   - ✨ Endpoint para actualizar la contrasena del administrador
>     
>     ```http
>     PUT /api/administrador/actualizarpassword
>     ```
>     
>      - Colocar los siguientes campos en el cuerpo de la petición
> 
>        ![image](https://github.com/user-attachments/assets/ab6a473f-bd28-4f2a-a197-71a86392e11a)
>
>      - Respuesta del servidor
> 
>        ![image](https://github.com/user-attachments/assets/3d2c9662-caca-45b7-ad46-be1148025d51)
> 
>   - ✨ Endpoint para recuperar la contraseña del administrador
>     
>       ```http
>       POST /api/recuperar-password
>       ```
>       
>     - Colocar los siguientes campos en el cuerpo de la petición
>   
>      ![image](https://github.com/user-attachments/assets/d87ff175-97f2-4ae0-a04e-b0ffb864ef9b)
>
>     - Respuesta del servidor
>    
>      ![image](https://github.com/user-attachments/assets/3498926a-d735-4854-b03d-62dab2522765)
>
>    - ✨ Endpoint para nueva contraseña
>   
>       ```http
>       POST /api/nuevo-password/:token
>       ```
> 
>      - Colocar los siguientes campos en el cuerpo de la petición
> 
>      ![image](https://github.com/user-attachments/assets/c6511642-7143-461c-96f8-0b05620e58bf)
>
>      - Respuesta del servidor
> 
>      ![image](https://github.com/user-attachments/assets/9ae4f4bb-ee23-45f6-a0c9-e1d72f6ac4d6)
>
> - **Endpoint de rutas**
>     - ✨ Endpoint para crear rutas de recolección de residuos
>     
>       ```http
>       POST /api/rutas/registro
>       ```
>     
>     - Respuesta del servidor
>   
>     ![image](https://github.com/user-attachments/assets/bc373358-628f-490b-ae37-fc738eba0dee)
>
>   - ✨ Endpoint para listar rutas de recolección de residuos
>     
>     ```http
>     GET /api/rutas
>     ```
>     
>     - Respuesta del servidor
>     
>     ![image](https://github.com/user-attachments/assets/5ef0433f-daf7-4df2-b046-e6743e8f39d6)
>
>   - ✨ Endpoint para actualizar rutas de recolección de residuos
>     
>     ```http
>     PUT /api/rutas
>     ```
>     
>     - Respuesta del servidor
>     
>     ![image](https://github.com/user-attachments/assets/d6363037-09bd-408c-8c60-df894c5ec14d)
>
>   - ✨ Endpoint para eliminar rutas de recolección de residuos
>   
>     ```http
>     DELETE /api/rutas
>     ```
>     
>     - Respuesta del servidor
>     
>     ![image](https://github.com/user-attachments/assets/d3420457-30d8-4083-aa5b-47d22aba03da)

</details>


🚮 **Sprint 2 - Modulo de ciudadanos**

<details> 
    <summary>🧩 Endpoints </summary>
  
> - **Endpoint de ciudadanos**
>   -  ✨ Endpoint para registrar ciudadano
>     
>     ```http
>     POST /api/ciudadano/register
>     ```
>     
>     - Colocar los siguientes campos en el cuerpo de la petición
>       
>    ![image](https://github.com/user-attachments/assets/05f9fdd9-dfe9-4543-9c0e-482c080f0ac8)
> 
> - Respuesta del servidor
> 
>     ![image](https://github.com/user-attachments/assets/5533a226-419a-46c0-a24d-efac45d8acc9)
> 
>     ![image](https://github.com/user-attachments/assets/c90dee73-3a4f-4e0e-8782-67ca2c504833)
> 
>   -  ✨ Endpoint para iniciar sesión de ciudadano
>     
>     ```http
>     POST /api/ciudadano/login
>     ```
>     
>     - Colocar los siguientes campos en el cuerpo de la petición
>   
>   ![image](https://github.com/user-attachments/assets/08f006d9-8bdc-47b1-a1fb-1c225f0b71fb)
>
>     - Respuesta del servidor
>   
>     ![image](https://github.com/user-attachments/assets/b6e83862-c779-4c25-87bf-7cad3662dd59)
>
</details>



🚮 **Sprint 3 - Despliegue**

<details> 
    <summary>🧩 Enlace del despliegue </summary>
> https://api-ecoresiduos.onrender.com
>
</details>
