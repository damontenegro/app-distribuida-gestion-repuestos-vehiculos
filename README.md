Sistema de Gestión de Repuestos Vehiculares - Arquitectura Distribuida
Este proyecto es una aplicación web para la gestión de repuestos y ventas en un local automotriz. Está desarrollada con una arquitectura distribuida y tecnologías modernas.
________________________________________
🧱 Tecnologías principales
•	Frontend: React.js
•	Backend: Node.js con Express
•	Base de datos: MongoDB
•	Contenedores: Docker
•	Orquestación: Docker Compose
•	Infraestructura: AWS EC2 + Elastic Load Balancer (ELB)
________________________________________
🌐 Arquitectura distribuida
La aplicación está desplegada en la nube (AWS) con la siguiente estructura:
•	🔁 2 Instancias EC2 backend idénticas ejecutando contenedores del mismo código (repositorio actual).
o	Ambas instancias están conectadas a través de un Elastic Load Balancer (ELB) que distribuye el tráfico entrante.
•	🛢️ 1 Instancia EC2 separada con MongoDB centralizado, accesible por ambos backend.
•	🌍 El Frontend en React consume la API a través del balanceador de carga.
________________________________________
📂 Estructura del repositorio
/backend
/frontend
docker-compose.yml
README.md
...
________________________________________
🚀 Despliegue
Cada instancia EC2 backend debe:
1.	Clonar este repositorio:
 	git clone https://github.com/damontenegro/app-distribuida-gestion-repuestos-vehiculos.git
cd app-distribuida-gestion-repuestos-vehiculos
2.	Iniciar los contenedores:
 	sudo service docker start
docker-compose up -d --build
________________________________________
🐳 Repositorios DockerHub
•	Backend en DockerHub (https://hub.docker.com/r/damontenegro17/backend)
________________________________________
👥 Autores
Daniel Montenegro
Paola Vega
GitHub

